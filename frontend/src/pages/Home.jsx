import './Home.css';
import Attainment from '../attainment/Attainment';
import ToFullList from '../components/ToFullList';
import TodoItem from '../todoList/TodoItem';
import SchedulerChart from '../scheduler/SchedulerChart';
import useLoading from '../util/useLoading';
import useFillSchedule from '../util/useFillSchedule';
import Advice from '../components/Advice';
import Weather from '../components/Weather';
import { useState,useEffect } from 'react';
import dayjs from 'dayjs';
import useMove from '../util/useMove';

//달성표 테스트 데이터
const data1 = [
  {
    "attainmentId": 0,
    "attainmentName": "팀프로젝트하기",
    "attainmentType":"time",
    "attainmentTarget":100,
    "attainmentFinish":10,
    "attainmentRate": 10,
    "star": 10,

  },
  {
    "attainmentId": 1,
    "attainmentName": "100",
    "attainmentType":"time",
    "attainmentTarget":100,
    "attainmentFinish":100,
    "attainmentRate": 100,
    "star": 1,
  },
  {
    "attainmentId": 2,
    "attainmentName": "AF22",
    "attainmentType":"number",
    "attainmentTarget":100,
    "attainmentFinish":50,
    "attainmentRate": 50,
    "star": 11,
  },
  {
    "attainmentId": 4,
    "attainmentName": "AG44",
    "attainmentType":"number",
    "attainmentTarget":100,
    "attainmentFinish":25,
    "attainmentRate": 25,
    "star": 0,
  },
  {
    "attainmentId": 5,
    "attainmentName": "AG55",
    "attainmentType":"number",
    "attainmentTarget":100,
    "attainmentFinish":85,
    "attainmentRate": 85,
    "star": 0,
  },
]
//달성표 테스트 데이터
const data2 = [
  {
    "attainmentId": 0,
    "attainmentName": "팀프로젝트하기",
    "attainmentType":"time",
    "attainmentTarget":100,
    "attainmentFinish":10,
    "attainmentRate": 10,
    "star": 0,

  },
  {
    "attainmentId": 1,
    "attainmentName": "100",
    "attainmentType":"time",
    "attainmentTarget":100,
    "attainmentFinish":100,
    "attainmentRate": 100,
    "star": 1,
  },
  {
    "attainmentId": 2,
    "attainmentName": "AF22",
    "attainmentType":"number",
    "attainmentTarget":100,
    "attainmentFinish":50,
    "attainmentRate": 50,
    "star": 6,
  },
  {
    "attainmentId": 3,
    "attainmentName": "AG33",
    "attainmentType":"number",
    "attainmentTarget":100,
    "attainmentFinish":85,
    "attainmentRate": 85,
    "star": 7,
  },
  {
    "attainmentId": 4,
    "attainmentName": "AG44",
    "attainmentType":"number",
    "attainmentTarget":100,
    "attainmentFinish":25,
    "attainmentRate": 25,
    "star": 10,
  },
  {
    "attainmentId": 5,
    "attainmentName": "AG55",
    "attainmentType":"number",
    "attainmentTarget":100,
    "attainmentFinish":85,
    "attainmentRate": 85,
    "star": 0,
  },
]

const modifiedData1 = data1
.filter(item => item.star > 0)
.sort((a, b) => b.star - a.star)
.slice(0, 4); 
const modifiedData2 = data2
.filter(item => item.star > 0) 
.sort((a, b) => b.star - a.star)
.slice(0, 4); 

const height1 = modifiedData1.length * 50;
const height2 = modifiedData2.length * 50;
const currentDate = dayjs().format('YYYY-MM-DD');

const Home = ()=>{

  //사용자 정보를 가져옵니다.
  const { data: userData, loading: loadingUser, error: errorLoadingUser } = useLoading('http://localhost:8080/api/user/userInfo', 'json');

   // 스케쥴 데이터 로드
  const { data: SchedulerData, loading: loadingScheduler, error: errorScheduler } = useLoading('http://localhost:8080/api/schedule/1', 'json');
  const modifiedScheduleData = useFillSchedule(SchedulerData || []);
  
  //명언
  const [advice , setAdvice]= useState({message:'',author:'',});
  const { data: adviceData, loading: loadingAdvice, error: errorAdvice } = useLoading('http://localhost:8080/api/advice', 'json');
  
  // 날씨
  // const [weather , setWeather]= useState({date:'', sky:'', pty:'',});
  // const { data: weatherData, loading: loadingWeather, error: errorWeather } = useLoading('http://localhost:8080/api/weather', 'json');
  
  // todo 데이터 로드
  const { data: todoData, loading: loadingdata, error: errordata } = useLoading(`http://localhost:8080/api/user/todos/search?reg_date=${currentDate}`, 'json');



  useEffect(() => {
    if (adviceData) {
      setAdvice(adviceData);
    }
    // if(weatherData){
    //   setWeather(weatherData);
    // }
  }, [adviceData/*,weatherData*/]);


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
          <div className='plant backWhite'>식물이미지</div>
          <div className='firstMiddleText'>
             <div className='calendar backWhite'>
              {/*2024.07.20 13:45:42(sat)
              {<Weather date={weather.date} skyState={weather.sky} ptyState={weather.pty} error={errorWeather} loading={loadingWeather}/>}
            */}</div> 
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
              {todoData.slice(0, 4).map((i) => (
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
        <div className='circleSchedule backWhite'>
          <SchedulerChart data={modifiedScheduleData}></SchedulerChart>
          </div>
        </div>

        <div className='homeThirdMiddle' >
          <div className='progress backWhite'>
            <div className='progress1' style={{ height: `${height1}px` }}>
              <ToFullList URL="attainmentMain"></ToFullList>
              <Attainment data={modifiedData1} padding={0.05} type={'short'}></Attainment>
            </div>
            <div className='progress2' style={{ height: `${height2}px` }}>
              <Attainment data={modifiedData2} padding={0.05} type={'long'}></Attainment>
            </div>
          </div>
          <div className='board backWhite'>게시판</div>
        </div>
        
        <div className='homeForthMiddle'>
          <div className='studyGroup backWhite'>내 스터디 그룹</div>
          <div className='openChat backWhite'>같은 분야를 공부하는 사람들과 질문을 주고 받으세요!</div>
        </div>
      </div>
    </div>
  );
};
export default Home;