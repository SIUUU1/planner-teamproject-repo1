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
import org.springframework.web.bind.annotation.RestController;

import com.zeus.backend.domain.Notification;
import com.zeus.backend.domain.User;
import com.zeus.backend.security.CodeGenerator;
import com.zeus.backend.security.SessionAttributeWithExpiry;
import com.zeus.backend.security.domain.Response;
import com.zeus.backend.service.EmailService;
import com.zeus.backend.service.NotificationService;
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

	@Autowired
	private NotificationService notificationService;

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

		// 회원가입 축하 알림 보내기
		Notification notification = new Notification();
		notification.setUser_id(user.getUser_id());
		notification.setType("WelcomeMessage");
		notification.setLink("-");
		notificationService.create(notification);

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

		// 만료 시간 설정 (10분 = 600000 밀리초)
		long expiryDuration = 600000; // 10분

		// 세션에 인증 코드와 이메일을 만료 시간을 포함하여 저장
		session.setAttribute("verificationCode", new SessionAttributeWithExpiry(verificationCode, expiryDuration));
		session.setAttribute("user_email", new SessionAttributeWithExpiry(user_email, expiryDuration));

		// 이메일 제목 작성
		String subject = "[WePlan] 보안 인증 코드";

		// 이메일 내용 작성
		StringBuilder text = new StringBuilder();
		text.append("안녕하세요, WePlan 사용자님.\n\n").append("WePlan 계정의 보안을 위해 아래의 인증 코드를 입력하여 본인 확인을 완료해 주세요.\n\n")
				.append("인증 코드: ").append(verificationCode).append("\n\n")
				.append("이 코드는 10분 동안만 유효합니다. 시간이 지나면 코드가 만료되며, 다시 요청해 주셔야 합니다.\n\n")
				.append("본인이 요청한 것이 아닌 경우, 즉시 WePlan 고객 지원팀에 문의해 주시기 바랍니다.\n\n").append("감사합니다.\n\n")
				.append("WePlan 팀 드림\n\n").append("---------------------------------------------\n").append("문의사항:\n")
				.append("- 고객센터: weplan2024@gmail.com\n")
				.append("---------------------------------------------\n")
				.append("추신: 만약 이 이메일이 스팸으로 잘못 분류된 경우, 수신함으로 이동시키고 WePlan 이메일을 신뢰할 수 있는 발신자로 지정해 주세요.");
		System.out.println("verificationCode" + verificationCode);
		try {
			emailService.sendEmail(user_email, subject, text.toString());
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error sending email.");
		}

		return ResponseEntity.status(HttpStatus.OK).body("Verification code sent successfully.");
	}

	// 코드 확인
	@PostMapping("/verifyCode")
	public ResponseEntity<?> verifyCode(@RequestBody Map<String, Object> map, HttpSession session) {
		String inputCode = String.valueOf(map.get("code"));

		// 세션에서 인증 코드와 이메일 속성 가져오기
		SessionAttributeWithExpiry sessionCodeWrapper = (SessionAttributeWithExpiry) session
				.getAttribute("verificationCode");
		SessionAttributeWithExpiry sessionEmailWrapper = (SessionAttributeWithExpiry) session
				.getAttribute("user_email");

		if (sessionCodeWrapper == null || sessionCodeWrapper.isExpired() || sessionEmailWrapper == null
				|| sessionEmailWrapper.isExpired()) {
			// 세션에서 속성을 제거 (만료된 경우)
			session.removeAttribute("verificationCode");
			session.removeAttribute("user_email");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("인증 코드가 만료되었거나 유효하지 않습니다.");
		}

		String sessionCode = (String) sessionCodeWrapper.getValue();
		String sessionEmail = (String) sessionEmailWrapper.getValue();

		if (!inputCode.equals(sessionCode)) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("인증 코드가 일치하지 않습니다.");
		}

		// 인증이 성공적으로 완료된 경우 세션 속성 제거
		session.removeAttribute("verificationCode");
		session.removeAttribute("user_email");

		// 인증 코드가 일치하고 만료되지 않음
		return ResponseEntity.status(HttpStatus.OK).body("인증이 성공적으로 완료되었습니다.");
	}

	// 패스워드 재설정
	@PostMapping("/resetPass")
	public ResponseEntity<Void> updatePass(@RequestBody User user) throws Exception {
		System.out.println("updatePass:" + user);
		service.updatePw(user);
		return new ResponseEntity<>(HttpStatus.OK);
	}

	// 회원 테이블에 데이터가 없으면 최초 관리자를 생성한다.(아이디, 비번, 이름만 있으면 된다.)
	@PostMapping("/setup")
	public ResponseEntity<?> setupAdmin(@RequestBody User user) throws Exception {
		try {
			service.setupAdmin(user);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("fail to setup admin");
		}
		return new ResponseEntity<>("success to setupAdmin", HttpStatus.OK);
	}
}
