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
  
  const { data: noticeListData, loading: loadingNoticeList, error: errorNoticeList,refetch: refetchNoticeData } = useLoading('http://localhost:8080/api/notice/list', 'json');
  
  useEffect(() => {
    if (noticeListData) {
      // step이 0인 항목만 필터링
      const filteredNotices = noticeListData.filter(notice => notice.step === 0);
      setNotices(filteredNotices);
      setTotalPages(Math.ceil(filteredNotices.length / itemsPerPage));
    }
  }, [noticeListData, itemsPerPage]);

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
  //클릭 시 조회수
  incrementReadCount(notice.no);
};

// 조회수 증가 함수
const incrementReadCount = async (no) => {
  try {
    await fetch(`http://localhost:8080/api/notice/readCount/${no}`, {
      method: 'GET',
    });
    refetchNoticeData(); // 조회수 증가 후 데이터를 다시 가져옴
  } catch (error) {
    console.error('Failed to increment read count', error);
  }
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
const filteredComments = noticeListData?.filter(
  (n) => n.ref === (selectedNotice ? selectedNotice.ref : 0) && n.step !== 0
) || [];

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

  return (
    <div className="noticeBoard">
      {/* <button>생성</button><br />
       <label>
        페이지 수
        <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </label> */}
         {selectedNotice ? (
         <NoticeItem 
         selectedNotice ={selectedNotice}
         comments={filteredComments}
         backToList={backToList}
         userData={userData}
         onEvent={onEvent}/>
        ) : (
        <>
        <div className="noticeBoardRow">
                <div className="noticeBoardCell">번호</div>
                <div className="noticeBoardCell">
                    제목
                </div>
                <div className="noticeBoardCell">작성자</div>
                <div className="noticeBoardCell">조회수</div>
                <div className="noticeBoardCell">작성일</div>
              </div>
            {currentNotices.map((notice, index) => (
              <>
              <div className="noticeBoardRow" key={notice.no}>
                <div className="noticeBoardCell">{indexOfFirstNotice + index + 1}</div>
                <div className="noticeBoardCell" onClick={() => handleTitleClick(notice)}>
                    {notice.subject}
                </div>
                <div className="noticeBoardCell">{notice.user_nickname}</div>
                <div className="noticeBoardCell">{notice.read_count}</div>
                <div className="noticeBoardCell">{formatDate(notice.reg_date)}</div>
              </div>
              </>
            ))}
          {!selectedNotice&&<Pagination totalPages={totalPages} 
        currentPage={currentPage} 
        onPageChange={handlePageChange} />}
        </>
      )}
    </div>
  );
};

export default NoticeBoard;
