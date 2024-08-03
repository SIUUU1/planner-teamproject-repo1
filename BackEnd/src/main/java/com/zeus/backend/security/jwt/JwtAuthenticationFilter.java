package com.zeus.backend.security.jwt;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.zeus.backend.domain.User;
import com.zeus.backend.security.auth.PrincipalDetails;
import com.zeus.backend.security.domain.Response;
import com.zeus.backend.service.UserOauthService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

	private final AuthenticationManager authenticationManager;
	private final UserOauthService userOauthService;
	private final JwtService jwtService;

	/* (1) */
	@Override
	public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
			throws AuthenticationException {
		System.out.println("================================");
		System.out.println("JwtAuthenticationFilter  - attemptAuthentication : 로그인 시도중");
		ObjectMapper om = new ObjectMapper();
		try {
			System.out.println("id, pw json 파싱");

			User user = om.readValue(request.getInputStream(), User.class);
			System.out.println("JwtAuthenticationFilter User : " + user);

			UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
					user.getUser_id(), user.getPassword());
			Authentication authentication = authenticationManager.authenticate(authenticationToken);
			PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
			System.out.println("로그인 성공");
			System.out.println("===========================");
			return authentication;
		} catch (UsernameNotFoundException e) {
			System.out.println("유저 못 찾음 : " + e.getMessage());
		} catch (IOException e) {
			System.out.println("에러발생 : " + e.getMessage());
		}
		System.out.println("로그인 실패");
		System.out.println("===============================");
		return null;
	}

	/* (2) */
	@Override
	protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
			Authentication authResult) throws IOException, ServletException {
		System.out.println("==============================");
		System.out.println("JwtAuthenticationFilter  - successfulAuthentication : 로그인 후 처리중 (JWT 토큰 만들기)");
		PrincipalDetails principalDetails = (PrincipalDetails) authResult.getPrincipal();
		String user_id = principalDetails.getUsername();

		JwtModel jwtModel = jwtService.createToken(user_id);
		jwtService.createCookie(response, jwtModel.getAccessToken()); // 엑세스 토큰 쿠키에 추가
		
		try {
			userOauthService.deleteUserOauth(user_id);
			userOauthService.insertUserOauth(user_id, jwtModel);
		} catch (Exception e) {
			e.printStackTrace();
		}

		ObjectMapper mapper = new ObjectMapper(); // JSON에 담을 매퍼
		Map<String, String> dataMap = new HashMap<>();
		dataMap.put("url", "/"); // 나중에는 원래 있던 곳으로 돌아갈 수 잇게 세션에서 기존 url 받아옴

		Response<Map<String, String>> responseDto = new Response<>(HttpStatus.OK.value(), dataMap);
		response.setCharacterEncoding("UTF-8");
		response.setStatus(HttpServletResponse.SC_OK);
		response.getWriter().print(mapper.writeValueAsString(responseDto));
		response.getWriter().flush();
		System.out.println("json 리턴");
		System.out.println("JwtAuthenticationFilter 종료");
		System.out.println("====================================");

	}
}
