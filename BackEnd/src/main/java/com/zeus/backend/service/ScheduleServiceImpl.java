package com.zeus.backend.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zeus.backend.mapper.ScheduleMapper;

@Service
public class ScheduleServiceImpl implements ScheduleService {

    @Autowired
    private ScheduleMapper scheduleMapper;

    @Override
    public List<Map<String, Object>> getAllSchedules() {
        return scheduleMapper.selectAllSchedules();
    }

    @Override
    public List<Map<String, Object>> getSchedulesByUser(int user_no) {
        return scheduleMapper.selectSchedulesByUser(user_no);
    }

    @Override
    public void insertSchedule(Map<String, Object> schedule) {
        scheduleMapper.insertSchedule(schedule);
    }

    @Override
    public void deleteSchedule(int schedule_no) {
        scheduleMapper.deleteSchedule(schedule_no);
    }

    @Override
    public void updateSchedule(Map<String, Object> schedule) {
        scheduleMapper.updateSchedule(schedule);
    }
}