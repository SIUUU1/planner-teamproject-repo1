import './Home.css';
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
import { useUser } from '../contexts/UserContext'; // UserContext에서 가져오기
import { useTheme } from '../contexts/ThemeContext'; // ThemeContext에서 가져오기

const currentDate = dayjs().format('YYYY-MM-DD');

const Home = ()=>{
  const { user } = useUser(); // UserContext에서 사용자 정보 가져오기
  const { userThemeData } = useTheme(); // ThemeContext에서 사용자 테마 정보 가져오기

  // //사용자 정보를 가져옵니다.
  // const { data: user, loading: loadingUser, error: errorLoadingUser } = useLoading('http://localhost:8080/api/user/userInfo', 'json');
  const [selectedImage, setSelectedImage] = useState('/images/cat1.jpg');
   // 스케쥴 데이터 로드
  const { data: SchedulerData= [], loading: loadingScheduler, error: errorScheduler } = useLoading(`http://localhost:8080/api/user/schedule/search?reg_date=${currentDate}`, 'json');
  const modifiedScheduleData = useFillSchedule(SchedulerData || []);
  
  //명언
  const [advice , setAdvice]= useState({message:'',author:'',});
  const { data: adviceData, loading: loadingAdvice, error: errorAdvice } = useLoading('http://localhost:8080/api/advice', 'json');
  
  // 날씨
  const [weather , setWeather]= useState({date:'', sky:'', pty:'',});
  const { data: weatherData, loading: loadingWeather, error: errorWeather } = useLoading('http://localhost:8080/api/weather', 'json');

  // 게시판
  const { data: boardListData=[], loading: loadingBoardList, error: errorBoardList, refetch: refetchBoardData } = useLoading('http://localhost:8080/api/board/list', 'json');
  const filteredBoard = user && boardListData && boardListData.length > 0 ? boardListData
    .filter(board => board.user_id === user.user_id)
    .filter(board => board.step === 0)
    .slice(0, 5) : [];

  // 그룹
  const { data: myGroupListData = [], loading: loadingMyGroupList, error: errorMyGroupList, refetch: refetchMyGroupList } = useLoading('http://localhost:8080/api/group/list/my', 'json');
  const filteredGroup = myGroupListData && myGroupListData.length > 0 ? myGroupListData.slice(0, 5) : [];
  const [selectedGroup, setSelectedGroup] = useState(null); 

  // todo 데이터 로드
  const { data: todoData, loading: loadingdata, error: errordata } = useLoading(`http://localhost:8080/api/user/todos/search?todo_date=${currentDate}`, 'json');
  
  // 달성표 로드
  const { data:shortData,refetch:refetchShort } = useLoading(`http://localhost:8080/api/user/attainments/search?attainment_duration=short_term&selectDate=${currentDate}`, 'json');
  const { data:longData,refetch:refetchLong } = useLoading(`http://localhost:8080/api/user/attainments/search?attainment_duration=long_term&selectDate=${currentDate}`, 'json');
  
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

  const onClickSchedule=useMove('Schedule');
  const onClickBoard=useMove('/boardlist');
  const onClickGroup=useMove('/groupmain');


  useEffect(() => {
    if (adviceData) {
      setAdvice(adviceData);
    }
    if(weatherData){
      setWeather(weatherData);
    }
    if (user) {
      let src='';
      if(user.image_url){
        src=`http://localhost:8080/static/images/profile/${user.image_url}`;
        setSelectedImage(src || '/images/cat1.jpg');
      }
    }
  }, [adviceData,weatherData,user]);


  // 로딩 중, 오류 처리
  if (loadingScheduler) {
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
          <ToFullList URL={`/todomain/my/${currentDate}`}></ToFullList>
          {(todoData===null||todoData.length === 0) ? (
            <p className='todoListP'>오늘 해야할 일을 정리해보세요!</p>
          ) : (
            <div className='sliceTodoList'>
              {todoData.slice(0, 3).map((i) => (
                <TodoItem
                  key={i.todo_no}
                  todoData={i}
                  clickEvent={`/todoDetail/${i.todo_no}/my/${currentDate}`}
                  user={user}
                />
              ))}
            </div>
          )}
        </div>
        <div className='circleSchedule backWhite' onClick={onClickSchedule}>
          {modifiedScheduleData.length===1? 
          <>
            <ToFullList URL="schedule"></ToFullList>
            <p className='schedulInfo'>오늘의 스케쥴을 정리해보세요!</p>
          </>
          :<SchedulerChart data={modifiedScheduleData}></SchedulerChart>}
          </div>
        </div>

        <div className='homeThirdMiddle' >
          <div className='progress backWhite'>
            <div className='progress1' style={{ height: `${heightShort}px` }}>
              <ToFullList URL="attainmentMain"></ToFullList>
              {(modifiedShortData&&modifiedShortData.length!==0)?modifiedShortData.map((i) => (<Attainment key={i.id} data={i} padding={0.2}/>)) : 
              <div className='progressInfo'><p>오늘의 목표를 세워 보세요!</p></div>}
            </div>
            <div className='progress2' style={{ height: `${heightLong}px` }}>
            {(modifiedLongData&&modifiedLongData.length!==0) ? modifiedLongData.map((i) => (<Attainment key={i.id} data={i} padding={0.2}/>)) : 
              <div className='progressInfo'><p>장기적인 목표를 세워 보세요!</p></div>}
            </div>
          </div>
          
          <div className='board backWhite'>
          <ToFullList URL={`/boardlist`}/>
            <div className='board1'>
          {filteredBoard&&filteredBoard.length!==0?(
              filteredBoard.map((board, index) => (<BoardItem key={index} board={board}/>))
          ):(
            <div className='progressInfo'>게시글을 작성해보세요!</div>
          )}
           </div>
          </div>
        </div>
        
        <div className='homeForthMiddle'>
          <div className='studyGroup backWhite'>
          <ToFullList URL={`/groupmain`}/>
          <div className='studyGroup1'>
          {filteredGroup&&filteredGroup.length!==0?(
              filteredGroup.map((group, index) => (<GroupList key={index} group={group} onClick={() => setSelectedGroup(group)}/>))
          ):(
            <div className='progressInfo'>내 목표에 맞는 그룹에 가입해보세요!</div>
          )}
          </div>
          </div>
        </div>
      </div>

       {/* 모달 표시 */}
       {selectedGroup && <Modal group={selectedGroup} onClose={() => setSelectedGroup(null)} />}
    </div>
  );
};
export default Home;