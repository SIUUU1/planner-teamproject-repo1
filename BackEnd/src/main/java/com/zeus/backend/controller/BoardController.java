package com.zeus.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zeus.backend.service.BoardService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/notice")
public class BoardController {

	@Autowired
	private BoardService boardService;

//	// 공지사항 리스트
//	@GetMapping("/list")
//	public ResponseEntity<List<Notice>> getNoticeList() {
//		System.out.println("getNoticeList");
//		List<Notice> noticeList = null;
//		try {
//			noticeList = noticeService.list();
//		} catch (Exception e) {
//			e.printStackTrace();
//			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(noticeList);
//		}
//		return new ResponseEntity<>(noticeList, HttpStatus.OK);
//	}
//
//	// 공지사항 상세보기
//	@GetMapping("/read/{qna_id}")
//	public ResponseEntity<Notice> getNotice(@PathVariable int no) {
//		System.out.println("getNotice no:" + no);
//		Notice notice = null;
//		try {
//			notice = noticeService.read(no);
//		} catch (Exception e) {
//			e.printStackTrace();
//			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(notice);
//		}
//		return new ResponseEntity<>(notice, HttpStatus.OK);
//	}
//
//	// 공지사항 등록
//	@PostMapping("/insert")
//	public ResponseEntity<Void> insert(@RequestBody Notice notice) throws Exception {
//		System.out.println("insert notice:" + notice);
//		noticeService.create(notice);
//		return new ResponseEntity<>(HttpStatus.CREATED);
//	}
//
//	// 공지사항 수정
//	@PostMapping("/update")
//	public ResponseEntity<Void> update(@RequestBody Notice notice) throws Exception {
//		System.out.println("update notice:" + notice);
//		noticeService.modify(notice);
//		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//	}
//
//	// 공지사항 삭제
//	@PostMapping("/delete")
//	public ResponseEntity<Void> delete(@RequestBody Map<String, String> payload) throws Exception {
//		int no = Integer.parseInt(payload.get("no"));
//		System.out.println("delete notice:" + no);
//		noticeService.delete(no);
//		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//	}

}
