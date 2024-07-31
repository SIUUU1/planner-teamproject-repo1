package com.zeus.backend.common.security;

import java.io.IOException;
import java.util.Map;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.WebAttributes;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.savedrequest.HttpSessionRequestCache;
import org.springframework.security.web.savedrequest.RequestCache;
import org.springframework.security.web.savedrequest.SavedRequest;

import com.zeus.backend.common.security.domain.CustomUser;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.extern.java.Log;

@Log
public class CustomLoginSuccessHandler implements AuthenticationSuccessHandler {
	private RequestCache requestCache = new HttpSessionRequestCache(); // 요청을 캐시하는 HttpSessionRequestCache 객체 생성
	
	//로그인 성공 처리자 메서드
	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication auth)
			throws IOException, ServletException {

		CustomUser customUser = (CustomUser) auth.getPrincipal(); // 인증된 사용자 정보 가져오기
		Map<String, Object> member = customUser.getMember(); // CustomUser 객체에서 Member 객체 가져오기
		log.info("user_no = " + (String) member.get("user_no")); // 사용자 user_no, email을 로그에 출력
		log.info("user_email = " + (String) member.get("user_email"));

		// 인증 과정에서 발생한 예외 정보를 세션에서 제거
		clearAuthenticationAttribute(request);

		// 사용자가 인증되기 전에 접근을 시도했던 요청을 가져옴
		SavedRequest savedRequest = requestCache.getRequest(request, response);

		// 기본 리디렉션 URL 설정
		String targetUrl = "/welcome";
		if (savedRequest != null) { // savedRequest가 null이 아닌 경우
			targetUrl = savedRequest.getRedirectUrl(); // savedRequest에서 리디렉션 URL을 가져옴
		}

		log.info("Login Success targetUrl = " + targetUrl); // 리디렉션 URL을 로그에 출력
		response.sendRedirect(targetUrl); // 사용자를 지정된 URL로 리디렉션
	}

	private void clearAuthenticationAttribute(HttpServletRequest request) {
		HttpSession session = request.getSession(false); // 현재 세션 가져오기. 세션이 없으면 null 반환
		if (session == null) {
			return; // 세션이 없으면 메소드 종료
		}
		// 세션에서 인증 예외 속성을 제거
		session.removeAttribute(WebAttributes.AUTHENTICATION_EXCEPTION);
	}
}
