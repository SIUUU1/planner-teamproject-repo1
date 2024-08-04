package com.zeus.backend.service;


import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;


@Service
public class PaymentServiceImpl implements PaymentService {
	@Value("${portone.api.imp}")
	private String imp_uid;

	@Value("${portone.api.key}")
	private String apiKey;

	@Value("${portone.api.secret}")
	private String apiSecret;

	private final RestTemplate restTemplate = new RestTemplate();

	
//	public String getToken() {
//		String url = "https://api.iamport.kr/users/getToken";
//		Map<String, String> request = new HashMap<>();
//		request.put("imp_key", apiKey);
//		request.put("imp_secret", apiSecret);
//		System.out.println("getToken() request " + request);
//
//		ResponseEntity<Map> response = restTemplate.postForEntity(url, request, Map.class);
//
//		Map<String, Object> responseBody = (Map<String, Object>) response.getBody();
//		Map<String, Object> responseData = (Map<String, Object>) responseBody.get("response");
//		return (String) responseData.get("access_token");
//	}
	@Override
	public String getAccessToken() {
        String url = "https://api.iamport.kr/users/getToken";

        Map<String, String> request = new HashMap<>();
        request.put("imp_key", apiKey);
        request.put("imp_secret", apiSecret);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, String>> entity = new HttpEntity<>(request, headers);
        ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.POST, entity, Map.class);

        if (response.getStatusCode() != HttpStatus.OK) {
            throw new RuntimeException("Failed to get access token");
        }

        Map<String, Object> responseBody = (Map<String, Object>) response.getBody().get("response");
        return (String) responseBody.get("access_token");
    }

	@Override
	public Map<String, Object> preparePayment(String emoji_group_id, int price) {
		String token = getAccessToken();
		String url = "https://api.iamport.kr/payments/prepare";

		HttpHeaders headers = new HttpHeaders();
		headers.set("Auth-Token", token);

		Map<String, Object> request = new HashMap<>();
		request.put("EMOJI_GROUP_ID", emoji_group_id);
		request.put("amount", price);

		HttpEntity<Map<String, Object>> entity = new HttpEntity<>(request, headers);
		ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.POST, entity, Map.class);

		System.out.println("preparePayment ");
		return response.getBody();
	}
	
	public Map<String, Object> getPayment(String impUid, String accessToken) {
        String url = "https://api.iamport.kr/payments/" + impUid;

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", accessToken);

        HttpEntity<Void> entity = new HttpEntity<>(headers);
        ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.GET, entity, Map.class);

        if (response.getStatusCode() != HttpStatus.OK) {
            throw new RuntimeException("Failed to get payment information");
        }

        return (Map<String, Object>) response.getBody().get("response");
    }
	
}
