import React, { useState, useEffect } from 'react';
import './MessageList.css';
import useLoading from '../util/useLoading';
import useSendPost from '../util/useSendPost';
import Pagination from '../components/Pagination';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faEnvelopeOpen } from "@fortawesome/free-regular-svg-icons";
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

const MessageList =()=>{
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [searchList, setSearchList] = useState([]);
  const [searching, setSearching] = useState(false); // 검색 중 여부를 나타내는 상태
  const [searchTerm, setSearchTerm] = useState(''); // 실제 검색어를 저장하는 상태
  const [sortOrder, setSortOrder] = useState('latest');
  const nav = useNavigate();

  // 사용자 정보
  const { data: userData, loading: loadingUser, error: errorUser, refetch: refetchUserData } = useLoading('http://localhost:8080/api/user/userInfo', 'json');
  
  // 메세지 리스트
  const { data: msgListData, loading: loadingMsgList, error: errorMsgList, refetch: refetchMsgList } = useLoading('http://localhost:8080/api/user/msg/list', 'json');
  const [msgs, setMsgs] = useState([]);
   
  //검색
   const searchRequest = useSendPost('http://localhost:8080/api/msg/search',{},'json');
   const { postRequest: postRequestSearch, loading: loadingSearch, error: errorSearch, data: SearchData } = searchRequest;
 
   const onSearch = async() => {
     try {
       await postRequestSearch({ search: searchTerm });
     } catch (error) {
       console.error("Error fetching search:", error);
       setSearchList([]);
     }
   };
   
  // 카테고리 
  const [category, setCategory] = useState('all');

  useEffect(() => {
    let filteredMsgs = [];
    if(searching ){
      filteredMsgs = searchList;
    } else if (msgListData){
      filteredMsgs = msgListData;
    }

    // 카테고리 필터링
    if (category === 'reMsg') {
      filteredMsgs = filteredMsgs.filter(msg => msg.receiver_id === userData.user_id);
    } else if (category === 'seMsg') {
      filteredMsgs = filteredMsgs.filter(msg => msg.sender_id === userData.user_id);
    }

    // 정렬
    if (sortOrder === 'latest') {
      filteredMsgs = filteredMsgs.sort((a, b) => new Date(b.sent_at) - new Date(a.sent_at));
    } else if (sortOrder === 'regOrder') {
      filteredMsgs = filteredMsgs.sort((a, b) => new Date(a.sent_at) - new Date(b.sent_at));
    }

    setMsgs(filteredMsgs);
    setTotalPages(Math.ceil(filteredMsgs.length / itemsPerPage));
  }, [msgListData, itemsPerPage, sortOrder, searching, searchList, userData, category]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (SearchData) {
      setSearchList(SearchData);
      setSearching(true);
      setCurrentPage(1);
    }
  }, [SearchData]);


  // 비우기
  const delAllRequest = useSendPost('http://localhost:8080/api/msg/deleteAll','json');
  const onDelAll = async()=>{
    try {
      await delAllRequest.postRequest();
      alert(`쪽지 비우기 성공`);
    } catch (error) {
      console.error("Error delete:", error);
    }
    refetchMsgList();
  };

  // 읽음 표시
  const upReadRequest = useSendPost('http://localhost:8080/api/msg/updateRead','json');
  const onUpRead = async(msg)=>{
    // 받는이만 읽음 표시 한다.
    if(userData.user_id !== msg.receiver_id){
      return;
    }
    if(msg.is_read!==0){
      return;
    }
    try {
      await upReadRequest.postRequest({ref : msg.ref});
    } catch (error) {
      console.error("Error updateRead:", error);
    }
    refetchMsgList();
  };

  const indexOfLastMsg = currentPage * itemsPerPage;
  const indexOfFirstMsg = indexOfLastMsg - itemsPerPage;
  const currentMsgs = msgs.slice(indexOfFirstMsg, indexOfLastMsg);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  
  // 글자수 대로 자르기
  const truncateContent = (content) => {
    if (content.length > 20) {
      const truncatedText = `${content.substring(0, 20)}...`;
      return truncatedText;
    }
    return content; // 텍스트가 20자 이하라면 그대로 반환
  };

  if(loadingUser||loadingMsgList){
    return(<div>loading...</div>);
  }
  return(
    <div className='messageList backWhite'>
      <h3>쪽지함</h3>
      <div className="msgHeader">
        <div className="searchBar">
        <select onChange={(e)=>{setSortOrder(e.target.value)}} value={sortOrder}>
          <option value="latest">최신순</option>
          <option value="regOrder">등록순</option>
        </select>
        <select value={category} onChange={(e)=>{setCategory(e.target.value);}}>
          <option value="all">전체쪽지</option>
          <option value="reMsg">받은쪽지</option>
          <option value="seMsg">보낸쪽지</option>
        </select>
        <input type="text" placeholder="검색어를 입력해주세요." value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value); }} />
        <button onClick={onSearch}>검색</button>
        </div>
        <div>
        <button onClick={onDelAll}>비우기</button>
        </div>
      </div>
      
      <table>
                <thead>
                    <tr>
                        <th style={{ width: '80px' }}>보낸이</th>
                        <th style={{ width: '80px' }}>받는이</th>
                        <th style={{ width: '300px' }}>내용</th>
                        <th style={{ width: '120px' }}>날짜</th>
                        <th style={{ width: '50px' }}>읽음 상태</th>
                    </tr>
                </thead>
                <tbody>
                    {currentMsgs.map((msg) => (
                        <tr key={msg.message_id} onClick={()=>{onUpRead(msg); nav(`/msgitem/${msg.message_id}`);}} >
                            <td>{msg.sender_nickname}</td>
                            <td>{msg.receiver_nickname}</td>
                            <td>{truncateContent(msg.content)}</td>
                            <td>{formatDate(msg.sent_at)}</td>
                            <td>{msg.is_read!==0 ? <FontAwesomeIcon icon={faEnvelopeOpen}/> : <FontAwesomeIcon icon={faEnvelope}/>}</td>
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