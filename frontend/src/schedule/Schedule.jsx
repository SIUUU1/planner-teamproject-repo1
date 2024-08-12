import React, { useState, useEffect } from 'react';
import Button from '../components/Button';
import DateNav from '../components/DateNav';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesLeft, faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import useLoading from '../util/useLoading';
import useSendPost from '../util/useSendPost';
import './Schedule.css';
import dayjs from 'dayjs';
import ScheduleItem from './ScheduleItem';

const Schedule = () => {
  const [schedules, setSchedules] = useState([]);
  const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [scheduleName, setScheduleName] = useState('');
  const [startHour, setStartHour] = useState(0);
  const [startMinute, setStartMinute] = useState(0);
  const [endHour, setEndHour] = useState(0);
  const [endMinute, setEndMinute] = useState(0);
  const [currentEditSchedule, setCurrentEditSchedule] = useState(null);
  const { data, loading, refetch } = useLoading(`http://localhost:8080/api/user/schedule/search?reg_date=${date}`, 'json');
  const { postRequest: createSchedule } = useSendPost('http://localhost:8080/api/user/schedule/register', {}, 'json');
  const { postRequest: updateSchedule } = useSendPost(`http://localhost:8080/api/user/schedule/update`, {}, 'json');
  const { postRequest: deleteSchedule } = useSendPost(`http://localhost:8080/api/user/schedule/delete`, {}, 'json');
  
  useEffect(() => {
    if (data && Array.isArray(data)) {
      setSchedules(data);
    }
  }, [data]);

  const onClickLeft = () => setDate(dayjs(date).subtract(1, 'day').format('YYYY-MM-DD'));
  const onClickRight = () => setDate(dayjs(date).add(1, 'day').format('YYYY-MM-DD'));
  const convertTimeToMinutes = (hour, minute) => parseInt(hour) * 60 + parseInt(minute);

  const convertMinutesToTime = minutes => ({
    hour: Math.floor(minutes / 60).toString().padStart(2, '0'),
    minute: (minutes % 60).toString().padStart(2, '0')
  });

  const isOverlapping = (newStart, newEnd, excludeScheduleNo = null) =>
    schedules.some(schedule =>
      schedule.schedule_no !== excludeScheduleNo &&
      (newStart < schedule.end_time && newEnd > schedule.start_time)
    );

  const handleSaveSchedule = async () => {
    const startTime = convertTimeToMinutes(startHour, startMinute);
    const endTime = convertTimeToMinutes(endHour, endMinute);

    if (!scheduleName) {
      alert("제목을 입력해주세요!");
    } else if (startTime >= endTime) {
      alert("시간을 바르게 입력해주세요!");
    } else if (isOverlapping(startTime, endTime)) {
      alert("이미 등록된 일정이 있습니다!");
    } else {
      await createSchedule({
        reg_date: date,
        start_time: startTime,
        end_time: endTime,
        schedule_name: scheduleName,
        value: endTime-startTime,
      });
      resetForm();
      refetch();
    }
  };
  
  const handleDeleteSchedule = async (scheduleNo) => {
    await deleteSchedule({ schedule_no: scheduleNo });
    refetch();
  };

  const handleEditSchedule = (schedule) => {
    setCurrentEditSchedule(schedule);
    setScheduleName(schedule.schedule_name);

    const startTime = convertMinutesToTime(schedule.start_time);
    setStartHour(parseInt(startTime.hour));
    setStartMinute(parseInt(startTime.minute));

    const endTime = convertMinutesToTime(schedule.end_time);
    setEndHour(parseInt(endTime.hour));
    setEndMinute(parseInt(endTime.minute));

    setIsEditModalOpen(true);
  };

  const handleUpdateSchedule = async () => {
    const startTime = convertTimeToMinutes(startHour, startMinute);
    const endTime = convertTimeToMinutes(endHour, endMinute);

    if (!scheduleName) {
      alert("제목을 입력해주세요!");
    } else if (startTime >= endTime) {
      alert("시간을 바르게 입력해주세요!");
    } else if (isOverlapping(startTime, endTime, currentEditSchedule.schedule_no)) {
      alert("다른 일정과 시간이 겹칩니다!");
    } else {
      try {
        await updateSchedule({
          schedule_no: currentEditSchedule.schedule_no,
          reg_date: date,
          start_time: startTime,
          end_time: endTime,
          schedule_name: scheduleName,
          value: endTime - startTime,
        });
        resetForm();
        refetch();
      } catch (error) {
        console.error("일정 수정 중 오류 발생:", error);
        alert("일정 수정에 실패했습니다. 다시 시도해주세요.");
      }
    }
  };

  const resetForm = () => {
    setScheduleName('');
    setStartHour(0);
    setStartMinute(0);
    setEndHour(0);
    setEndMinute(0);
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
    setCurrentEditSchedule(null);
  };

  const renderHourOptions = () => (
    Array.from({ length: 24 }, (_, i) => (
      <option key={i} value={i}>
        {i.toString().padStart(2, '0')}
      </option>
    ))
  );

  const renderMinuteOptions = () => (
    Array.from({ length: 12 }, (_, i) => (
      <option key={i * 5} value={i * 5}>
        {(i * 5).toString().padStart(2, '0')}
      </option>
    ))
  );

  return (
    <div className="schedule">
      <div className='scheduleContent backWhite'>
        <div className="dateDisplay">
          <DateNav
            firstChild={<Button text={<FontAwesomeIcon icon={faAnglesLeft} onClick={onClickLeft} />} />}
            title={date}
            secondChild={<Button text={<FontAwesomeIcon icon={faAnglesRight} onClick={onClickRight} />} />}
          />
        </div>
        <div className="addButtonContainer">
          <button onClick={() => setIsAddModalOpen(true)} className="addButton">일정 추가</button>
        </div>
        <div className="scheduleList">
          {schedules && Array.isArray(schedules) && schedules.map((schedule) => (
            <ScheduleItem  key={schedule.schedule_no} data={schedule} handleEditSchedule={handleEditSchedule} handleDeleteSchedule={handleDeleteSchedule} convertMinutesToTime={convertMinutesToTime}/>
          ))}
        </div>

        {isAddModalOpen && (
          <div className="modal">
            <div className="modalContent">
              <h2>새 일정 추가</h2>
              <label>
                제목:
                <input type="text" value={scheduleName} onChange={(e) => setScheduleName(e.target.value)} />
              </label>
              <label>
                시작 시간:
                <div>
                  <select value={startHour} onChange={(e) => setStartHour(parseInt(e.target.value))}>
                    {renderHourOptions()}
                  </select> 시
                  <select value={startMinute} onChange={(e) => setStartMinute(parseInt(e.target.value))}>
                    {renderMinuteOptions()}
                  </select> 분
                </div>
              </label>
              <label>
                종료 시간:
                <div>
                  <select value={endHour} onChange={(e) => setEndHour(parseInt(e.target.value))}>
                    {renderHourOptions()}
                  </select> 시
                  <select value={endMinute} onChange={(e) => setEndMinute(parseInt(e.target.value))}>
                    {renderMinuteOptions()}
                  </select> 분
                </div>
              </label>
              <button onClick={handleSaveSchedule}>저장</button>
              <button onClick={resetForm}>취소</button>
            </div>
          </div>
        )}

        {isEditModalOpen && (
          <div className="modal">
            <div className="modalContent">
              <h2>일정 수정</h2>
              <label>
                제목:
                <input type="text" value={scheduleName} onChange={(e) => setScheduleName(e.target.value)} />
              </label>
              <label>
                시작 시간:
                <div>
                  <select value={startHour} onChange={(e) => setStartHour(parseInt(e.target.value))}>
                    {renderHourOptions()}
                  </select> 시
                  <select value={startMinute} onChange={(e) => setStartMinute(parseInt(e.target.value))}>
                    {renderMinuteOptions()}
                  </select> 분
                </div>
              </label>
              <label>
                종료 시간:
                <div>
                  <select value={endHour} onChange={(e) => setEndHour(parseInt(e.target.value))}>
                    {renderHourOptions()}
                  </select> 시
                  <select value={endMinute} onChange={(e) => setEndMinute(parseInt(e.target.value))}>
                    {renderMinuteOptions()}
                  </select> 분
                </div>
              </label>
              <button onClick={handleUpdateSchedule}>수정</button>
              <button onClick={resetForm}>취소</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Schedule;