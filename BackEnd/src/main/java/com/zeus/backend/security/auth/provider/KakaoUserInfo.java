package com.zeus.backend.security.auth.provider;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

public class KakaoUserInfo implements OAuth2UserInfo {

	private Map<String, Object> attributes; // oAuth2User.getAttributes()

	public KakaoUserInfo(Map<String, Object> attributes) {
		this.attributes = attributes;
	}

	@Override
	public String getProviderId() {
		return String.valueOf(attributes.get("id"));
	}

	@Override
	public String getProvider() {
		return "kakao";
	}

	@Override
	public String getEmail() {
		Map<String, Object> kakaoAccount = (Map<String, Object>) attributes.get("kakao_account");
		return (String) kakaoAccount.get("email");
	}

	@Override
	public String getName() {
		Map<String, Object> kakaoAccount = (Map<String, Object>) attributes.get("kakao_account");
		return (String) kakaoAccount.get("name");
	}

	@Override
	public String getPhoneNumber() {
		Map<String, Object> kakaoAccount = (Map<String, Object>) attributes.get("kakao_account");
		String phone_number = (String) kakaoAccount.get("phone_number");
		return phone_number == null ? null : formatPhoneNumber(phone_number);
	}

	@Override
	public Date getBirthday() {
		Map<String, Object> kakaoAccount = (Map<String, Object>) attributes.get("kakao_account");
		String birthyear = (String) kakaoAccount.get("birthyear");
		String birthday = (String) kakaoAccount.get("birthday");
		SimpleDateFormat formatt = new SimpleDateFormat("yyyyMMdd");
		Date user_birthday = null;

		try {
			user_birthday = formatt.parse((birthyear + birthday));
		} catch (ParseException e) {
			e.printStackTrace();
		}

		return user_birthday == null ? null : user_birthday;
	}

	@Override
	public String getGender() {
		Map<String, Object> kakaoAccount = (Map<String, Object>) attributes.get("kakao_account");
		String user_gender = (String) kakaoAccount.get("gender");
		if (user_gender.equalsIgnoreCase("female")) {
			user_gender = "F";
		} else {
			user_gender = "M";
		}
		return user_gender == null ? null : user_gender;
	}

	// 국제 전화번호 포맷을 국내 포맷으로 변환
	public static String formatPhoneNumber(String internationalNumber) {
		if (internationalNumber.startsWith("+82 ")) {

			String localNumber = internationalNumber.substring(4);
			if (localNumber.startsWith("10")) {
				localNumber = "0" + localNumber;
			}
			return localNumber;
		}
		return internationalNumber;
	}

}
