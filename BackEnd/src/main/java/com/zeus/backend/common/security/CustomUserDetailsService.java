package com.zeus.backend.common.security;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.zeus.backend.common.security.domain.CustomUser;
import com.zeus.backend.mapper.MemberMapper;

import lombok.extern.java.Log;

@Log
@Service
public class CustomUserDetailsService implements UserDetailsService {
	@Autowired
	private MemberMapper memberMapper;

	// 사용자 정의 유저 상세 클래스 메서드-loadUserByUsername의 Username은 user_no이다. 
	@Override
	public UserDetails loadUserByUsername(String user_no) throws UsernameNotFoundException {
		log.info("Load User By user_no : " + user_no);
		Map<String, Object> member = null;
		try {
			member = memberMapper.read(Integer.parseInt(user_no));
		} catch (Exception e) {
			e.printStackTrace();
		}
		log.info("queried by member mapper: " + member);
		return member == null ? null : new CustomUser(member);
	}
}