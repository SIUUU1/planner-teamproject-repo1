package com.zeus.backend.chat.service;

import java.util.List;

import com.zeus.backend.domain.ChatRoom;

public interface ChatRoomService {

    String createChatRoom(ChatRoom chatRoom, String creater, String clientIp);

    ChatRoom getChatRoomById(String room_id);

    List<ChatRoom> getAllChatRooms();
}
