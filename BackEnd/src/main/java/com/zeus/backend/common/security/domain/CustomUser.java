package com.zeus.backend.common.security.domain;

import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;

public class CustomUser extends User {
	private static final long serialVersionUID = 1L;
	private Map<String, Object> member;

	public CustomUser(String user_email, String user_password, Collection<? extends GrantedAuthority> authorities) {
		super(user_email, user_password, authorities);
	}

	public CustomUser(Map<String, Object> member) {
		super((String) member.get("user_email"), (String) member.get("user_password"),
				((List<Map<String, Object>>) member.get("authorities")).stream()
						.map(auth -> new SimpleGrantedAuthority((String) auth.get("authority")))
						.collect(Collectors.toList()));

		this.member = member;
	}

	public Map<String, Object> getMember() {
		return member;
	}

}
