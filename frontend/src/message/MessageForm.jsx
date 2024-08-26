import React, { useState, useEffect } from 'react';
import './MessageForm.css';
import useLoading from '../util/useLoading';
import useSendPost from '../util/useSendPost';
import useMove from '../util/useMove';

const MessageForm = ({ isOpen, onClose, receiver_id }) => {
  // 사용자 정보
  const { data: userData, loading: loadingUser, error: errorUser } = useLoading('http://localhost:8080/api/user/userInfo', 'json');
  
  // 친구 목록
  const { data: friendData, loading: loadingFriend, error: errorFriend } = useLoading('http://localhost:8080/api/user/friend/list', 'json');
  
  // 회원 전체 목록
  const { data: userListData, loading: loadingUserList, error: errorUserList } = useLoading('http://localhost:8080/api/user/list', 'json');

  const initMessage = {
    message_id: 0,
    sender_id: '',
    sender_nickname: '',
    receiver_id: '',
    receiver_nickname: '',
    content: '',
    is_read: 0,
    sent_at: '',
  };

  const [message, setMessage] = useState(initMessage);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    if (userData) {
      setMessage(prev => ({
        ...prev,
        sender_id: userData.user_id,
        sender_nickname: userData.user_nickname,
      }));
    }

    if (receiver_id && userListData) {
      const selectedUser = userListData.find(user => user.user_id === receiver_id);
      if (selectedUser) {
        setMessage(prev => ({
          ...prev,
          receiver_id: selectedUser.user_id,
          receiver_nickname: selectedUser.user_nickname,
        }));
      }
    }
  }, [userData, receiver_id, userListData]);

  const { postRequest: sendRequest } = useSendPost('http://localhost:8080/api/msg/insert', {}, 'json');

  const handleSubmit = async () => {
    if (!message.content || !message.receiver_id) {
      alert('메시지 내용과 받는 사람을 입력하세요.');
      return;
    }
    try {
      await sendRequest(message);
      alert('쪽지 전송되었습니다.');
      setMessage({
        ...initMessage,
        sender_id: userData.user_id,
        sender_nickname: userData.user_nickname,
      });
      onClose();
      location.reload();
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
    setIsDropdownOpen(false);
  };

  const moveToMsgList = useMove('/msglist');

  if (loadingFriend || loadingUser || loadingUserList) {
    return (<div>loading...</div>);
  }
  if (errorUser || errorFriend || errorUserList) {
    return <div>데이터를 불러오는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.</div>;
  }
  
  return (
    <div className={`messageForm ${isOpen ? 'open' : ''}`}>
      <div className="messageFormHeader">
        <span>쪽지 보내기</span>
        <button onClick={onClose}>닫기</button>
      </div>
      <div className="messageFormBody">
        <label>받는 사람:</label>
        <div className="customSelectContainer">
          <div className="customSelectHeader" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            {message.receiver_nickname || "친구를 선택하세요"}
          </div>
          <div className={`customSelectList ${isDropdownOpen ? '' : 'hidden'}`}>
            {message.receiver_id ? (
              <div className={`customSelectListItem selected`} >{message.receiver_nickname}</div>
            ) : (
              <>
                {friendData && friendData.length > 0 ? (
                  friendData.map(friend => (
                    <div 
                      key={friend.friend_id} 
                      className={`customSelectListItem ${friend.friend_id === message.receiver_id ? 'selected' : ''}`} 
                      onClick={() => handleFriendSelect(friend)}
                    >
                      {friend.friend_nickname}
                    </div>
                  ))
                ) : (
                  <div className="noFriendsMessage">&nbsp;친구를 추가하세요</div>
                )}
              </>
            )}
          </div>
        </div>
        <label>메시지:</label>
        <textarea value={message.content} onChange={(e) => setMessage(prev => ({ ...prev, content: e.target.value }))} />
        <button type="button" onClick={handleSubmit}>보내기</button>
        <button type="button" onClick={() => { moveToMsgList(); onClose(); }}>쪽지함</button>
      </div>
    </div>
  );
};

export default MessageForm;
