import './Home.css';
import { useParams } from 'react-router-dom';
import Attainment from '../attainment/Attainment';
import ToFullList from '../components/ToFullList';
import TodoItem from '../todoList/TodoItem';
import SchedulerChart from '../schedule/ScheduleChart';
import useLoading from '../util/useLoading';
import useFillSchedule from '../util/useFillSchedule';
import Advice from '../components/Advice';
import Weather from '../components/Weather';
import { useState,useEffect } from 'react';
import dayjs from 'dayjs';
import useMove from '../util/useMove';
import GroupList from '../components/GroupList';
import Modal from '../studygroup/Modal';
import BoardItem from '../components/BoardItem';
import { useTheme } from '../contexts/ThemeContext';
const currentDate = dayjs().format('YYYY-MM-DD');

const Home = ()=>{
  const {theme, updateTheme } = useTheme(); 
  //사용자 정보를 가져옵니다.
  const { data: userData, loading: loadingUser, error: errorLoadingUser } = useLoading('http://localhost:8080/api/user/userInfo', 'json');
  //유저 ID 받기
  const { user_id } = useParams();
  //유저의 정보를 가져온다.
  const { data: otherUserData, loading: loadingOtherUser, error: errorOtherUser } = useLoading(`http://localhost:8080/api/user/userInfo/${user_id}`, 'json');
  const [selectedImage, setSelectedImage] = useState('/images/cat1.jpg');
  
  //명언
  const [advice , setAdvice]= useState({message:'',author:'',});
  const { data: adviceData, loading: loadingAdvice, error: errorAdvice } = useLoading('http://localhost:8080/api/advice', 'json');
  
  // 날씨
  const [weather , setWeather]= useState({date:'', sky:'', pty:'',});
  const { data: weatherData, loading: loadingWeather, error: errorWeather } = useLoading('http://localhost:8080/api/weather', 'json');

  // 게시판
  const { data: boardListData=[], loading: loadingBoardList, error: errorBoardList, refetch: refetchBoardData } = useLoading('http://localhost:8080/api/board/list', 'json');
  const filteredBoard = otherUserData && boardListData && boardListData.length > 0 ? boardListData
    .filter(board => board.user_id === otherUserData.user_id)
    .filter(board => board.step === 0)
    .slice(0, 5) : [];

  // 그룹
  const { data: GroupListData = [], loading: loadingGroupList, error: errorMroupList, refetch: refetchMyGroupList } = useLoading(`http://localhost:8080/api/group/${user_id}/list`, 'json');
  const filteredGroup = GroupListData && GroupListData.length > 0 ? GroupListData.slice(0, 5) : [];
  const [selectedGroup, setSelectedGroup] = useState(null); 

  // todo 데이터를 로드
  const [todoUrl, setTodoUrl] = useState(null);
  const { data: todoData, loading: loadingTodo, error: errorTodo, refetch: refetchTodo } = useLoading(todoUrl, 'json');

  // 스케쥴 데이터 로드
  const { data: schedulerData= [], loading: loadingScheduler, error: errorScheduler } = useLoading(`http://localhost:8080/api/user/schedule/searchUser?reg_date=${currentDate}&user_id=${user_id}`, 'json');
  const modifiedScheduleData = useFillSchedule(schedulerData || []);
  // 달성표 로드
  const { data:shortData,refetch:refetchShort } = useLoading(`http://localhost:8080/api/user/attainments/searchUser?attainment_duration=short_term&selectDate=${currentDate}&user_id=${user_id}`, 'json');
  const { data:longData,refetch:refetchLong } = useLoading(`http://localhost:8080/api/user/attainments/searchUser?attainment_duration=long_term&selectDate=${currentDate}&user_id=${user_id}`, 'json');
  
  // user_id에 따라 테마 업데이트
  useEffect(() => {
    if (user_id) {
      updateTheme('other', user_id);
    } else {
      updateTheme('user');
    }
  }, [user_id, updateTheme]);
  
  const modifiedShortData = shortData?shortData
    .filter(item => item.star > 0)
    .sort((a, b) => b.star - a.star)
    .slice(0, 4):null; 
  const modifiedLongData = longData?longData
    .filter(item => item.star > 0) 
    .sort((a, b) => b.star - a.star)
    .slice(0, 4):null; 

  const heightShort = (modifiedShortData&&modifiedShortData.length!==0)?modifiedShortData.length * 50:50;
  const heightLong = (modifiedLongData&&modifiedLongData.length!==0)?modifiedLongData.length * 50:50;

  const onClickSchedule=useMove(`/schedule/${user_id}`);
  const onClickBoard=useMove('/boardlist');


  useEffect(() => {
    if (adviceData) {
      setAdvice(adviceData);
    }
    if(weatherData){
      setWeather(weatherData);
    }
    if (otherUserData) {
      let src='';
      if(otherUserData.image_url){
        src=`http://localhost:8080/static/images/profile/${otherUserData.image_url}`;
        setSelectedImage(src || '/images/cat1.jpg');
      }

       // user_no를 기반으로 todo 데이터를 가져올 URL 설정
       setTodoUrl(`http://localhost:8080/api/user/todos/searchUser?todo_date=${currentDate}&&user_no=${otherUserData.user_no}`);
      
    }
  }, [adviceData,weatherData,otherUserData]);


  // 로딩 중, 오류 처리
  if (loadingScheduler||loadingOtherUser||loadingBoardList||loadingGroupList) {
    return <div>Loading...</div>;
  }


  if (errorScheduler) {
      return <div>Error: {errorScheduler.message}</div>;
  }
  return(
    <div className="home">

      <div className='homeMiddle'>

        <div className='homeFirstMiddle'>
          <div className='plant backWhite'>{/* 식물이미지 */}
            <img src={selectedImage} className="avatar" />
            </div>
          <div className='firstMiddleText'>
             <div className='calendar backWhite'>
              {<Weather date={weather.date} skyState={weather.sky} ptyState={weather.pty} error={errorWeather} loading={loadingWeather}/>}
            </div> 
            <div className='saying backWhite' >
              {<Advice message={advice.message} author={advice.author} error={errorAdvice} loading={loadingAdvice}/>}
            </div>
          </div>
        </div>

      <div className='homeSecondMiddle'> 
        <div className='toDoList backWhite'>
          <ToFullList URL={`/todomain/${otherUserData.user_no}/my/${currentDate}/${otherUserData.user_id}`}></ToFullList>
          {(todoData===null||todoData.length === 0) ? (
            <p className='todoListP'>유저가 해야할 일을 등록하지 않았습니다!</p>
          ) : (
            <div className='sliceTodoList'>
              {todoData.slice(0, 3).map((i) => (
                <TodoItem
                  key={i.todo_no}
                  todoData={i}
                  clickEvent={`/todoDetail/${i.todo_no}/my/${currentDate}`}
                  userData={userData}
                />
              ))}
            </div>
          )}
        </div>
        <div className='circleSchedule backWhite' onClick={onClickSchedule}>
          {modifiedScheduleData.length===1? 
          <>
            <ToFullList URL="schedule"></ToFullList>
            <p className='schedulInfo'> 유저가 스케쥴을 정리하지 않았습니다!</p>
          </>
          :<SchedulerChart data={modifiedScheduleData}></SchedulerChart>}
        </div>
      </div>

        <div className='homeThirdMiddle' >
          <div className='progress backWhite'>
            <div className='progress1' style={{ height: `${heightShort}px` }}>
              <ToFullList URL={`/attainmentMain/${user_id}`}></ToFullList>
              {(modifiedShortData&&modifiedShortData.length!==0)?modifiedShortData.map((i) => (<Attainment key={i.id} data={i} padding={0.2}/>)) : 
              <div className='progressInfo'><p>등록된 오늘의 목표가 없습니다!</p></div>}
            </div>
            <div className='progress2' style={{ height: `${heightLong}px` }}>
            {(modifiedLongData&&modifiedLongData.length!==0) ? modifiedLongData.map((i) => (<Attainment key={i.id} data={i} padding={0.2}/>)) : 
              <div className='progressInfo'><p>등록된 장기적인 목표가 없습니다!</p></div>}
            </div>
          </div>
          
          <div className='board backWhite'>
          <ToFullList URL={`/boardlist/${user_id}`}/>
            <div className='board1'>
          {filteredBoard&&filteredBoard.length!==0?(
              filteredBoard.map((board, index) => (<BoardItem key={index} board={board} user_id={user_id}/>))
          ):(
            <div className='progressInfo'>게시글이 없습니다!</div>
          )}
           </div>
          </div> 
        </div>
        
        <div className='homeForthMiddle'>
          <div className='studyGroup backWhite'>
          <div className='studyGroup1'>
           {filteredGroup&&filteredGroup.length!==0?(
              filteredGroup.map((group, index) => (<GroupList key={index} group={group} onClick={() => setSelectedGroup(group)}/>))
          ):(
            <div className='progressInfo'>유저가 그룹에 가입하지 않았습니다!</div>
          )} 
          </div>
          </div>
        </div>
      </div>

       {/* 모달 표시  */}
       {selectedGroup && <Modal group={selectedGroup} onClose={() => setSelectedGroup(null)} />}
    </div>
  );
};
export default Home;