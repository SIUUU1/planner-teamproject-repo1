package com.zeus.backend.mapper;

import java.util.List;

import com.zeus.backend.domain.Notice;

public interface BoardMapper {
	// 등록 처리
	public void create(Notice notice) throws Exception;

	// 목록 페이지
	public List<Notice> list() throws Exception;

	// 상세 보기
	public Notice read(int no) throws Exception;

	// 수정 처리
	public void modify(Notice notice) throws Exception;

	// 삭제 처리
	public void delete(int no) throws Exception;
	
	// 조회수 증가
	public void incrementReadCount(int no) throws Exception;
}
