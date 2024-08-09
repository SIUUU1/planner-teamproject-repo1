// src/pages/NoticeBoard.jsx
import React, { useState, useEffect } from 'react';
import './NoticeBoard.css';
import Pagination from '../components/Pagination';
import NoticeItem from './NoticeItem';
import useLoading from '../util/useLoading';

const NoticeBoard = ({userData=null}) => {
  const [notices, setNotices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // 초기값 5
  const [totalPages, setTotalPages] = useState(0);
  const [selectedNotice, setSelectedNotice] = useState(null);
  
  //const noticesPerPage = 10; //페이지당 

  const { data: noticeListData, loading: loadingNoticeList, error: errorNoticeList,refetch: refetchNoticeData } = useLoading('http://localhost:8080/api/notice/list', 'json');
  useEffect(() => {
    if(noticeListData){
      setNotices(noticeListData);
      setTotalPages(Math.ceil(noticeListData.length / itemsPerPage));
    }
}, [noticeListData]);

// 페이지 이동
const handlePageChange = (page) => {
  setCurrentPage(page);
};

// 페이지 당 게시글 수 선택
const handleItemsPerPageChange = (e) => {
  setItemsPerPage(Number(e.target.value));
  setCurrentPage(1);
};

// 상세페이지
const handleTitleClick = (notice) => {
  setSelectedNotice(notice);
};

//목록
const backToList = () => {
  setSelectedNotice(null);
};

//refetch
const onEvent = ()=>{
  refetchNoticeData();
};
  
const indexOfLastNotice = currentPage * itemsPerPage;
const indexOfFirstNotice = indexOfLastNotice - itemsPerPage;
const currentNotices = notices.slice(indexOfFirstNotice, indexOfLastNotice);

// comments 필터링
const filteredComments = notices.filter(
  (n) => n.ref === (selectedNotice ? selectedNotice.ref : 0) && n.step !== 0
);

  return (
    <div className="noticeBoard">
      <button>생성</button><br />
       <label>
        페이지 수
        <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </label>
         {selectedNotice ? (
         <NoticeItem 
         selectedNotice ={selectedNotice}
         comments={filteredComments}
         backToList={backToList}
         userData={userData}
         onEvent={onEvent}/>
        ) : (
        <>
            {currentNotices.map((notice) => (
              <div className="noticeBoardRow" key={notice.no}>
                <div className="noticeBoardCell">{notice.no}</div>
                <div className="noticeBoardCell">
                  <button className="noticeTitle" onClick={() => handleTitleClick(notice)}>
                    {notice.subject}
                  </button>
                </div>
                <div className="noticeBoardCell">{notice.reg_date}</div>
                <div className="noticeBoardCell">{notice.read_count}</div>
              </div>
            ))}
          <Pagination totalPages={totalPages} 
        currentPage={currentPage} 
        onPageChange={handlePageChange} />
        </>
      )}
    </div>
  );
};

export default NoticeBoard;
