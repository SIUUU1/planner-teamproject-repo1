import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX,faPencil } from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/Button";
import useSendPost from "../../util/useSendPost";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NoticeItem=({data , refetch, no })=>{
  //삭제
  const { data: delData, loading:loadingDel, error:errorDel, postRequest:postRequestDel } = useSendPost(
    'http://localhost:8080/api/notice/delete',
    null, 
    'text', 
    false 
  );
  const handlDelete = async () => {
    // JSON 형식으로 데이터를 전송
    await postRequestDel({ no: data.no });
    alert('정상적으로 공지사항이 삭제 되었습니다.');
    refetch();
  };

   //수정
   const nav = useNavigate();

  return(
    <tr className="groupItems">
      <td style={{ width: '70px' }}>{no}</td>
      <td style={{ width: '70px' }}>{data.category}</td>
      <td style={{ width: '250px' }}>{data.subject}</td>
      <td style={{ width: '150px' }}>{data.user_id}</td>
      <td style={{ width: '100px' }}>
        <Button text={<FontAwesomeIcon icon={faPencil} />} onClick={()=>{nav(`/manager/noticeedit/${data.no}`)}}/>
        <Button text={<FontAwesomeIcon icon={faX} />} onClick={handlDelete}/>
      </td>
    </tr>
  );
};
export default NoticeItem;