package com.zeus.backend.service;

import java.util.*;

import com.zeus.backend.domain.Schedule;

public interface ScheduleService {
	List<Schedule> getAllSchedules();

	List<Schedule> getSchedulesByUser(int user_no);

	void registerSchedule(Schedule schedule);

	void deleteSchedule(int schedule_no);

	void updateSchedule(Schedule schedule);

	List<Schedule> getSchedulesByUserAndDate(String user_id, Date reg_date);
}
