import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCaretLeft } from "@fortawesome/free-regular-svg-icons";
import Button from '../components/Button';
import { useState } from "react";
import SettingChatRoom from "./SettingChatRoom";
import useSendPost from '../util/useSendPost';
const SettingChatRoomItem=({room})=>{
  const [toList,setToList]=useState(false);
  const [roomName, setRoomName] = useState(room.room_name);
  const [roomInfo, setRoomInfo] = useState(room.room_info);
  const { data: updateRoom, loading, error, postRequest } = useSendPost(
    'http://localhost:8080/api/chat/update-room',
    null, 
    'text', 
    false 
  );
  const { data: delData, loading:loadingDel, error:errorDel, postRequest:postRequestDel } = useSendPost(
    'http://localhost:8080/api/chat/delete-room',
    null, 
    'text', 
    false 
  );

  const handlUpdateRoom = async () => {
    // JSON 형식으로 데이터를 전송
    await postRequest({ room_name: roomName,  room_info:roomInfo, room_id:room.room_id});
    alert('정상적으로 채팅방이 수정 되었습니다.');
  };
  const handlDeleteRoom = async () => {
    // JSON 형식으로 데이터를 전송
    await postRequestDel({ room_id: room.room_id });
    alert('정상적으로 채팅방이 삭제 되었습니다.');
    setToList(true);
  };

  if (loading||loadingDel) return <p>Loading...</p>;
  if (error||errorDel) return <p>Error: {error}</p>;


  if (toList) {
    return <SettingChatRoom></SettingChatRoom>;
  }
  return(
    <div className="SettingChatRoomItem">
      <Button text={<FontAwesomeIcon icon={faSquareCaretLeft} />} onClick={() => { setToList(true) }} />
      <input 
        type="text" 
        onChange={(e) => setRoomName(e.target.value)} 
        value={roomName}
        placeholder="Room Name" 
      />
      <input 
        type="text" 
        onChange={(e) => setRoomInfo(e.target.value)} 
        value={roomInfo}
        placeholder="Room Info" 
      />
      <button onClick={handlUpdateRoom}>수정</button>
      <button onClick={handlDeleteRoom}>삭제</button>
    </div>
  )
}

export default SettingChatRoomItem;