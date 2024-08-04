package com.zeus.backend.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zeus.backend.service.ScheduleService;

@RestController
@RequestMapping("/api/schedule")
public class ScheduleController {

    @Autowired
    private ScheduleService scheduleService;

    @GetMapping
    public List<Map<String, Object>> getAllSchedules() {
        return scheduleService.getAllSchedules();
    }

    @GetMapping("/{user_no}")
    public List<Map<String, Object>> getSchedulesByUser(@PathVariable int user_no) {
        return scheduleService.getSchedulesByUser(user_no);
    }

    @PostMapping
    public void insertSchedule(@RequestBody Map<String, Object> schedule) {
        scheduleService.insertSchedule(schedule);
    }

    @DeleteMapping("/delete/{schedule_no}")
    public void deleteSchedule(@PathVariable int schedule_no) {
        scheduleService.deleteSchedule(schedule_no);
    }

    @PutMapping
    public void updateSchedule(@RequestBody Map<String, Object> schedule) {
        scheduleService.updateSchedule(schedule);
    }
}
