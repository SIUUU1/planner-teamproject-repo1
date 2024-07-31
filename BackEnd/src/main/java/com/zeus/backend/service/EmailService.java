package com.zeus.backend.service;

public interface EmailService {
	// 초기 설정
	public void init() throws Exception;

	// 이메일 보내기
	public void sendEmail(String to, String subject, String text) throws Exception;
}
