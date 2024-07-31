package com.zeus.backend.service;

import java.util.List;
import java.util.Map;

public interface MemberService {
	// 등록 처리
	public void register(Map<String, Object> map) throws Exception;

	// 목록 페이지
	public List<Map<String, Object>> list() throws Exception;

	// 상세 페이지
	public Map<String, Object> read(int user_no) throws Exception;

	// 수정 처리
	public void modify(Map<String, Object> map) throws Exception;

	// 삭제 처리
	public void remove(int user_no) throws Exception;

	// 회원 테이블의 데이터 건수 반환
	public int countAll() throws Exception;

	// 이메일 중복 조회
	public int checkEmail(String user_email) throws Exception;

	// 복구 이메일 조회
	public int checkRestoreEmail(String restore_email) throws Exception;

	// 이메일로 패스워드 재설정
	public void updatePw(String user_password) throws Exception;

	// 복구 이메일로 이메일 아이디 보여주기
	public String selectEmail(String restore_email) throws Exception;

	// 최초 관리자 생성을 위한 데이터 등록
	public void setupAdmin(Map<String, Object> map) throws Exception;

	// 코인 반환

}
