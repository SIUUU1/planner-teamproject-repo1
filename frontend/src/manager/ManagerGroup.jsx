import ManagerMenuInfo from "./ManagerMenuInfo";
import './ManagerHome.css';
import useLoading from "../util/useLoading";
import GroupItem from  './items/GroupItem';
import Button from '../components/Button';
import React, { useState, useEffect } from 'react';
import Pagination from '../components/Pagination';
import useMove from '../util/useMove';

const ManagerGroup=()=>{
  const [groups, setGroups] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); // 초기값 10
  const [totalPages, setTotalPages] = useState(0);

  const { data, loading, error, refetch } = useLoading('http://localhost:8080/api/group/list', 'json');
  const { data: categroyData, loading: loadingCategory , error : errorCategory, refetch: refetchCategory } = useLoading('http://localhost:8080/api/category/list', 'json');

  useEffect(() => {
    if (data) {
      setGroups(data);
      setTotalPages(Math.ceil(data.length / itemsPerPage));
    }
  }, [data, itemsPerPage, categroyData]);

  // 페이지 이동
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const indexOfLastGroup = currentPage * itemsPerPage;
  const indexOfFirstGroup = indexOfLastGroup - itemsPerPage;
  const currentGroups = groups.slice(indexOfFirstGroup, indexOfLastGroup);

  const moveToEdit = useMove('/manager/group/cateedit');

  if(loadingCategory || loading){
    return <div>loading</div>;
  }
  return(
    <div className="managerGroup">
      <div className="managerContent backWhite">
        <ManagerMenuInfo/>
        
        <div className="writeBtnDiv">
        <Button text={'카테고리 수정'} onClick={moveToEdit} className={'writeBtn'}/>
        </div>
        <table className="UserTable" style={{ tableLayout: 'fixed', width: '100%' }}>
          <thead>
            <tr>
              <th style={{ width: '70px' }}>번호</th>
              <th style={{ width: '70px' }}>카테고리</th>
              <th style={{ width: '250px' }}>그룹 생성자 ID</th>
              <th style={{ width: '150px' }}>그룹명</th>
              <th style={{ width: '70px' }}>인원수</th>
              <th style={{ width: '220px' }}>목표</th>
              <th style={{ width: '40px' }}>삭제</th>
            </tr>
          </thead>
          <tbody>
          {currentGroups && currentGroups.map((i, index) => (
              <GroupItem key={i.group_id} data={i} refetch={refetch} category={categroyData} no={indexOfFirstGroup + index + 1}/>
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
export default ManagerGroup;