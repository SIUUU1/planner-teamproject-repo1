import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/Button";
import useSendPost from "../../util/useSendPost";
import OpenChat from '../../openChat/OpenChat';
import React, { useState } from 'react';

const ChatItem=({data , refetch, no })=>{
  //삭제
  const { data: delData, loading:loadingDel, error:errorDel, postRequest:postRequestDel } = useSendPost(
    'http://localhost:8080/api/chat/delete-room',
    null, 
    'text', 
    false 
  );
  const handlDeleteRoom = async () => {
    // JSON 형식으로 데이터를 전송
    await postRequestDel({ room_id: data.room_id });
    alert('정상적으로 채팅방이 삭제 되었습니다.');
    refetch();
  };

  const [selectedRoom, setSelectedRoom] = useState(null);
  
  if (selectedRoom) {
    // return <OpenChat room={selectedRoom} />;
  }
  return(
    <tr className="groupItems">
      <td style={{ width: '70px' }}>{no}</td>
      <td style={{ width: '70px' }}>{data.room_name}</td>
      <td style={{ width: '250px' }}>{data.creater}</td>
      <td style={{ width: '150px' }}>{data.room_info}</td>
      <td style={{ width: '220px' }} onClick={()=>setSelectedRoom(data)}>{'링크'}</td>
      <td style={{ width: '40px' }}><Button text={<FontAwesomeIcon icon={faX} id='del' />} onClick={handlDeleteRoom}/></td>
    </tr>
  );
};
export default ChatItem;