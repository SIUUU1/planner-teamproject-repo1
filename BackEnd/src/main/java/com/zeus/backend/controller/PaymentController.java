package com.zeus.backend.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zeus.backend.domain.Payment;
import com.zeus.backend.domain.User;
import com.zeus.backend.service.PaymentService;
import com.zeus.backend.service.UserService;

@RestController
@RequestMapping("/api/pay")
public class PaymentController {
	@Autowired
	private PaymentService paymentService;
	
	@Autowired
	private UserService userService;

	// 이모지 결제 등록 처리
	@PostMapping("/emojiPay")
	public ResponseEntity<String> emojiPayment(@RequestBody Payment payment) throws Exception {
		try {
			String item_id = payment.getItem_id();
			item_id = "emoji_"+item_id;
			payment.setItem_id(item_id);
			paymentService.create(payment);
			return ResponseEntity.ok("결제가 성공적으로 완료되었습니다.");
		} catch (Exception e) {
			// 에러 처리 및 에러 메시지 반환
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("결제 처리 중 오류가 발생했습니다: " + e.getMessage());
		}
	}
	
	//pro upgrade 결제 등록 처리
	@PostMapping("/proPay")
	public ResponseEntity<String> proPayment(@RequestBody Payment payment) throws Exception {
		try {
			String item_id = payment.getItem_id();
			item_id = "proUpdate_"+item_id;
			payment.setItem_id(item_id);
			paymentService.create(payment);
			
			//권한 수정
			User user = new User();
			user.setUser_id(payment.getUser_id());
			userService.modifyAuth(user);
			return ResponseEntity.ok("결제가 성공적으로 완료되었습니다.");
		} catch (Exception e) {
			// 에러 처리 및 에러 메시지 반환
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("결제 처리 중 오류가 발생했습니다: " + e.getMessage());
		}
	}
	
	@GetMapping("/payCountByDate")
	public ResponseEntity<Map<String, String>> getPayCountByDate() {
	    System.out.println("getPayCountByDate");
	    Map<String, String> map = paymentService.getPayCountByDate();
	    System.out.println("map: " + map.toString());
	    return ResponseEntity.ok(map); // HTTP 상태 200 OK와 함께 반환
	}
	
	@GetMapping("/dailySalesByDate")
	public ResponseEntity<Map<String, String>> getDailySalesByDate() {
	    System.out.println("getDailySalesByDate");
	    Map<String, String> map = paymentService.getDailySalesByDate();
	    System.out.println("map: " + map.toString());
	    return ResponseEntity.ok(map); // HTTP 상태 200 OK와 함께 반환
	}
	
	@GetMapping("/cumulativeSalesByDate")
	public ResponseEntity<Map<String, String>> getCumulativeSalesByDate() {
	    System.out.println("getCumulativeSalesByDate");
	    Map<String, String> map = paymentService.getCumulativeSalesByDate();
	    System.out.println("map: " + map.toString());
	    return ResponseEntity.ok(map); // HTTP 상태 200 OK와 함께 반환
	}

}
