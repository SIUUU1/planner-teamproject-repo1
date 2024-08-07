package com.zeus.backend.controller;

import java.io.IOException;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
public class AdviceController {
	@GetMapping("/api/advice")
	public ResponseEntity<?> getAdvice() {
		String url = "https://korean-advice-open-api.vercel.app/api/advice";
		RestTemplate restTemplate = new RestTemplate();
		ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);

		ObjectMapper objectMapper = new ObjectMapper();
		Map<String, Object> advice = null;

		try {
			advice = objectMapper.readValue(response.getBody(), Map.class);
			System.out.println("advice" + advice);
		} catch (IOException e) {
			e.printStackTrace();
			return ResponseEntity.status(500).body("Internal Server Error: " + e.getMessage());
		}
		return ResponseEntity.ok(advice);
	}
}
