import React, { useState } from 'react';
import './ThemeChange.css';
import Footer from '../components/Footer';
import Attainment from '../attainment/Attainment';
import ToFullList from '../components/ToFullList';

const themes = [
  { name: 'Theme 1', gradient: 'linear-gradient(135deg, #f79d00, #64f38c)' },
  { name: 'Theme 2', gradient: 'linear-gradient(135deg, #BE93C5, #7BC6CC)' },
  { name: 'Theme 3', gradient: 'linear-gradient(135deg, #A1FFCE, #FAFFD1)' },
  { name: 'Theme 4', gradient: 'linear-gradient(135deg, #ef32d9, #89fffd)' },
  { name: 'Theme 5', gradient: 'linear-gradient(135deg, #a80077, #66ff00)' },
  { name: 'Theme 6', gradient: 'linear-gradient(135deg, #2980B9, #2980B9,#FFFFFF )' },
  { name: 'Theme 7', gradient: 'linear-gradient(135deg, #12c2e9,#c471ed,#F64F59 )' },
  { name: 'Theme 8', gradient: 'linear-gradient(135deg, #FEAC5E,#C779D0,#4bc0c8 )' },
  { name: 'Theme 9', gradient: 'linear-gradient(135deg, #5433FF,#20BDFF,#a6Fecb )' },
  { name: 'Theme 10', gradient: 'linear-gradient(135deg, #C6FFDD,#FBD786,#f7797d )' },  
];

const ThemeChange = () => {
  const [currentTheme, setCurrentTheme] = useState(themes[0]);

  const selectTheme = (theme) => {
    setCurrentTheme(theme);
  };

  return (
    <div className="theme-change" style={{ background: currentTheme.gradient }}>
      <div className="theme-selector">
        {themes.map((theme, index) => (
          <button
            key={index}
            style={{ background: theme.gradient }}
            onClick={() => selectTheme(theme)}
            aria-label={`Change theme to ${theme.name}`}
          />
        ))}
      </div>
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
              <div className="progress1" style={{ height: '50px' }}>
                <ToFullList URL="attainmentMain"></ToFullList>
                <Attainment data={[{
                  attainmentId: 0,
                  attainmentName: '팀프로젝트하기',
                  attainmentType: 'time',
                  attainmentTarget: 100,
                  attainmentFinish: 10,
                  attainmentRate: 10,
                  hotDogColor: 'hsl(113, 70%, 50%)',
                  star: 10,
                }]} padding={0.05} type={'short'}></Attainment>
              </div>
              <div className="progress2" style={{ height: '50px' }}>
                <Attainment data={[{
                  attainmentId: 0,
                  attainmentName: '팀프로젝트하기',
                  attainmentType: 'time',
                  attainmentTarget: 100,
                  attainmentFinish: 10,
                  attainmentRate: 10,
                  hotDogColor: 'hsl(113, 70%, 50%)',
                  star: 10,
                }]} padding={0.05} type={'long'}></Attainment>
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
