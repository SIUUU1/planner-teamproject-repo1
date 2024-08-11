package com.zeus.backend.controller;

import java.io.File;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.zeus.backend.domain.User;
import com.zeus.backend.service.UserService;

import jakarta.servlet.ServletContext;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/user")
public class UserController {

	@Autowired
	private UserService userService;

	// 스프링 시큐리티의 비밀번호 암호처리기
	@Autowired
	private PasswordEncoder passwordEncoder;

	// 사용자 정보 가져오기
	@GetMapping("/userInfo")
	public ResponseEntity<?> getUser(HttpServletRequest request) {
		System.out.println("userInfo start");
		try {
			User user = userService.read();
			if (user == null) {
				return ResponseEntity.status(499).body("User not found");
			}
			System.out.println("userInfo user " + user);
			return ResponseEntity.ok(user);
		} catch (Exception e) {
			log.error("Error fetching user information", e);
			return ResponseEntity.status(500).body("Internal Server Error: " + e.getMessage());
		}
	}

	// 이메일 중복 조회

	// 복구 이메일 조회

	// 목록 페이지
	@GetMapping("/list")
	public ResponseEntity<List<User>> getUserList() {
		System.out.println("getUserList");
		List<User> userList = null;
		try {
			userList = userService.list();
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(userList);
		}
		return new ResponseEntity<>(userList, HttpStatus.OK);
	}

	@PostMapping("/update")
	public ResponseEntity<?> update(@RequestParam Map<String, Object> map,
	                                @RequestParam(name = "img", required = false) MultipartFile img,
	                                HttpServletRequest request) throws Exception {
	    log.info("update map.toString()=" + map.toString());
	    String image_url = null;
	    if (img != null && !img.isEmpty()) {
	    	log.info("update img =" + img.getOriginalFilename());
	        image_url = img.getOriginalFilename();
	        try {
	            ServletContext application = request.getSession().getServletContext();
	            String path = application.getRealPath("/static/images/profile/");
	            img.transferTo(new File(path + image_url));
	        } catch (Exception e) {
	            e.printStackTrace();
	        }
	    } else {
	        String user_id = (String) map.get("user_id");
	        image_url=userService.filename(user_id);
	    }
	    map.put("image_url", image_url);
	    try {
	        userService.modify(map);
	        return ResponseEntity.ok("User updated successfully");
	    } catch (Exception e) {
	        log.error("Error updating user", e);
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating user");
	    }
	}

	@RequestMapping("/delete")
	public ResponseEntity<?> delete(@RequestBody Map<String, String> payload, HttpServletRequest request)
			throws NumberFormatException, Exception {
		String user_id = payload.get("user_id");
		System.out.println("delete notice:" + user_id);
		userService.remove(user_id);

		String image_url = userService.filename(user_id);
		if (image_url != null && !image_url.equals("-")) {
			ServletContext application = request.getSession().getServletContext();
			String path = application.getRealPath("/static/images/profile/");
			File file = new File(path + image_url);
			if (file.exists()) {
				file.delete();
			}
		}
		userService.remove(user_id);
		return null;
	}

//	// 최초 관리자를 생성하는 화면을 반환한다.
//	@RequestMapping(value = "/setup", method = RequestMethod.GET)
//	public int setupAdminForm(@RequestParam Map<String, Object> map) throws Exception {
//		// 회원 테이블 데이터 건수를 확인하여 0이면 최초 관리자 등록 페이지를 표시한다.(프론트)
//		// 회원 테이블에 데이터가 존재하면 최초 관리자를 생성할 수 없으므로 실패 alert
//		return service.countAll();
//	}
//
//	// 회원 테이블에 데이터가 없으면 최초 관리자를 생성한다.
//	@RequestMapping(value = "/setup", method = RequestMethod.POST)
//	public void setupAdmin(@RequestParam Map<String, Object> map) throws Exception {
//		// 회원 테이블 데이터 건수를 확인하여 빈 테이블이면 최초 관리자를 생성한다.
//		if (service.countAll() == 0) {
//			String inputPassword = (String) map.get("user_password");
//			map.put("user_password", passwordEncoder.encode(inputPassword));
//			// 나머지 값 디폴트로 줘야 함(not null의 경우)
//			service.setupAdmin(map);
//			// 성공 alert
//		}
//		// 회원 테이블에 데이터가 존재하면 최초 관리자를 생성할 수 없으므로 실패 alert
//	}

//	// 수정 처리
//	@PostMapping("/update")
//	public ResponseEntity<Void> update(@RequestBody User user) throws Exception {
//		System.out.println("update user:" + user);
//		userService.modify(user);
//		return new ResponseEntity<>(HttpStatus.OK);
//	}

//	// 삭제 처리
//	@PostMapping("/delete")
//	public ResponseEntity<Void> delete(@RequestBody Map<String, String> payload) throws Exception {
//		String user_id = payload.get("user_id");
//		System.out.println("delete notice:" + user_id);
//		userService.remove(user_id);
//		return new ResponseEntity<>(HttpStatus.OK);
//	}

}
