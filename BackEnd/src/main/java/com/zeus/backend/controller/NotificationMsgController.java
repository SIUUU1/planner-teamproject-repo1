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

import com.zeus.backend.domain.NotificationMsg;
import com.zeus.backend.service.NotificationMsgService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/notimsg")
public class NotificationMsgController {
	@Autowired
	private NotificationMsgService service;

	// 해당 타입의 알림 내용 삽입
	@PostMapping("/insert")
	public ResponseEntity<Void> insert(@RequestBody NotificationMsg notificationMsg) throws Exception {
		System.out.println("insert notificationMsg:" + notificationMsg);
		service.create(notificationMsg);
		return new ResponseEntity<>(HttpStatus.OK);
	}

	// 전체 목록 조회
	@GetMapping("/list")
	public ResponseEntity<List<NotificationMsg>> getNotificationMsgList() {
		System.out.println("getNotificationMsgList msg:");
		List<NotificationMsg> notiMsgList = null;

		try {
			notiMsgList = service.list();
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(notiMsgList);
		}
		return new ResponseEntity<>(notiMsgList, HttpStatus.OK);
	}

	// 특정 타입의 알림 내용 조회
	@GetMapping("/read/{type}")
	public ResponseEntity<NotificationMsg> getNotificationMsg(@PathVariable String type) {
		System.out.println("getNotificationMsg type:" + type);
		NotificationMsg notiMsg = null;

		try {
			notiMsg = service.read(type);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(notiMsg);
		}
		return new ResponseEntity<>(notiMsg, HttpStatus.OK);
	}

	// 특정 타입의 알림 내용 삭제
	@PostMapping("/delete")
	public ResponseEntity<Void> deleteByType(@RequestBody Map<String, String> payload) throws Exception {
		int notificationmsg_id = Integer.parseInt(payload.get("notificationmsg_id"));
		System.out.println("delete NotificationMsg:" + notificationmsg_id);
		service.delete(notificationmsg_id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}

	// 특정 타입의 알림 내용 수정
	@PostMapping("/update")
	public ResponseEntity<Void> update(@RequestBody NotificationMsg notificationMsg) throws Exception {
		System.out.println("update notificationMsg:" + notificationMsg);
		service.update(notificationMsg);
		return new ResponseEntity<>(HttpStatus.OK);
	}
}
