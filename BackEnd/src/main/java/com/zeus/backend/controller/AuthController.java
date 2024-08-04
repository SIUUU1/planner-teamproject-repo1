package com.zeus.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.zeus.backend.domain.User;
import com.zeus.backend.security.domain.Response;
import com.zeus.backend.service.UserService;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import net.minidev.json.JSONObject;

@RequiredArgsConstructor
@RestController
public class AuthController {
	private final UserService userService;

	//회원가입 처리
	@PostMapping("/api/joinProc")
	public Response<String> joinProc(@RequestBody User user) throws Exception {
		System.out.println("apiCon" + user);

		userService.create(user);
		return new Response<>(HttpStatus.OK.value(), "회원가입 완료");
	}

	//로그인 처리?? 
	@PostMapping("/api/loginProc")
	public Response<JSONObject> loginProc(@RequestBody User user) {
		return null;
	}
	
	//joinform에서 초기 회원가입 정보 가져오기
    @GetMapping("/api/user")
    public User getUser(HttpSession session) {
    	System.out.println("joinform");
        return (User) session.getAttribute("user");
    }
    
//	@PostMapping("/api/completeRegistration")
//  public String completeRegistration(@RequestBody User user) {
//      // 추가 정보 저장
//		try {
//			userService.create(user);
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
//      return "Registration complete";
//  }
}
