import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX, faPencil } from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/Button";
import useSendPost from "../../util/useSendPost";
import React, { useState } from 'react';

const CategoryItem = ({ data, refetch, no }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedCategory, setEditedCategory] = useState({
    groupcategory_id: data.groupcategory_id,
    code: data.code,
    category_name: data.category_name,
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setEditedCategory((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //수정
  const { postRequest: updateRequest } = useSendPost('http://localhost:8080/api/category/update', {}, 'json');
  const onUpdate = async () => {
    try {
      await updateRequest(editedCategory);
      alert('카테고리 수정 되었습니다.');
      setIsEditing(false);  // 수정 모드 해제
      refetch();
    } catch (error) {
      console.error('카테고리 수정 실패:', error);
      alert('카테고리 수정 실패했습니다.');
    }
  }

  //삭제
  const { postRequest: postRequestDel } = useSendPost(
    'http://localhost:8080/api/category/delete',
    null, 
    'text', 
    false 
  );
  const onDelete = async () => {
    await postRequestDel({ groupcategory_id: data.groupcategory_id });
    alert('정상적으로 카테고리가 삭제 되었습니다.');
    refetch();
  };

  return (
    <tr className="groupItems">
      <td style={{ width: '150px' }}>{no}</td>
      <td style={{ width: '150px' }}>
        {isEditing ? (
          <input type="text" name="code" value={editedCategory.code} onChange={onChange} />
        ) : (
          data.code
        )}
      </td>
      <td style={{ width: '250px' }}>
        {isEditing ? (
          <input type="text"  name="category_name" value={editedCategory.category_name} onChange={onChange} />
        ) : (
          data.category_name
        )}
      </td>
      <td style={{ width: '70px' }}>
        {isEditing ? (
          <>
          <Button text="저장" onClick={onUpdate} />
          <Button text="취소" onClick={()=>{setIsEditing(false)}} />
          </>
        ) : (
          <>
          <Button text={<FontAwesomeIcon icon={faPencil} />} onClick={() => setIsEditing(true)} />
          <Button text={<FontAwesomeIcon icon={faX} />} onClick={onDelete} />
          </>
        )}
      </td>
    </tr>
  );
};

export default CategoryItem;
