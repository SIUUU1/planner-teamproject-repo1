import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './BoardList.css';

const BoardList = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const postsPerPage = 7;

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    setPosts(storedPosts);
  }, []);

  const handleWrite = () => {
    navigate('/BoardWrite');
  };

  const handleDelete = (id) => {
    const updatedPosts = posts.filter(post => post.id !== id);
    updatedPosts.forEach((post, index) => {
      post.id = index + 1;
    });
    setPosts(updatedPosts);
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
    console.log('글이 삭제되었습니다.');
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleSearch = () => {
    // 검색 로직 추가
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(posts.length / postsPerPage);

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

  return (
    <div className="boardList">
      <h1>게시판</h1>
      <div className="boardListHeader">
        <button onClick={handleWrite} className="writeButton">글쓰기</button>
      </div>
      <div className="searchBar">
        <select>
          <option value="latest">최신순</option>
        </select>
        <input
          type="text"
          placeholder="검색어를 입력해주세요"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>검색</button>
      </div>
      <table className="boardListTable">
        <thead>
          <tr>
            <th>카테고리</th>
            <th>제목</th>
            <th>작성자</th>
            <th>댓글</th>
            <th>조회</th>
            <th>추천</th>
            <th>작성일</th>
            <th>작업</th>
          </tr>
        </thead>
        <tbody>
          {currentPosts.map((post) => (
            <tr className="boardListRow" key={post.id}>
              <td>{post.category}</td>
              <td>
                <span
                  className="postTitle"
                  onClick={() => navigate(`/details/${post.id}`)}
                >
                  {post.title}
                </span>
              </td>
              <td>{post.author}</td>
              <td>{post.comments}</td>
              <td>{post.views}</td>
              <td>{post.likes}</td>
              <td>{post.date}</td>
              <td>
                <div className="buttonGroup">
                  <button onClick={() => handleEdit(post.id)} className="editButton">수정</button>
                  <button onClick={() => handleDelete(post.id)} className="deleteButton">삭제</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>이전</button>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>다음</button>
      </div>
    </div>
  );
};

export default BoardList;
