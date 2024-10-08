package com.zeus.backend.controller;

import java.time.LocalDate;
import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.zeus.backend.domain.Attainment;
import com.zeus.backend.domain.User;
import com.zeus.backend.service.AttainmentService;
import com.zeus.backend.service.UserServiceImpl;

@RestController
@RequestMapping("/api/user/attainments")
public class AttainmentController {

	@Autowired
	private AttainmentService attainmentService;
	@Autowired
	private UserServiceImpl userServiceImpl;

	@GetMapping
	public List<Attainment> getAllAttainments() {
		return attainmentService.getAllAttainments();
	}

	@GetMapping("/{attainment_no}")
	public Attainment getAttainmentByIdNo(@PathVariable Long attainment_no) {
		return attainmentService.getAttainmentById(attainment_no);
	}

	@PostMapping
	public ResponseEntity<String> createAttainment(@RequestBody Attainment attainment) {
		System.out.println("===============================");
		System.out.println("start create attainment");
		System.out.println("attainment:"+attainment.toString());
		User user = null;
		try {
			user = userServiceImpl.read();
		} catch (Exception e) {
			e.printStackTrace();
		}
		if (user == null) {
			return ResponseEntity.status(499).build(); // 499 Custom Unauthorized
		}
		attainment.setUser_id(user.getUser_id());

		System.out.println("user.getUser_id()" + user.getUser_id());
		attainmentService.createAttainment(attainment);
		return new ResponseEntity<>(HttpStatus.OK); // 200 OK
	}
	@PostMapping("/update")
	public ResponseEntity<String> updateAttainment(@RequestBody Attainment attainment) {
		System.out.println("===============================");
		System.out.println("start update attainment");
		attainmentService.updateAttainment(attainment);
		return new ResponseEntity<>(HttpStatus.OK); // 200 OK
	}


	@PostMapping("/delete")
	public void deleteAttainment(@RequestBody Map<String, String> payload) {
		Long attainment_no = Long.parseLong(payload.get("attainment_no"));
		attainmentService.deleteAttainment(attainment_no);
	}

	@GetMapping("/search")
	public ResponseEntity<List<Attainment>> getAttainmentsByUserIdAndDate(
			 @RequestParam("attainment_duration") String attainmentDuration,
		        @RequestParam("selectDate") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate selectDate) {
		System.out.println("======================");
		System.out.println("start get Attainments By UserId And Date");
		System.out.println("attainmentDuration"+attainmentDuration);
		System.out.println("selectDate"+selectDate);
		User user = null;
		try {
			user = userServiceImpl.read();
		} catch (Exception e) {
			e.printStackTrace();
		}
		if (user == null) {
			return ResponseEntity.status(499).build(); // 499 Custom Unauthorized
		}
		System.out.println("user.getUser_id()" + user.getUser_id());
		List<Attainment> attainments = attainmentService.getAttainmentsByUserIdAndDate(user.getUser_id(),
				attainmentDuration, selectDate);
		System.out.println("attainments: "+attainments.toString());
		return new ResponseEntity<>(attainments, HttpStatus.OK); // 200 OK;
	}
	
	@GetMapping("/searchUser")
	public ResponseEntity<List<Attainment>> getAttainmentsByOtherUserIdAndDate(
			@RequestParam("attainment_duration") String attainmentDuration,
			@RequestParam("selectDate") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate selectDate, 
			@RequestParam String user_id ) {
		System.out.println("======================");
		System.out.println("start get Attainments By Other UserId And Date");
		System.out.println("attainmentDuration"+attainmentDuration);
		System.out.println("selectDate"+selectDate);
		System.out.println("user_id"+user_id);
		
		List<Attainment> attainments = attainmentService.getAttainmentsByUserIdAndDate(user_id,
				attainmentDuration, selectDate);
		System.out.println("attainments: "+attainments.toString());
		return new ResponseEntity<>(attainments, HttpStatus.OK); // 200 OK;
	}
	
	@GetMapping("/searchGroup")
	public ResponseEntity<List<Attainment>> getAttainmentsByOtherGroupIdAndDate(
			@RequestParam("attainment_duration") String attainmentDuration,
			@RequestParam("selectDate") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate selectDate, 
			@RequestParam Long group_id ) {
		System.out.println("======================");
		System.out.println("start get Attainments By Other group_id And Date");
		System.out.println("attainmentDuration"+attainmentDuration);
		System.out.println("selectDate"+selectDate);
		System.out.println("group_id"+group_id);
		
		List<Attainment> attainments = attainmentService.getAttainmentsByOtherGroupIdAndDate(group_id,
				attainmentDuration, selectDate);
		System.out.println("attainments: "+attainments.toString());
		return new ResponseEntity<>(attainments, HttpStatus.OK); // 200 OK;
	}
	
	@GetMapping("/monthlyShortTermAttainmentRate")
    public ResponseEntity<Map<String, String>> getMonthlyShortTermAttainmentRate() {
        System.out.println("getMonthlyShortTermAttainmentRate");
        Map<String, String> originalMap = attainmentService.getMonthlyShortTermAttainmentRate();
        Map<String, String> sortedMap = sortMapByMonth(originalMap);
        System.out.println("sortedMap: " + sortedMap.toString());
        return ResponseEntity.ok(sortedMap); // HTTP 상태 200 OK와 함께 반환
    }

    @GetMapping("/monthlyLongTermAttainmentRate")
    public ResponseEntity<Map<String, String>> getMonthlyLongTermAttainmentRate() {
        System.out.println("getMonthlyLongTermAttainmentRate");
        Map<String, String> originalMap = attainmentService.getMonthlyLongTermAttainmentRate();
        Map<String, String> sortedMap = sortMapByMonth(originalMap);
        System.out.println("sortedMap: " + sortedMap.toString());
        return ResponseEntity.ok(sortedMap); // HTTP 상태 200 OK와 함께 반환
    }

    // 공통된 정렬 메서드
    private Map<String, String> sortMapByMonth(Map<String, String> originalMap) {
        return originalMap.entrySet().stream()
            .sorted(Map.Entry.comparingByKey(Comparator.comparingInt(key -> Integer.parseInt(key.replace("MONTH", "")))))
            .collect(Collectors.toMap(
                Map.Entry::getKey, 
                Map.Entry::getValue, 
                (e1, e2) -> e1, 
                LinkedHashMap::new
            ));
    }
}