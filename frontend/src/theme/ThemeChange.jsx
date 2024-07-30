// src/pages/ThemeChange.jsx
import React, { useState, useContext } from 'react';
import './ThemeChange.css';
import { ThemeContext } from '../contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';

const ThemeChange = () => {
  const { setThemeColor, setThemeMode } = useContext(ThemeContext);
  const [selectedTheme, setSelectedTheme] = useState(localStorage.getItem('themeMode') || 'light');
  const [selectedColor, setSelectedColor] = useState(localStorage.getItem('themeColor') || null);
  const navigate = useNavigate();

  const handleThemeChange = (theme) => {
    setSelectedTheme(theme);
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);
    console.log('Selected color:', color);
  };

  const handleApplyTheme = () => {
    setThemeMode(selectedTheme);
    if (selectedTheme === 'light') {
      setThemeColor('#ffffff');
    } else if (selectedTheme === 'dark') {
      setThemeColor('#333333');
    } else if (selectedTheme === 'sync') {
      const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      setThemeColor(isDarkMode ? '#333333' : '#ffffff');
    }
    if (selectedColor) {
      const colorClass = `.${selectedColor}`;
      const colorElement = document.querySelector(colorClass);
      const bgColor = window.getComputedStyle(colorElement).backgroundColor;
      setThemeColor(bgColor);
    }
    navigate('/'); // Navigate to the main page after applying the theme
  };

  const colors = [
    'colorGradient1', 'colorGradient2', 'colorGradient3', 'colorGradient4', 'colorGradient5', 'colorGradient6', 'colorGradient7', 'colorGradient8', 'colorGradient9', 'colorGradient10',
    'colorGradient11', 'colorGradient12', 'colorGradient13', 'colorGradient14', 'colorGradient15', 'colorGradient16', 'colorGradient17', 'colorGradient18', 'colorGradient19', 'colorGradient20',
    'colorGradient21', 'colorGradient22', 'colorGradient26', 'colorGradient24', 'colorGradient25', 'colorGradient26', 'colorGradient27', 'colorGradient28', 'colorGradient29', 'colorGradient30'
  ];

  return (
    <div className="themeChange">
      <h1>디스플레이</h1>
      <div className={`displayMessages ${selectedColor}`}>
        <p><b>나를 봐봐, 나는 아름다운 나비야</b></p>
        <p><b>달빛 속에서 춤추고 있어😊</b></p>
        <p><b>콤팩트 모드가 켜지기만을</b></p>
        <p><b>기다리고 있어요</b></p>
        <p><b>아, 여기 있네요!</b></p>
      </div>
      <div className="themeSection">
        <h2>테마</h2>
        <div className="themeOptions">
          <div 
            className={`themeOption ${selectedTheme === 'light' ? 'selected' : ''}`} 
            onClick={() => handleThemeChange('light')}
          >
            <div className="lightTheme"></div>
            <span>라이트</span>
          </div>
          <div 
            className={`themeOption ${selectedTheme === 'dark' ? 'selected' : ''}`} 
            onClick={() => handleThemeChange('dark')}
          >
            <div className="darkTheme"></div>
            <span>다크</span>
          </div>
          <div 
            className={`themeOption ${selectedTheme === 'sync' ? 'selected' : ''}`} 
            onClick={() => handleThemeChange('sync')}
          >
            <div className="syncTheme"></div>
            <span>자동</span>
          </div>
        </div>
      </div>
      <div className="colorSection">
        <h2>색상</h2>
        <p>테마를 내 것으로 만드세요. 구독 시에만 가능합니다.</p>
        <div className="colorOptions">
          {colors.map((color, index) => (
            <div 
              key={index} 
              className={`colorOption ${selectedColor === color ? 'selected' : ''}`} 
              onClick={() => handleColorChange(color)}
            >
              <div className={`colorCircle ${color}`}></div>
            </div>
          ))}
        </div>
      </div>
      <button className="previewButton" onClick={handleApplyTheme}>테마 적용</button>
    </div>
  );
};

export default ThemeChange;
