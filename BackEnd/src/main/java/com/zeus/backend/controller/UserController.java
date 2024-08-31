package com.zeus.backend.controller;

import java.io.File;
import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.zeus.backend.domain.Friend;
import com.zeus.backend.domain.User;
import com.zeus.backend.security.auth.PrincipalDetails;
import com.zeus.backend.service.FriendService;
import com.zeus.backend.service.UserOauthService;
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
	private UserOauthService userOauthService;

	@Autowired
	private FriendService friendService;


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
	// 최근 7일 누적 회원
	@GetMapping("/countByDate")
	public ResponseEntity<Map<String, String>> getUserCountByDate() {
	    System.out.println("getUserCountByDate");
	    Map<String, String> originalMap = userService.getUserCountByDate();

	    // Stream을 사용해 키를 정렬한 후, LinkedHashMap으로 수집
	    Map<String, String> sortedMap = originalMap.entrySet().stream()
	        .sorted(Map.Entry.comparingByKey(Comparator.comparingInt(key -> Integer.parseInt(key.replace("DAY", "")))))
	        .collect(Collectors.toMap(
	            Map.Entry::getKey, 
	            Map.Entry::getValue, 
	            (e1, e2) -> e1, 
	            LinkedHashMap::new
	        ));

	    System.out.println("sortedMap: " + sortedMap.toString());
	    return ResponseEntity.ok(sortedMap); // HTTP 상태 200 OK와 함께 반환
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
			//리프레시 토큰 삭제
			userOauthService.deleteUserOauth(user_id);
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
			@RequestParam(name = "searchkey", defaultValue = "user_nickname") String searchkey,
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
	
	//id로 다른 유저의 정보 찾기
	@GetMapping("/userInfo/{user_id}")
	public ResponseEntity<?> getUserById(@PathVariable String user_id){
		System.out.println("================================================");
		System.out.println("getUserById start");
		try {
			User user = userService.getUserById(user_id);
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
	 @GetMapping("/role")
	    public ResponseEntity<String> getUserRole(Authentication authentication) {
	        if (authentication != null) {
	            PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
	            String role = principalDetails.getUser().getRole();
	            return ResponseEntity.ok(role);
	        } else {
	            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
	        }
	    }

}
