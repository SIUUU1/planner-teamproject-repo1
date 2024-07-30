// src/pages/DetailsPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './BoardDetail.css';

const DetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    const post = storedPosts.find(post => post.id.toString() === id);
    setPost(post);
  }, [id]);

  const handleBack = () => {
    navigate('/boardlist');
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="boardDetail">
      <h1>{post.title}</h1>
      <p><strong>카테고리:</strong> {post.category}</p>
      <p><strong>등록날짜:</strong> {post.date}</p>
      <p>{post.content}</p>
      <button onClick={handleBack} className="backButton">돌아가기</button>
    </div>
  );
};

export default DetailsPage;
