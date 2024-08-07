package com.zeus.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zeus.backend.domain.User;
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
		System.out.println("userInfo start");
		try {
			User user = userService.read();
			if (user == null) {
				return ResponseEntity.status(404).body("User not found");
			}
			System.out.println("userInfo user "+user);
			return ResponseEntity.ok(user);
		} catch (Exception e) {
			log.error("Error fetching user information", e);
			return ResponseEntity.status(500).body("Internal Server Error: " + e.getMessage());
		}
	}

}
