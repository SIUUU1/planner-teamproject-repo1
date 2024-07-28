package com.zeus.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
	public static final String ALLOWED_METHOD_NAMES = "GET,HEAD,POST,PUT,DELETE,TRACE,OPTIONS,PATCH";

	@Override
	public void addCorsMappings(final CorsRegistry registry) {
		// http://localhost:8080/** 요청으로 온 것은 모두 열어서 진행하겠다.
		registry.addMapping("/**").allowedMethods(ALLOWED_METHOD_NAMES.split(","));
	}
}
