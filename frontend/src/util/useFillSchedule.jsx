import { useState, useEffect } from 'react';

const useFillSchedule = (schedulerData) => {
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    const dayInMinutes = 1440;

    // schedulerData가 배열이 아니거나 유효하지 않은 경우를 처리
    if (!Array.isArray(schedulerData) || schedulerData.length === 0) {
      setSchedule([{
        schedule_no: -1,
        schedule_name: '미정 1',
        value: dayInMinutes,
        start_time: 0,
        end_time: dayInMinutes,
        color: "",
      }]);
      return;
    }

    let currentTime = 0;
    let scheduleNoCounter = -1;
    const updatedSchedule = [];

    schedulerData.forEach((event) => {
      if (event.start_time > currentTime) {
        updatedSchedule.push({
          schedule_no: scheduleNoCounter--,
          schedule_name: `미정 ${scheduleNoCounter*-1}`,
          value: event.start_time - currentTime,
          start_time: currentTime,
          end_time: event.start_time,
          color: "",
        });
      }
      updatedSchedule.push(event);
      currentTime = event.end_time;
    });

    if (currentTime < dayInMinutes) {
      updatedSchedule.push({
        schedule_no: scheduleNoCounter--,
        schedule_name: `미정 ${scheduleNoCounter*-1}`,
        value: dayInMinutes - currentTime,
        start_time: currentTime,
        end_time: dayInMinutes,
        color: "",
      });
    }

    setSchedule(updatedSchedule);
  }, [schedulerData]);

  return schedule;
};

export default useFillSchedule;