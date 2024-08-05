package com.zeus.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zeus.backend.domain.Schedule;
import com.zeus.backend.service.ScheduleService;

@RestController
@RequestMapping("/api/schedule")
public class ScheduleController {
	@Autowired
	private ScheduleService scheduleService;

	// 모든 스케줄 조회
	@GetMapping
	public ResponseEntity<List<Schedule>> getAllSchedules() {
		List<Schedule> schedules = scheduleService.getAllSchedules();
		return new ResponseEntity<>(schedules, HttpStatus.OK);
	}

	// 특정 사용자에 대한 스케줄 조회
	@GetMapping("/{user_no}")
	public ResponseEntity<List<Schedule>> getSchedulesByUser(@PathVariable int user_no) {
		List<Schedule> schedules = scheduleService.getSchedulesByUser(user_no);
		return new ResponseEntity<>(schedules, HttpStatus.OK);
	}

	// 스케줄 추가
	@PostMapping
	public ResponseEntity<Void> registerSchedule(@RequestBody Schedule schedule) {
		scheduleService.registerSchedule(schedule);
		return new ResponseEntity<>(HttpStatus.CREATED);
	}

	// 스케줄 삭제
	@DeleteMapping("/delete/{schedule_no}")
	public ResponseEntity<Void> deleteSchedule(@PathVariable int schedule_no) {
		scheduleService.deleteSchedule(schedule_no);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}

	// 스케줄 수정
	@PutMapping
	public ResponseEntity<Void> updateSchedule(@RequestBody Schedule schedule) {
		scheduleService.updateSchedule(schedule);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
}