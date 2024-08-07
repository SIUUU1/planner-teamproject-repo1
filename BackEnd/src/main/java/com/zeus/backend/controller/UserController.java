package com.zeus.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zeus.backend.domain.User;
import com.zeus.backend.security.jwt.JwtService;
import com.zeus.backend.service.UserService;

import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/user")
public class UserController {

	@Autowired
	private UserService userService;

	// 사용자 정보 가져오기
	@GetMapping("/userInfo")
	public ResponseEntity<?> getUser(HttpServletRequest request) {
		User user=null;
		try {
			user = userService.read();
			if(user==null) {
//				return ResponseEntity.status(500).body("Internal Server Error: " + e.getMessage());
			}
			return ResponseEntity.ok(user);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(500).body("Internal Server Error: " + e.getMessage());
		}
	}

}
