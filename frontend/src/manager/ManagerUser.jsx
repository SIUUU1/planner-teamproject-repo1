import ManagerMenuInfo from "./ManagerMenuInfo";
// import './ManagerHome.css';
import useLoading from "../util/useLoading";
import UserItem from "./items/UserItem";
import Pagination from '../components/Pagination';
import React, { useState, useEffect } from 'react';

const ManagerUser=()=>{
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); // 초기값 5
  const [totalPages, setTotalPages] = useState(0);
  
  const { data, loading, error, refetch } = useLoading('http://localhost:8080/api/user/list', 'json');
  
  useEffect(() => {
    if (data) {
      setUsers(data);
      setTotalPages(Math.ceil(data.length / itemsPerPage));
    }
  }, [data, itemsPerPage]);

  // 페이지 이동
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);


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
              <th style={{ width: '70px' }}>번호</th>
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
            {currentUsers && currentUsers.map((user, index) => (
              <UserItem key={user.user_id} data={user} refetch={refetch} no={indexOfFirstUser + index + 1}/>
            ))}
          </tbody>
        </table>
        <div className='pagination'>
        <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
        </div>
      </div>
    </div>
  );
};

export default ManagerUser;