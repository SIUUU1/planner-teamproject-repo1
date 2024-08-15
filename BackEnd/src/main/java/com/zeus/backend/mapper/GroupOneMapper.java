package com.zeus.backend.mapper;

import java.util.List;
import java.util.Map;

import com.zeus.backend.domain.GroupOne;

public interface GroupOneMapper {
	// 등록 처리
	public void create(Map<String, Object> map) throws Exception;

	// 모든 그룹원 조회
	public List<GroupOne> list() throws Exception;

	// 특정 그룹에 속한 모든 그룹원을 조회
	public List<GroupOne> selectByGroupId(int group_id) throws Exception;
	
	// 특정 그룹 허용된 모든 그룹원 조회
	public List<GroupOne> selectAllAccept(int group_id) throws Exception;

	// 특정 그룹 허용되지 않은 모든 그룹원 조회
	public List<GroupOne> selectAllNotAccept(int group_id) throws Exception;

	// 특정 그룹에 속한 모든 그룹원 수 조회
	public int countByGroupId(int group_id) throws Exception;

	// 특정 그룹원을 ID로 조회
	public GroupOne selectById(int groupone_id) throws Exception;

	// 수정 처리
	public void modify(Map<String, Object> map) throws Exception;

	// 그룹원 허용
	public void accept(Map<String, Object> map) throws Exception;

	// 삭제 처리
	public void delete(String user_id) throws Exception;

	// 특정 그룹에 속한 모든 그룹원 삭제
	public void deleteByGroupId(int group_id) throws Exception;

}
