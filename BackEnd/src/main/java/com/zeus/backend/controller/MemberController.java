package com.zeus.backend.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.zeus.backend.service.MemberService;

import lombok.extern.java.Log;

@Log
@RestController
@RequestMapping("/api/user")
public class MemberController {

	@Autowired
	private MemberService service;

	// 스프링 시큐리티의 비밀번호 암호처리기
	@Autowired
	private PasswordEncoder passwordEncoder;

	// 등록 페이지(수정)
	@RequestMapping(value = "/register", method = RequestMethod.GET)
	public Map<String, Object> registerForm(@RequestParam Map<String, Object> map) throws Exception {
		// sns 로그인
		// 기본 회원가입
		System.out.println(map);
		return null;

	}

	// 등록 처리
	@RequestMapping(value = "/register", method = RequestMethod.POST)
	public void register(@RequestParam Map<String, Object> map, BindingResult result) throws Exception {
		// 비밀번호 암호화
		String inputPassword = (String) map.get("user_password");
		map.put("user_password", passwordEncoder.encode(inputPassword));
		service.register(map);

//		if (result.hasErrors()) {
//			//소셜 가입시 정보가 충분치 않은 경우??
//			
//			//return "user/register";
//		}

	}

	// 목록 페이지
	@RequestMapping(value = "/list", method = RequestMethod.GET)
	public List<Map<String, Object>> list() throws Exception {
		return service.list();
	}

	// 상세 페이지
	@RequestMapping(value = "/read/{user_no}", method = RequestMethod.GET)
	public Map<String, Object> read(@PathVariable(name = "user_no") int user_no) throws Exception {
		return service.read(user_no);
	}

	// 수정 페이지
	@RequestMapping(value = "/modify/{user_no}", method = RequestMethod.GET)
	public Map<String, Object> modifyForm(@PathVariable(name = "user_no") int user_no) throws Exception {
		return service.read(user_no);
	}

	// 수정 처리
	@RequestMapping(value = "/modify", method = RequestMethod.POST)
	public void modify(@RequestParam Map<String, Object> map) throws Exception {
		service.modify(map);
	}

	// 삭제 처리
	@RequestMapping(value = "/remove", method = RequestMethod.POST)
	public void remove(@PathVariable(name = "user_no") int user_no) throws Exception {
		service.remove(user_no);
	}

	// 최초 관리자를 생성하는 화면을 반환한다.
	@RequestMapping(value = "/setup", method = RequestMethod.GET)
	public int setupAdminForm(@RequestParam Map<String, Object> map) throws Exception {
		// 회원 테이블 데이터 건수를 확인하여 0이면 최초 관리자 등록 페이지를 표시한다.(프론트)
		// 회원 테이블에 데이터가 존재하면 최초 관리자를 생성할 수 없으므로 실패 alert
		return service.countAll();
	}

	// 회원 테이블에 데이터가 없으면 최초 관리자를 생성한다.
	@RequestMapping(value = "/setup", method = RequestMethod.POST)
	public void setupAdmin(@RequestParam Map<String, Object> map) throws Exception {
		// 회원 테이블 데이터 건수를 확인하여 빈 테이블이면 최초 관리자를 생성한다.
		if (service.countAll() == 0) {
			String inputPassword = (String) map.get("user_password");
			map.put("user_password", passwordEncoder.encode(inputPassword));
			// 나머지 값 디폴트로 줘야 함(not null의 경우)
			service.setupAdmin(map);
			// 성공 alert
		}
		// 회원 테이블에 데이터가 존재하면 최초 관리자를 생성할 수 없으므로 실패 alert
	}
}
