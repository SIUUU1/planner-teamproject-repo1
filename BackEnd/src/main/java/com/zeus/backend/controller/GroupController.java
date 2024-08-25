package com.zeus.backend.controller;

import java.io.File;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.zeus.backend.domain.Group;
import com.zeus.backend.domain.GroupOne;
import com.zeus.backend.domain.User;
import com.zeus.backend.service.GroupOneService;
import com.zeus.backend.service.GroupService;
import com.zeus.backend.service.UserService;

import jakarta.servlet.ServletContext;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/group")
public class GroupController {

	@Autowired
	private GroupService groupService;

	@Autowired
	private UserService userService;

	@Autowired
	private GroupOneService groupOneService;

	// 그룹 리스트
	@GetMapping("/list")
	public ResponseEntity<List<Group>> getGroupList() {
		System.out.println("getGroupList");
		List<Group> groupList = null;
		try {
			groupList = groupService.list();
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(groupList);
		}
		return new ResponseEntity<>(groupList, HttpStatus.OK);
	}

	// 인기 그룹 3개 조회(지원자 수 기준)
	@GetMapping("/list/best")
	public ResponseEntity<List<Group>> getGroupBestList() {
		System.out.println("getGroupBestList");
		List<Group> groupList = null;
		try {
			groupList = groupService.listByApply();
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(groupList);
		}
		return new ResponseEntity<>(groupList, HttpStatus.OK);
	}

	// 내 그룹(가입된)
	@GetMapping("/list/my")
	public ResponseEntity<List<Group>> getGroupMyList() {
		System.out.println("getGroupMyList");
		List<Group> groupList = null;

		// 토큰에서 사용자 정보를 얻는다.
		User user = null;
		try {
			user = userService.read();
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(groupList);
		}
		if (user == null) {
			return ResponseEntity.status(499).build(); // 499 Custom Unauthorized
		}

		// 내 그룹 리스트
		try {
			groupList = groupService.myList(user.getUser_id());
			System.out.println(user.getUser_id());
			System.out.println("mygroup" + groupList);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(groupList);
		}
		return new ResponseEntity<>(groupList, HttpStatus.OK);
	}
	
	// 친구 그룹(가입된)
	@GetMapping("/{user_id}/list")
	public ResponseEntity<List<Group>> getGroupFriendList(@PathVariable String user_id) {
		System.out.println("getGroupFriendList");
		List<Group> groupList = null;
		try {
			groupList = groupService.myList(user_id);
			System.out.println(user_id);
			System.out.println("Friendgroup" + groupList);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(groupList);
		}
		return new ResponseEntity<>(groupList, HttpStatus.OK);
	}

	// 내가 지원한 그룹(가입전)
	@GetMapping("/list/myApply")
	public ResponseEntity<List<Group>> getGroupMyApplyList() {
		System.out.println("getGroupMyApplyList");
		List<Group> groupList = null;

		// 토큰에서 사용자 정보를 얻는다.
		User user = null;
		try {
			user = userService.read();
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(groupList);
		}
		if (user == null) {
			return ResponseEntity.status(499).build(); // 499 Custom Unauthorized
		}

		// 내 그룹 리스트
		try {
			groupList = groupService.myApplyList(user.getUser_id());
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(groupList);
		}
		return new ResponseEntity<>(groupList, HttpStatus.OK);
	}

	// 그룹 상세보기
	@GetMapping("/read/{group_id}")
	public ResponseEntity<Group> getGroup(@PathVariable int group_id) {
		System.out.println("getGroup group_id:" + group_id);
		Group group = null;
		try {
			group = groupService.read(group_id);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(group);
		}
		return new ResponseEntity<>(group, HttpStatus.OK);
	}

	// 그룹 등록
	@Transactional
	@PostMapping("/insert")
	public ResponseEntity<?> insert(@RequestParam Map<String, Object> map,
			@RequestParam(name = "img", required = false) MultipartFile img, HttpServletRequest request)
			throws Exception {
		log.info("insert map.toString()=" + map.toString());

		String image_url = null;
		if (img != null && !img.isEmpty()) {
			log.info("insert img =" + img.getOriginalFilename());
			image_url = img.getOriginalFilename();
			try {
				ServletContext application = request.getSession().getServletContext();
				String path = application.getRealPath("/static/images/group/");
				img.transferTo(new File(path + image_url));
			} catch (Exception e) {
				e.printStackTrace();
			}
		} else {
			int group_id = Integer.parseInt(String.valueOf(map.get("group_id")));
			image_url = groupService.filename(group_id);
		}
		map.put("image_url", image_url);
		map.put("user_id", map.get("leader_id"));
		System.out.println("final map" + map);
		try {
			// 그룹 생성
			groupService.create(map);
			// 그룹원 추가(리더)
			// groupOneService.create(map); 트리거
			return ResponseEntity.ok("Group insert successfully");
		} catch (Exception e) {
			log.error("Error inserting Group", e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error inserting Group");
		}
	}

	// 그룹 수정
	@Transactional
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
				String path = application.getRealPath("/static/images/group/");
				img.transferTo(new File(path + image_url));
			} catch (Exception e) {
				e.printStackTrace();
			}
		} else {
			int group_id = Integer.parseInt(String.valueOf(map.get("group_id")));
			image_url = groupService.filename(group_id);
		}
		map.put("image_url", image_url);
		try {
			groupService.modify(map);
			return ResponseEntity.ok("Group updated successfully");
		} catch (Exception e) {
			log.error("Error updating Group", e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating Group");
		}

	}

	// 그룹 삭제
	@Transactional
	@PostMapping("/delete")
	public ResponseEntity<?> delete(@RequestBody Map<String, Object> payload, HttpServletRequest request)
			throws NumberFormatException, Exception {
		String noString = String.valueOf(payload.get("group_id"));
		int group_id;
		try {
			group_id = Integer.parseInt(noString);
		} catch (NumberFormatException e) {
			log.error("Invalid 'no' format: " + noString, e);
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid 'no' format.");
		}
		System.out.println("delete group:" + group_id);

		String filename = groupService.filename(group_id);
		if (filename != null && !filename.equals("-")) {
			ServletContext application = request.getSession().getServletContext();
			String path = application.getRealPath("/static/images/group/");
			File file = new File(path + filename);
			if (file.exists()) {
				file.delete();
			}
		}
		try {
			// 그룹삭제
			groupService.delete(group_id);
			// 그룹원 삭제
			groupOneService.deleteByGroupId(group_id);
			return ResponseEntity.ok("group remove successfully");
		} catch (Exception e) {
			log.error("Error removing group", e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error removing group");
		}
	}

	// 그룹 검색
	@PostMapping("/search")
	public ResponseEntity<List<Group>> searchBoard(@RequestBody Map<String, Object> payload) {
		log.info("searchBoard map.toString()=" + payload.toString());

		System.out.println("search group");
		System.out.println("search:" + payload.get("search"));
		List<Group> groupList = null;

		try {
			groupList = groupService.search(String.valueOf(payload.get("search")));
			log.info("groupList" + groupList.toString());
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(groupList);
		}
		return new ResponseEntity<>(groupList, HttpStatus.OK);
	}

	// ------------------------------------------------------------------------------------
	// 그룹원 관리
	// 특정 그룹에 속한 모든 그룹원을 조회
	@GetMapping("/groupone/list/{group_id}")
	public ResponseEntity<List<GroupOne>> getGroupOneListByGroupId(@PathVariable int group_id) {
		System.out.println("getGroupOneListByGroupId");
		List<GroupOne> groupOneList = null;
		try {
			groupOneList = groupOneService.selectByGroupId(group_id);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(groupOneList);
		}
		return new ResponseEntity<>(groupOneList, HttpStatus.OK);
	}

	// 그룹에 지원하기
	@Transactional
	@PostMapping("/groupone/insert")
	public ResponseEntity<?> insertGroupOne(@RequestBody Map<String, Object> map) throws Exception {
		log.info("insert map.toString()=" + map.toString());

		try {
			// 그룹원 추가
			groupOneService.create(map);
			// 지원수 업데이트
			groupService.incrementApplyCount(Integer.parseInt(String.valueOf(map.get("group_id"))));
			return ResponseEntity.ok("Groupone insert successfully");
		} catch (Exception e) {
			log.error("Error inserting Groupone", e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error inserting Groupone");
		}
	}

	// 그룹원 가입 허락하기
	@PostMapping("/groupone/accept")
	public ResponseEntity<?> acceptGroupOne(@RequestBody Map<String, Object> map) {
		System.out.println("acceptGroupOne");

		try {
			groupOneService.accept(map);
			return ResponseEntity.ok("Groupone accept successfully");
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error accepting Groupone");
		}
	}

	// 그룹원 탈퇴 및 거절
	@PostMapping("/groupone/delete")
	public ResponseEntity<?> deleteGroupOne(@RequestBody Map<String, Object> map) {
		System.out.println("deleteGroupOne");

		try {
			groupOneService.delete(String.valueOf(map.get("user_id")));
			return ResponseEntity.ok("Groupone delete successfully");
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting Groupone");
		}
	}

}
