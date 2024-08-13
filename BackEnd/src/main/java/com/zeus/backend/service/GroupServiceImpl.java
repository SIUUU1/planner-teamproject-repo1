package com.zeus.backend.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zeus.backend.domain.Group;
import com.zeus.backend.mapper.GroupMapper;

@Service
public class GroupServiceImpl implements GroupService {

	@Autowired
	private GroupMapper mapper;

	@Override
	public void create(Map<String, Object> map) throws Exception {
		mapper.create(map);
	}

	@Override
	public List<Group> list() throws Exception {
		return mapper.list();
	}

	@Override
	public List<Group> myList(String user_id) throws Exception {
		return mapper.myList(user_id);
	}

	@Override
	public Group read(int group_id) throws Exception {
		return mapper.read(group_id);
	}

	@Override
	public String filename(int group_id) throws Exception {
		return mapper.filename(group_id);
	}

	@Override
	public void modify(Map<String, Object> map) throws Exception {
		mapper.modify(map);
	}

	@Override
	public void delete(int group_id) throws Exception {
		mapper.delete(group_id);
	}

	@Override
	public List<Group> search(String search) throws Exception {
		search = "%" + search + "%";
		return mapper.search(search);
	}

	@Override
	public void incrementApplyCount(int group_id) throws Exception {
		mapper.incrementApplyCount(group_id);
	}

	@Override
	public List<Group> listByApply() throws Exception {
		return mapper.listByApply();
	}

}
