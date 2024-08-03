package com.zeus.backend.service;

import com.zeus.backend.domain.UserOauth;
import com.zeus.backend.security.jwt.JwtModel;


public interface UserOauthService {
	public void deleteUserOauth(String user_id) throws Exception;

	public void insertUserOauth(String user_id, JwtModel jwtModel) throws Exception;

	public UserOauth findUserOauthByUserId(String user_id) throws Exception;
}
