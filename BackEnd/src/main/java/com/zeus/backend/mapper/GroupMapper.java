package com.zeus.backend.mapper;

import java.util.List;
import java.util.Map;

import com.zeus.backend.domain.Group;

public interface GroupMapper {
	// 등록 처리
	public void create(Map<String, Object> map) throws Exception;

	// 목록 페이지
	public List<Group> list() throws Exception;

	// 내 그룹 조회
	public List<Group> myList(String user_id) throws Exception;

	// 내가 지원한 그룹 조회
	public List<Group> myApplyList(String user_id) throws Exception;

	// 인기 그룹 3개 조회(지원자 수 기준)
	public List<Group> listByApply() throws Exception;

	// 상세 보기
	public Group read(int group_id) throws Exception;

	// 파일이름 찾기
	public String filename(int group_id) throws Exception;

	// 수정 처리
	public void modify(Map<String, Object> map) throws Exception;

	// 삭제 처리
	public void delete(int group_id) throws Exception;

	// 검색
	public List<Group> search(String search) throws Exception;

	// 그룹원 수 늘리기
	public void incrementGroupOneCount(int group_id) throws Exception;

	// 지원수 늘리기
	public void incrementApplyCount(int group_id) throws Exception;
}
