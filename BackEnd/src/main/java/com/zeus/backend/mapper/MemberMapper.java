package com.zeus.backend.mapper;

import java.util.List;
import java.util.Map;

public interface MemberMapper {
	// 등록 처리
	public void create(Map<String, Object> map) throws Exception;

	// 권한 생성 보류
	public void createAuth(Map<String, Object> map) throws Exception;

	// 목록 페이지
	public List<Map<String, Object>> list() throws Exception;

	// 상세 페이지
	public Map<String, Object> read(int user_no) throws Exception;

	// 권한 조회
	public List<Map<String, Object>> selectAuthorities(int user_no) throws Exception;

	// 권한 수정
	public void modifyAuth(Map<String, Object> map) throws Exception;

	// 수정 처리
	public void update(Map<String, Object> map) throws Exception;

	// 삭제 처리
	public void delete(int user_no) throws Exception;

	// 권한 삭제
	public void deleteAuth(int user_no) throws Exception;

	// 회원 테이블의 데이터 건수 조회
	public int countAll() throws Exception;

	// 이메일 존재 여부 조회
	public int checkEmail(String user_email) throws Exception;

	// 복구 이메일 조회
	public int checkRestoreEmail(String restore_email) throws Exception;

	// 이메일로 패스워드 재설정
	public void updatePw(String user_password) throws Exception;
	
	// 복구 이메일로 이메일 아이디 보여주기
	public String selectEmail(String restore_email) throws Exception;

	// 이메일과 로그인 타입에 따른 user_no 가져오기 보류
	public int readByEmail(Map<String, Object> map) throws Exception;

}
