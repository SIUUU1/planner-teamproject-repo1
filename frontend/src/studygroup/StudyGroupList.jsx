import './StudyGroupList.css';
import GroupItem from './GroupItem';

const StudyGroupList = ({ groups, onItemClick })=>{
  return(
    <div className="groupList">
      {groups.map((group,index) => (
        <GroupItem key={index} group={group} onClick={onItemClick} />
      ))}
    </div>
  );
};
export default StudyGroupList;