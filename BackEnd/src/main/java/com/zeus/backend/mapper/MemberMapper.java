package com.zeus.backend.mapper;

import java.util.List;
import java.util.Map;

public interface MemberMapper {
	// 등록 처리
	public void create(Map<String, Object> map) throws Exception;

	// 권한 생성
	public void createAuth(Map<String, Object> map) throws Exception;

	// 목록 페이지
	public List<Map<String, Object>> list() throws Exception;

	// 상세 페이지
	public Map<String, Object> read(int user_no) throws Exception;

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
	
	// 이메일과 로그인 타입에 user_no 가져오기
	public Map<String, Object> readByEmail(Map<String, Object> map) throws Exception;

}
