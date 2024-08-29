package com.zeus.backend.service;

import java.util.List;
import java.util.Map;

import com.zeus.backend.domain.Payment;

public interface PaymentService {
	// 등록 처리
	public void create(Payment payment) throws Exception;

	// 목록 페이지
	public List<Payment> list() throws Exception;

	// 사용자 결제 내역
	public List<Payment> userPayList(int user_no) throws Exception;
	
	//최근 7일 누적 회원수 조회
	public Map<String, String> getPayCountByDate();
	
	//최근 7일 일일 판매액 
	public Map<String, String> getDailySalesByDate();
	
	//최근 7일 누적 판매액 
	public Map<String, String> getCumulativeSalesByDate();
}