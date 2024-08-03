import { useState, useEffect } from 'react';

const useFillSchedule = (schedulerData) => {
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    const dayInMinutes = 1440;
    let currentTime = 0;
    const updatedSchedule = [];

    schedulerData.forEach((event) => {
      if (event.start_time > currentTime) {
        updatedSchedule.push({
          schedule_no: null,
          schedule_name: "",
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
        schedule_no: null,
        schedule_name: "",
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
