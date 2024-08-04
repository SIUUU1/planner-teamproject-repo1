import React, { useState, useEffect } from 'react';
import './User.css';
import Attainment from '../attainment/Attainment';
import BackGround from '../components/BackGround';
import ToFullList from '../components/ToFullList';

const data1 = [
  {
    "attainmentId": 0,
    "attainmentName": "팀프로젝트하기",
    "attainmentType":"time",
    "attainmentTarget":100,
    "attainmentFinish":10,
    "attainmentRate": 10,
    "hot dogColor": "hsl(113, 70%, 50%)",
    "star": 10,

  },
  {
    "attainmentId": 1,
    "attainmentName": "100",
    "attainmentType":"time",
    "attainmentTarget":100,
    "attainmentFinish":100,
    "attainmentRate": 100,
    "burgerColor": "hsl(291, 70%, 50%)",
    "star": 1,
  },
  {
    "attainmentId": 2,
    "attainmentName": "AF22",
    "attainmentType":"number",
    "attainmentTarget":100,
    "attainmentFinish":50,
    "attainmentRate": 50,
    "sandwichColor": "hsl(173, 70%, 50%)",
    "star": 11,
  },
  {
    "attainmentId": 4,
    "attainmentName": "AG44",
    "attainmentType":"number",
    "attainmentTarget":100,
    "attainmentFinish":25,
    "attainmentRate": 25,
    "kebabColor": "hsl(124, 70%, 50%)",
    "star": 0,
  },
  {
    "attainmentId": 5,
    "attainmentName": "AG55",
    "attainmentType":"number",
    "attainmentTarget":100,
    "attainmentFinish":85,
    "attainmentRate": 85,
    "kebabColor": "hsl(124, 70%, 50%)",
    "star": 0,
  },
]
const data2 = [
  {
    "attainmentId": 0,
    "attainmentName": "팀프로젝트하기",
    "attainmentType":"time",
    "attainmentTarget":100,
    "attainmentFinish":10,
    "attainmentRate": 10,
    "hot dogColor": "hsl(113, 70%, 50%)",
    "star": 10,

  },
  {
    "attainmentId": 1,
    "attainmentName": "100",
    "attainmentType":"time",
    "attainmentTarget":100,
    "attainmentFinish":100,
    "attainmentRate": 100,
    "burgerColor": "hsl(291, 70%, 50%)",
    "star": 1,
  },
  {
    "attainmentId": 2,
    "attainmentName": "AF22",
    "attainmentType":"number",
    "attainmentTarget":100,
    "attainmentFinish":50,
    "attainmentRate": 50,
    "sandwichColor": "hsl(173, 70%, 50%)",
    "star": 11,
  },
  {
    "attainmentId": 3,
    "attainmentName": "AG33",
    "attainmentType":"number",
    "attainmentTarget":100,
    "attainmentFinish":85,
    "attainmentRate": 85,
    "kebabColor": "hsl(124, 70%, 50%)",
    "star": 2,
  },
  {
    "attainmentId": 4,
    "attainmentName": "AG44",
    "attainmentType":"number",
    "attainmentTarget":100,
    "attainmentFinish":25,
    "attainmentRate": 25,
    "kebabColor": "hsl(124, 70%, 50%)",
    "star": 0,
  },
  {
    "attainmentId": 5,
    "attainmentName": "AG55",
    "attainmentType":"number",
    "attainmentTarget":100,
    "attainmentFinish":85,
    "attainmentRate": 85,
    "kebabColor": "hsl(124, 70%, 50%)",
    "star": 0,
  },
]
const modifiedData1 = data1
.filter(item => item.star > 0)
.sort((a, b) => b.attainmentRate - a.attainmentRate)
.slice(0, 4); 
const modifiedData2 = data2
.filter(item => item.star > 0) 
.sort((a, b) => b.attainmentRate - a.attainmentRate)
.slice(0, 4); 

const height1 = modifiedData1.length * 50;
const height2 = modifiedData2.length * 50;

const navigateToBoardList = () => {
  window.location.href = '/boardlist'; // This will cause the browser to navigate to the 'BoardList' page
};
const User = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch posts from localStorage or a server
    const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    setPosts(storedPosts.slice(0, 3)); // Display only 3 posts for simplicity
  }, []);

  return(
    <div className="user">

      <div className='homeMiddle'>

      <div className='homeFirstMiddle'>
          <div className='plant'style={{backgroundColor: 'white' }}>식물이미지</div>
          <div className='firstMiddleText'>
            <div className='calendar' style={{backgroundColor: 'white' }}>2024.07.20 13:45:42(sat)</div>
            <div className='saying' style={{backgroundColor: 'white' }}>일이 불가능하다고 믿는 것은 일을 불가능하게 하는 것이다.<br/>
              -풀러-
            </div>
          </div>
        </div>

        <div className='homeSecondMiddle'> 
        <div className='toDoList' style={{backgroundColor: 'white' }}>해야 할 일을 정리해보세요 
        TodoList 3개만
        </div>
        <div className='circleSchedule' style={{backgroundColor: 'white' }}>원그래프 일정</div>
        </div>

        <div className='homeThirdMiddle' >
          <div className='progress'style={{backgroundColor: 'white' }}>
            <div className='progress1' style={{ height: `${height1}px` }}>
              <ToFullList URL="attainmentMain"></ToFullList>
              <Attainment data={modifiedData1} padding={0.05} type={'short'}></Attainment>
            </div>
            <div className='progress2' style={{ height: `${height2}px` }}>
              <Attainment data={modifiedData2} padding={0.05} type={'long'}></Attainment>
            </div>
          </div>
          <div className='board' style={{backgroundColor: 'white'}}>
          <div className="userBoardList">
        <h2>최근 게시글</h2>
        <button onClick={navigateToBoardList} className="addButton">+</button>
        <table className="userBoardListTable">
          <thead>
            <tr>
              <th>제목</th>
              <th>카테고리</th>
              <th>등록일</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post, index) => (
              <tr key={index}>
                <td>{post.title}</td>
                <td>{post.category}</td>
                <td>{post.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
        
      </div>
    </div>
    </div>
      <div className='homeForthMiddle'>
          <div className='studyGroup' style={{backgroundColor: 'white' }}>내 스터디 그룹</div>
          <div className='openChat' style={{backgroundColor: 'white' }}>같은 분야를 공부하는 사람들과 질문을 주고 받으세요!</div>
        </div>
        </div>
      
    </div>
  );
};
export default User;