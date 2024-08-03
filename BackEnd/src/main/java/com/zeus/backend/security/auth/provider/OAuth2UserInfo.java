package com.zeus.backend.security.auth.provider;

public interface OAuth2UserInfo {
	String getProviderId(); // 도메인에서 부여한 id값

	String getProvider(); // 도메인

	String getEmail(); // 클라이언트 email

	String getName(); // 클라이언트 이름
}
