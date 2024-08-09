import React, { useState } from 'react';
import useSendPost from '../util/useSendPost';

const CreateRoom = () => {
  const [roomName, setRoomName] = useState('');
  const [roomInfo, setRoomInfo] = useState('');
  const { data: roomUrl, loading, error, postRequest } = useSendPost(
    'http://localhost:8080/api/chat/create-room',
    null, // initialForm은 사용하지 않으므로 null로 설정
    'text', // 서버에서 반환하는 응답이 텍스트라고 가정
    false // FormData를 사용하지 않으므로 false
  );

  const handleCreateRoom = async () => {
    // JSON 형식으로 데이터를 전송
    await postRequest({ room_name: roomName,  room_info:roomInfo });
    setRoomInfo('');
    setRoomName('');
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>채팅방 생성</h1>
      <input 
        type="text" 
        onChange={(e) => setRoomName(e.target.value)} 
        placeholder="Room Name" 
      />
      <input 
        type="text" 
        onChange={(e) => setRoomInfo(e.target.value)} 
        placeholder="Room Info" 
      />
      <button onClick={handleCreateRoom}>Create Room</button>
      {roomUrl && <p>정상적으로 방이 생성되었습니다!</p>}
      {roomUrl && <p>Room URL: {roomUrl}</p>}
    </div>
  );
};

export default CreateRoom;
