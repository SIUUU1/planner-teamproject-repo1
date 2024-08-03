package com.zeus.backend.service;

import com.zeus.backend.domain.User;

public interface UserService {
	// 등록 처리
	public void create(User user) throws Exception;

	// 사용자 아이디로 회원 정보 조회
	public User findByUserId(String user_id) throws Exception;

	// 권한 생성
//	public void createAuth(Authorities authorities) throws Exception;
//
//	// 권한 수정
//	public void modifyAuth(Authorities authorities) throws Exception;

	// 권한 삭제
	public void deleteAuth(int user_no) throws Exception;

	// 회원 테이블의 데이터 건수 조회
	public int countAll() throws Exception;

}
