package com.zeus.backend.security.auth.provider;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

public class NaverUserInfo implements OAuth2UserInfo {

	private Map<String, Object> attributes; // oAuth2User.getAttributes()

	public NaverUserInfo(Map<String, Object> attributes) {
		this.attributes = attributes;
	}

	@Override
	public String getProviderId() {
		return (String) attributes.get("id");
	}

	@Override
	public String getProvider() {
		return "naver";
	}

	@Override
	public String getEmail() {
		return (String) attributes.get("email");
	}

	@Override
	public String getName() {
		return (String) attributes.get("name");
	}

	@Override
	public String getPhoneNumber() {
		return (String) attributes.get("mobile");
	}

	@Override
	public Date getBirthday() {
		String birthyear = (String) attributes.get("birthyear");
		String birthday = (String) attributes.get("birthday");
		SimpleDateFormat formatt = new SimpleDateFormat("yyyy-MM-dd");
		Date user_birthday = null;

		try {
			user_birthday = formatt.parse((birthyear + "-" + birthday));
		} catch (ParseException e) {
			e.printStackTrace();
		}

		return user_birthday == null ? null : user_birthday;
	}

	@Override
	public String getGender() {
		return (String) attributes.get("gender");
	}

}