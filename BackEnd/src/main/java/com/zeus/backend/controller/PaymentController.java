package com.zeus.backend.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.zeus.backend.domain.Payment;
import com.zeus.backend.service.PaymentService;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {
	@Autowired
	private PaymentService paymentService;

//	// 결제폼
//	@GetMapping("/payform")
//	public Map<String, Object> getItem() {
//		System.out.println("payform");
//		// 상품 정보 가져오기 서비스 사용
//		return null;
//	}
//
//	// 결제 처리
//	@PostMapping("/prepare")
//	public Map<String, Object> preparePayment(@RequestParam String emoji_group_id, @RequestParam int price) {
//		System.out.println("prepare");
//		return paymentService.preparePayment(emoji_group_id, price);
//	}
	
//	//결제완료 처리
//	 @PostMapping("/complete")
//	    public ResponseEntity<?> completePayment(@Validated @RequestBody Payment payment) {
//	        try {
//	            String accessToken = paymentService.getAccessToken();
////	            Map<String, Object> paymentData = paymentService.getPayment(payment.getImp_uid(), accessToken);
//
//	            // 주문 정보 확인 로직 (예시: OrderService를 통해 주문 정보를 가져와 비교)
////	            Order order = OrderService.findById(request.getMerchant_uid());
////	            if (order.getAmount() == (int) paymentData.get("amount")) {
////	                switch ((String) paymentData.get("status")) {
////	                    case "ready":
////	                        // 가상 계좌 발급 상태 처리
////	                        break;
////	                    case "paid":
////	                        // 결제 완료 상태 처리
////	                        break;
////	                }
////	            } else {
////	                throw new RuntimeException("Payment amount mismatch");
////	            }
//
//	            return ResponseEntity.ok("Payment validation successful");
//	        } catch (Exception e) {
//	            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Payment validation failed: " + e.getMessage());
//	        }
//	    }

}
