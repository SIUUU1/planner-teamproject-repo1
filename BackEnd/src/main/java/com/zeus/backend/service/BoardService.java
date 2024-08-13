package com.zeus.backend.service;

import java.util.List;
import java.util.Map;

import com.zeus.backend.domain.Board;

public interface BoardService {
	// 새로운 글 등록 처리
	public void createNew(Map<String, Object> map) throws Exception;

	// 목록 페이지
	public List<Board> list() throws Exception;

	// 상세 보기
	public Board read(int no) throws Exception;

	// 수정 처리
	public void modify(Map<String, Object> map) throws Exception;

	// 삭제 처리
	public void delete(int no) throws Exception;

	// 조회수 증가
	public void incrementReadCount(int no) throws Exception;

	// 검색
	public List<Board> search(String search, String category) throws Exception;

	// 파일이름 찾기
	public String filename(int no) throws Exception;
}
