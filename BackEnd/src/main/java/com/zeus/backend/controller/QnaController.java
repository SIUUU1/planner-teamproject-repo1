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

import com.zeus.backend.domain.Qna;
import com.zeus.backend.domain.User;
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
		//group_id 받아와야 함
		qnaService.createByMngr(qna);
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
