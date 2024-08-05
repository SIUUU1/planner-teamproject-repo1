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

	@Autowired
	private JwtService jwtService;

	@Autowired
	private HttpServletRequest request;

	// 쿠키 토큰으로 사용자 정보 가져오기
	@GetMapping("/")
	public ResponseEntity<?> findByToken(HttpServletRequest request) {
		User user = null;
		String userId = null;
		String accessToken = jwtService.resolveCookie(request);

		if (accessToken == null) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Access token is missing");
		}

		try {
			userId = jwtService.getClaim(accessToken, "user_id");
			log.info("findByToken() user_id: {}", userId);

			user = userService.findByUserId(userId);

			if (user == null) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
			}

			return ResponseEntity.ok(user);
		} catch (Exception e) {
			log.error("Error while fetching user by token", e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("An error occurred while fetching user by token");
		}
	}

//	@GetMapping("/user-info")
//	public ResponseEntity<?> getUserInfo(@RequestHeader("Authorization") String token) {
//		try {
//			if (token != null && token.startsWith("Bearer ")) {
//				token = token.substring(7); // Remove "Bearer " prefix
//				if (jwtService.validateToken(token)) {
//					String userId = jwtService.getUserIdFromToken(token);
//					User user = userService.getUserById(userId);
//					if (user != null) {
//						return ResponseEntity.ok(user);
//					} else {
//						return ResponseEntity.status(404).body("User not found");
//					}
//				}
//			}
//			return ResponseEntity.status(401).body("Invalid token");
//		} catch (Exception e) {
//			return ResponseEntity.status(500).body("An error occurred while processing the token");
//		}
//	}
}
