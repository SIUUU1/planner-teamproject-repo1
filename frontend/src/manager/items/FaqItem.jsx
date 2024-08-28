import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX,faPencil } from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/Button";
import useSendPost from "../../util/useSendPost";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FaqItem=({data , refetch, no })=>{
  //삭제
  const { data: delData, loading:loadingDel, error:errorDel, postRequest:postRequestDel } = useSendPost(
    'http://localhost:8080/api/faq/delete',
    null, 
    'text', 
    false 
  );
  const handlDelete = async () => {
    // JSON 형식으로 데이터를 전송
    await postRequestDel({ faq_id: data.faq_id });
    alert('정상적으로 공지사항이 삭제 되었습니다.');
    refetch();
  };

  //수정
  const nav = useNavigate();

  // 글자수 자르기
  const truncateContent = (content) => {
    if (content.length > 40) {
      const truncatedText = `${content.substring(0, 40)}...`;
      return truncatedText;
    }
    return content; // 텍스트가 40자 이하라면 그대로 반환
  };

  return(
    <tr className="groupItems">
      <td style={{ width: '70px' }}>{no}</td>
      <td style={{ width: '70px' }}>{data.faq_category}</td>
      <td style={{ width: '150px' }}>{data.faq_title}</td>
      <td style={{ width: '250px' }}>{truncateContent(data.faq_content)}</td>
      <td style={{ width: '100px' }}>
        <Button text={<FontAwesomeIcon icon={faPencil} />} onClick={()=>{nav(`/manager/faqedit/${data.faq_id}`)}}/>
        <Button text={<FontAwesomeIcon icon={faX} />} onClick={handlDelete}/>
      </td>
    </tr>
  );
};
export default FaqItem;