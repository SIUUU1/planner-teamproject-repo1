import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import OpenChat from './OpenChat';
import useLoading from '../util/useLoading';
import useSendPost from '../util/useSendPost';
import './OpenChatRoom.css';

const MyOpenChatRoom = () => {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const { data: userData, loading: loadingUser, error: errorLoadingUser } = useLoading('http://localhost:8080/api/user/userInfo', 'json');
  const { data: rooms, loading, error, postRequest } = useSendPost('http://localhost:8080/api/chat/Myrooms', {}, 'json');


  useEffect(() => {
    if (userData) {
      postRequest({ user_id: userData.user_id }); 
    }
  }, [userData, postRequest]);

  // 사용자 정보 

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (selectedRoom) {
    return <OpenChat room={selectedRoom} />;
  }

  return (
    <div className='openChatRoom'>
      <h1>내 채팅 목록</h1>
      <div className="roomList">
        {rooms&&rooms.map(room => (
          <div
            key={room.room_id}
            onClick={() => setSelectedRoom(room)}
            className="roomItem">
            <h2 className='roomName'>{room.room_name}</h2>
            <p>{room.room_info}</p>
            {/* <p>Room ID: {room.room_id}</p>
            <p>Created by: {room.creater}</p>
            <p>Registered on: {new Date(room.reg_date).toLocaleDateString()}</p> */}
          </div>
        ))}
        {!rooms&&
          <div>
            <p>참여한 채팅이 없습니다.</p>
          </div>
        }
      </div>
    </div>
  );
}

export default MyOpenChatRoom;
