package com.zeus.backend.mapper;

import com.zeus.backend.domain.UserOauth;

public interface UserOauthMapper {
	public void delete(String user_id) throws Exception;

	public void insert(UserOauth userOauth) throws Exception;

	public UserOauth findUserOauthByUserId(String user_id) throws Exception;
}
