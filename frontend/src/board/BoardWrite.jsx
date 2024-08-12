import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './BoardWrite.css';

const Write = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState(['Java', 'Html', 'Css', 'Spring boot', 'React']);
  const [newCategory, setNewCategory] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [images, setImages] = useState([]);

  const handleAddCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setNewCategory('');
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const promises = files.map(file => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(reader.error);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(promises).then(images => {
      setImages(images);
    }).catch(error => {
      console.error("Error reading files:", error);
    });
  };

  const handleComplete = () => {
    if (!title || !selectedCategory || !content) {
      alert('모든 필드를 채워주세요.');
      return;
    }

    const currentDate = new Date().toLocaleString();

    const newPost = {
      id: Date.now(),
      category: selectedCategory,
      title,
      content,
      images,  // Add images to the post
      date: currentDate,
    };

    const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    storedPosts.push(newPost);
    localStorage.setItem('posts', JSON.stringify(storedPosts));

    navigate('/boardlist');
  };

  const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      ['link', 'image', 'video'],
      ['clean'],
    ],
  };

  return (
    <div className="boardWrite">
      <h1>글쓰기 게시판</h1>
      <div className="formGroup">
        <label htmlFor="title">제목:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목을 입력하세요"
        />
      </div>
      <div className="formGroup">
        <label htmlFor="category">카테고리:</label>
        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="" disabled>
            카테고리를 선택하세요
          </option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
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
          placeholder="새 카테고리 추가"
        />
        <button onClick={handleAddCategory} className="addCategoryButton">
          추가
        </button>
      </div>
      <div className="formGroup">
        <label htmlFor="content">내용:</label>
        <ReactQuill
          value={content}
          onChange={setContent}
          modules={modules}
          placeholder="내용을 입력하세요..."
        />
      </div>
      <div className="formGroup">
        <label htmlFor="imageUpload">이미지 업로드:</label>
        <input type="file" id="imageUpload" multiple accept="image/*" onChange={handleFileChange} />
      </div>
      <div className="formGroup">
        <button onClick={handleComplete} className="completeButton">
          등록
        </button>
      </div>
    </div>
  );
};

export default Write;
