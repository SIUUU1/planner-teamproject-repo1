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

import com.zeus.backend.domain.Friend;
import com.zeus.backend.domain.User;
import com.zeus.backend.service.FriendService;
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

	@Autowired
	private FriendService friendService;

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

	// 프로필 수정
	@PostMapping("/update")
	public ResponseEntity<?> update(@RequestParam Map<String, Object> map,
			@RequestParam(name = "img", required = false) MultipartFile img, HttpServletRequest request)
			throws Exception {
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
			image_url = userService.filename(user_id);
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

	// 프로필 삭제
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
		try {
			userService.remove(user_id);
			return ResponseEntity.ok("User remove successfully");
		} catch (Exception e) {
			log.error("Error removing user", e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error removing user");
		}
	}

	// 친구추가
	@PostMapping("/friend/insert")
	public ResponseEntity<Void> insertFriend(@RequestBody Friend friend) throws Exception {
		System.out.println("insertFriend:" + friend);
		friendService.create(friend);
		return new ResponseEntity<>(HttpStatus.OK);
	}

	// 친구삭제
	@PostMapping("/friend/delete")
	public ResponseEntity<Void> delete(@RequestBody Map<String, String> payload) throws Exception {
		int no = Integer.parseInt(payload.get("no"));
		System.out.println("delete friend:" + no);
		friendService.remove(no);
		return new ResponseEntity<>(HttpStatus.OK);
	}

	// 친구목록
	@GetMapping("/friend/list")
	public ResponseEntity<List<Friend>> getFriendList() {
		System.out.println("getFriendList");
		List<Friend> friendList = null;
		User user = null;
		try {
			user = userService.read();
			if (user == null) {
				return ResponseEntity.status(499).body(friendList);
			}
		} catch (Exception e) {
			log.error("Error fetching user information", e);
			return ResponseEntity.status(500).body(friendList);
		}
		try {
			friendList = friendService.selectFriendsByUserId(user.getUser_id());
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(friendList);
		}
		return new ResponseEntity<>(friendList, HttpStatus.OK);
	}

	// 친구검색
	@PostMapping("/friend/search")
	public ResponseEntity<List<User>> searchFriends(
			@RequestParam(name = "searchkey", defaultValue = "name") String searchkey,
			@RequestParam(name = "search", defaultValue = "") String search) {

		System.out.println("searchFriends");
		System.out.println("searchkey:" + searchkey);
		System.out.println("search:" + search);
		List<User> userList = null;
		User user = null;
		try {
			user = userService.read();
			if (user == null) {
				return ResponseEntity.status(499).body(userList);
			}
		} catch (Exception e) {
			log.error("Error fetching user information", e);
			return ResponseEntity.status(500).body(userList);
		}
		try {
			userList = userService.search(searchkey, search, user.getUser_id());
			log.info("userList" + userList.toString());
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(userList);
		}
		return new ResponseEntity<>(userList, HttpStatus.OK);
	}
	
	// 회원 테이블에 데이터가 없으면 최초 관리자를 생성한다.(아이디, 비번, 이름만 있으면 된다.)
	@PostMapping("/setup")
	public  ResponseEntity<?> setupAdmin(@RequestBody User user) throws Exception {
		// 회원 테이블 데이터 건수를 확인하여 빈 테이블이면 최초 관리자를 생성한다.
		if (userService.countAll() == 0) {
			try {
				userService.setupAdmin(user);
			} catch (Exception e) {
				e.printStackTrace();
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("fail to setup admin");
			}
			return new ResponseEntity<>("success to setupAdmin",HttpStatus.OK);
			
		}
		return ResponseEntity.status(HttpStatus.FORBIDDEN).body("fail to setup admin because members' count is not 0");
	}

}
