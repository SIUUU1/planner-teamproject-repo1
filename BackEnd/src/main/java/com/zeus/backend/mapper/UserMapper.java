package com.zeus.backend.mapper;

import java.util.List;

import com.zeus.backend.domain.User;

public interface UserMapper {
	// 등록 처리
	public void create(User user) throws Exception;

	// 목록 페이지
	public List<User> list() throws Exception;

	// 사용자 아이디로 회원 정보 조회
	public User findByUserId(String user_id) throws Exception;

	// 사용자 user_no pk로 회원 정보 조회
	public User findByUserNo(int user_no) throws Exception;

	// 회원 테이블의 데이터 건수 조회
	public int countAll() throws Exception;

	// 회원 정보 수정 처리
	public void modify(User user) throws Exception;

	// 회원 정보 삭제 처리
	public void remove(String user_id) throws Exception;

	// 아이디 중복 조회
	public int checkId(String user_id) throws Exception;

	// 복구 이메일 조회
	public int checkRestoreEmail(String restore_email) throws Exception;

	// 복구 이메일 인증후 패스워드 재설정
	public void updatePw(User user) throws Exception;

	// 복구 이메일 인증후 아이디 보여주기
	public String findIdByEmail(String restore_email) throws Exception;

	// 권한 수정
	public void modifyAuth(User user) throws Exception;
}
