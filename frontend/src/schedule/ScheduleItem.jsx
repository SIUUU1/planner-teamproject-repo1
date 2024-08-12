import React, { useState,useEffect } from 'react';
import useLoading from '../util/useLoading';

const ScheduleItem=({data,handleEditSchedule,handleDeleteSchedule,convertMinutesToTime})=>{
  //사용자 정보 로드
  const { data: userData=[], loading: loadingUser, error: errorLoadingUser } = useLoading('http://localhost:8080/api/user/userInfo', 'json');
  const [isResigter,setIsResigter]=useState(userData?userData.user_id===data.user_id:false);
  useEffect(() => {
    if (userData && userData.user_no) {
      setIsResigter(userData.user_id===data.user_id);
    }
  }, [userData, data]);
  return(
    <div className="scheduleItem">
              <span className="scheduleTitle">{data.schedule_name}</span>
              <span className="scheduleTime">
                {`${convertMinutesToTime(data.start_time).hour}:${convertMinutesToTime(data.start_time).minute} ~ 
                  ${convertMinutesToTime(data.end_time).hour}:${convertMinutesToTime(data.end_time).minute}`}
              </span>
              {isResigter&&<div className='schedulBtn'>
                <button onClick={() => handleEditSchedule(data)} className="editButton">수정</button>
                <button onClick={() => handleDeleteSchedule(data.schedule_no)} className="deleteButton">삭제</button>
              </div>}
            </div>
  );
};
export default ScheduleItem;