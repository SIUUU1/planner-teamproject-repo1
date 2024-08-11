import Button from '../components/Button';
import StudyGroupList from './StudyGroupList';
import DateNav from "../components/DateNav";

const StudyGroupSearch =()=>{
  
  return(
    <div className="studyGroupSearch">
      <DateNav secondChild={<Button text={'추가'}/>}/>
      {/* 존재하는 모든 스터디그룹 필터링하기*/}
      <StudyGroupList/>
    </div>
  );
};
export default StudyGroupSearch;