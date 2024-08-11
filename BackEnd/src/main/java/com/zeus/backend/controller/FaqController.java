package com.zeus.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zeus.backend.domain.Faq;
import com.zeus.backend.service.FaqService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/faq")
public class FaqController {
	@Autowired
	private FaqService service;

	// 전체 faq 가져오기
	@GetMapping("/list")
	public ResponseEntity<List<Faq>> getFaqList() {
		System.out.println("getFaqList");
		List<Faq> faqList = null;
		try {
			faqList = service.list();
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(faqList);
		}
		return new ResponseEntity<>(faqList, HttpStatus.OK);
	}

	// faq 상세 보기
	@GetMapping("/read")
	public ResponseEntity<Faq> getFaq(@RequestBody Faq faq) {
		System.out.println("getFaq");
		Faq faqData = null;
		try {
			faqData = service.read(faq.getFaq_id());
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(faqData);
		}
		return new ResponseEntity<>(faqData, HttpStatus.OK);
	}

	// 사용자 문의내역 등록
	@Transactional
	@PostMapping("/insert")
	public ResponseEntity<Void> insertFaq(@RequestBody Faq faq) throws Exception {
		System.out.println("insertFaq" + faq);
		service.create(faq);
		return new ResponseEntity<>(HttpStatus.CREATED);
	}

	// 문의내역 수정
	@Transactional
	@PostMapping("/update")
	public ResponseEntity<Void> updateFaq(@RequestBody Faq faq) throws Exception {
		System.out.println("updateFaq " + faq);
		service.modify(faq);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}

	// 문의내역 삭제
	@Transactional
	@PostMapping("/delete")
	public ResponseEntity<Void> deleteFaq(@RequestBody Faq faq) throws Exception {
		System.out.println("deleteFaq " + faq);
		service.delete(faq.getFaq_id());
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
}
