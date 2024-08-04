package com.zeus.backend.service;

import java.util.List;
import java.util.Map;

public interface ScheduleService {
    List<Map<String, Object>> getAllSchedules();
    List<Map<String, Object>> getSchedulesByUser(int user_no);
    void insertSchedule(Map<String, Object> schedule);
    void deleteSchedule(int schedule_no);
    void updateSchedule(Map<String, Object> schedule);
}