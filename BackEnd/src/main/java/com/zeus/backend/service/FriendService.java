package com.zeus.backend.service;

import java.util.List;

import com.zeus.backend.domain.Friend;

public interface FriendService {
	// 친구 등록 처리
	public void create(Friend friend) throws Exception;

	// 친구 목록 페이지
	public List<Friend> selectFriendsByUserId(String user_id) throws Exception;

	// 친구 삭제
	public void remove(int no) throws Exception;
}
