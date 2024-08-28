import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './ManagerHome.css';
import useLoading from '../util/useLoading';
import useSendPost from '../util/useSendPost';
import ManagerMenuInfo from './ManagerMenuInfo';
import CategoryItem from './items/CategoryItem';
import Button from "../components/Button";

const ManagerGroupCateEditor = () => {
  const { data: categroyData, loading: loadingCategory, error: errorCategory, refetch: refetchCategory } = useLoading('http://localhost:8080/api/category/list', 'json');
  
  const [showForm, setShowForm] = useState(false);
  const [newCategory, setNewCategory] = useState({
    code: '',
    category_name: '',
  });


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCategory(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleShowForm = () => {
    if (categroyData && categroyData.length > 0) {
      const maxCode = Math.max(...categroyData.map(item => parseInt(item.code, 10)));
      setNewCategory(prevState => ({
        ...prevState,
        code: (maxCode + 100).toString(),
      }));
    }
    setShowForm(true);
  };

  // 카테고리 등록
  const { postRequest: sendRequest } = useSendPost('http://localhost:8080/api/category/insert', {}, 'json');

  const onSubmit = async () => {
    if (!newCategory.code || !newCategory.category_name) {
      alert('모든 필드를 채워주세요.');
      return;
    }
    try {
      await sendRequest(newCategory);
      alert('카테고리 등록 되었습니다.');
      setNewCategory({
        code: '',
        category_name: '',
      });
      setShowForm(false);  // Hide the form after submission
      refetchCategory();
    } catch (error) {
      console.error('카테고리 등록 실패:', error);
      alert('카테고리 등록 실패했습니다.');
    }
  };

  if (loadingCategory) {
    return (<div>loading...</div>);
  }

  return (
    <>
      <div className="managerGroupCateEditor">
        <div className="managerContent backWhite">
          <ManagerMenuInfo />
          
          <div className="writeBtnDiv">
          <Button text="카테고리 등록" onClick={handleShowForm} className={'writeBtn'}/>
          </div>

          {showForm && (
            <div className="categoryForm">
              <input type="text" name="code" placeholder="코드" value={newCategory.code} onChange={handleInputChange}/>
              <input type="text"  name="category_name" placeholder="카테고리 이름" value={newCategory.category_name}  onChange={handleInputChange} />
              <Button text="등록" onClick={onSubmit} className={'writeBtn'}/>
              <Button text="취소" onClick={()=>{setShowForm(false);}} className={'writeBtn'}/>
            </div>
          )}

          <table className="UserTable" style={{ tableLayout: 'fixed', width: '100%' }}>
            <thead>
              <tr>
                <th style={{ width: '150px' }}>번호</th>
                <th style={{ width: '150px' }}>코드</th>
                <th style={{ width: '250px' }}>카테고리 이름</th>
                <th style={{ width: '70px' }}>수정 / 삭제</th>
              </tr>
            </thead>
            <tbody>
              {categroyData && categroyData.map((i, index) => (
                <CategoryItem key={i.groupcategory_id} data={i} refetch={refetchCategory} no={index + 1} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ManagerGroupCateEditor;
