import ManagerMenuInfo from "./ManagerMenuInfo";
// import './ManagerHome.css';
import useLoading from "../util/useLoading";
import UserItem from "./items/UserItem";
const ManagerUser=()=>{
  const { data, loading, error, refetch } = useLoading('http://localhost:8080/api/user/list', 'json');
  if (loading) {
    return <div className="managerUser"><div className="managerContent backWhite">Loading...</div></div>;
  }

  if (error) {
    return <div className="managerUser"><div className="managerContent backWhite">Error: {error}</div></div>;
  }
  return (
    <div className="managerUser">
      <div className="managerContent backWhite">
        <ManagerMenuInfo />
        <table className="UserTable" style={{ tableLayout: 'fixed', width: '100%' }}>
          <thead>
            <tr>
              <th style={{ width: '70px' }}>이름</th>
              <th style={{ width: '250px' }}>ID</th>
              <th style={{ width: '150px' }}>권한</th>
              <th style={{ width: '120px' }}>전화번호</th>
              <th style={{ width: '220px' }}>Email</th>
              <th style={{ width: '40px' }}>성별</th>
              <th style={{ width: '50px' }}>삭제</th>
            </tr>
          </thead>
          <tbody>
            {data && data.map((user) => (
              <UserItem key={user.user_id} data={user} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManagerUser;