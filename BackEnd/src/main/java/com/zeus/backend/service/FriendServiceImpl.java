package com.zeus.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zeus.backend.domain.Friend;
import com.zeus.backend.mapper.FriendMapper;

@Service
public class FriendServiceImpl implements FriendService {
	
	@Autowired
	private FriendMapper mapper;

	@Override
	public void create(Friend friend) throws Exception {
		mapper.create(friend);
	}

	@Override
	public List<Friend> selectFriendsByUserId(String user_id) throws Exception {
		return mapper.selectFriendsByUserId(user_id);
	}

	@Override
	public void remove(int no) throws Exception {
		mapper.remove(no);
	}

}
