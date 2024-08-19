import React, { useState,useEffect } from 'react';
import './MessageForm.css';
import useLoading from '../util/useLoading';
import useSendPost from '../util/useSendPost';

const MessageForm = ({ isOpen, onClose }) => {
  //사용자 정보
  const { data: userData, loading: loadingUser, error: errorUser, refetch: refetchUserData } = useLoading('http://localhost:8080/api/user/userInfo', 'json');
  //친구목록
  const { data: friendData, loading: loadingFriend, error: errorFriend, refetch: refetchFriendData } = useLoading('http://localhost:8080/api/user/friend/list', 'json');
  const initMessage ={
    message_id : 0,
    sender_id:'',
    sender_nickname:'',
    receiver_id:'',
    receiver_nickname:'',
    content:'',
    is_read: 0,
    sent_at:'',
  };

  const [message, setMessage] = useState(initMessage);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    if (userData) {
      setMessage(prev => ({
        ...prev,
        sender_id: userData.user_id,
        sender_nickname: userData.user_nickname
      }));
    }
  }, [userData]);

 //쪽지 보내기
const { postRequest: sendRequest } = useSendPost('http://localhost:8080/api/msg/insert', {}, 'json');

const handleSubmit =async ()=>{
  try {
    await sendRequest(message);
    console.log(`쪽지 전송: ${message.receiver_nickname}, 내용: ${message.content}`);
    alert('쪽지 전송되었습니다.');
    setMessage({
      ...initMessage,
      sender_id: userData.user_id,
      sender_nickname: userData.user_nickname,
    });
    onClose(); // 폼 닫기
  } catch (error) {
    console.error('쪽지 전송 실패:', error);
    alert('쪽지 전송에 실패했습니다.');
  }
};

const handleFriendSelect = (friend) => {
  setMessage(prev => ({
    ...prev,
    receiver_id: friend.friend_id,
    receiver_nickname: friend.friend_nickname,
  }));
  setIsDropdownOpen(false); // 선택 후 드롭다운 닫기
};

  if(loadingFriend || loadingUser){
    return(<div>loading...</div>);
  };
  if (errorUser || errorFriend) {
    return <div>데이터를 불러오는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.</div>;
  };
  return (
    <div className={`messageForm ${isOpen ? 'open' : ''}`}>
      <div className="messageFormHeader">
        <span>쪽지 보내기</span>
        <button onClick={onClose}>닫기</button>
      </div>
      <div className="messageFormBody">
        <label>받는 사람:</label>
        <div className="customSelectContainer">
            <div 
              className="customSelectHeader" 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              {message.receiver_nickname || "친구를 선택하세요"}
            </div>
            <div className={`customSelectList ${isDropdownOpen ? '' : 'hidden'}`}>
              {friendData && friendData.map(friend => (
                <div 
                  key={friend.friend_id} 
                  className="customSelectListItem"
                  onClick={() => handleFriendSelect(friend)}
                >
                  {friend.friend_nickname}
                </div>
              ))}
            </div>
          </div>
        <label>메시지:</label>
          <textarea value={message.content}  onChange={(e) => setMessage(prev => ({ ...prev, content: e.target.value }))}/>
        <button type="button" onClick={handleSubmit}>보내기</button>
      </div>
    </div>
  );
};

export default MessageForm;
