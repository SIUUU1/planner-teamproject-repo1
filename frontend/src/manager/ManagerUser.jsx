import ManagerMenuInfo from "./ManagerMenuInfo";
import './ManagerHome.css';
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
  return(
    <div className="managerUser">
      <div className="managerContent backWhite">
        <ManagerMenuInfo/>
        {data&&data.map((i)=>(<UserItem key={i.user_id} data={i}/>))}
      </div>
    </div>
  )
}
export default ManagerUser;