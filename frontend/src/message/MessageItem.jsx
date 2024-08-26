import './MessageItem.css'
import React, { useRef, useState, useEffect } from 'react';
import useMove from '../util/useMove';
import useLoading from '../util/useLoading';
import { useParams } from 'react-router-dom';
import Button from '../components/Button';
import MessageForm from '../message/MessageForm';
import useSendPost from '../util/useSendPost';

const MessageItem =()=>{
  const {no} = useParams();
  const { data: msgData, loading: loadingMsg, error: errorMsg, refetch: refetchMsg } = useLoading(`http://localhost:8080/api/msg/read/${no}`, 'json');
  const moveToMsgList = useMove('/msglist');
  
  // 메세지 작성 폼
  const [showMessageForm, setShowMessageForm] = useState(false);

  // 답장
  const onReply=()=>{
    setShowMessageForm(!showMessageForm);
  };

  // 삭제
  const deleteRequest = useSendPost('http://localhost:8080/api/msg/delete',{},'json');
  const onDelete = async()=>{
    try {
      await deleteRequest.postRequest({ message_id: no });
      alert(`쪽지 삭제 성공`);
    } catch (error) {
      console.error("Error delete:", error);
    }
    moveToMsgList();
  };


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  if(loadingMsg){
      return<div>loading...</div>;
  }
  return(
    <div className='messageItem backWhite'>
        <p><strong>보낸사람:</strong> {msgData.sender_nickname}</p>
        <p><strong>받는사람:</strong> {msgData.receiver_nickname}</p>
        <p><strong>받은시간:</strong> {formatDate(msgData.sent_at)}</p>
        <p className='msgContent'>{msgData.content}</p>
      <div className='msgItemBtn'>
        <Button text={'목록'} onClick={()=>{moveToMsgList();}}/>
        <Button text={'답장'} onClick={onReply}/>
        <Button text={'삭제'} onClick={onDelete}/>
      </div>
      {showMessageForm && <MessageForm receiver_id={msgData.sender_id} isOpen={showMessageForm} onClose={()=>{setShowMessageForm(false)}}/>}
    </div>
  );
};
export default MessageItem;