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

   useEffect(() => {
    if (faqData) {
      setFaq(faqData);
    }
  }, [faqData,]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setFaq((prevData) => ({
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

  const moveToFaqList = useMove('/manager/customer-service/faq');

  //등록
  const { postRequest: sendRequest } = useSendPost('http://localhost:8080/api/faq/insert', {}, 'json');
  const onSubmit =async()=>{
    if (!faq.faq_category || !faq.faq_title ||!faq.faq_content) {
      alert('모든 필드를 채워주세요.');
      return;
    }
    try {
      await sendRequest(faq);
      alert('faq 등록 되었습니다.');
      setFaq({
        ...initFaq,
      });
      moveToFaqList();//목록
    } catch (error) {
      console.error('faq 등록 실패:', error);
      alert('faq 등록 실패했습니다.');
    }
  };

  //수정
  const { postRequest: updateRequest } = useSendPost('http://localhost:8080/api/faq/update', {}, 'json');
  const onUpdate =async()=>{
    if (!faq.faq_category || !faq.faq_title ||!faq.faq_content) {
      alert('모든 필드를 채워주세요.');
      return;
    }
    try {
      await updateRequest(faq);
      alert('faq 수정 되었습니다.');
      setFaq({
        ...initFaq,
      });
      moveToFaqList();//목록
    } catch (error) {
      console.error('faq 수정 실패:', error);
      alert('faq 수정 실패했습니다.');
    }
  }

  return(
    <>
     <div className="managerFaqEditor">
      <div className="managerContent backWhite">
        <ManagerMenuInfo/>
        
      <div className='managerEditorForm'> 
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
        <textarea name="faq_content" value={faq.faq_content} onChange={onChange} />
      </div>
      <div className="formGroup btnSub">
        {no!=0 ?(
        <button onClick={onUpdate} className="completeButton">수정</button>
      ):(
        <button onClick={onSubmit} className="completeButton">등록</button>)}
        <button onClick={moveToFaqList} className="completeButton">목록</button>
      </div>
      </div>  

      </div>
    </div>
    </>
  );
};
export default ManagerFaqEditor;