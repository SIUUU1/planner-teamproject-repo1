import React, { useState, useEffect } from 'react';
import Pagination from '../components/Pagination';
import NoticeItem from './items/NoticeItem';
import useLoading from '../util/useLoading';
import Button from '../components/Button';

const ManagerNoticeBoard = () => {
  const [notices, setNotices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // 초기값 5
  const [totalPages, setTotalPages] = useState(0);
  const [selectedNotice, setSelectedNotice] = useState(null);
  
  const { data: noticeListData, loading: loadingNoticeList, error: errorNoticeList, refetch: refetchNoticeData } = useLoading('http://localhost:8080/api/notice/list', 'json');
  
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

const indexOfLastNotice = currentPage * itemsPerPage;
const indexOfFirstNotice = indexOfLastNotice - itemsPerPage;
const currentNotices = notices.slice(indexOfFirstNotice, indexOfLastNotice);

//글쓰기



  return (
    <div className="managerNoticeBoard">
        <div className='writeBtn'>
        <Button text={'글쓰기'} onClick={()=>{}}/>
        </div>
        <table className="UserTable" style={{ tableLayout: 'fixed', width: '100%' }}>
          <thead>
            <tr>
              <th style={{ width: '70px' }}>번호</th>
              <th style={{ width: '70px' }}>카테고리</th>
              <th style={{ width: '250px' }}>제목</th>
              <th style={{ width: '150px' }}>작성자</th>
              <th style={{ width: '100px' }}>수정 / 삭제</th>
            </tr>
          </thead>
          <tbody>
          {currentNotices && currentNotices.map((i, index) => (
              <NoticeItem key={i.no} data={i} refetch={refetchNoticeData} no={indexOfFirstNotice + index + 1}/>
            ))}
          </tbody>
        </table>
        <div className='pagination'>
        <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
        </div>
    </div>
  );
};

export default ManagerNoticeBoard;
