package com.zeus.backend.service;

import java.util.List;

import com.zeus.backend.domain.Notice;

public interface NoticeService {
	// 새로운 글 등록 처리
	public void createNew(Notice notice) throws Exception;

	// 목록 페이지
	public List<Notice> list() throws Exception;

	// 상세 보기
	public Notice read(int no) throws Exception;

	// 수정 처리
	public void modify(Notice notice) throws Exception;

	// 삭제 처리
	public void delete(int no) throws Exception;


}
