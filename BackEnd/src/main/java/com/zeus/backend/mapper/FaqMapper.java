package com.zeus.backend.mapper;

import java.util.List;

import com.zeus.backend.domain.Faq;

public interface FaqMapper {
	// 등록 처리
	public void create(Faq faq) throws Exception;

	// 목록 페이지
	public List<Faq> list() throws Exception;
	
	// faq 보기
	public Faq read(int faq_id) throws Exception;

	// 수정 처리
	public void modify(Faq faq) throws Exception;

	// 삭제 처리
	public void delete(int faq_id) throws Exception;
}
