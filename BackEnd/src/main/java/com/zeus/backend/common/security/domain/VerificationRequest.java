package com.zeus.backend.common.security.domain;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VerificationRequest {
	private String email;
	private String code;
}
