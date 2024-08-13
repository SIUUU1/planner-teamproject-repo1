package com.zeus.backend.mapper;

import java.util.List;
import java.util.Map;

import com.zeus.backend.domain.Board;

public interface BoardMapper {
	// 등록 처리
	public void create(Map<String, Object> map) throws Exception;

	// no 최댓값
	public Integer maxNo() throws Exception;

	// 목록 페이지
	public List<Board> list() throws Exception;

	// 상세 보기
	public Board read(int no) throws Exception;

	// 파일이름 찾기
	public String filename(int no) throws Exception;

	// 수정 처리
	public void modify(Map<String, Object> map) throws Exception;

	// 삭제 처리
	public void delete(int no) throws Exception;

	// 조회수 증가
	public void incrementReadCount(int no) throws Exception;

	// 댓글 작성 시 수정
	public void modifyReply(Board board) throws Exception;

	// 검색
	public List<Board> search(String search) throws Exception;
	
	// 검색
	public List<Board> searchByCategory(String search, String category) throws Exception;
}
