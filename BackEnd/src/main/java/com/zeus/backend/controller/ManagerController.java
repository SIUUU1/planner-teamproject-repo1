package com.zeus.backend.controller;

import java.io.File;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zeus.backend.service.UserOauthService;
import com.zeus.backend.service.UserService;

import jakarta.servlet.ServletContext;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/mngr")
public class ManagerController {
	
	@Autowired
	private UserService userService;

	@Autowired
	private UserOauthService userOauthService;

	@RequestMapping("/user/delete")
	public ResponseEntity<?> delete(@RequestBody Map<String, String> payload, HttpServletRequest request)
			throws NumberFormatException, Exception {
		String user_id = payload.get("user_id");
		System.out.println("delete user:" + user_id);

		String image_url = userService.filename(user_id);
		if (image_url != null && !image_url.equals("-")) {
			ServletContext application = request.getSession().getServletContext();
			String path = application.getRealPath("/static/images/profile/");
			File file = new File(path + image_url);
			if (file.exists()) {
				file.delete();
			}
		}
		try {
			userService.remove(user_id);
			// 리프레시 토큰 삭제
			userOauthService.deleteUserOauth(user_id);
			return ResponseEntity.ok("User remove successfully");
		} catch (Exception e) {
			log.error("Error removing user", e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error removing user");
		}
	}

}
