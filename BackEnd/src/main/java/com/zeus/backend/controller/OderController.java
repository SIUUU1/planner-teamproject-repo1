package com.zeus.backend.controller;


import javax.xml.transform.dom.DOMResult;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
public class OderController {
//	// PG사 채널키
//	@Value("${kg_channel}")
//	private String kg_channel;
//	@Value("${tosspayment_channel}")
//	private String tosspayment_channel;
//	// 간편결제사 채널키
//	@Value("${kakaopay_channel}")
//	private String kakaopay_channel;
//	@Value("${tosspay_channel}")
//	private String tosspay_channel;

//	@RequestMapping(value = "/order/{product_id}", method = RequestMethod.GET)
//	public String order(@PathVariable(value = "product_id") int product_id) {
//		try {
//			System.out.println("product_id" + product_id);
//			Product product = service.findProductById(product_id);
//
//			if (product == null) {
//				System.out.println("상품을 찾을 수 없습니다.");
//				model.addAttribute("error_msg", "상품을 찾을 수 없습니다.");
//				return "error";
//			}
//
//			// 로그인 된 user의 아이디가 1이라고 할 때
//			User user = service.findUserById(1);
//			// 주문번호를 매번 유니크하게 생성한다.
//			long nano = System.currentTimeMillis();
//			String paymentId = "pid-" + nano;
//			// 상품 주문정보 생성(주문시도 상태가 30분 이상 지난 건은 주문실패로 간주한다.)
//			Order order = Order.builder().productId(product_id).merchantUid(paymentId).amount(product.getAmount())
//					.userId(user.getId()).status("TRY")// 주문시도
//					.build();
//
//			order = service.save(order);
//
//			// 멀티PG 분기
//			String[] pg_code = { "tosspayments", "ksnet" };
//			String[] channelKey = { "" };
//			long selected_pg = product_id % 2;
//
//			// 스토어 아이디
//			// 상점주문번호
//			// 회원,상품,주문정보
//
//		} catch (Exception e) {
//			e.printStackTrace();
//			return "error";
//		}
//
//		return "checkout_v2";
//	}
//
//	@RequestMapping(value = "/payment/callback", method = RequestMethod.GET)
//	public ResponseEntity<?> callback_receive(@RequestBody Portone entity) {
//		HttpHeaders headers = new HttpHeaders();
//		headers.add("Content-Type", "application/json; charset=UTF-8");
//		JSONObject responseObj = new JSONObject();
//		try {
//			String txId = entity.getTxId();
//			String paymentId = entity.getPaymentId();
//			String code = entity.getCode();
//			String message = entity.getMessage();
//
//			System.out.println("---callback receive---");
//			System.out.println("----------------------");
//			System.out.println("txId : " + txId);
//			System.out.println("paymentId : " + paymentId);
//			System.out.println("code : " + code);
//			System.out.println("message : " + message);
//
//			// 웹훅우선순위설정에 따라 웹훅으로 DB결과를 반영하여 콜백은 DB의 결과를 조회하여 프론트로 전달한다.
//			Payment payment = service.findPaymentById(paymentId);
//			String status = "fail";
//			String fail_reason = "결제에 실패했습니다.";
//			if (payment != null) {
//				status = payment.getStatus();
//				fail_reason = payment.getFailReason();
//			}
//			responseObj.put("status", status);
//			responseObj.put("fail_reason", fail_reason);
//
//		} catch (Exception e) {
//			e.printStackTrace();
//			responseObj.put("status", "fail");
//			responseObj.put("fail_reason", "관리자에게 문의해 주세요.");
//		}
//		return new ResponseEntity<String>(responseObj.toString(), headers, HttpStatus.OK);
//	}
//
//	// 리다이렉트 수신처리
//	@RequestMapping(value = "/payment/redirect", method = RequestMethod.GET)
//	public ModelAndView redirect_receive(@RequestParam(value = "txId") String txId,
//			@RequestParam("paymentId") String paymentId) {
//		String process_result = "redirection";
//		// 응답 header 생성
//		HttpHeaders headers = new HttpHeaders();
//		headers.add("Content-Type", "application/json; charset=UTF-8");
//		JSONObject responseObj = new JSONObject();
//		ModelAndView mav = new ModelAndView();
//		try {
//			System.out.println("---redirect---");
//			System.out.println("----------------------");
//			System.out.println("txId : " + txId);
//			System.out.println("paymentId : " + paymentId);
//			// 웹훅우선순위설정에 따라 웹훅으로 DB결과를 반영하여 콜백은 DB의 결과를 조회하여 프론트로 전달한다.
//			Payment payment = service.findPaymentById(paymentId);
//			String status = "fail";
//			String fail_reason = "결제에 실패했습니다.";
//			if (payment != null) {
//				status = payment.getStatus();
//				fail_reason = payment.getFailReason();
//			}
//			mav.addObject("status", status);
//			mav.addObject("fail_reason", fail_reason);
//			mav.setViewName("redirect");
//		} catch (Exception e) {
//			e.printStackTrace();
//			responseObj.put("product_result", "결재실패 : 관리자에게 문의해 주세요.");
//		}
//		return mav;
//	}
//
//	// 웹훅 수신 처리
//	@RequestMapping(value = "/payment/webhook", method = RequestMethod.GET)
//	public ResponseEntity<?> webhook_receive(@RequestBody Portone entity) {
//		HttpHeaders headers = new HttpHeaders();
//		headers.add("Content-Type", "application/json; charset=UTF-8");
//		JSONObject responseObj = new JSONObject();
//		try {
//			String txId = entity.getTxId();
//			String paymentId = entity.getPaymentId();
//			System.out.println("---webhook receive---");
//			System.out.println("----------------------");
//			System.out.println("txId : " + txId);
//			System.out.println("paymentId : " + paymentId);
//			
//			String status = doResult(entity);
//		}catch(Exception e) {
//			e.printStackTrace();
//			responseObj.put("product_result", "결재실패 : 관리자에게 문의해 주세요.");
//		}
//		return new ResponseEntity<String>(responseObj.toString(), headers, HttpStatus.OK);
//	}
//
//	// 공통 처리
//	private doResult(Portone entity)) {
//		String status = "";
//		try {
//			String txId = entity.getTxId();
//			String paymentId = entity.getPaymentId();
//			String code = entity.getCode();
//			String message= entity.getMessage();
//			
//			if(paymentId!=null) {
//				JSONObject json = new JSONObject();
//				json.put("apikey",apikey);
//				
//			}
//		}catch(Exception e) {
//			e.printStackTrace();
//			responseObj.put("product_result", "결재실패 : 관리자에게 문의해 주세요.");
//		}
//	}
//	
}
