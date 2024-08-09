import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import OpenChat from './OpenChat';
import useLoading from '../util/useLoading';
import './OpenChatRoom.css';

const OpenChatRoom = () => {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const { data: rooms, loading, error, refetch } = useLoading('http://localhost:8080/api/chat/rooms', 'json');

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
      <h1>채팅 목록</h1>
      <div className="roomList">
        {rooms.map(room => (
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
      </div>
    </div>
  );
}

export default OpenChatRoom;
