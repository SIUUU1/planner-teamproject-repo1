import ManagerMenuInfo from "./ManagerMenuInfo";
import './ManagerHome.css';
import useLoading from "../util/useLoading";
import GroupItem from  './items/GroupItem';

const ManagerGroup=()=>{
  const { data, loading, error, refetch } = useLoading('http://localhost:8080/api/group/list', 'json');
  return(
    <div className="managerGroup">
      <div className="managerContent backWhite">
        <ManagerMenuInfo/>
        <div className="{managerGroupList">
        <table className="UserTable" style={{ tableLayout: 'fixed', width: '100%' }}>
          <thead>
            <tr>
              <th style={{ width: '70px' }}>카테고리</th>
              <th style={{ width: '250px' }}>그룹 생성자 ID</th>
              <th style={{ width: '150px' }}>그룹명</th>
              <th style={{ width: '70px' }}>인원수</th>
              <th style={{ width: '220px' }}>목표</th>
              <th style={{ width: '40px' }}>삭제</th>
            </tr>
          </thead>
          <tbody>
          {data && data.map((i) => (
              <GroupItem key={i.group_id} data={i} refetch={refetch}/>
            ))}
          </tbody>
        </table>
        </div>
      </div>
      
    </div>
  )
}
export default ManagerGroup;