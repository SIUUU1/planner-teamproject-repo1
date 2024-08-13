package com.zeus.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zeus.backend.domain.GroupCategory;
import com.zeus.backend.mapper.GroupCategoryMapper;

@Service
public class GroupCategoryServiceImpl implements GroupCategoryService {

	@Autowired
	private GroupCategoryMapper mapper;

	@Override
	public void create(GroupCategory groupCategory) throws Exception {
		mapper.create(groupCategory);
	}

	@Override
	public List<GroupCategory> list() throws Exception {
		return mapper.list();
	}

	@Override
	public GroupCategory read(int groupcategory_id) throws Exception {
		return mapper.read(groupcategory_id);
	}

	@Override
	public void modify(GroupCategory groupCategory) throws Exception {
		mapper.modify(groupCategory);
	}

	@Override
	public void remove(int groupcategory_id) throws Exception {
		mapper.remove(groupcategory_id);
	}

}
