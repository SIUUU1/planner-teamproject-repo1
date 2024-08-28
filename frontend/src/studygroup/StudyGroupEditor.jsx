import React, { useRef,useState, useEffect } from 'react';
import './StudyGroupEditor.css';
import { useNavigate,useParams } from 'react-router-dom';
import Button from '../components/Button';
import useLoading from '../util/useLoading';
import useSendPost from '../util/useSendPost';

const StudyGroupEditor = () => {
  const initGroup = {
    group_id: 0,
    category: '',
    leader_id: '',
    group_name:'',
    groupone_count: 1,
    group_detail: '',
    group_notice:'',
    group_goal: '',
    image_url: '',
    apply_count:0,
    reg_date:'',
  };
  const {id} = useParams();
  //그룹정보
  const { data: groupData, loading: loadingGroup, error: errorGroup, refetch: refetchGroupData } = useLoading(`http://localhost:8080/api/group/read/${id}`, 'json');
  const { data: categoryData, loading: loadingCategory, error: errorCategory} = useLoading(`http://localhost:8080/api/category/list`, 'json');
  const [group, setGroup] = useState(initGroup);
  const [category, setCategory] = useState([]);
  const nav = useNavigate();
  
  const img = useRef(null);
  //이미지
  const [selectedImage, setSelectedImage] = useState('/images/cat1.jpg');
  const [selectedImageFile, setSelectedImageFile] = useState(null); 

  // 사용자 정보
  const { data: userData, loading: loadingUser, error: errorUser } = useLoading('http://localhost:8080/api/user/userInfo', 'json');

  useEffect(() => {
    if (groupData) {
      setGroup(groupData);
      let src='';
      if(groupData.image_url){
        src=`http://localhost:8080/static/images/group/${groupData.image_url}`;
        setSelectedImage(src || '/images/cat1.jpg');
      }
    }
    if(categoryData){
      setCategory(categoryData);
    }
    if (userData && id === '0') {
      setGroup((prevData) => ({
        ...prevData,
        leader_id: userData.user_id,
      }));
    }
  }, [groupData,categoryData,userData]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setGroup((prevData) => ({
      ...prevData,
      [name]: value,
  }));
  };

  const formatModalContent = (content) => {
    return content
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .map((line, index) => (line === '---' ? <hr key={index} /> : <p key={index}>{line}</p>));
  };


// 그룹 등록
const onSubmit = async () => {
  if (!group.category || !group.group_name || !group.group_goal) {
    alert('모든 필드를 채워주세요.');
    return;
  }
  try {
    const formData = new FormData();
    for (const key in group) {
      formData.append(key, group[key]);
    }
    if (img.current.files.length>0) {
      formData.append('img',img.current.files[0]);
    }
    const response = await fetch('http://localhost:8080/api/group/insert', {
      method: 'POST', 
      encType: 'multipart/form-data',
      body: formData,
      credentials: 'include',
    });
    console.log('formdata'+formData);
    if (response.ok) {
      alert('그룹이 성공적으로 등록되었습니다.');
      //리패치
      //목록으로
      nav('/groupmain');
    } else {
      throw new Error('그룹 등록 실패');
    }
  } catch (error) {
    console.error('그룹 등록 실패:', error);
    alert('그룹 등록 실패했습니다.');
  }
};

  //그룹 수정
  const onEdit = async () => {
    try {
      const formData = new FormData();
      for (const key in group) {
        formData.append(key, group[key]);
      }
      if (img.current.files.length>0) {
        formData.append('img',img.current.files[0]);
      }
      const response = await fetch('http://localhost:8080/api/group/update', {
        method: 'POST', 
        encType: 'multipart/form-data',
        body: formData,
        credentials: 'include',
      });
      console.log('formdata'+formData);
      if (response.ok) {
        alert('그룹이 성공적으로 수정되었습니다.');
        nav('/groupmain');
        //리패치
      } else {
        throw new Error('그룹 수정 실패');
      }
    } catch (error) {
      console.error('그룹 수정 실패:', error);
      alert('그룹 수정에 실패했습니다.');
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
    const updatedGroups = {
      ...group,
      image_url: file.name, 
    };
    setGroup(updatedGroups);
    // onEdit(updatedGroups);
  }
};

// 그룹 삭제
const { postRequest: deleteRequest } = useSendPost('http://localhost:8080/api/group/delete', {}, 'json');

const onDelete =async ()=>{
  try {
    const group_id = id;
    await deleteRequest({group_id});
    console.log("group_id"+group_id)
    alert('그룹이 삭제되었습니다.');
    nav('/groupmain');
    //리패치
  } catch (error) {
    console.error('그룹 삭제 실패:', error);
    alert('그룹 삭제에 실패했습니다.');
  }
};
  if(loadingUser||loadingGroup||loadingCategory){
  return(<div>loading...</div>);
  }
  return (
    <div className='studyGroupEditor backWhite'>
      <h3>그룹 만들기</h3>

      <div className='EditorForm'> 
      <div className="formGroup imgDiv">
          <img src={selectedImage} className="groupImage" onClick={() => document.getElementById('fileInput').click()}/>
          <input type="file" id="fileInput" style={{ display: 'none' }} onChange={handleImageChange} ref={img} accept="image/*"/>
      </div>
      <div className="formGroup">
        <label htmlFor="group_name">그룹명</label>
        <input type="text" name="group_name" placeholder='그룹명을 적어주세요.' value={group.group_name} onChange={onChange} />
      </div>
      <div className="formGroup">
        <select name="category" value={group.category} onChange={onChange}>
                <option value="">카테고리를 선택하세요.</option>
                {category.map((cate, index) => (
                  <option key={index} value={cate.code}>{cate.category_name}</option>
                ))}
        </select>
      </div>
      
      <div className="formGroup">
        <label htmlFor="content">그룹목표</label>
        <input type="text" name="group_goal" placeholder='그룹목표를 적어주세요.' value={group.group_goal} onChange={onChange} />
      </div>
      <div className="formGroup">
        <label htmlFor="content">그룹설명</label>
        <textarea name="group_detail" cols="30" rows="10" placeholder='어떤 그룹인지 설명해주세요.' value={group.group_detail} onChange={onChange}></textarea>
      </div>
      <div className="formGroup">
        <label htmlFor="content">간단 소개글</label>
        <textarea name="group_notice" cols="30" rows="5" placeholder='#weplan #기상 #함께해요' value={group.group_notice} onChange={onChange}></textarea>
      </div>

      <div className="formGroup btnSub">
       <Button text={'취소'} onClick={() => nav(-1)} className={'completeButton'}/>
        {groupData && groupData.leader_id===userData.user_id?(
          <>
        <Button text={'수정'} onClick={onEdit} className={'completeButton'}/>
        <Button text={'삭제'} onClick={onDelete} className={'completeButton'}/>
        </>
        ):(
          <Button text={'완료'} onClick={onSubmit} className={'completeButton'}/>
        )}
      </div>
      </div>  

      {/* <table>
        <tbody>
          <tr>
            <td>그룹이미지</td>
            <td>
              <img src={selectedImage} className="groupImage" onClick={() => document.getElementById('fileInput').click()}/>
              <input type="file" id="fileInput" style={{ display: 'none' }} onChange={handleImageChange} ref={img} accept="image/*"/>
            </td>
          </tr>
          <tr>
            <td>그룹명</td>
            <td><input type="text" name="group_name" placeholder='그룹명을 적어주세요.' value={group.group_name} onChange={onChange} /></td>
          </tr>
          <tr>
            <td>카테고리</td>
            <td>
              <select name="category" value={group.category} onChange={onChange}>
                <option value="">카테고리를 선택하세요.</option>
                {category.map((cate, index) => (
                  <option key={index} value={cate.code}>{cate.category_name}</option>
                ))}
              </select>
            </td>
          </tr>
          <tr>
            <td>그룹목표</td>
            <td><input type="text" name="group_goal" placeholder='그룹목표를 적어주세요.' value={group.group_goal} onChange={onChange} /></td>
          </tr>
          <tr>
            <td>그룹 설명</td>
            <td><textarea name="group_detail" cols="30" rows="10" placeholder='어떤 그룹인지 설명해주세요.' value={group.group_detail} onChange={onChange}></textarea></td>
          </tr>
          <tr>
            <td>간단 소개글</td>
            <td><textarea name="group_notice" cols="30" rows="5" placeholder='#weplan #기상 #함께해요' value={group.group_notice} onChange={onChange}></textarea></td>
          </tr>
        </tbody>
      </table> */}
      {/* <div className='buttonSection'>
        <Button text={'취소'} onClick={() => nav(-1)} />
        {groupData && groupData.leader_id===userData.user_id?(
          <>
        <Button text={'수정'} onClick={onEdit}/>
        <Button text={'삭제'} onClick={onDelete}/>
        </>
        ):(
          <Button text={'완료'} onClick={onSubmit}/>
        )}
      </div> */}
    </div>
  );
};

export default StudyGroupEditor;
