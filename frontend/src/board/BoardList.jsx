import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './BoardList.css';

const BoardList = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [displayPosts, setDisplayPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const postsPerPage = 7;

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    // Assume posts already have an 'author' field; if not, initialize it here
    const postsWithViewsAndAuthors = storedPosts.map(post => ({
      ...post,
      views: post.views || 0,
      author: post.author || 'Unknown' // Assuming some default value or fetch from user session
    }));
    setPosts(postsWithViewsAndAuthors);
    setDisplayPosts(postsWithViewsAndAuthors);
  }, []);

  const handleWrite = () => {
    // Ensure you have a method to add 'author' when navigating to write a new post
    navigate('/BoardWrite');
  };

  const handleDelete = (id) => {
    const updatedPosts = posts.filter(post => post.id !== id);
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
    setPosts(updatedPosts);
    setDisplayPosts(updatedPosts);
  };

  const handleEdit = (id) => {
    // Pass the author through state or ensure the edit page knows how to fetch it
    navigate(`/BoardEdit/${id}`);
  };

  const handleViewIncrement = (id) => {
    const updatedPosts = posts.map(post => {
      if (post.id === id) {
        return {...post, views: post.views + 1};
      }
      return post;
    });
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
    setPosts(updatedPosts);
    setDisplayPosts(updatedPosts);
    navigate(`/boarddetail/${id}`);
  };

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setDisplayPosts(posts);
    } else {
      const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setDisplayPosts(filteredPosts);
      setCurrentPage(1);
    }
  };
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

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = displayPosts.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(displayPosts.length / postsPerPage);

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
            <th>조회</th>
            <th>작성일</th>
            <th>작업</th>
          </tr>
        </thead>
        <tbody>
          {currentPosts.map((post) => (
            <tr key={post.id}>
              <td>{post.category}</td>
              <td onClick={() => handleViewIncrement(post.id)} className="postTitle">
                {post.title}
              </td>
              <td>{post.author}</td>
              <td>{post.views}</td>
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
