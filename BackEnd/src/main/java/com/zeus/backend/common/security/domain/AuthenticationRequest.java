package com.zeus.backend.common.security.domain;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthenticationRequest {
	private String username;
	private String password;
}
