// src/pages/NoticeBoard.jsx
import React, { useState, useEffect } from 'react';
import './NoticeBoard.css';

const NoticeBoard = () => {
  const [notices, setNotices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedNotice, setSelectedNotice] = useState(null);
  const noticesPerPage = 7;

  useEffect(() => {
    // 임시 공지사항 데이터
    const sampleNotices = [
      { id: 1, title: '공지사항 1', date: '2024-07-01', views: 10, content: '공부는 내일부터 하시면 됩니다.' },
      { id: 2, title: '공지사항 2', date: '2024-07-02', views: 20, content: ' 내용' },
      { id: 3, title: '공지사항 3', date: '2024-07-03', views: 30, content: ' 내용' },
      { id: 4, title: '공지사항 4', date: '2024-07-04', views: 40, content: ' 내용' },
      { id: 5, title: '공지사항 5', date: '2024-07-05', views: 50, content: ' 내용' },
      { id: 6, title: '공지사항 6', date: '2024-07-06', views: 60, content: ' 내용' },
      { id: 7, title: '공지사항 7', date: '2024-07-07', views: 70, content: ' 내용' },
      { id: 8, title: '공지사항 8', date: '2024-07-08', views: 80, content: ' 내용' },
      { id: 9, title: '공지사항 9', date: '2024-07-09', views: 90, content: ' 내용' },
      { id: 10, title: '공지사항 10', date: '2024-07-10', views: 100, content: ' 내용' },
      // 더 많은 공지사항 데이터 추가 가능
    ];

    setNotices(sampleNotices);
  }, []);

  const indexOfLastNotice = currentPage * noticesPerPage;
  const indexOfFirstNotice = indexOfLastNotice - noticesPerPage;
  const currentNotices = notices.slice(indexOfFirstNotice, indexOfLastNotice);

  const totalPages = Math.ceil(notices.length / noticesPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleTitleClick = (notice) => {
    setSelectedNotice(notice);
  };

  const handleBackToList = () => {
    setSelectedNotice(null);
  };

  return (
    <div className="noticeBoard">
         {selectedNotice ? (
        <div className="noticeDetail">
          <h2>{selectedNotice.title}</h2>
          <p>{selectedNotice.content}</p>
          <button onClick={handleBackToList}>목록으로</button>
        </div>
      ) : (
        <>
          
            {currentNotices.map((notice, index) => (
              <div className="noticeBoardRow" key={notice.id}>
                <div className="noticeBoardCell">{notice.id}</div>
                <div className="noticeBoardCell">
                  <button className="noticeTitle" onClick={() => handleTitleClick(notice)}>
                    {notice.title}
                  </button>
                </div>
                <div className="noticeBoardCell">{notice.date}</div>
                <div className="noticeBoardCell">{notice.views}</div>
              </div>
            ))}
        
          <div className="pagination">
            <button onClick={handlePrevPage} disabled={currentPage === 1}>이전</button>
            <span>{currentPage} / {totalPages}</span>
            <button onClick={handleNextPage} disabled={currentPage === totalPages}>다음</button>
          </div>
        </>
      )}
    </div>
  );
};

export default NoticeBoard;
