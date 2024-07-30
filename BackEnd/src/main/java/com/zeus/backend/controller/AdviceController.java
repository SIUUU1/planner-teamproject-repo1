package com.zeus.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
public class AdviceController {
	@GetMapping("/api/advice")
	public String getAdvice() {
		String url = "https://korean-advice-open-api.vercel.app/api/advice";
		RestTemplate restTemplate = new RestTemplate();
		ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
		String userInfo = response.getBody();
		System.out.println(userInfo);
		return userInfo;
	}
}
