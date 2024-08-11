import StudyGroup from './StudyGroup';
import './StudyGroupList.css';
import Button from '../components/Button';

const StudyGroupList = ()=>{
  return(
    <div className='studyGroupList'> 
      <div className='groupListWrapper'>
        <table>
          <thead>
            <tr>
            <td>그룹이미지</td>
            <td>카테고리</td>
            <td>그룹명</td>
            <td>목표</td>
            <td>그룹장</td>
            <td>인원수</td>
            <td>시작일</td>
            <td>삭제</td>
            </tr>
          </thead>
          <tbody > 
          <StudyGroup/>
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default StudyGroupList;