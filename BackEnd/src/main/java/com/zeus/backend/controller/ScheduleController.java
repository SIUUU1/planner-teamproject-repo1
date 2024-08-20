package com.zeus.backend.controller;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.zeus.backend.domain.Schedule;
import com.zeus.backend.domain.User;
import com.zeus.backend.service.ScheduleService;
import com.zeus.backend.service.UserServiceImpl;

@RestController
@RequestMapping("/api/user/schedule")
public class ScheduleController {
	@Autowired
	private ScheduleService scheduleService;

	@Autowired
	private UserServiceImpl userServiceImpl;

	// 모든 스케줄 조회
	@GetMapping
	public ResponseEntity<List<Schedule>> getAllSchedules() {
		List<Schedule> schedules = scheduleService.getAllSchedules();
		return new ResponseEntity<>(schedules, HttpStatus.OK);
	}

	@GetMapping("/search")
	public ResponseEntity<List<Schedule>> getSchedulesByUserAndDate(
			@RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date reg_date) {
		System.out.println("============================");
		System.out.println("start getSchedulesByUserAndDate");
		User user = null;
		try {
			user = userServiceImpl.read();
		} catch (Exception e) {
			e.printStackTrace();
		}
		if (user == null) {
			return ResponseEntity.status(499).build(); // 499 Custom Unauthorized
		}
		System.out.println("user.getUser_id()" + user.getUser_id());
		List<Schedule> schedules = scheduleService.getSchedulesByUserAndDate(user.getUser_id(), reg_date);
		return new ResponseEntity<>(schedules, HttpStatus.OK); // 200 OK
	}
	@GetMapping("/searchUser")
	public ResponseEntity<List<Schedule>> getSchedulesByUserIdAndDate(
			@RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date reg_date, @RequestParam String user_id) {
		System.out.println("============================");
		System.out.println("start getSchedulesByUserIdAndDate");
		System.out.println("user_id" + user_id);
		System.out.println("reg_date" + reg_date);
		List<Schedule> schedules = scheduleService.getSchedulesByUserAndDate(user_id, reg_date);
		return new ResponseEntity<>(schedules, HttpStatus.OK); // 200 OK
	}

	// 스케줄 추가
	@PostMapping("/register")
	public ResponseEntity<Void> registerSchedule(@RequestBody Schedule schedule) {
		System.out.println("===========================");
		System.out.println("start registerSchedule");
		System.out.println("schedule name:" + schedule.getSchedule_name());
		System.out.println("schedule reg_date:" + schedule.getReg_date());

		User user = null;
		try {
			user = userServiceImpl.read();
		} catch (Exception e) {
			e.printStackTrace();
		}
		if (user == null) {
			return ResponseEntity.status(499).build(); // 499 Custom Unauthorized
		}
		schedule.setUser_id(user.getUser_id());
		scheduleService.registerSchedule(schedule);
		return new ResponseEntity<>(HttpStatus.CREATED);
	}

	// 스케줄 삭제
	@PostMapping("/delete")
	 public ResponseEntity<Void> deleteSchedule(@RequestBody Map<String, Integer> payload) {
        System.out.println("===========================");
        System.out.println("start deleteSchedule");
        System.out.println("payload.get(\"schedule_no\"):"+payload.get("schedule_no"));
		scheduleService.deleteSchedule(payload.get("schedule_no"));
		return new ResponseEntity<>(HttpStatus.OK);
	}

	// 스케줄 수정
	@PostMapping("/update")
	public ResponseEntity<Void> updateSchedule(@RequestBody Schedule schedule) {
		System.out.println("===========================");
		System.out.println("start updateSchedule");
		System.out.println(schedule.toString());
		scheduleService.updateSchedule(schedule);
		return new ResponseEntity<>(HttpStatus.OK);
	}

}