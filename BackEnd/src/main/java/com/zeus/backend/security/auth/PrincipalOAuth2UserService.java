package com.zeus.backend.security.auth;

import java.util.Date;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import com.zeus.backend.domain.User;
import com.zeus.backend.mapper.UserMapper;
import com.zeus.backend.security.auth.provider.KakaoUserInfo;
import com.zeus.backend.security.auth.provider.GoogleUserInfo;
import com.zeus.backend.security.auth.provider.NaverUserInfo;
import com.zeus.backend.security.auth.provider.OAuth2UserInfo;

import jakarta.servlet.http.HttpSession;

@Service
public class PrincipalOAuth2UserService extends DefaultOAuth2UserService {

	private final BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

	@Autowired
	private UserMapper mapper;

	@Autowired
	private HttpSession httpSession;

	// 구글로부터 받은 userRequest 데이터에 대한 후처리가 되는 함수
	// 해당 함수 종료시에 @Authentication이 만들어진다!!!
	@Override
	public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
		// registrationId로 어떤 oauth로 로그인 했는지 알 수 있음
		System.out.println("userRequest : " + userRequest.getClientRegistration());
		System.out.println("userRequest = " + userRequest.getAccessToken().getTokenValue());

		OAuth2User oAuth2User = super.loadUser(userRequest);
		// 구글 로그인 버튼 클릭 -> 구글 로그인 창 -> 로그인을 완료 -> code를 리턴(Oauth-client라이브러리
		// -> AccessToken 요청 -> userRequest정보생성 -> loadUser함수 호출
		// -> 구글로부터 회원 프로필을 받아줌
		System.out.println("getAttributes = " + super.loadUser(userRequest).getAttributes());

		// 회원가입을 강제로 진행해볼 예정
		OAuth2UserInfo oAuth2UserInfo = null;
		if (userRequest.getClientRegistration().getRegistrationId().equals("google")) {
			System.out.println("구글 로그인 요청");
			oAuth2UserInfo = new GoogleUserInfo(oAuth2User.getAttributes());
		} else if (userRequest.getClientRegistration().getRegistrationId().equals("kakao")) {
			System.out.println("카카오 로그인 요청");
			oAuth2UserInfo = new KakaoUserInfo(oAuth2User.getAttributes());
		} else if (userRequest.getClientRegistration().getRegistrationId().equals("naver")) {
			System.out.println("네이버 로그인 요청");
			oAuth2UserInfo = new NaverUserInfo((Map) oAuth2User.getAttributes().get("response"));
		} else {
			System.out.println("우리는 구글, 카카오, 네이버를 지원하고 있어요!!!");
		}

		String provider = oAuth2UserInfo.getProvider();
		String providerId = oAuth2UserInfo.getProviderId();
		String user_id = provider + "_" + providerId; // google_105156291955329144943
		String password = bCryptPasswordEncoder.encode("weplan");

		// 회원 중복 체크
		User userEntity = null;
		try {
			userEntity = mapper.findByUserId(user_id);
		} catch (Exception e) {
			e.printStackTrace();
		}

		if (userEntity == null) {
			
			System.out.println("로그인이 최초입니다.");
			userEntity = new User();
			userEntity.setUser_id(user_id);
			userEntity.setRole("ROLE_USER");
			userEntity.setUser_email(oAuth2UserInfo.getEmail());
			userEntity.setPassword(password);
			userEntity.setProvider_id(providerId);
			userEntity.setProvider(providerId);
			userEntity.setUser_name(oAuth2UserInfo.getName());
			userEntity.setFirstLogin(true); // 첫 로그인 여부 설정
			userEntity.setUser_tel((oAuth2UserInfo).getPhoneNumber());
			userEntity.setUser_gender((oAuth2UserInfo).getGender());
			userEntity.setUser_birthday((oAuth2UserInfo).getBirthday());
			
		} else {
			userEntity.setFirstLogin(false);
			System.out.println("로그인을 이미 한적이 있습니다. 당신은 자동회원가입이 되어 있습니다.");
		}

		// 세션에 사용자 정보 저장
		httpSession.setAttribute("user", userEntity);

		return new PrincipalDetails(userEntity, oAuth2User.getAttributes());
	}

	public PrincipalDetails loadUserByUsername(String user_id) {
		User userEntity = null;
		try {
			userEntity = mapper.findByUserId(user_id);
		} catch (Exception e) {
			e.printStackTrace();
		}
		if (userEntity != null) {
			return new PrincipalDetails(userEntity);
		}
		return null;
	}

}
