package com.zeus.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zeus.backend.domain.User;
import com.zeus.backend.security.domain.Response;
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

	// 로그인 처리??
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
	public ResponseEntity<String> checkId(@PathVariable(name="user_id") String user_id) throws Exception {
		System.out.println("checkId user_id"+user_id);
		try {
            int result = service.checkId(user_id);
            System.out.println("checkId result"+result);
            if (result == 0) {
                return ResponseEntity.ok("사용가능한 아이디입니다.");
            } else {
                return ResponseEntity.ok("이미 존재하는 아이디입니다.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while checking the id.");
        }
	}
}
