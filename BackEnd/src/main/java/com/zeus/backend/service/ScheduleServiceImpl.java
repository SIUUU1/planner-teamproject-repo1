package com.zeus.backend.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zeus.backend.domain.Schedule;
import com.zeus.backend.mapper.ScheduleMapper;

@Service
public class ScheduleServiceImpl implements ScheduleService {

    @Autowired
    private ScheduleMapper scheduleMapper;

    @Override
    public List<Schedule> getAllSchedules() {
        return scheduleMapper.getAllSchedules();
    }

    @Override
    public List<Schedule> getSchedulesByUser(int user_no) {
        return scheduleMapper.getSchedulesByUser(user_no);
    }

    @Override
    public void registerSchedule(Schedule schedule) {
        scheduleMapper.registerSchedule(schedule);
    }

    @Override
    public void deleteSchedule(int schedule_no) {
        scheduleMapper.deleteSchedule(schedule_no);
    }

    @Override
    public void updateSchedule(Schedule schedule) {
        scheduleMapper.updateSchedule(schedule);
    }

	@Override
	public List<Schedule> getSchedulesByUserAndDate(String user_id, Date reg_date) {
		List<Schedule> schedules=scheduleMapper.getSchedulesByUserAndDate(user_id, reg_date);
		System.out.println(schedules.toString());
		return schedules;
	}
    
    
}