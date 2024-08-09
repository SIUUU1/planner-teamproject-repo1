import React, { useState,useEffect } from 'react';
import SettingChatRoomItem from './SettingChatRoomItem';
import useLoading from '../util/useLoading';
import useSendPost from '../util/useSendPost';
import './OpenChatRoom.css';

const SettingChatRoom = () => {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const { data: userData, loading: loadingUser, error: errorLoadingUser } = useLoading('http://localhost:8080/api/user/userInfo', 'json');
  const { data: rooms, loading, error, postRequest } = useSendPost('http://localhost:8080/api/chat/settingMyRoom', {}, 'json');


  useEffect(() => {
    if (userData) {
      postRequest({ user_id: userData.user_id }); 
    }
  }, [userData, postRequest]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (selectedRoom) {
    return <SettingChatRoomItem room={selectedRoom} />;
  }

  return (
    <div className='openChatRoom'>
      <h1>채팅방 설정</h1>
      <div className="roomList">
        {rooms&&rooms.map(room => (
          <div
            key={room.room_id}
            onClick={() => setSelectedRoom(room)}
            className="roomItem">
            <h2 className='roomName'>{room.room_name}</h2>
            <p>{room.room_info}</p>
            <p>생성일: {new Date(room.reg_date).toLocaleDateString()}</p>
          </div>
        ))}
        {!rooms&&
          <div>
            <p>생성한 채팅이 없습니다.</p>
          </div>
        }
      </div>
    </div>
  );
}

export default SettingChatRoom;
