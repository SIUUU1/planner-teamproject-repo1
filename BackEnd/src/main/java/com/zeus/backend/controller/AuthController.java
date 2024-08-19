package com.zeus.backend.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.zeus.backend.domain.User;
import com.zeus.backend.security.CodeGenerator;
import com.zeus.backend.security.domain.Response;
import com.zeus.backend.service.EmailService;
import com.zeus.backend.service.UserService;

import jakarta.servlet.http.HttpSession;
import lombok.extern.java.Log;
import net.minidev.json.JSONObject;

@Log
@RestController
@RequestMapping("/api/auth")
public class AuthController {
	@Autowired
	private UserService service;

	@Autowired
	private EmailService emailService;

	// 회원가입폼에 oauth2 인증한 사용자 정보 가져오기
	@GetMapping("/joinform")
	public User getjoinform(HttpSession session) {
		System.out.println("joinform");
		return (User) session.getAttribute("user");
	}

	// 회원가입 처리
	@PostMapping("/joinProc")
	public Response<String> joinProc(@RequestBody User user) throws Exception {
		System.out.println("apiCon" + user);
		service.create(user);
		return new Response<>(HttpStatus.OK.value(), "회원가입 완료");
	}

	// 로그인 처리
	@PostMapping("/loginProc")
	public Response<JSONObject> loginProc(@RequestBody User user) {
		return null;
	}

	// 로그아웃
	@RequestMapping("/logout")
	public Response<String> logoutProc() {
		System.out.println("logoutProc");
		return new Response<>(HttpStatus.OK.value(), "로그아웃 성공");
	}

	// 아이디 중복 조회
	@RequestMapping("/checkId/{user_id}")
	public ResponseEntity<String> checkId(@PathVariable(name = "user_id") String user_id) throws Exception {
		System.out.println("checkId user_id" + user_id);
		try {
			int result = service.checkId(user_id);
			System.out.println("checkId result" + result);
			if (result == 0) {
				return ResponseEntity.ok("사용가능한 아이디입니다.");
			} else {
				return ResponseEntity.ok("이미 존재하는 아이디입니다.");
			}
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("An error occurred while checking the id.");
		}
	}

	// 복구 이메일 조회
	@RequestMapping(value = "/checkEmail", method = RequestMethod.POST)
	public ResponseEntity<?> checkRestoreEmail(@RequestBody Map<String, Object> map) throws Exception {
		System.out.println("checkRestoreEmail" + map);
		String user_id = null;
		try {
			user_id = service.checkRestoreEmail(map);
			if (user_id == null) {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(user_id);
			}
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(user_id);
		}
		return new ResponseEntity<>(user_id, HttpStatus.OK);
	}

	// 이메일 보내기
	@PostMapping("/sendVerificationCode")
	public ResponseEntity<?> sendVerificationCode(@RequestBody Map<String, Object> map, HttpSession session) {
		// 인증 코드 생성
		String verificationCode = CodeGenerator.generateCode();
		String user_email = String.valueOf(map.get("user_email"));

		// 세션에 인증 코드와 이메일 저장
		session.setAttribute("verificationCode", verificationCode);
		session.setAttribute("user_email", user_email);

		// 인증 코드 이메일 전송
		String subject = "Your Verification Code";
		String text = "Your verification code is: " + verificationCode;
		try {
			emailService.sendEmail(user_email, subject, text);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error emailing ");
		}

		return ResponseEntity.status(HttpStatus.OK).body("Verification code sent successfully");
	}

	// 코드 확인
	@PostMapping("/verifyCode")
	public ResponseEntity<?> verifyCode(@RequestBody Map<String, Object> map, HttpSession session) {
		String sessionCode = (String) session.getAttribute("verificationCode");
		String sessionEmail = (String) session.getAttribute("user_email");

		if (sessionCode == null || sessionEmail == null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No verification code found in session");
		}

		if (!sessionEmail.equals(String.valueOf(map.get("user_email")))) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email does not match");
		}

		if (sessionCode.equals(String.valueOf(map.get("code")))) {
			session.removeAttribute("verificationCode");
			session.removeAttribute("user_email");
			return ResponseEntity.status(HttpStatus.OK).body("Verification successful");
		} else {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Invalid verification code");
		}
	}

	// 패스워드 재설정
	@PostMapping("/resetPass")
	public ResponseEntity<Void> updatePass(@RequestBody User user) throws Exception {
		System.out.println("updatePass:" + user);
		service.updatePw(user);
		return new ResponseEntity<>(HttpStatus.OK);
	}
}
