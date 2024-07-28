import Button from '../components/Button';
import StudyGroupList from './StudyGroupList';
import DateNav from "../components/DateNav";


const StudyGroupMain =()=>{
  return(
    <div className='studyGroupMain'> 
       {/* 추가 버튼 클릭시 검색기능과 추가생성기능 필요 */}
      <DateNav title={'스터디 그룹'} secondChild={<Button text={'추가'}/>}/>
      {/* 현재 계정의 스터디그룹 */}
      <StudyGroupList />
      </div>
  );
};
export default StudyGroupMain;