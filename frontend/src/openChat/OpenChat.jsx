import React, { useEffect, useState } from 'react';
import useSendPost from '../util/useSendPost';
import useLoading from '../util/useLoading'; // useLoading 훅을 가져옵니다.
import './OpenChat.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCaretLeft } from "@fortawesome/free-regular-svg-icons";
import Button from '../components/Button';
import OpenChatRoom from './OpenChatRoom';

const OpenChat = ({ room }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [socket, setSocket] = useState(null);
  const [toChatRoom, setToChatRoom] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  // 방에 처음 들어왔을 때 사용자 정보를 가져옵니다.
  const { data: userData, loading: loadingUser, error: errorLoadingUser } = useLoading('http://localhost:8080/api/user/userInfo', 'json');

  // 방의 메시지를 가져옵니다.
  const { data: messageData, loading: loadingMessages, error: errorLoadingMessages } = useLoading(`http://localhost:8080/api/chat/room/${room.room_id}/messages`, 'json');

  // 메시지를 서버에 저장하는 로직 추가
  const { loading, error, postRequest } = useSendPost('http://localhost:8080/api/chat/message', {}, 'text');

  // 방에 사용자 추가하는 로직 추가
  const { loading: loadingAddMember, error: errorAddMember, postRequest: addMemberRequest } = useSendPost('http://localhost:8080/api/chat/room/joinMembers', {}, 'text');

  useEffect(() => {
    if (userData && !loadingUser && !errorLoadingUser) {
      setUserInfo(userData);

      // 방에 사용자 추가
      addMemberRequest({
        room_id: room.room_id,
        user_id: userData.user_id
      });
    }
  }, [userData, loadingUser, errorLoadingUser, addMemberRequest, room.room_id]);

  useEffect(() => {
    if (userData && !loadingUser && !errorLoadingUser) {
      setUserInfo(userData);
    }
  }, [userData, loadingUser, errorLoadingUser]);

  useEffect(() => {
    if (messageData && !loadingMessages && !errorLoadingMessages) {
      messageData.forEach((msg) => {
        setMessages((prevMessages) => [...prevMessages, msg]);
      });
    }
  }, [messageData, loadingMessages, errorLoadingMessages]);

  useEffect(() => {
    const newSocket = new WebSocket(`${room.room_url}`);

    newSocket.onopen = () => {
      console.log('room_url:', room.room_url);
      setSocket(newSocket);
    };

    newSocket.onmessage = (event) => {
      const newMessage = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    newSocket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    newSocket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      if (newSocket.readyState === WebSocket.OPEN) {
        newSocket.close();
      }
    };
  }, [room.room_url]);

  const sendMessage = async () => {
    if (message.trim() && socket && socket.readyState === WebSocket.OPEN && userInfo) {
      const newMessage = {
        room_id: `${room.room_id}`,
        user_id: userInfo.user_id,
        user_nickname: userInfo.user_nickname,
        message_text: message,
      };

      await postRequest(newMessage);

      if (!error) {
        socket.send(JSON.stringify(newMessage)); // WebSocket을 통해 닉네임과 메시지를 전송합니다.
        setMessage('');
      }
    }
  };

  if (toChatRoom) {
    return <OpenChatRoom />;
  }

  return (
    <div className="chatContainer">
      <div className='chatHeader'>
        <Button text={<FontAwesomeIcon icon={faSquareCaretLeft} />} onClick={() => { setToChatRoom(true) }} />
        <h1>{room.room_name}</h1>
      </div>
      <div className="chatWindow">
        {messages.map((msg, index) => (
          <div key={index} className="chatMessage">
            <strong>{msg.user_nickname}: </strong>{msg.message_text}
          </div>
        ))}
      </div>
      <div className='chatSub'>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' ? sendMessage() : null}
          disabled={loading || loadingMessages || loadingUser} // 로딩 중에는 입력 비활성화
        />
        <button className='subButton' onClick={sendMessage} disabled={loading || loadingMessages || loadingUser}>
          {loading ? 'Sending...' : 'Send'}
        </button>
      </div>

      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {errorLoadingMessages && <p style={{ color: 'red' }}>Error Loading Messages: {errorLoadingMessages}</p>}
      {errorLoadingUser && <p style={{ color: 'red' }}>Error Loading User Info: {errorLoadingUser}</p>}
    </div>
  );
}

export default OpenChat;
