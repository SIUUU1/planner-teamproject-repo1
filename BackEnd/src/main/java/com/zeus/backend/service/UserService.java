package com.zeus.backend.service;

import java.util.List;
import java.util.Map;

import com.zeus.backend.domain.User;

import jakarta.servlet.http.HttpServletRequest;

public interface UserService {
	// 등록 처리
	public void create(User user) throws Exception;

	// 목록 페이지
	public List<User> list() throws Exception;

	// 사용자 아이디로 회원 정보 조회
	public User findByUserId(String user_id) throws Exception;

	// 회원 정보 조회
	public User read() throws Exception;
	
	//최근 7일 누적 회원수 조회
	public Map<String, String> getUserCountByDate();

	// 수정 처리
	public void modify(Map<String, Object> map) throws Exception;

	// 파일이름 찾기
	public String filename(String user_id) throws Exception;

	// 삭제 처리
	public void remove() throws Exception;

	// 아이디로 삭제 처리
	public void remove(String user_id) throws Exception;

	// 아이디 중복 조회
	public int checkId(String user_id) throws Exception;

	// 복구 이메일 조회
	public String checkRestoreEmail(Map<String, Object> map) throws Exception;

	// 이메일 인증후 패스워드 재설정
	public void updatePw(User user) throws Exception;

	// 이메일 인증후 아이디 보여주기
	public String selectEmail(String restore_email) throws Exception;

	// 최초 관리자 생성을 위한 데이터 등록
	public void setupAdmin(User user) throws Exception;

	// 권한 수정
	public void modifyAuth(User user) throws Exception;

	// 회원 테이블의 데이터 건수 조회
	public int countAll() throws Exception;

	// 검색
	public List<User> search(String searchkey, String search, String currentUserId) throws Exception;

	// 사용자 아이디로 회원 정보 조회(타 유저 정보 조회)
	public User getUserById(String user_id);

	// 사용자 user_no pk로 회원 정보 조회
    public User findByUserNo(int user_no) throws Exception;

}
