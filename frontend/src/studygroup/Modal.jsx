import useLoading from '../util/useLoading';
import useMove from '../util/useMove';
import useSendPost from '../util/useSendPost';
import React, { useState, useEffect, useRef} from 'react';

const Modal =({ group, onClose })=>{

  if (!group) return null; // 그룹이 선택되지 않으면 모달을 표시하지 않음
  // 사용자 정보
  const { data: userData, loading: loadingUser, error: errorUser } = useLoading('http://localhost:8080/api/user/userInfo', 'json');
  const moveToEdit = useMove(`/groupedit/${group.group_id}`);
  const moveToMain = useMove('/groupmain');

  // 그룹원 정보
  const { data: groupOneData, loading: loadingGroupOne, error: errorGroupOne } = useLoading(`http://localhost:8080/api/group/groupone/list/${group.group_id}`, 'json');
  let filteredGroupOne = [];
  useEffect(() => {
    if (groupOneData) {
      filteredGroupOne = groupOneData.filter(user => user.user_id === userData.user_id);
    } 
  }, [groupOneData]);

  //그룹원 관리
  const handleJoinGroup = () => {
    alert("그룹에 지원하셨습니다! 그룹 대표의 수락을 기다리세요");  // 여기서 그룹 가입 로직을 구현하거나 다른 처리를 가능
    onClose();  // 가입 후 모달을 닫을 수 있음.
  };

  //그룹 지원
  const {postRequest: insertRequest, error:updateError} = useSendPost(
    'http://localhost:8080/api/group/groupone/insert',
    {},
    'json'
  );
  const onJoinGroup=async()=>{
    const insertedData = {
      group_id: group.group_id,
      user_id: userData_user_id,
    };
    await insertRequest(insertedData);
    if (!updateError) {
      alert("그룹에 지원하셨습니다! 그룹 대표의 수락을 기다리세요");  // 여기서 그룹 가입 로직을 구현하거나 다른 처리를 가능
      onClose();
    }
  };
  
  //그룹 삭제
  const deleteRequest = useSendPost(
    'http://localhost:8080/api/group/delete',
    { group_id: group.group_id },
    'json'
  );
  const { postRequest: postRequestDel, loading: loadingDel, error: errorDel } = deleteRequest;

  const onDelete = async () => {
    try {
      await postRequestDel({ group_id: group.group_id });
    } catch (error) {
      console.error("Error delete:", error);
    }
    onClose();
    moveToMain();
  };

  const formatModalContent = (content) => {
    return content
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .map((line, index) => line === '---' ? <hr key={index} /> : <p key={index}>{line}</p>);
  };

  if(loadingUser||loadingGroupOne){
    return <div>loading...</div>;
  }
  return(
    <>
    <div className="modalOverlay">
      <div className="modalContent">
        <button className="closeButton" onClick={onClose}>X</button>
        <h1>{group.group_name}</h1>
        <hr />
        <div>{group.group_notice ? formatModalContent(group.group_notice) : '기본 모달 내용'}</div> {/* Display custom content */}
       
        {group.leader_id===userData.user_id?(
          <>
          <button className="joinButton" onClick={handleJoinGroup}>그룹원 관리</button>
          <button className="joinButton" onClick={()=>{moveToEdit()}}>수정</button>
          <button className="joinButton" onClick={onDelete}>삭제</button>
          </>
        ):(
          filteredGroupOne.enable==='1'?(
            <button className="joinButton" >그룹 메인</button>
          ):(
            <button className="joinButton" onClick={onJoinGroup}>그룹 가입</button>
          ))}
      </div>
    </div>
    </>
  );
};
export default Modal;