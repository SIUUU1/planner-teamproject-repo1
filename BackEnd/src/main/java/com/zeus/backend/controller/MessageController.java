package com.zeus.backend.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zeus.backend.domain.Message;
import com.zeus.backend.domain.User;
import com.zeus.backend.service.MessageService;
import com.zeus.backend.service.UserService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api")
public class MessageController {
	@Autowired
	private UserService userService;

	@Autowired
	private MessageService service;

	// 특정 사용자의 쪽지 목록 조회
	@GetMapping("/user/msg/list")
	public ResponseEntity<List<Message>> getMsgByUserId() {
		System.out.println("getMsgByUserId msg:");
		List<Message> messageList = null;

		// 토큰에서 사용자 정보를 얻는다.
		User user = null;
		try {
			user = userService.read();
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(messageList);
		}
		if (user == null) {
			return ResponseEntity.status(499).build(); // 499 Custom Unauthorized
		}

		// 사용자 쪽지 목록 조회
		try {
			messageList = service.findByUserId(user.getUser_id());
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(messageList);
		}
		return new ResponseEntity<>(messageList, HttpStatus.OK);
	}

	// 특정 사용자의 특정 보낸이로부터 쪽지 목록 조회
	@PostMapping("/user/msg/listByRe")
	public ResponseEntity<List<Message>> getMsgByReceiverId(@RequestBody Map<String, Object> map) {
		System.out.println("getMsgByReceiverId msg:" + map.toString());
		List<Message> messageList = null;

		// 사용자 문의내역을 가져온다.
		try {
			messageList = service.findByReceiverId(map);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(messageList);
		}
		return new ResponseEntity<>(messageList, HttpStatus.OK);
	}

	// 메시지 삽입
	@PostMapping("/msg/insert")
	public ResponseEntity<Void> insert(@RequestBody Message message) throws Exception {
		System.out.println("insert message:" + message);
		service.create(message);
		return new ResponseEntity<>(HttpStatus.CREATED);
	}

	// 쪽지를 읽음 상태로 업데이트
	@PostMapping("/msg/updateRead")
	public ResponseEntity<Void> updateRead(@RequestBody Map<String, String> payload) throws Exception {
		int message_id = Integer.parseInt(payload.get("message_id"));
		System.out.println("updateRead msg:" + message_id);
		service.updateRead(message_id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}

	// 쪽지 삭제
	@PostMapping("/msg/delete")
	public ResponseEntity<Void> deleteById(@RequestBody Map<String, String> payload) throws Exception {
		int message_id = Integer.parseInt(payload.get("message_id"));
		System.out.println("delete msg:" + message_id);
		service.deleteById(message_id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}

	// 특정 사용자가 받은 모든 쪽지 삭제
	@PostMapping("/msg/deleteAll")
	public ResponseEntity<Void> deleteByReceiverId() throws Exception {

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
		System.out.println("deleteByReceiverId msg:" + user.getUser_id());
		service.deleteByReceiverId(user.getUser_id());
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
}