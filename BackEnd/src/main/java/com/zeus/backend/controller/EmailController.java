package com.zeus.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.zeus.backend.security.CodeGenerator;
import com.zeus.backend.security.domain.VerificationRequest;
import com.zeus.backend.service.EmailService;

import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/auth")
public class EmailController {

	@Autowired
	private EmailService emailService;

	// 인증코드 이메일 보내기
	@PostMapping("/sendVerificationCode")
	public String sendVerificationCode(@RequestParam("user_email") String user_email, HttpSession session) {
		String code = CodeGenerator.generateCode();
		try {
			emailService.sendEmail(user_email, "Email Verification Code", "Your verification code is: " + code);
		} catch (Exception e) {
			e.printStackTrace();
		}

		// 세션에 인증 코드 저장
		session.setAttribute("verificationCode", code);
		session.setAttribute("email", user_email);

		return "Verification code sent to " + user_email;
	}

	// 인증코드 확인하기
	@PostMapping("/verifyCode")
	public String verifyCode(@RequestBody VerificationRequest verificationRequest, HttpSession session) {
		String sessionCode = (String) session.getAttribute("verificationCode");
		String sessionEmail = (String) session.getAttribute("email");

		if (sessionCode == null || sessionEmail == null) {
			return "No verification code sent.";
		}

		if (sessionEmail.equals(verificationRequest.getEmail()) && sessionCode.equals(verificationRequest.getCode())) {
			return "Verification successful";
		} else {
			return "Verification failed";
		}
	}

}
