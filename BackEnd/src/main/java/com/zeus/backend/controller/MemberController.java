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
import org.springframework.web.servlet.view.RedirectView;

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

	// 등록 페이지(수정)(sns로부터 값 받아오기)
	@RequestMapping(value = "/register", method = RequestMethod.GET)
	public Map<String, Object> registerForm(@RequestParam Map<String, Object> map) throws Exception {

		System.out.println("registerForm : " + map);
		// login_type_no==1일 때 이메일 인증 및 중복확인 버튼 안보이게 하기(프론트)
		// login_type_no==1일 때 login_type_no,social_code,access_token 보내줘야 함(프론트)
		return map;
	}

	// 이메일 중복 조회
	@RequestMapping(value = "/checkEmail", method = RequestMethod.POST)
	public int checkEmail(@RequestParam("user_email") String user_email) throws Exception {
		// default_login 테이블에서 해당 이메일이 있는지 확인하여 0이면 '사용가능한 이메일입니다.' msg, 이메일 인증 버튼이 보인다.
		// 버튼 클릭 후 본인인증 코드 작성 페이지 보여준다.
		// 인증까지 진행해야 회원가입 가능하다.
		// default_login 테이블에서 해당 이메일이 있는지 확인하여 1이상이면 '이미 존재하는 이메일입니다.' msg
		return service.checkEmail(user_email);
	}

	// 복구 이메일 조회
	@RequestMapping(value = "/checkRestoreEmail", method = RequestMethod.POST)
	public int checkRestoreEmail(@RequestParam("restore_email") String restore_email) throws Exception {
		// authentication 테이블에서 복구 이메일이 있는지 확인하여 0이면 '존재하지 않는 이메일 입니다.' msg
		// authentication 테이블에서 복구 이메일이 있는지 확인하여 1이면 '복구 이메일로 이메일 보내기, 본인인증 코드 보내기 버튼이 보인다.' msg
		// 버튼 클릭 후 본인인증 코드 작성 페이지 보여준다.
		return service.checkEmail(restore_email);
	}

	// 등록 처리
	@RequestMapping(value = "/register", method = RequestMethod.POST)
	public void register(@RequestParam Map<String, Object> map) throws Exception {
		int login_type_no = (int) map.get("login_type_no");
		if (login_type_no != 1) { // 기본 회원가입
			map.put("login_type_no", 0);
			// 비밀번호 암호화
			String inputPassword = (String) map.get("user_password");
			map.put("user_password", passwordEncoder.encode(inputPassword));
		}

		service.register(map);
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
	@RequestMapping(value = "/remove/{user_no}", method = RequestMethod.POST)
	public void remove(@PathVariable(name = "user_no") int user_no) throws Exception {
		service.remove(user_no);
	}

	// 패스워드 재설정

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
