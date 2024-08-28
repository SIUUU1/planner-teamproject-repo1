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
import com.zeus.backend.domain.Qna;
import com.zeus.backend.domain.User;
import com.zeus.backend.service.EmailService;
import com.zeus.backend.service.NotificationService;
import com.zeus.backend.service.QnaService;
import com.zeus.backend.service.UserService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api")
public class QnaController {
	@Autowired
	private QnaService qnaService;

	@Autowired
	private UserService userService;

	@Autowired
	private NotificationService notificationService;

	@Autowired
	private EmailService emailService;

	// 전체 문의내역 가져오기
	@GetMapping("/qna/list")
	public ResponseEntity<List<Qna>> getQnaList() {
		System.out.println("getQnaList qna:");
		List<Qna> qnaList = null;
		try {
			qnaList = qnaService.listAll();
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(qnaList);
		}
		return new ResponseEntity<>(qnaList, HttpStatus.OK);
	}

	// 사용자 문의내역 가져오기
	@GetMapping("/user/qna/list")
	public ResponseEntity<List<Qna>> getQnaListByUser() {
		System.out.println("getQnaListByUser qna:");
		List<Qna> qnaList = null;

		// 토큰에서 사용자 정보를 얻는다.
		User user = null;
		try {
			user = userService.read();
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(qnaList);
		}
		if (user == null) {
			return ResponseEntity.status(499).build(); // 499 Custom Unauthorized
		}

		// 사용자 문의내역을 가져온다.
		try {
			qnaList = qnaService.listByUser(user.getUser_id());
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(qnaList);
		}
		return new ResponseEntity<>(qnaList, HttpStatus.OK);
	}

	// 문의내역 상세 보기
	@GetMapping("/qna/read/{qna_id}")
	public ResponseEntity<Qna> getQna(@PathVariable int qna_id) {
		System.out.println("getQna qna_id:");
		Qna qnaData = null;
		try {
			qnaData = qnaService.read(qna_id);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(qnaData);
		}
		return new ResponseEntity<>(qnaData, HttpStatus.OK);
	}

	// 답변 group_id로 상세 보기
	@GetMapping("/qna/readbygroup/{group_id}")
	public ResponseEntity<Qna> getQnaByGroupId(@PathVariable int group_id) {
		System.out.println("getQnaByGroupId group_id:");
		Qna qnaData = null;
		try {
			qnaData = qnaService.readByReply(group_id);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(qnaData);
		}
		return new ResponseEntity<>(qnaData, HttpStatus.OK);
	}

	// 사용자 문의내역 등록
	@PostMapping("/user/qna/insert")
	public ResponseEntity<Void> insertByUser(@RequestBody Qna qna) throws Exception {
		System.out.println("insertByUser qna:" + qna);
		qnaService.createByUser(qna);
		return new ResponseEntity<>(HttpStatus.CREATED);
	}

	// 관리자 문의내역 등록
	@PostMapping("/mngr/qna/insert")
	public ResponseEntity<Void> insertByMngr(@RequestBody Qna qna) throws Exception {
		System.out.println("insertByMngr qna:" + qna);
		// group_id 받아와야 함
		qnaService.createByMngr(qna);

		// 문의내역 작성자 아이디 가져오기
		Qna qnaInquiry = qnaService.readByGroupId(qna.getGroup_id());

		// 이메일 보내기
		// 이메일 제목 작성
		String subject = "[WePlan] 문의하신 사항에 대한 답변 드립니다";
		// 이메일 내용 작성
		StringBuilder text = new StringBuilder();
		text.append("안녕하세요, WePlan 고객님.\n\n")
		.append("[WePlan]에 문의해주셔서 감사합니다.\n\n")
				.append("문의하신 사항에 대한 답변을 준비되어 '내 문의내역'을 확인하시길 바랍니다.\n\n")
				.append("혹시 추가적으로 궁금한 점이나 문의 사항이 있으시면 언제든지 문의 남겨주시길 부탁드립니다.\n\n")
				.append("빠른 시일 내에 성심성의껏 답변드리겠습니다.\n\n").append("감사합니다.\n\n")
				.append("WePlan 팀 드림\n\n").append("---------------------------------------------\n").append("문의사항:\n")
				.append("- 고객센터: weplan2024@gmail.com\n")
				.append("---------------------------------------------\n")
				.append("추신: 만약 이 이메일이 스팸으로 잘못 분류된 경우, 수신함으로 이동시키고 WePlan 이메일을 신뢰할 수 있는 발신자로 지정해 주세요.");
		try {
			emailService.sendEmail(qna.getUser_email(), subject, text.toString());
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}

		// 문의내역 답변 등록 알림 보내기
		Notification notification = new Notification();
		notification.setUser_id(qnaInquiry.getUser_id());
		notification.setType("QnaResponse");
		notification.setLink("/qna/myqna/0");
		notificationService.create(notification);
		return new ResponseEntity<>(HttpStatus.CREATED);
	}

	// 문의내역 수정
	@PostMapping("/qna/update")
	public ResponseEntity<Void> update(@RequestBody Qna qna) throws Exception {
		System.out.println("update qna:" + qna);
		qnaService.modify(qna);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}

	// 문의내역 삭제
	@PostMapping("/qna/delete")
	public ResponseEntity<Void> delete(@RequestBody Map<String, String> payload) throws Exception {
		int qna_id = Integer.parseInt(payload.get("qna_id"));
		System.out.println("delete qna:" + qna_id);
		qnaService.delete(qna_id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}

}
