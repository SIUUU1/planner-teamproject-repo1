package com.zeus.backend.service;

import java.util.List;

import com.zeus.backend.domain.Qna;

public interface QnaService {
	// 관리자 답변 등록 처리
	public void createByMngr(Qna qna) throws Exception;

	// 사용자 문의 등록 처리
	public void createByUser(Qna qna) throws Exception;

	// 전체 목록 페이지
	public List<Qna> listAll() throws Exception;

	// 사용자 문의내역 보기
	public List<Qna> listByUser(String user_id) throws Exception;

	// 전체 문의내역 갯수
	public int countAll() throws Exception;

	// 사용자 문의내역 갯수
	public int countByUser(String user_id) throws Exception;

	// 문의내역 조회
	public Qna read(int qna_id) throws Exception;

	// group_id로 문의내역 조회
	public Qna readByGroupId(int group_id) throws Exception;

	// group_id로 답변 조회
	public Qna readByReply(int group_id) throws Exception;

	// 카테고리별 문의내역 조회
	public Qna listByCategory(String category) throws Exception;

	// 문의내역 수정
	public void modify(Qna qna) throws Exception;

	// 문의내역 삭제
	public void delete(int qna_id) throws Exception;

}
