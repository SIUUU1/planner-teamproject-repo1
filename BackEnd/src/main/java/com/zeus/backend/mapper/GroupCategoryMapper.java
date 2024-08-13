package com.zeus.backend.mapper;

import java.util.List;

import com.zeus.backend.domain.GroupCategory;

public interface GroupCategoryMapper {
	// 카테고리 등록
	public void create(GroupCategory groupCategory) throws Exception;

	// 카테고리 리스트
	public List<GroupCategory> list() throws Exception;

	// 카테고리 상세
	public GroupCategory read(int groupcategory_id) throws Exception;

	// 카테고리 수정
	public void modify(GroupCategory groupCategory) throws Exception;

	// 카테고리 삭제
	public void remove(int groupcategory_id) throws Exception;
}
