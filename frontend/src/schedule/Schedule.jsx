import React, { useState } from 'react';

import './Schedule.css';

const Schedule = () => {
  const [schedules, setSchedules] = useState([]);
  const [date, setDate] = useState(new Date());
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newTime, setNewTime] = useState('');
  const [currentEditIndex, setCurrentEditIndex] = useState(null);

  const handlePrevDay = () => {
    setDate(new Date(date.setDate(date.getDate() - 1)));
  };

  const handleNextDay = () => {
    setDate(new Date(date.setDate(date.getDate() + 1)));
  };

  const handleAddSchedule = () => {
    setIsAddModalOpen(true);
  };

  const handleSaveSchedule = () => {
    if (newTitle && newTime) {
      setSchedules([...schedules, { title: newTitle, time: newTime }]);
      setNewTitle('');
      setNewTime('');
      setIsAddModalOpen(false);
    }
  };

  const handleDeleteSchedule = (index) => {
    const updatedSchedules = schedules.filter((_, i) => i !== index);
    setSchedules(updatedSchedules);
  };

  const handleEditSchedule = (index) => {
    setCurrentEditIndex(index);
    setNewTitle(schedules[index].title);
    setNewTime(schedules[index].time);
    setIsEditModalOpen(true);
  };

  const handleUpdateSchedule = () => {
    if (newTitle && newTime && currentEditIndex !== null) {
      const updatedSchedules = schedules.map((schedule, index) =>
        index === currentEditIndex ? { title: newTitle, time: newTime } : schedule
      );
      setSchedules(updatedSchedules);
      setNewTitle('');
      setNewTime('');
      setIsEditModalOpen(false);
      setCurrentEditIndex(null);
    }
  };

  return (
    <div className="schedule">
     <header title="일과표" />
      <div className="scheduleHeader">
        <button onClick={handlePrevDay} className="navButton">{'<<'}</button>
        <div className="dateDisplay">
          <span role="img" aria-label="calendar">📅</span> {date.toISOString().split('T')[0]}
        </div>
        <button onClick={handleNextDay} className="navButton">{'>>'}</button>
      </div>
      <div className="addButtonContainer">
        <button onClick={handleAddSchedule} className="addButton">일정 추가</button>
      </div>
      <div className="scheduleList">
        {schedules.map((schedule, index) => (
          <div className="scheduleItem" key={index}>
            <span className="scheduleTitle">{schedule.title}</span>
            <span className="scheduleTime">{schedule.time}</span>
            <button onClick={() => handleEditSchedule(index)} className="editButton">수정</button>
            <button onClick={() => handleDeleteSchedule(index)} className="deleteButton">삭제</button>
          </div>
        ))}
      </div>

      {isAddModalOpen && (
        <div className="modal">
          <div className="modalContent">
            <h2>새 일정 추가</h2>
            <label>
              제목:
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
            </label>
            <label>
              시간:
              <input
                type="text"
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
              />
            </label>
            <button onClick={handleSaveSchedule}>저장</button>
            <button onClick={() => setIsAddModalOpen(false)}>취소</button>
          </div>
        </div>
      )}

      {isEditModalOpen && (
        <div className="modal">
          <div className="modalContent">
            <h2>일정 수정</h2>
            <label>
              제목:
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
            </label>
            <label>
              시간:
              <input
                type="text"
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
              />
            </label>
            <button onClick={handleUpdateSchedule}>수정</button>
            <button onClick={() => setIsEditModalOpen(false)}>취소</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Schedule;
