import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX,faPencil } from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/Button";
import useSendPost from "../../util/useSendPost";
import React, { useState } from 'react';

const QnaItem=({data , refetch, no })=>{
  //삭제
  const { data: delData, loading:loadingDel, error:errorDel, postRequest:postRequestDel } = useSendPost(
    'http://localhost:8080/api/qna/delete',
    null, 
    'text', 
    false 
  );
  const handlDelete = async () => {
    if(!window.confirm('고객 문의입니다. 정말로 삭제하시겠습니까?')){
      return;
    }
    // JSON 형식으로 데이터를 전송
    await postRequestDel({ qna_id: data.qna_id });
    alert('정상적으로 공지사항이 삭제 되었습니다.');
    refetch();
  };

  //수정

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
      <td style={{ width: '70px' }}>{data.qna_subject}</td>
      <td style={{ width: '150px' }}>{truncateContent(data.qna_content)}</td>
      <td className={data.reply === 1 ? 'answered' : 'pending'} style={{ width: '250px' }}> {data.reply === 1 ? '답변 완료' : '답변 대기중'}</td>
      <td style={{ width: '100px' }}>
        <Button text={<FontAwesomeIcon icon={faPencil} />} onClick={handlDelete}/>
        <Button text={<FontAwesomeIcon icon={faX} />} onClick={handlDelete}/>
      </td>
    </tr>
  );
};
export default QnaItem;