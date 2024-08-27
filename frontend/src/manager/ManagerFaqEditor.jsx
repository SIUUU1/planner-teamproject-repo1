import React, { useRef,useEffect,useState } from 'react';
import {useParams } from 'react-router-dom';
import './ManagerHome.css';
import useLoading from '../util/useLoading';
import useMove from '../util/useMove';
import useSendPost from '../util/useSendPost';
import ManagerMenuInfo from './ManagerMenuInfo';

const ManagerFaqEditor =()=>{
  const initFaq = {
    faq_id: 0,
    faq_category: '',
    faq_title: '',
    faq_content:'',
  };
  const {no} = useParams();
  const [faq, setFaq] = useState(initFaq);
  const {data: faqData, loading: loadingfaqData, error: errorfaqData, refetch: refetchfaqData } = useLoading(`http://localhost:8080/api/faq/read/${no}`, 'json');
  // 사용자 정보
  const { data: userData, loading: loadingUser, error: errorUser } = useLoading('http://localhost:8080/api/user/userInfo', 'json');

   useEffect(() => {
    if (faqData) {
      setFaq(faqData);
    }
  }, [faqData, userData]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setBoard((prevData) => ({
      ...prevData,
      [name]: value,
  }));
  };

  //카테고리  
  const [categories, setCategories] = useState(['회원', '결제', '그룹', '기타']);
  const [newCategory, setNewCategory] = useState('');

  const handleAddCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setNewCategory('');
    }
  };

  //등록
  const onSubmit =()=>{}
  //수정
  const onUpdate =()=>{}

  return(
    <>
     <div className="managerFaqEditor">
      <div className="managerContent backWhite">
        <ManagerMenuInfo/>
        
      <div className="formGroup">
        <label htmlFor="faq_title">제목:</label>
        <input type="text" name="faq_title" value={faq.faq_title} onChange={onChange}/>
      </div>
      <div className="formGroup">
        <label htmlFor="faq_category">카테고리:</label>
        <select id="faq_category" name="faq_category" value={faq.faq_category} onChange={onChange} >
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
        {/* <label htmlFor="newCategory">카테고리 추가:</label> */}
        <input type="text" id="newCategory" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} placeholder="새 카테고리 추가"/>
        <button onClick={handleAddCategory} className="addCategoryButton">추가</button>
      </div>
      <div className="formGroup">
        <label htmlFor="content">내용:</label>
        <textarea  name="faq_contents" onChange={onChange}>{faq.faq_content}</textarea>
      </div>
      <div className="formGroup btnSub">
        {no!=0 ?(
        <button onClick={onUpdate} className="completeButton">수정</button>
      ):(
        <button onClick={onSubmit} className="completeButton">등록</button>)}
        <button onClick={onUpdate} className="completeButton">목록</button>
      </div>

      </div>
    </div>
    </>
  );
};
export default ManagerFaqEditor;