import React, { useRef,useEffect,useState } from 'react';
import {useParams } from 'react-router-dom';
import './ManagerHome.css';
import useLoading from '../util/useLoading';
import useMove from '../util/useMove';
import useSendPost from '../util/useSendPost';
import ManagerMenuInfo from './ManagerMenuInfo';

const ManagerNoticeEditor =()=>{
  const initNotice = {
    no: 0,
    user_id: '',
    user_nickname: '',
    category:'',
    subject:'',
    content:'',
    ref: 1,
    step: 0,
    depth:0,
    read_count:'',
    reg_date:'',
  };
  const {no} = useParams();
  const [notice, setNotice] = useState(initNotice);
  const {data: noticeData, loading: loadingNoticeData, error: errorNoticeData, refetch: refetchNoticeData } = useLoading(`http://localhost:8080/api/notice/read/${no}`, 'json');
  
  // 사용자 정보
  const { data: userData, loading: loadingUser, error: errorUser } = useLoading('http://localhost:8080/api/user/userInfo', 'json');
  
  useEffect(() => {
    if (userData) {
      setNotice(prevNotice => ({
        ...prevNotice,
        user_id: userData.user_id,
        user_nickname: userData.user_nickname,
      }));
    }
    if (noticeData) {
      setNotice(noticeData);
    }
  }, [noticeData, userData]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setNotice((prevData) => ({
      ...prevData,
      [name]: value,
  }));
  };

  //카테고리  
  const [categories, setCategories] = useState(['이벤트', '서비스 업데이트', '유지보수 안내', '커뮤니티 소식','기타']);
  const [newCategory, setNewCategory] = useState('');

  const handleAddCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setNewCategory('');
    }
  };

  //공지사항 목록으로 이동
  const moveToNoticeList = useMove('/manager/customer-service/notice');

  //등록
  const { postRequest: sendRequest } = useSendPost('http://localhost:8080/api/notice/insert', {}, 'json');
  const onSubmit =async()=>{
    if (!notice.category || !notice.subject ||!notice.content) {
      alert('모든 필드를 채워주세요.');
      return;
    }
    try {
      await sendRequest(notice);
      alert('notice 등록 되었습니다.');
      setNotice({
        ...initNotice,
      });
      moveToNoticeList();//목록
    } catch (error) {
      console.error('notice 등록 실패:', error);
      alert('notice 등록 실패했습니다.');
    }
  };

  //수정
  const { postRequest: updateRequest } = useSendPost('http://localhost:8080/api/notice/update', {}, 'json');
  const onUpdate =async()=>{
    if (!notice.category || !notice.subject ||!notice.content) {
      alert('모든 필드를 채워주세요.');
      return;
    }
    try {
      await updateRequest(notice);
      alert('notice 수정 되었습니다.');
      setNotice({
        ...initNotice,
      });
      moveToNoticeList();//목록
    } catch (error) {
      console.error('notice 수정 실패:', error);
      alert('notice 수정 실패했습니다.');
    }
  }

  return(
    <>
     <div className="managerFaqEditor">
      <div className="managerContent backWhite">
        <ManagerMenuInfo/>

      <div className='managerEditorForm'> 
      <div className="formGroup">
        <label htmlFor="subject">제목:</label>
        <input type="text" name="subject" value={notice.subject} onChange={onChange}/>
      </div>
      <div className="formGroup">
        <label htmlFor="category">카테고리:</label>
        <select id="category" name="category" value={notice.category} onChange={onChange} >
          <option value="" disabled> 카테고리를 선택하세요
          </option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="formGroup newCategory">
        <input type="text" id="newCategory" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} placeholder="새 카테고리 추가"/>
        <button onClick={handleAddCategory} className="addCategoryButton">추가</button>
      </div>
      <div className="formGroup">
        <label htmlFor="content">내용:</label>
        <textarea name="content" value={notice.content} onChange={onChange} />
      </div>
      <div className="formGroup btnSub">
        {no!=0 ?(
        <button onClick={onUpdate} className="completeButton">수정</button>
      ):(
        <button onClick={onSubmit} className="completeButton">등록</button>)}
        <button onClick={moveToNoticeList} className="completeButton">목록</button>
      </div>
      </div>

      </div>
    </div>
    </>
  );
};
export default ManagerNoticeEditor;