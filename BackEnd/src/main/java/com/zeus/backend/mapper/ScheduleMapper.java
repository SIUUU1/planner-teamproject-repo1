package com.zeus.backend.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.zeus.backend.domain.Schedule;

@Mapper
public interface ScheduleMapper {

	// 스케줄 데이터 등록
	void registerSchedule(Schedule schedule);

	// 모든 스케줄 데이터 조회
	List<Schedule> getAllSchedules();

	// 특정 유저의 스케줄 데이터 조회
	List<Schedule> getSchedulesByUser(@Param("user_no") int userNo);

	// 스케줄 데이터 삭제
	void deleteSchedule(@Param("schedule_no") int scheduleNo);

	// 스케줄 데이터 업데이트
	void updateSchedule(Schedule schedule);
}
