package com.zeus.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.zeus.backend.domain.User;
import com.zeus.backend.mapper.UserMapper;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
	@Autowired
	private UserMapper mapper;
	
	@Autowired
	private HttpSession httpSession;
	
	@Bean
	public BCryptPasswordEncoder bCryptPasswordEncoder() {
		return this.bCryptPasswordEncoder;
	}

	public final BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

	@Override
	public void create(User user) throws Exception {
		System.out.println("create user" + user);
		
		//비밀번호 암호화 처리 후 등록
		String rawPassword = user.getPassword();
		user.setPassword(bCryptPasswordEncoder.encode(rawPassword));
		
		user.setRole("ROLE_USER");
		mapper.create(user);
		
		//세션 유저 정보 없애기
		httpSession.invalidate();
	}

	@Override
	public User findByUserId(String user_id) throws Exception {
		return mapper.findByUserId(user_id);
	}

//	@Override
//	public void createAuth(Authorities authorities) throws Exception {
//		mapper.createAuth(authorities);
//	}
//
//	@Override
//	public void modifyAuth(Authorities authorities) throws Exception {
//		mapper.modifyAuth(authorities);
//	}

	@Override
	public void deleteAuth(int user_no) throws Exception {
		mapper.deleteAuth(user_no);
	}

	@Override
	public int countAll() throws Exception {
		return mapper.countAll();
	}

}
