import React, { useRef, useState, useEffect } from 'react';
import './BoardList.css';
import Pagination from '../components/Pagination';
import useMove from '../util/useMove';
import useLoading from '../util/useLoading';
import { useNavigate } from 'react-router-dom';

const BoardList = () => {
  const [boards, setBoards] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [searchList, setSearchList] = useState([]);
  const [searching, setSearching] = useState(false); // 검색 중 여부를 나타내는 상태
  const [searchTerm, setSearchTerm] = useState(''); // 실제 검색어를 저장하는 상태
  const [sortOrder, setSortOrder] = useState('latest');
  const nav = useNavigate();

  const { data: boardListData, loading: loadingBoardList, error: errorBoardList, refetch: refetchBoardData } = useLoading('http://localhost:8080/api/board/list', 'json');

  useEffect(() => {
    let filteredBoards = [];
    
    if (searching) {
      filteredBoards = searchList.filter(board => board.step === 0);
    } else if (boardListData) {
      filteredBoards = boardListData.filter(board => board.step === 0);
    }

    if (sortOrder === 'latest') {
      filteredBoards = filteredBoards.sort((a, b) => new Date(b.reg_date) - new Date(a.reg_date));
    } else if (sortOrder === 'regOrder') {
      filteredBoards = filteredBoards.sort((a, b) => new Date(a.reg_date) - new Date(b.reg_date));
    }

    setBoards(filteredBoards);
    setTotalPages(Math.ceil(filteredBoards.length / itemsPerPage));
  }, [boardListData, itemsPerPage, sortOrder, searching, searchList]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleTitleClick = async (no) => {
    await incrementReadCount(no);
    nav(`/boarddetail/${no}`);
  };
  const handleSortOrderChange =(e)=>{
    setSortOrder(e.target.value);
  };

  const incrementReadCount = async (no) => {
    try {
      await fetch(`http://localhost:8080/api/board/readCount/${no}`, {
        method: 'GET',
      });
      refetchBoardData();
    } catch (error) {
      console.error('Failed to increment read count', error);
    }
  };

  const indexOfLastBoard = currentPage * itemsPerPage;
  const indexOfFirstBoard = indexOfLastBoard - itemsPerPage;
  const currentBoards = boards.slice(indexOfFirstBoard, indexOfLastBoard);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const category = useRef();
  const onSearch = () => {
    let url = 'http://localhost:8080/api/board/search';
    const form = new FormData();
    form.append('category', category.current.value);
    form.append('search', searchTerm);

    setSearching(true);

    fetch(url, { method: 'POST', body: form, credentials: 'include' })
      .then(response => response.json())
      .then(data => {
        let filteredSearch = data.filter(board => board.step === 0);
        setSearchList(filteredSearch);
        setCurrentPage(1);
      })
      .catch(error => {
        console.error('Error fetching search results:', error);
        setSearchList([]);
      });
  };

  const moveToWrite = useMove('/boardwrite/0'); 
  const handleWrite = () => {
    moveToWrite();
  };

  return (
    <div className="boardList">
      <h1>게시판</h1>
      <div className="boardListHeader">
        <button onClick={handleWrite} className="writeButton">글쓰기</button>
      </div>
      <div className="searchBar">
        <select onChange={handleSortOrderChange} value={sortOrder}>
          <option value="latest">최신순</option>
          <option value="regOrder">등록순</option>
        </select>
        <select ref={category}>
          <option value="all">전체</option>
          <option value="english">영어</option>
          <option value="toeic">토익</option>
        </select>
        <input type="text" placeholder="검색어를 입력해주세요" value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value); }} />
        <button onClick={onSearch}>검색</button>
      </div>
      <table className="boardListTable">
        <thead>
          <tr>
            <th>카테고리</th>
            <th>제목</th>
            <th>작성자</th>
            <th>조회</th>
            <th>작성일</th>
          </tr>
        </thead>
        <tbody>
          {searching && currentBoards.length === 0 ? (
            <tr>
              <td colSpan="5">검색 결과가 없습니다.</td>
            </tr>
          ) : (
            currentBoards.map((board, index) => (
              <tr key={index}>
                <td>{board.category}</td>
                <td onClick={() => handleTitleClick(board.no)} className="postTitle">
                  {board.subject}
                </td>
                <td>{board.user_nickname}</td>
                <td>{board.read_count}</td>
                <td>{formatDate(board.reg_date)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div className="pagination">
        <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
      </div>
    </div>
  );
};

export default BoardList;
