package com.zeus.backend.service;

import java.util.List;
import java.util.Map;

public interface MemberService {
	// 등록 처리
	public void register(Map<String, Object> map) throws Exception;

	// 목록 페이지
	public List<Map<String, Object>> list() throws Exception;

	// 상세 페이지
	public Map<String, Object> read(int userNo) throws Exception;

	// 수정 처리
	public void modify(Map<String, Object> map) throws Exception;

	// 삭제 처리
	public void remove(int userNo) throws Exception;

	// 회원 테이블의 데이터 건수 반환
	public int countAll() throws Exception;

	// 최초 관리자 생성을 위한 데이터 등록
	public void setupAdmin(Map<String, Object> map) throws Exception;
	
	// 코인 반환
	
}
