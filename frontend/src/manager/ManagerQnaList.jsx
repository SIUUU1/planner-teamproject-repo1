import React, { useState, useEffect } from 'react';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import useLoading from '../util/useLoading';
import QnaItem from './items/QnaItem';
import Pagination from '../components/Pagination';

function ManagerQnaList() {
  const [qnas, setQnas] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // 초기값 5
  const [totalPages, setTotalPages] = useState(0);

  const { data: qnaListData, loading: loadingQnaList, error: errorQnaList, refetch: refetchQnaList } = useLoading('http://localhost:8080/api/qna/list', 'json');

  useEffect(() => {
    if (qnaListData) {
      // qora이 1인 항목만 필터링
      const filteredQnas = qnaListData.filter(notice => notice.qora === 1);
      setQnas(filteredQnas);
      setTotalPages(Math.ceil(filteredQnas.length / itemsPerPage));
    }
  }, [qnaListData, itemsPerPage]);

  // 페이지 이동
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const indexOfLastQna = currentPage * itemsPerPage;
  const indexOfFirstQna = indexOfLastQna - itemsPerPage;
  const currentQnas = qnas.slice(indexOfFirstQna, indexOfLastQna);

  if(loadingQnaList){
    return(<div>loading...</div>)
  }
  return (
    <div className="managerSupport">
        <table className="UserTable" style={{ tableLayout: 'fixed', width: '100%' }}>
          <thead>
            <tr>
              <th style={{ width: '70px' }}>번호</th>
              <th style={{ width: '70px' }}>카테고리</th>
              <th style={{ width: '150px' }}>제목</th>
              <th style={{ width: '250px' }}>내용</th>
              <th style={{ width: '100px' }}>상태</th>
              <th style={{ width: '100px' }}>답변 / 삭제</th>
            </tr>
          </thead>
          <tbody>
          {currentQnas && currentQnas.map((i, index) => (
              <QnaItem key={i.faq_id} data={i} refetch={refetchQnaList} no={indexOfFirstQna + index + 1}/>
            ))}
          </tbody>
        </table>
        <div className='pagination'>
        <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
        </div>
  </div>
  );
}

export default ManagerQnaList;
