import './NotificationList.css'
import React, { useState, useEffect } from 'react';
import useLoading from '../util/useLoading';
import useSendPost from '../util/useSendPost';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Pagination from '../components/Pagination';
import { faX } from "@fortawesome/free-solid-svg-icons";
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

const NotificationList =()=>{
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const nav = useNavigate();

  // 알림 리스트
  const { data: notifyListData, loading: loadingNotifyList, error: errorNotifyList, refetch: refetchNotifyList } = useLoading('http://localhost:8080/api/user/notify/list', 'json');
  const [notifies, setNotifies] = useState([]);

  useEffect(() => {
    if(notifyListData ){
      setNotifies(notifyListData);
      setTotalPages(Math.ceil(notifyListData.length / itemsPerPage));
    } 
  }, [notifyListData, itemsPerPage]);

  // 삭제
  const deleteRequest = useSendPost('http://localhost:8080/api/notify/delete',{},'json');
  const onDelete = async(notify)=>{
    try {
      await deleteRequest.postRequest({ notifications_id: notify.notifications_id });
      alert(`알림 삭제 성공`);
    } catch (error) {
      console.error("Error delete:", error);
    }
    refetchNotifyList();
  };

  // 비우기
  const delAllRequest = useSendPost('http://localhost:8080/api/notify/deleteAll','json');
  const onDelAll = async()=>{
    try {
      await delAllRequest.postRequest();
      alert(`알림 비우기 성공`);
    } catch (error) {
      console.error("Error delete:", error);
    }
    refetchNotifyList();
  };

  // 읽음 표시
  const upReadRequest = useSendPost('http://localhost:8080/api/notify/updateRead','json');
  const onUpRead = async(notify)=>{
    if(notify.is_read !==0){
      return;
    }
    try {
      await upReadRequest.postRequest({notifications_id : notify.notifications_id});
      if(notify.link !== '-'){
        nav(`${notify.link}`);
      }
    } catch (error) {
      console.error("Error updateRead:", error);
    }
    refetchNotifyList();
  };

  const indexOfLastNotify = currentPage * itemsPerPage;
  const indexOfFirstNotify = indexOfLastNotify - itemsPerPage;
  const currentNotifies = notifies.slice(indexOfFirstNotify, indexOfLastNotify);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // 글자수 대로 자르기
  const truncateContent = (content) => {
    if (content.length > 20) {
      const truncatedText = `${content.substring(0, 20)}...`;
      return truncatedText;
    }
    return content; // 텍스트가 20자 이하라면 그대로 반환
  };

  if(loadingNotifyList){
    return(<div>loading...</div>);
  }
  return(
    <div className='notificationList backWhite'>
      <h3>알림</h3>
      <div className="notiHeader">
        <button onClick={onDelAll}>비우기</button>
      </div>
      <table>
                <thead>
                    <tr>
                        <th style={{ width: '80px' }}>번호</th>
                        <th style={{ width: '300px' }}>내용</th>
                        <th style={{ width: '120px' }}>날짜</th>
                        <th style={{ width: '80px' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {currentNotifies.map((notify, index) => (
                        <tr key={notify.notifications_id}  >
                            <td>{index+1}</td>
                            <td className={notify.is_read !==0 ?('isRead'):''} onClick={()=>{onUpRead(notify);}}>{truncateContent(notify.content)}</td>
                            <td className={notify.is_read !==0 ?('isRead'):''} onClick={()=>{onUpRead(notify);}}>{formatDate(notify.sent_at)}</td>
                            <td><Button text={<FontAwesomeIcon icon={faX} onClick={()=>{onDelete(notify)}} />}/></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination">
            <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
            </div>
    </div>
  );
};
export default NotificationList;