import './Home.css';
import { useParams } from 'react-router-dom';
import Attainment from '../attainment/Attainment';
import ToFullList from '../components/ToFullList';
import TodoItem from '../todoList/TodoItem';
import useLoading from '../util/useLoading';
import Advice from '../components/Advice';
import Weather from '../components/Weather';
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import useMove from '../util/useMove';
import GroupList from '../components/GroupList';
import Modal from '../studygroup/Modal';
import BoardItem from '../components/BoardItem';
import {useUser} from '../contexts/UserContext'

const currentDate = dayjs().format('YYYY-MM-DD');
const StudyGroup = () => {
  //유저 정보
  const {user:userData}=useUser(); 
  // 그룹 ID 받기
  const { group_id} = useParams();
  // 스터디 그룹의 정보를 가져온다.
  const { data: groupData, loading: loadingGroup, error: errorGroup } = useLoading(`http://localhost:8080/api/group/read/${group_id}`, 'json');
  const [selectedImage, setSelectedImage] = useState('/images/cat1.jpg');
  
  // 명언
  const [advice, setAdvice] = useState({ message: '', author: '' });
  const { data: adviceData, loading: loadingAdvice, error: errorAdvice } = useLoading('http://localhost:8080/api/advice', 'json');
  
  // 날씨
  const [weather, setWeather] = useState({ date: '', sky: '', pty: '' });
  const { data: weatherData, loading: loadingWeather, error: errorWeather } = useLoading('http://localhost:8080/api/weather', 'json');

  // 게시판
  const { data: boardListData = [], loading: loadingBoardList, error: errorBoardList, refetch: refetchBoardData } = useLoading('http://localhost:8080/api/board/list', 'json');
  const filteredBoard = groupData && boardListData && boardListData.length > 0 ? boardListData
    .filter(board => board.group_id === groupData.group_id)
    .filter(board => board.step === 0)
    .slice(0, 5) : [];

  //todo 데이터를 로드
  const { data: todoData, loading: loadingTodo, error: errorTodo, refetch: refetchTodo } = useLoading(`http://localhost:8080/api/user/todos/searchGroup?todo_date=${currentDate}&group_id=${group_id}`, 'json');

  
  // 달성표 로드
  const { data: shortData, refetch: refetchShort } = useLoading(`http://localhost:8080/api/user/attainments/searchGroup?attainment_duration=short_term&selectDate=${currentDate}&group_id=${group_id}`, 'json');
  const { data: longData, refetch: refetchLong } = useLoading(`http://localhost:8080/api/user/attainments/searchGroup?attainment_duration=long_term&selectDate=${currentDate}&group_id=${group_id}`, 'json');
  
  const modifiedShortData = shortData ? shortData
    .filter(item => item.star > 0)
    .sort((a, b) => b.star - a.star)
    .slice(0, 4) : null; 
  const modifiedLongData = longData ? longData
    .filter(item => item.star > 0)
    .sort((a, b) => b.star - a.star)
    .slice(0, 4) : null; 

  const heightShort = (modifiedShortData && modifiedShortData.length !== 0) ? modifiedShortData.length * 50 : 50;
  const heightLong = (modifiedLongData && modifiedLongData.length !== 0) ? modifiedLongData.length * 50 : 50;

  const onClickBoard = useMove('/boardlist');

  useEffect(() => {
    if (adviceData) {
      setAdvice(adviceData);
    }
    if (weatherData) {
      setWeather(weatherData);
    }
    if (groupData) {
      let src = '';
      if (groupData.image_url) {
        src = `http://localhost:8080/static/images/profile/${groupData.image_url}`;
        setSelectedImage(src || '/images/cat1.jpg');
      }
    }
  }, [adviceData, weatherData, groupData]);

  // // 로딩 중, 오류 처리
  // if (loadingGroup || loadingBoardList) {
  //   return <div>Loading...</div>;
  // }
  // // 로딩 중, 오류 처리
  // if (loadingScheduler || loadingGroup || loadingBoardList || loadingGroupList) {
  //   return <div>Loading...</div>;
  // }

  // if (errorScheduler) {
  //   return <div>Error: {errorScheduler.message}</div>;
  // }

  return (
    <div className="home">
      <div className='homeMiddle'>
        <div className='homeFirstMiddle'>
          <div className='plant backWhite'>{/* 식물 이미지 */}
            <img src={selectedImage} className="avatar" alt="Selected" />
          </div>
          <div className='firstMiddleText'>
            <div className='calendar backWhite'>
              <Weather date={weather.date} skyState={weather.sky} ptyState={weather.pty} error={errorWeather} loading={loadingWeather} />
            </div> 
            <div className='saying backWhite'>
              <Advice message={advice.message} author={advice.author} error={errorAdvice} loading={loadingAdvice} />
            </div>
          </div>
        </div>

        <div className='homeSecondMiddle'>
          <div className='groupToDoList backWhite'>
            <ToFullList URL={`/${group_id}/todomain/Group/${currentDate}`}></ToFullList>
             {(todoData === null || todoData.length === 0) ? (
              <p className='todoListP'>유저가 해야할 일을 등록하지 않았습니다!</p>
            ) : (
              <div className='sliceGroupTodoList'>
                <div className='sliceGroupTodoListLeft'>
                  {todoData.slice(0, 3).map((i) => (
                    <TodoItem
                    key={i.todo_no}
                    todoData={i}
                    clickEvent={`/todoDetail/${i.todo_no}/my/${currentDate}`}
                    userData={userData}
                    />
                  ))}
                </div>
                <div className='sliceGroupTodoListRight'>
                  {todoData.slice(3, 6).map((i) => (
                    <TodoItem
                    key={i.todo_no}
                    todoData={i}
                    clickEvent={`/todoDetail/${i.todo_no}/my/${currentDate}`}
                    userData={userData}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className='homeThirdMiddle'>
          <div className='progress backWhite'>
            <div className='progress1' style={{ height: `${heightShort}px` }}>
              <ToFullList URL={`/attainmentMain/group/${group_id}`} />
              {modifiedShortData && modifiedShortData.length !== 0 ? modifiedShortData.map((i) => (
                <Attainment key={i.id} data={i} padding={0.2} />
              )) : 
              <div className='progressInfo'><p>등록된 오늘의 목표가 없습니다!</p></div>}
            </div>
            <div className='progress2' style={{ height: `${heightLong}px` }}>
              {modifiedLongData && modifiedLongData.length !== 0 ? modifiedLongData.map((i) => (
                <Attainment key={i.id} data={i} padding={0.2} />
              )) : 
              <div className='progressInfo'><p>등록된 장기적인 목표가 없습니다!</p></div>}
            </div>
          </div>
          
          <div className='board backWhite'>
            {/* 게시판 부분
            <ToFullList URL={`/boardlist/${user_id}`} />
            <div className='board1'>
              {filteredBoard && filteredBoard.length > 0 ? 
               filteredBoard.map((board, index) => (<BoardItem key={index} board={board} user_id={user_id}/>))
              )) : 
              <div className='boardInfo'><p>등록된 게시물이 없습니다!</p></div>}
            </div>
            */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyGroup;
