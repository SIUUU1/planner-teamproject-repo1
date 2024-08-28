import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX,faPencil } from "@fortawesome/free-solid-svg-icons";
import Button from "../components/Button";
import useSendPost from "../util/useSendPost";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const GroupOneItem=({data , refetch, no })=>{
  
  //지원 수락
  const {postRequest: updateRequest, error:updateError} = useSendPost(
    'http://localhost:8080/api/group/groupone/accept',
    {},
    'json'
  );

  const onAccept =async()=>{
    try {
      await updateRequest({ user_id: data.user_id, group_id: data.group_id });
      alert(`${groupone.user_nickname} 지원 수락하셨습니다.`);
    } catch (error) {
      console.error("Error accept:", error);
    }
    refetch();
  };

  //지원 거절 및 그룹 탈퇴시키기
  const deleteRequest = useSendPost(
    'http://localhost:8080/api/group/groupone/delete',
    {},
    'json'
  );
  const { postRequest: postRequestDel, loading: loadingDel, error: errorDel } = deleteRequest;

  const onRefuse = async () => {
    try {
      await postRequestDel({ user_id: data.user_id,  group_id: data.group_id });
      alert(`${groupone.user_nickname} 지원 거절하셨습니다.`);
    } catch (error) {
      console.error("Error refuse:", error);
    }
    refetch();
  };

  const onDelete = async () => {
    try {
      await postRequestDel({ user_id: data.user_id, group_id: data.group_id });
      alert(`${groupone.user_nickname} 탈퇴시켰습니다.`);
    } catch (error) {
      console.error("Error delete:", error);
    }
    refetch();
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 월은 0부터 시작하므로 1을 더함
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return(
    <tr className="groupItems">
      <td style={{ width: '70px' }}>{no}</td>
      <td style={{ width: '250px' }}>{data.user_nickname}</td>
      <td style={{ width: '250px' }}>{formatDate(data.reg_date)}</td>
      <td style={{ width: '100px' }}>
      {no > 1 && (
                  data.enable === '1' ? (
                    <Button text={'탈퇴'} onClick={onDelete}/>
                  ) : (
                    <>
                      <Button text={'수락'} onClick={onAccept}/>
                      <Button text={'거절'} onClick={onRefuse}/>
                    </>
                  ))}
      </td>
    </tr>
  );
};
export default GroupOneItem;