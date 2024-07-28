import './Home.css';
import Footer from '../components/Footer';

const Home = ()=>{

  return(
    <div className="home">

      <div className='homeMiddle'>

        <div className='homeFirstMiddle'>
          <div className='plant'>식물이미지</div>
          <div className='firstMiddleText'>
            <div className='calendar'>2024.07.20 13:45:42(sat)</div>
            <div className='saying'>일이 불가능하다고 믿는 것은 일을 불가능하게 하는 것이다.<br/>
              -풀러-
            </div>
          </div>
        </div>

        <div className='homeSecondMiddle'> 
        <div className='toDoList'>해야 할 일을 정리해보세요 
        TodoList 3개만
        </div>
        <div className='circleSchedule'>원그래프 일정</div>
        </div>

        <div className='homeThirdMiddle'>
          <div className='progress'>진행률</div>
          <div className='board'>게시판</div>
        </div>
        
        <div className='homeForthMiddle'>
          <div className='studyGroup'>내 스터디 그룹</div>
          <div className='openChat'>같은 분야를 공부하는 사람들과 질문을 주고 받으세요!</div>
        </div>
      </div>
      
      <Footer/>
    </div>
  );
};
export default Home;