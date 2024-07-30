// src/pages/Write.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BoardWrite.css';

const Write = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState(['Java', 'Html', 'Css', 'Spring boot', 'React']);
  const [newCategory, setNewCategory] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleAddCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setNewCategory('');
    }
  };

  const handleComplete = () => {
    const currentDate = new Date().toLocaleString();

    const newPost = {
      id: Date.now(),
      category: selectedCategory,
      title,
      content,
      date: currentDate,
    };

    const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    storedPosts.push(newPost);
    localStorage.setItem('posts', JSON.stringify(storedPosts));

    navigate('/boardlist');
  };

  return (
    <div className="boardWrite">
      <h1>글쓰기 게시판</h1>
      <div className="formGroup">
        <label htmlFor="category">카테고리:</label>
        <select id="category" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
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
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="formGroup">
        <label htmlFor="content">내용:</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <div className="formGroup">
        <button onClick={handleComplete} className="completeButton">등록</button>
      </div>
    </div>
  );
};

export default Write;
