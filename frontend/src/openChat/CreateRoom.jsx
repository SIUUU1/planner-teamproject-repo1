import React, { useState } from 'react';
import useSendPost from '../util/useSendPost';
import './CreateRoom.css';
const CreateRoom = () => {
  const [roomName, setRoomName] = useState('');
  const [roomInfo, setRoomInfo] = useState('');
  const { data: roomUrl, loading, error, postRequest } = useSendPost(
    'http://localhost:8080/api/chat/create-room',
    null, 
    'text', 
    false 
  );

  const handleCreateRoom = async () => {
    // JSON 형식으로 데이터를 전송
    await postRequest({ room_name: roomName,  room_info:roomInfo });
    setRoomInfo('');
    setRoomName('');
    alert('정상적으로 방이 생성되었습니다!');
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className='createRoom'>
      <h1>채팅방 생성</h1>
      <div>
        <input 
          type="text" 
          onChange={(e) => setRoomName(e.target.value)} 
          placeholder="채팅방 이름" 
        />
        <input 
          type="text" 
          onChange={(e) => setRoomInfo(e.target.value)} 
          placeholder="채팅방 설명" 
        />
      </div>
      <button onClick={handleCreateRoom}>생성</button>
    </div>
  );
};

export default CreateRoom;
