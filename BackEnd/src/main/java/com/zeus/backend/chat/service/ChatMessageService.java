package com.zeus.backend.chat.service;

import java.util.List;

import com.zeus.backend.domain.ChatMessage;
import com.zeus.backend.domain.ChatRoom;

public interface ChatMessageService {

    void saveMessage(ChatMessage chatMessage);

    List<ChatMessage> getMessagesByRoomId(String room_id);

    ChatMessage getMessageById(Long message_no);

    void deleteMessagesByRoomId(String room_id);
}
