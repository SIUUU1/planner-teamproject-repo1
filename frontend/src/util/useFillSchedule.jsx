import { useState, useEffect } from 'react';

const useFillSchedule = (schedulerData) => {
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    const dayInMinutes = 1440;
    let currentTime = 0;
    let scheduleNoCounter = -1;
    const updatedSchedule = [];

    schedulerData.map(item => 
      Object.fromEntries(
        Object.entries(item).map(([key, value]) => [key.toLowerCase(), value])
      )
    ).forEach((event) => {
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
