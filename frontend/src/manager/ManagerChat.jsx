import ManagerMenuInfo from "./ManagerMenuInfo";
import './ManagerHome.css';
import useLoading from "../util/useLoading";
import ChatItem from "./items/ChatItem";
import React, { useState, useEffect } from 'react';
import Pagination from '../components/Pagination';

const ManagerChat=()=>{
  const [chats, setChats] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); // 초기값 5
  const [totalPages, setTotalPages] = useState(0);
  const [selectedNotice, setSelectedNotice] = useState(null);

  const { data, loading, error, refetch } = useLoading('http://localhost:8080/api/chat/rooms', 'json');
  
  useEffect(() => {
    if (data) {
      setChats(data);
      setTotalPages(Math.ceil(data.length / itemsPerPage));
    }
  }, [data, itemsPerPage]);

  // 페이지 이동
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const indexOfLastChat = currentPage * itemsPerPage;
  const indexOfFirstChat = indexOfLastChat - itemsPerPage;
  const currentChats = chats.slice(indexOfFirstChat, indexOfLastChat);
  
  if(loading){
    return(<div>loading...</div>)
  }
  return(
    <div className="managerChat">
      <div className="managerContent backWhite">
        <ManagerMenuInfo/>
        
        <table className="UserTable" style={{ tableLayout: 'fixed', width: '100%' }}>
          <thead>
            <tr>
              <th style={{ width: '70px' }}>번호</th>
              <th style={{ width: '70px' }}>채팅방 이름</th>
              <th style={{ width: '250px' }}>채팅방 생성자 ID</th>
              <th style={{ width: '150px' }}>채팅방 설명</th>
              <th style={{ width: '40px' }}>삭제</th>
            </tr>
          </thead>
          <tbody>
          {currentChats && currentChats.map((i, index) => (
              <ChatItem key={i.group_id} data={i} refetch={refetch} no={indexOfFirstChat + index + 1}/>
            ))}
          </tbody>
        </table>
        <div className='pagination'>
        <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
        </div>
      </div>
    </div>
  )
}
export default ManagerChat;