package com.zeus.backend.service;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.zeus.backend.domain.User;
import com.zeus.backend.mapper.UserMapper;

import jakarta.servlet.http.HttpServletRequest;
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

	// 등록 처리
	@Transactional
	@Override
	public void create(User user) throws Exception {
		System.out.println("create user" + user);

		// 비밀번호 암호화 처리 후 등록
		String rawPassword = user.getPassword();
		user.setPassword(bCryptPasswordEncoder.encode(rawPassword));

		user.setRole("ROLE_USER");
		mapper.create(user);

		// 세션 유저 정보 없애기
		httpSession.invalidate();
	}

	// 목록 페이지
	@Override
	public List<User> list() throws Exception {
		return mapper.list();
	}

	// 사용자 아이디로 회원 정보 조회
	@Override
	public User findByUserId(String user_id) throws Exception {
		return mapper.findByUserId(user_id);
	}

	// 사용자 user_no pk로 회원 정보 조회
	@Override
	public User findByUserNo(int user_no) throws Exception {
		return mapper.findByUserNo(user_no);
	}

	// 회원 테이블의 데이터 건수 조회
	@Override
	public int countAll() throws Exception {
		return mapper.countAll();
	}

	// 수정 처리
	@Transactional
	@Override
	public void modify(User user) throws Exception {
		mapper.modify(user);
	}

	// 삭제 처리
	@Transactional
	@Override
	public void remove(int user_no) throws Exception {
		mapper.remove(user_no);
	}

	// 아이디 중복 조회
	@Override
	public int checkId(String user_id)  throws Exception {
		return mapper.checkId(user_id);
	}

	// 복구 이메일 조회
	@Override
	public int checkRestoreEmail(String restore_email) throws Exception {
		return mapper.checkRestoreEmail(restore_email);
	}

	// 이메일 인증후 패스워드 재설정
	@Transactional
	@Override
	public void updatePw(User user) throws Exception {
		System.out.println("updatePw" + user);
		// 비밀번호 암호화 처리 후 등록
		String rawPassword = user.getPassword();
		user.setPassword(bCryptPasswordEncoder.encode(rawPassword));

		mapper.updatePw(user);
	}

	// 이메일 인증후 아이디 보여주기
	@Override
	public String selectEmail(String restore_email) throws Exception {
		return mapper.findIdByEmail(restore_email);
	}

	// 최초 관리자 생성을 위한 데이터 등록
	@Transactional
	@Override
	public void setupAdmin(User user) throws Exception {
		System.out.println("setupAdminr" + user);

		// 비밀번호 암호화 처리 후 등록
		String rawPassword = user.getPassword();
		user.setPassword(bCryptPasswordEncoder.encode(rawPassword));

		user.setRole("ROLE_MANAGER");
		mapper.create(user);
	}

	// 권한 Pro로 수정
	@Transactional
	@Override
	public void modifyAuth(User user) throws Exception {
		user.setRole("ROLE_PRO");
		mapper.modifyAuth(user);
	}

	// 현재 인증된 사용자 정보 반환(토큰) 
	

}
