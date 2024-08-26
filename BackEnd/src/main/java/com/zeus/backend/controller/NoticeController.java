package com.zeus.backend.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zeus.backend.domain.Notice;
import com.zeus.backend.domain.Notification;
import com.zeus.backend.domain.User;
import com.zeus.backend.service.NoticeService;
import com.zeus.backend.service.NotificationService;
import com.zeus.backend.service.UserService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/notice")
public class NoticeController {

	@Autowired
	private NoticeService noticeService;

	@Autowired
	private NotificationService notificationService;

	@Autowired
	private UserService userService;

	// 공지사항 리스트
	@GetMapping("/list")
	public ResponseEntity<List<Notice>> getNoticeList() {
		System.out.println("getNoticeList");
		List<Notice> noticeList = null;
		try {
			noticeList = noticeService.list();
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(noticeList);
		}
		return new ResponseEntity<>(noticeList, HttpStatus.OK);
	}

	// 공지사항 상세보기(수정 시 사용)
	@GetMapping("/read/{no}")
	public ResponseEntity<Notice> getNotice(@PathVariable int no) {
		System.out.println("getNotice no:" + no);
		Notice notice = null;
		try {
			notice = noticeService.read(no);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(notice);
		}
		return new ResponseEntity<>(notice, HttpStatus.OK);
	}

	// 조회수 올리기
	@GetMapping("/readCount/{no}")
	public ResponseEntity<?> incrementReadCount(@PathVariable int no) {
		System.out.println("readCount no:" + no);
		try {
			noticeService.incrementReadCount(no);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("fail to increment readCount");
		}
		return new ResponseEntity<>("success to increment readCount", HttpStatus.OK);
	}

	// 공지사항 등록
	@Transactional
	@PostMapping("/insert")
	public ResponseEntity<Void> insert(@RequestBody Notice notice) throws Exception {
		System.out.println("insert notice:" + notice);
		noticeService.createNew(notice);

		// 새 공지글 알림 보내기
		Notification notification = new Notification();

		notification.setType("Notice");
		notification.setLink("/qna/notice/0");

		List<User> userList = userService.list();
		for (User data : userList) {
			notification.setUser_id(data.getUser_id());
			notificationService.create(notification);
		}

		return new ResponseEntity<>(HttpStatus.CREATED);
	}

	// 공지사항 수정
	@Transactional
	@PostMapping("/update")
	public ResponseEntity<Void> update(@RequestBody Notice notice) throws Exception {
		System.out.println("update notice:" + notice);
		noticeService.modify(notice);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}

	// 공지사항 삭제
	@Transactional
	@PostMapping("/delete")
	public ResponseEntity<Void> delete(@RequestBody Map<String, String> payload) throws Exception {
		int no = Integer.parseInt(payload.get("no"));
		System.out.println("delete notice:" + no);
		noticeService.delete(no);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}

}
