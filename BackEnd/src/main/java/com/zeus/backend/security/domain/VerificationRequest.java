package com.zeus.backend.security.domain;

import lombok.Data;

@Data
public class VerificationRequest {
	private String email;
    private String code;
}
