package com.zeus.backend.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ScheduleMapper {
    
    // 스케줄 데이터 등록
    void insertSchedule(Map<String, Object> schedule);
    
    // 모든 스케줄 데이터 조회
    List<Map<String, Object>> selectAllSchedules();
    
    // 특정 유저의 스케줄 데이터 조회
    List<Map<String, Object>> selectSchedulesByUser(int user_no);
    
    // 스케줄 데이터 삭제
    void deleteSchedule(int schedule_no);
    
    // 스케줄 데이터 업데이트
    void updateSchedule(Map<String, Object> schedule);
}
