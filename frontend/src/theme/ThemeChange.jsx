// src/theme/ThemeChange.jsx
import React, { useState } from 'react';
import './ThemeChange.css';
import Footer from '../components/Footer';
import Attainment from '../attainment/Attainment';
import ToFullList from '../components/ToFullList';

const themes = [
  { name: 'Theme 1', color: '#FF6347' }, // Tomato
  { name: 'Theme 2', color: '#4682B4' }, // SteelBlue
  { name: 'Theme 3', color: '#FFD700' }, // Gold
  { name: 'Theme 4', color: '#32CD32' }, // LimeGreen
  { name: 'Theme 5', color: '#FF4500' }, // OrangeRed
];

const data1 = [
  {
    attainmentId: 0,
    attainmentName: '팀프로젝트하기',
    attainmentType: 'time',
    attainmentTarget: 100,
    attainmentFinish: 10,
    attainmentRate: 10,
    hotDogColor: 'hsl(113, 70%, 50%)',
    star: 10,
  },
];

const data2 = [
  {
    attainmentId: 0,
    attainmentName: '팀프로젝트하기',
    attainmentType: 'time',
    attainmentTarget: 100,
    attainmentFinish: 10,
    attainmentRate: 10,
    hotDogColor: 'hsl(113, 70%, 50%)',
    star: 10,
  },
];

const modifiedData1 = data1
  .filter((item) => item.star > 0)
  .sort((a, b) => b.attainmentRate - a.attainmentRate)
  .slice(0, 4);
const modifiedData2 = data2
  .filter((item) => item.star > 0)
  .sort((a, b) => b.attainmentRate - a.attainmentRate)
  .slice(0, 4);

const height1 = modifiedData1.length * 50;
const height2 = modifiedData2.length * 50;

const ThemeChange = () => {
  const [currentThemeIndex, setCurrentThemeIndex] = useState(0);

  const handleNext = () => {
    setCurrentThemeIndex((currentThemeIndex + 1) % themes.length);
  };

  const handlePrevious = () => {
    setCurrentThemeIndex((currentThemeIndex - 1 + themes.length) % themes.length);
  };

  const currentTheme = themes[currentThemeIndex];

  return (
    <div className="theme-change" style={{ backgroundColor: currentTheme.color }}>
      <div className="theme-info">
        <h1>{currentTheme.name}</h1>
        <button onClick={handlePrevious}>Previous</button>
        <button onClick={handleNext}>Next</button>
      </div>
      {/* Preview of User layout with the current theme */}
      <div className="user">
        <div className="homeMiddle">
          <div className="homeFirstMiddle">
            <div className="plant" style={{ backgroundColor: 'white' }}>
              식물이미지
            </div>
            <div className="firstMiddleText">
              <div className="calendar" style={{ backgroundColor: 'white' }}>
                2024.07.20 13:45:42(sat)
              </div>
              <div className="saying" style={{ backgroundColor: 'white' }}>
                일이 불가능하다고 믿는 것은 일을 불가능하게 하는 것이다.
                <br />
                -풀러-
              </div>
            </div>
          </div>

          <div className="homeSecondMiddle">
            <div className="toDoList" style={{ backgroundColor: 'white' }}>
              해야 할 일을 정리해보세요 TodoList 3개만
            </div>
            <div className="circleSchedule" style={{ backgroundColor: 'white' }}>
              원그래프 일정
            </div>
          </div>

          <div className="homeThirdMiddle">
            <div className="progress" style={{ backgroundColor: 'white' }}>
              <div className="progress1" style={{ height: `${height1}px` }}>
                <ToFullList URL="attainmentMain"></ToFullList>
                <Attainment data={modifiedData1} padding={0.05} type={'short'}></Attainment>
              </div>
              <div className="progress2" style={{ height: `${height2}px` }}>
                <Attainment data={modifiedData2} padding={0.05} type={'long'}></Attainment>
              </div>
            </div>
            <div className="board" style={{ backgroundColor: 'white' }}>
              <div className="userBoardList">
                <h2>최근 게시글</h2>
                <button onClick={() => window.location.href = '/boardlist'} className="addButton">+</button>
                <table className="userBoardListTable">
                  <thead>
                    <tr>
                      <th>제목</th>
                      <th>카테고리</th>
                      <th>등록일</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Post Title 1</td>
                      <td>Category 1</td>
                      <td>Date 1</td>
                    </tr>
                    <tr>
                      <td>Post Title 2</td>
                      <td>Category 2</td>
                      <td>Date 2</td>
                    </tr>
                    <tr>
                      <td>Post Title 3</td>
                      <td>Category 3</td>
                      <td>Date 3</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="homeForthMiddle">
            <div className="studyGroup" style={{ backgroundColor: 'white' }}>
              내 스터디 그룹
            </div>
            <div className="openChat" style={{ backgroundColor: 'white' }}>
              같은 분야를 공부하는 사람들과 질문을 주고 받으세요!
            </div>
          </div>
        </div>
       
      </div>
    </div>
  );
};

export default ThemeChange;
