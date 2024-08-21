import React, { useState, useEffect } from 'react';
import './MessageList.css';
import useLoading from '../util/useLoading';
import useSendPost from '../util/useSendPost';
import Pagination from '../components/Pagination';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

const MessageList =()=>{
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [searchList, setSearchList] = useState([]);
  const [searching, setSearching] = useState(false); // 검색 중 여부를 나타내는 상태
  const [searchTerm, setSearchTerm] = useState(''); // 실제 검색어를 저장하는 상태
  const [sortOrder, setSortOrder] = useState('latest');
  // 사용자 정보
  const { data: userData, loading: loadingUser, error: errorUser, refetch: refetchUserData } = useLoading('http://localhost:8080/api/user/userInfo', 'json');
  // 메세지 리스트
  const { data: msgListData, loading: loadingMsgList, error: errorMsgList, refetch: refetchMsgList } = useLoading('http://localhost:8080/api/user/msg/list', 'json');
  let sortedMsgList = [];
  
  useEffect(() => {
    if(msgListData ){

    }

    setTotalPages(Math.ceil(sortedMsgList.length / itemsPerPage));
  }, [msgListData, itemsPerPage, sortOrder, searching, searchList,userData]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSortOrderChange =(e)=>{
    setSortOrder(e.target.value);
  };

  //검색
  const onSearch = () => {

  };

  const indexOfLastMsg = currentPage * itemsPerPage;
  const indexOfFirstMsg = indexOfLastMsg - itemsPerPage;
  const currentMsgs = sortedMsgList.slice(indexOfFirstMsg, indexOfLastMsg);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  if(loadingUser||loadingMsgList){
    return(<div>loading...</div>);
  }
  return(
    <div className='messageList backWhite'>
      <h3>쪽지함</h3>
      <div className="msgHeader">
        <div className="searchBar">
        <select onChange={handleSortOrderChange} value={sortOrder}>
          <option value="all">전체쪽지</option>
          <option value="reMsg">받은쪽지</option>
          <option value="seMsg">보낸쪽지</option>
        </select>
        <input type="text" placeholder="검색어를 입력해주세요" value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value); }} />
        <button onClick={onSearch}>검색</button>
        </div>
        <button>쪽지 보내기</button>
        <button>비우기</button>
      </div>
      
      <table>
                <thead>
                    <tr>
                        <th>보낸사람</th>
                        <th>내용</th>
                        <th>날짜</th>
                        <th>읽음 상태</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {currentMsgs.map((msg) => (
                        <tr key={msg.message_id}>
                            <td>{msg.sender_nickname}</td>
                            <td>{msg.content}</td>
                            <td>{formatDate(msg.sent_at)}</td>
                            <td>{msg.is_read!==0 ? '🟢읽음' : '🔴읽지 않음'}</td>
                            <td><FontAwesomeIcon icon={faX}/></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination">
            <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
            </div>
    </div>
  );
};
export default MessageList;