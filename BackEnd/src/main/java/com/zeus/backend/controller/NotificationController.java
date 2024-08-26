package com.zeus.backend.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zeus.backend.domain.Notification;
import com.zeus.backend.domain.User;
import com.zeus.backend.service.NotificationService;
import com.zeus.backend.service.UserService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api")
public class NotificationController {
	@Autowired
	private UserService userService;

	@Autowired
	private NotificationService notificationService;

	// 알림 보내기
//	@PostMapping("/notify/insert")
//	public ResponseEntity<Void> insert(@RequestBody Notification notification) throws Exception {
//		System.out.println("insert notification:" + notification);
//		notificationService.create(notification);
//		return new ResponseEntity<>(HttpStatus.OK);
//	}

	// 알림 수정
	@PostMapping("/notify/update")
	public ResponseEntity<Void> update(@RequestBody Notification notification) throws Exception {
		System.out.println("update notification:" + notification);
		notificationService.update(notification);
		return new ResponseEntity<>(HttpStatus.OK);
	}

	// 전체 알림 목록 조회
	@GetMapping("/notify/list")
	public ResponseEntity<List<Notification>> getNotificationList() {
		System.out.println("getNotificationList:");
		List<Notification> notifiList = null;

		try {
			notifiList = notificationService.list();
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(notifiList);
		}
		return new ResponseEntity<>(notifiList, HttpStatus.OK);
	}

	// 특정 사용자의 쪽지 목록 조회
	@GetMapping("/user/notify/list")
	public ResponseEntity<List<Notification>> getNotificationByUserId() {
		System.out.println("getNotificationByUserId");
		List<Notification> notifiList = null;

		// 토큰에서 사용자 정보를 얻는다.
		User user = null;
		try {
			user = userService.read();
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(notifiList);
		}
		if (user == null) {
			return ResponseEntity.status(499).build(); // 499 Custom Unauthorized
		}

		// 사용자 쪽지 목록 조회
		try {
			notifiList = notificationService.getNotificationByUserId(user.getUser_id());
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(notifiList);
		}
		return new ResponseEntity<>(notifiList, HttpStatus.OK);
	}

	// 특정 알림 조회
	@GetMapping("/notify/read/{notifications_id}")
	public ResponseEntity<Notification> getNotification(@PathVariable int notifications_id) {
		System.out.println("getNotification : " + notifications_id);
		Notification notification = null;

		try {
			notification = notificationService.read(notifications_id);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(notification);
		}
		return new ResponseEntity<>(notification, HttpStatus.OK);
	}

	// 알림 읽음 상태로 업데이트
	@PostMapping("/notify/updateRead")
	public ResponseEntity<Void> updateRead(@RequestBody Map<String, String> payload) throws Exception {
		int notifications_id = Integer.parseInt(payload.get("notifications_id"));
		System.out.println("updateRead notify:" + notifications_id);
		notificationService.updateRead(notifications_id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}

	// 알림 삭제
	@PostMapping("/notify/delete")
	public ResponseEntity<Void> deleteById(@RequestBody Map<String, String> payload) throws Exception {
		int notifications_id = Integer.parseInt(payload.get("notifications_id"));
		System.out.println("delete notificaton:" + notifications_id);
		notificationService.deleteById(notifications_id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}

	// 특정 사용자가 받은 모든 알림 삭제
	@PostMapping("/notify/deleteAll")
	public ResponseEntity<Void> deleteByUserId() throws Exception {

		// 토큰에서 사용자 정보를 얻는다.
		User user = null;
		try {
			user = userService.read();
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
		if (user == null) {
			return ResponseEntity.status(499).build(); // 499 Custom Unauthorized
		}
		System.out.println("deleteByUserId notification:" + user.getUser_id());
		notificationService.deleteByUserId(user.getUser_id());
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
}
