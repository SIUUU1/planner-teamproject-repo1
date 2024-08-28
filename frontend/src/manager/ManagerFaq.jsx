import React, { useState, useEffect } from 'react';
import Pagination from '../components/Pagination';
import useLoading from '../util/useLoading';
import Button from '../components/Button';
import FaqItem from './items/FaqItem';
import useMove from '../util/useMove';

const ManagerFaq =()=>{
  const [faqs, setFaqs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // 초기값 5
  const [totalPages, setTotalPages] = useState(0);

  const { data: faqListData, loading: loadingFaqList, error: errorFaqList, refetch: refetchFaqList } = useLoading('http://localhost:8080/api/faq/list', 'json');

  useEffect(() => {
    if (faqListData) {
      setFaqs(faqListData);
      setTotalPages(Math.ceil(faqListData.length / itemsPerPage));
    }
  }, [faqListData, itemsPerPage]);

  // 페이지 이동
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const indexOfLastFaq = currentPage * itemsPerPage;
  const indexOfFirstFaq = indexOfLastFaq - itemsPerPage;
  const currentFaqs = faqs.slice(indexOfFirstFaq, indexOfLastFaq);

  //글쓰기
  const moveToWrite = useMove('/manager/faqedit/0');

  if(loadingFaqList){
    return(<div>loading...</div>)
  }
  return(
    <div className="managerFaq">
      <div className='writeBtnDiv'>
        <Button text={'글쓰기'} onClick={moveToWrite} className={'writeBtn'}/>
      </div>
      <table className="UserTable" style={{ tableLayout: 'fixed', width: '100%' }}>
          <thead>
            <tr>
              <th style={{ width: '70px' }}>번호</th>
              <th style={{ width: '70px' }}>카테고리</th>
              <th style={{ width: '150px' }}>제목</th>
              <th style={{ width: '250px' }}>내용</th>
              <th style={{ width: '100px' }}>수정 / 삭제</th>
            </tr>
          </thead>
          <tbody>
          {currentFaqs && currentFaqs.map((i, index) => (
              <FaqItem key={i.faq_id} data={i} refetch={refetchFaqList} no={indexOfFirstFaq + index + 1}/>
            ))}
          </tbody>
        </table>
        <div className='pagination'>
        <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
        </div>
    </div>
  );
};
export default ManagerFaq;