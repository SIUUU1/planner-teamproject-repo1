import StudyGroupEditor from './StudyGroupEditor';
import DateNav from "../components/DateNav";

const StudyGroupNew =()=>{
  return(
    <div className="studyGroupNew">
      <DateNav title={'그룹 만들기'} />
      <StudyGroupEditor/>
    </div>
  );
};
export default StudyGroupNew;