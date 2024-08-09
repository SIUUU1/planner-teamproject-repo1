import React, { useState, useEffect } from 'react';
import Pagination from './Pagination';

const PaginationEx = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [itemsPerPage, setItemsPerPage] = useState(5); // 초기값 5

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://api.example.com/data?page=${currentPage}&limit=${itemsPerPage}`
        );
        const result = await response.json();

        // Assume the API returns { data: [...], totalPages: N }
        setData(result.data);
        setTotalPages(result.totalPages);
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [currentPage, itemsPerPage]); // itemsPerPage도 의존성에 추가

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // 페이지 수가 변경되면 첫 페이지로 이동
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Paginated Data from API</h1>
      <label>
        Items per page:
        <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </label>
      <ul>
        {data.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <Pagination 
        totalPages={totalPages} 
        currentPage={currentPage} 
        onPageChange={handlePageChange} 
      />
    </div>
  );
};

export default PaginationEx;
