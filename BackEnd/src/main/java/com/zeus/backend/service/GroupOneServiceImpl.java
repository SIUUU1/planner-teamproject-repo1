package com.zeus.backend.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zeus.backend.domain.GroupOne;
import com.zeus.backend.mapper.GroupOneMapper;

@Service
public class GroupOneServiceImpl implements GroupOneService {

	@Autowired
	private GroupOneMapper mapper;

	@Override
	public void create(Map<String, Object> map) throws Exception {
		mapper.create(map);
	}

	@Override
	public List<GroupOne> selectByGroupId(int group_id) throws Exception {
		return mapper.selectByGroupId(group_id);
	}

	@Override
	public GroupOne selectById(int groupone_id) throws Exception {
		return mapper.selectById(groupone_id);
	}

	@Override
	public void modify(Map<String, Object> map) throws Exception {
		mapper.modify(map);
	}

	@Override
	public void delete(String user_id) throws Exception {
		mapper.delete(user_id);
	}

	@Override
	public void deleteByGroupId(int group_id) throws Exception {
		mapper.deleteByGroupId(group_id);
	}

	@Override
	public List<GroupOne> list() throws Exception {
		return mapper.list();
	}

	@Override
	public int countByGroupId(int group_id) throws Exception {
		return mapper.countByGroupId(group_id);
	}

	@Override
	public List<GroupOne> selectAllAccept(int group_id) throws Exception {
		return mapper.selectAllAccept(group_id);
	}

	@Override
	public List<GroupOne> selectAllNotAccept(int group_id) throws Exception {
		return mapper.selectAllNotAccept(group_id);
	}

	@Override
	public void accept(Map<String, Object> map) throws Exception {
		mapper.accept(map);
	}

}
