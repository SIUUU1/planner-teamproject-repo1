import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './BoardDetail.css';

const DetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [commenterName, setCommenterName] = useState('');

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    const post = storedPosts.find(post => post.id.toString() === id);
    if (post) {
      setPost(post);
      setComments(post.comments || []);
    }
  }, [id]);

  const handleBack = () => {
    navigate('/boardlist');
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommenterNameChange = (e) => {
    setCommenterName(e.target.value);
  };

  const handleSubmitComment = () => {
    if (!comment.trim() || !commenterName.trim()) {
      alert('Please enter your name and a comment.');
      return;
    }
    const newComment = {
      id: comments.length + 1,
      name: commenterName,
      text: comment,
      date: new Date().toLocaleString()
    };
    const updatedComments = [...comments, newComment];
    setComments(updatedComments);
    const storedPosts = JSON.parse(localStorage.getItem('posts'));
    const updatedPosts = storedPosts.map(p => {
      if (p.id.toString() === id) {
        return { ...p, comments: updatedComments };
      }
      return p;
    });
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
    setComment('');
    setCommenterName('');
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="boardDetail">
      <h1>제목: {post.title}</h1>
      <p><strong>카테고리:</strong> {post.category}</p>
      <p><strong>등록날짜:</strong> {post.date}</p>
      <p><strong>내용:</strong> {post.content}</p>

      {post.images && post.images.length > 0 && (
        <div className="attachedFiles">
          <h2>첨부된 이미지:</h2>
          {post.images.map((image, index) => (
            <div key={index} className="attachedImage">
              <img src={image} alt={`첨부이미지 ${index + 1}`} />
            </div>
          ))}
        </div>
      )}

      <div>
        <h2>댓글</h2>
        {comments.map((comment, index) => (
          <p key={index}><strong>{comment.name} ({comment.date}):</strong> {comment.text}</p>
        ))}
        <input
          type="text"
          value={commenterName}
          onChange={handleCommenterNameChange}
          placeholder="이름을 입력하세요."
        />
        <textarea
          value={comment}
          onChange={handleCommentChange}
          placeholder="댓글을 입력하세요."
          rows="4"
        ></textarea>
        <button onClick={handleSubmitComment}>댓글 추가</button>
      </div>
      <button onClick={handleBack} className="backButton">돌아가기</button>
    </div>
  );
};

export default DetailsPage;
