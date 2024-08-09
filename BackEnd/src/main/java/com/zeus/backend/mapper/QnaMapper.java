package com.zeus.backend.mapper;

import java.util.List;

import com.zeus.backend.domain.Qna;

public interface QnaMapper {
	// 등록 처리
	public void create(Qna qna) throws Exception;

	// 전체 목록 페이지
	public List<Qna> listAll() throws Exception;

	// 사용자 문의내역 보기
	public List<Qna> listByUser(String user_id) throws Exception;

	// 전체 문의내역 갯수
	public int countAll() throws Exception;

	// group_id 최댓값
	public Integer maxGroupId() throws Exception;

	// 사용자 문의내역 갯수
	public int countByUser(String user_id) throws Exception;

	// 문의내역 조회
	public Qna read(int qna_id) throws Exception;

	// 카테고리별 문의내역 조회
	public Qna listByCategory(String category) throws Exception;

	// 문의 내역 수정
	public void modify(Qna qna) throws Exception;

	// 문의 내역 삭제
	public void delete(int qna_id) throws Exception;
	
	// group_id로 문의 내역 삭제
	public void deleteByGroupId(int group_id) throws Exception;

	// 답변 처리
	public void reply(int group_id) throws Exception;

}
