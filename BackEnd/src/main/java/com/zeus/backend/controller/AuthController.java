package com.zeus.backend.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.view.RedirectView;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.zeus.backend.common.security.CodeGenerator;
import com.zeus.backend.common.security.JwtUtil;
import com.zeus.backend.common.security.domain.AuthenticationRequest;
import com.zeus.backend.common.security.domain.VerificationRequest;
import com.zeus.backend.service.EmailService;

import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/auth")
public class AuthController {

	@Autowired
	private EmailService emailService;

	// 인증코드 이메일 보내기
	@PostMapping("/sendVerificationCode")
	public String sendVerificationCode(@RequestParam("user_email") String user_email, HttpSession session) {
		String code = CodeGenerator.generateCode();
		try {
			emailService.sendEmail(user_email, "Email Verification Code", "Your verification code is: " + code);
		} catch (Exception e) {
			e.printStackTrace();
		}

		// 세션에 인증 코드 저장
		session.setAttribute("verificationCode", code);
		session.setAttribute("email", user_email);

		return "Verification code sent to " + user_email;
	}

	// 인증코드 확인하기
	@PostMapping("/verifyCode")
	public String verifyCode(@RequestBody VerificationRequest verificationRequest, HttpSession session) {
		String sessionCode = (String) session.getAttribute("verificationCode");
		String sessionEmail = (String) session.getAttribute("email");

		if (sessionCode == null || sessionEmail == null) {
			return "No verification code sent.";
		}

		if (sessionEmail.equals(verificationRequest.getEmail()) && sessionCode.equals(verificationRequest.getCode())) {
			return "Verification successful";
		} else {
			return "Verification failed";
		}
	}
	////////////////////////////////////////////////////////////////////
	//로그인
	@Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserDetailsService userDetailsService;

    @PostMapping("/login")
    public String createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) throws Exception {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(), authenticationRequest.getPassword())
            );
        } catch (Exception e) {
            throw new Exception("Incorrect username or password", e);
        }

        final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUsername());
        final String jwt = jwtUtil.generateToken(userDetails.getUsername());

        return jwt;
    }
    
    ////////////////////////////////////////////////////////////////////

	// 구글
	@Value("${google_client_id}")
	private String google_client_id;
	@Value("${google_client_secret}")
	private String google_client_secret;
	@Value("${google_reUri}")
	private String google_reUri;

	// 카카오
	@Value("${kakao_client_id}")
	private String kakao_client_id;
	@Value("${kakao_reUri}")
	private String kakao_reUri;

	// 로그인 처리
//	@RequestMapping(value = "/login", method = RequestMethod.POST)
//	public String login(String error, String logout) {
//		String message = "";
//		if (error != null) {
//			// 로그인 에러 alert
//			message = "로그인 에러";
//		}
//		if (logout != null) {
//			// 로그아웃 alert
//			message = "로그아웃";
//		}
//		return message;
//	}

	// 로그아웃 페이지를 생성한다.
	@RequestMapping("/logout")
	public void logoutForm() {

	}

	// 구글 로그인 페이지
	@RequestMapping(value = "/login/google", method = RequestMethod.GET)
	public RedirectView loginGoogle() {

		String googleEndPoint = "https://accounts.google.com/o/oauth2/v2/auth?" + "scope=profile email"
				+ "&response_type=code" + "&redirect_uri=" + google_reUri + "&client_id=" + google_client_id;

		return new RedirectView(googleEndPoint);
	}

	// 구글 로그인 콜백
	@RequestMapping("/login/callback/google")
	public Map<String, Object> callbackGoogle(@RequestParam("code") String code) {

		String tokenEndPoint = "https://oauth2.googleapis.com/token";
		RestTemplate restTemplate = new RestTemplate();
		Map<String, Object> userInfoMap = null; // 사용자 정보 받기

		// 인증 토큰
		String requestBody = "code=" + code + "&client_id=" + google_client_id + "&client_secret="
				+ google_client_secret + "&redirect_uri=" + google_reUri + "&grant_type=authorization_code";
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(org.springframework.http.MediaType.APPLICATION_FORM_URLENCODED);
		HttpEntity<String> request = new HttpEntity<>(requestBody, headers);

		ResponseEntity<String> response = restTemplate.exchange(tokenEndPoint, HttpMethod.POST, request, String.class);

		if (response.getStatusCode().is2xxSuccessful()) {
			String responseBody = response.getBody();
			try {
				ObjectMapper objectMapper = new ObjectMapper();
				JsonNode jsonNode = objectMapper.readTree(responseBody);
				String accessToken = jsonNode.get("access_token").asText();

				String userInfoEndpoint = "https://www.googleapis.com/oauth2/v2/userinfo?access_token=" + accessToken;
				HttpHeaders userInfoHeaders = new HttpHeaders();
				userInfoHeaders.add("Authorization", "Bearer " + accessToken);
				HttpEntity<String> userInfoRequest = new HttpEntity<>(userInfoHeaders);

				ResponseEntity<String> userInfoResponse = restTemplate.exchange(userInfoEndpoint, HttpMethod.GET,
						userInfoRequest, String.class);

				if (userInfoResponse.getStatusCode().is2xxSuccessful()) {
					String userInfo = userInfoResponse.getBody();
					ObjectMapper userInfoObjectMapper = new ObjectMapper();
					userInfoMap = userInfoObjectMapper.readValue(userInfo, new TypeReference<Map<String, Object>>() {
					});
					userInfoMap.put("login_type_no", 1);
					userInfoMap.put("social_code", 0);
					userInfoMap.put("access_token", accessToken);
					System.out.println(userInfoMap);
				}
			} catch (Exception e) {
				e.printStackTrace();
				return userInfoMap;
			}
		}
		return userInfoMap;
	}

	// 카카오 로그인 페이지
	@RequestMapping(value = "/login/kakao", method = RequestMethod.GET)
	public RedirectView loginKakao() {

		String kakaoEndPoint = "https://kauth.kakao.com/oauth/authorize?client_id=" + kakao_client_id + "&redirect_uri="
				+ kakao_reUri + "&response_type=code";

		return new RedirectView(kakaoEndPoint);
	}

	// 카카오 로그인 콜백
	@RequestMapping("/login/callback/kakao")
	public Map<String, Object> callbackKakao(@RequestParam("code") String code) {

		String tokenEndPoint = "https://kauth.kakao.com/oauth/token";
		RestTemplate restTemplate = new RestTemplate();
		Map<String, Object> userInfoMap = null; // 사용자 정보 받기

		String requestBody = "code=" + code + "&client_id=" + kakao_client_id + "&redirect_uri=" + kakao_reUri
				+ "&grant_type=authorization_code";
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(org.springframework.http.MediaType.APPLICATION_FORM_URLENCODED);
		HttpEntity<String> request = new HttpEntity<>(requestBody, headers);

		ResponseEntity<String> response = restTemplate.exchange(tokenEndPoint, HttpMethod.POST, request, String.class);

		if (response.getStatusCode().is2xxSuccessful()) {
			String responseBody = response.getBody();
			try {
				ObjectMapper objectMapper = new ObjectMapper();
				JsonNode jsonNode = objectMapper.readTree(responseBody);
				String accessToken = jsonNode.get("access_token").asText();

				String userInfoEndpoint = "https://kapi.kakao.com/v2/user/me";
				HttpHeaders userInfoHeaders = new HttpHeaders();
				userInfoHeaders.add("Authorization", "Bearer " + accessToken);
				HttpEntity<String> userInfoRequest = new HttpEntity<>(userInfoHeaders);

				ResponseEntity<String> userInfoResponse = restTemplate.exchange(userInfoEndpoint, HttpMethod.GET,
						userInfoRequest, String.class);

				if (userInfoResponse.getStatusCode().is2xxSuccessful()) {
					String userInfo = userInfoResponse.getBody();
					ObjectMapper userInfoObjectMapper = new ObjectMapper();
					userInfoMap = userInfoObjectMapper.readValue(userInfo, new TypeReference<Map<String, Object>>() {
					});
					userInfoMap.put("login_type_no", 1);
					userInfoMap.put("social_code", 1);
					userInfoMap.put("access_token", accessToken);
					System.out.println(userInfoMap);
				}
			} catch (Exception e) {
				e.printStackTrace();
				return userInfoMap;
			}
		}
		return userInfoMap;
	}

	// 카카오 로그아웃
//	@RequestMapping(value = "/logout/kakao", method = RequestMethod.GET)
//	public RedirectView logoutKakao() {
//		String kakaoEndPoint = "https://kauth.kakao.com/oauth/logout?client_id=" + kakao_client_id
//				+ "&logout_redirect_uri=" + logout_reUri;
//		return new RedirectView(kakaoEndPoint);
//	}

}
