package com.zeus.backend.service;

import java.util.List;

import com.zeus.backend.domain.Payment;

public interface PaymentService {
	// 등록 처리
	public void create(Payment payment) throws Exception;

	// 목록 페이지
	public List<Payment> list() throws Exception;

	// 사용자 결제 내역
	public List<Payment> userPayList(int user_no) throws Exception;
}