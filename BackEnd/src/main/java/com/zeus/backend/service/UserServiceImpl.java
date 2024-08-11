package com.zeus.backend.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.auth0.jwt.exceptions.TokenExpiredException;
import com.nimbusds.oauth2.sdk.util.StringUtils;
import com.zeus.backend.domain.User;
import com.zeus.backend.mapper.UserMapper;
import com.zeus.backend.security.jwt.JwtService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
	@Autowired
	private UserMapper mapper;

	@Autowired
	private HttpSession httpSession;

	@Autowired
	private JwtService jwtService;

	@Autowired
	HttpServletRequest request;

	@Bean
	public BCryptPasswordEncoder bCryptPasswordEncoder() {
		return this.bCryptPasswordEncoder;
	}

	public final BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

	// 등록 처리
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

	// 회원 정보 조회
	@Override
	public User read() throws Exception {
		String user_id = findUserbyToken(request);
		return mapper.findByUserId(user_id);
	}

	// 사용자 아이디로 회원 정보 조회
	@Override
	public User findByUserId(String user_id) throws Exception {
		return mapper.findByUserId(user_id);
	}

	// 회원 테이블의 데이터 건수 조회
	@Override
	public int countAll() throws Exception {
		return mapper.countAll();
	}

	// 수정 처리
	@Override
	public void modify(Map<String, Object> map) throws Exception {
		mapper.modify(map);
	}

	// 삭제 처리
	@Override
	public void remove() throws Exception {
		String user_id = findUserbyToken(request);
		mapper.remove(user_id);
	}

	// 아이디로 삭제 처리
	@Override
	public void remove(String user_id) throws Exception {
		mapper.remove(user_id);
	}

	// 아이디 중복 조회
	@Override
	public int checkId(String user_id) throws Exception {
		return mapper.checkId(user_id);
	}

	// 복구 이메일 조회
	@Override
	public int checkRestoreEmail(String restore_email) throws Exception {
		return mapper.checkRestoreEmail(restore_email);
	}

	// 이메일 인증후 패스워드 재설정
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
	@Override
	public void modifyAuth(User user) throws Exception {
		user.setRole("ROLE_PRO");
		mapper.modifyAuth(user);
	}

	// 현재 인증된 사용자 정보 반환(토큰)
	// 쿠키 토큰으로 사용자 객체 반환하기
	private String findUserbyToken(HttpServletRequest request) {
		System.out.println("=====================================");
		System.out.println("findUserbyToken 시작");

		String user_id = null;

		String accessToken = jwtService.resolveCookie(request);
		System.out.println("findUserbyToken resolvecookie");

		try {
			// accessToken이 존재하지 않을 때(페이지마다 권한 인증할 예정)
			if (StringUtils.isBlank(accessToken)) {
				System.out.println("findUserbyToken Access token is missing");
				throw new RuntimeException("Access token is missing");
			}

			user_id = jwtService.getClaim(accessToken, "user_id");
			System.out.println("findUserbyToken getClaim");
			log.info("findByToken() user_id: {}", user_id);
			// accessToken에서 user_id를 찾을 수 없을 때(해킹??)
			if (StringUtils.isBlank(user_id)) {
				System.out.println("findUserbyToken Access token is exist, but cannot find user_id");
				throw new RuntimeException("User_id not found");
			}
			// accessToken이 만료되었을 때
		} catch (TokenExpiredException e) {
			System.out.println("findUserbyToken access 토큰 만료됨");
			String expiredUser_id = jwtService.getClaimFromExpiredToken(accessToken, "user_id"); // 만료된 토큰에서 유저네임 클레임 추출
			System.out.println("findUserbyToken access 토큰 만료됨 username : " + expiredUser_id);

		} catch (Exception e) {
			log.error("FindUserbyToken Error while fetching user by token", e);
		}

		return user_id;
	}

	// 파일이름 찾기
	@Override
	public String filename(String user_id) throws Exception {
		return mapper.filename(user_id);
	}

	// 검색
	@Override
	public List<User> search(String searchkey, String search,String currentUserId) throws Exception {
		if (searchkey.equals("all")) {
			search = "%" + search + "%";
			return mapper.searchByAll(search, currentUserId);
		} else {
			Map<String, Object> map = new HashMap<>();
			map.put("searchkey", searchkey);
			map.put("search", "%" + search + "%");
			map.put("currentUserId", currentUserId);
			return mapper.searchBySomething(map);
		}
	}

}
