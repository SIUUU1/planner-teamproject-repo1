package com.zeus.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.zeus.backend.domain.UserOauth;
import com.zeus.backend.mapper.UserOauthMapper;
import com.zeus.backend.security.jwt.JwtModel;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserOauthServiceImpl implements UserOauthService {
	@Autowired
	private UserOauthMapper mapper;

	@Transactional
	@Override
	public void deleteUserOauth(String user_id) throws Exception {
		mapper.delete(user_id);

	}

	@Override
	public void insertUserOauth(String user_id, JwtModel jwtModel) throws Exception {
		UserOauth userOauth = UserOauth.builder().refresh_token(jwtModel.getRefreshToken()).user_id(user_id).build();
		mapper.insert(userOauth);
	}

	@Override
	public UserOauth findUserOauthByUserId(String user_id) throws Exception {
		return mapper.findUserOauthByUserId(user_id);
	}

}
