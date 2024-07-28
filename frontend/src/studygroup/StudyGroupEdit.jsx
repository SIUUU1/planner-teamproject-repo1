import Button from '../components/Button';
import StudyGroupEditor from './StudyGroupEditor';
import DateNav from "../components/DateNav";

//전체 데이터에서 id에 해당됭 객체를 찾는다.

const StudyGroupEdit =()=>{
  return(
    <div className="studyGroupEdit">
      <div className="studyGroupNew">
      {/* initItem 넘기기 */}
      <DateNav title={'그룹 수정하기'} secondChild={<Button text={'삭제'}/>}/>
      <StudyGroupEditor/>
    </div>
    </div>
  );
};
export default StudyGroupEdit;