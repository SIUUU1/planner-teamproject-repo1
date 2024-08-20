import React, { useRef,useState, useEffect } from 'react';
import './Profile.css';
import useLoading from '../util/useLoading';
import Button from '../components/Button';
import useSendPost from '../util/useSendPost';
import useMove from '../util/useMove';

const Profile = () => {
  const { data: userData, loading: loadingUser, error: errorUser, refetch: refetchUserData } = useLoading('http://localhost:8080/api/user/userInfo', 'json');
  const [profiles, setProfiles] = useState({
    user_no: '',
    user_id: '',
    password: '',
    user_name: '',
    user_nickname: '',
    image_url: '',
    user_tel: '',
    user_email: '',
  });
  const img = useRef(null);
  //이미지
  const [selectedImage, setSelectedImage] = useState(profiles.image_url || '/images/cat1.jpg');
  const [selectedImageFile, setSelectedImageFile] = useState(null); 

  useEffect(() => {
    if (userData) {
      setProfiles(userData);
      let src='';
      if(userData.image_url){
        src=`http://localhost:8080/static/images/profile/${userData.image_url}`;
        setSelectedImage(src || '/images/cat1.jpg');
      }
    }
  }, [userData]);

  const [editField, setEditField] = useState('');
  const [editValue, setEditValue] = useState('');

  const handleEditClick = (field) => {
    setEditField(field);
    setEditValue(profiles[field]);
  };

  const handleSaveClick = () => {
    // 수정된 닉네임을 상태에 반영한 후에
    const updatedProfiles = {
      ...profiles,
      [editField]: editValue,
    };
    setProfiles(updatedProfiles);
    handleProfileEdit(updatedProfiles);
    //초기화
    setEditField('');
    setEditValue('');
  };

  //sns 회원가입시 이메일 변경 버튼이 보이지 않는다.
  const shouldHideEmailChangeButton = () => {
    const userId = profiles.user_id;
    return (
      userId.startsWith('google') ||
      userId.startsWith('naver') ||
      userId.startsWith('kakao')
    );
  };

  // user delete 
  const deleteRequest = useSendPost('http://localhost:8080/api/user/delete', {}, 'json');
  const moveWelcome= useMove('../welcome')
  // 회원 탈퇴
  const onDelete = async () => {
    if(window.confirm('정말로 탈퇴하시겠습니까?')){
      const user_id = userData.user_id ;
      console.log("delete"+user_id);
      try {
        await deleteRequest.postRequest({user_id});
        alert('탈퇴 성공');
        moveWelcome();
      } catch (error) {
        alert('탈퇴 실패');
        console.error("Error deleting User:", error);
      }
    }
  };

  // 프로필 수정
  const handleProfileEdit = async (updatedProfiles) => {
    try {
      const formData = new FormData();
      for (const key in updatedProfiles) {
        formData.append(key, updatedProfiles[key]);
      }
      if (img.current.files.length>0) {
        formData.append('img',img.current.files[0]);
      }
      const response = await fetch('http://localhost:8080/api/user/update', {
        method: 'POST', 
        encType: 'multipart/form-data',
        body: formData,
        credentials: 'include',
      });
      console.log('formdata'+formData);
      if (response.ok) {
        alert('프로필이 성공적으로 수정되었습니다.');
        refetchUserData();
      } else {
        throw new Error('프로필 수정 실패');
      }
    } catch (error) {
      console.error('프로필 수정 실패:', error);
      alert('프로필 수정에 실패했습니다.');
    }
  };

// 이미지 변경
const handleImageChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result); 
    };
    reader.readAsDataURL(file);
    setSelectedImageFile(file); 
    // 이미지 선택 후 즉시 프로필 수정
    const updatedProfiles = {
      ...profiles,
      image_url: file.name, 
    };
    setProfiles(updatedProfiles);
    handleProfileEdit(updatedProfiles);
  }
};

// 패스워드 재설정 페이지 이동
const movePassReset= useMove('/passReset/pw')

  return (
    <div className="profile">
      <div className="profileContainer backWhite">
        <h1>MY PAGE</h1>
        <div className="profileContent">
          <img src={selectedImage} className="profileAvatar" onClick={() => document.getElementById('fileInput').click()} />
          <input type="file" id="fileInput" style={{ display: 'none' }} onChange={handleImageChange} ref={img} accept="image/*"/>
          <table className="profileTable">
            <tbody>
              <tr>
                <td>닉네임</td>
                <td>
                  {editField === 'user_nickname' ? (
                    <input type="text" value={editValue} onChange={(e) => setEditValue(e.target.value)} />
                  ) : (profiles.user_nickname)}
                </td>
                <td>
                  {editField === 'user_nickname' ? (
                    <button onClick={handleSaveClick}>확인</button>
                  ) : (
                    <button onClick={() => handleEditClick('user_nickname')}>변경</button>
                  )}
                </td>
              </tr>
              <tr>
                <td>전화번호</td>
                <td>
                  {profiles.user_tel}
                </td>
                <td></td>
              </tr>
              <tr>
                <td>이메일</td>
                <td>
                  {editField === 'user_email' ? (
                    <input type="text" value={editValue} onChange={(e) => setEditValue(e.target.value)}/>
                  ) : (profiles.user_email)}
                </td>
                <td>
                  {!shouldHideEmailChangeButton() && (
                    <>
                      {editField === 'user_email' ? ( <button onClick={handleSaveClick}>확인</button>
                      ) : (<button onClick={() => handleEditClick('user_email')}>변경</button>
                      )}
                    </>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
          <div className='profileBtn'>
            {!shouldHideEmailChangeButton() &&
            <Button text={'패스워드 재설정'} onClick={()=>{movePassReset();}}/>
            }
            <Button text={'회원탈퇴'} onClick={onDelete}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;