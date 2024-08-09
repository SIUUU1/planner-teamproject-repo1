package com.zeus.backend.mapper;

public interface ChatRoomMemberMapper {
	void insertIfNotExists(String room_id, String user_id);

}
