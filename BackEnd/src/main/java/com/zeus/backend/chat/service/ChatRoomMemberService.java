package com.zeus.backend.chat.service;

import com.zeus.backend.domain.ChatRoomMember;

public interface ChatRoomMemberService {
	 void addMemberToRoom(ChatRoomMember chatRoomMember) throws Exception;
}
