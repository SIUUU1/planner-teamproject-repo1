// src/pages/EditPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './BoardEdit.css';

const EditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({
    category: '',
    title: '',
    content: '',
    date: ''
  });
  const [categories, setCategories] = useState(['Java', 'Html', 'Css', 'Spring boot', 'React']);
  const [newCategory, setNewCategory] = useState('');

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    const post = storedPosts.find(post => post.id.toString() === id);
    if (post) {
      setPost(post);
    }
  }, [id]);

  const handleAddCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setNewCategory('');
    }
  };

  const handleSave = () => {
    const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    const updatedPosts = storedPosts.map(p => (p.id.toString() === id ? post : p));
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
    navigate('/boardlist');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost(prevPost => ({ ...prevPost, [name]: value }));
  };

  return (
    <div className="boardEdit">
      <h1>글 수정하기</h1>
      <div className="formGroup">
        <label htmlFor="category">카테고리:</label>
        <select
          id="category"
          name="category"
          value={post.category}
          onChange={handleChange}
        >
          <option value="">카테고리를 선택하세요</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </select>
      </div>
      <div className="formGroup">
        <label htmlFor="newCategory">카테고리 추가:</label>
        <input
          type="text"
          id="newCategory"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <button onClick={handleAddCategory} className="addCategoryButton">추가</button>
      </div>
      <div className="formGroup">
        <label htmlFor="title">제목:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={post.title}
          onChange={handleChange}
        />
      </div>
      <div className="formGroup">
        <label htmlFor="content">내용:</label>
        <textarea
          id="content"
          name="content"
          value={post.content}
          onChange={handleChange}
        />
      </div>
      <div className="formGroup">
        <button onClick={handleSave} className="saveButton">저장</button>
      </div>
    </div>
  );
};

export default EditPage;
