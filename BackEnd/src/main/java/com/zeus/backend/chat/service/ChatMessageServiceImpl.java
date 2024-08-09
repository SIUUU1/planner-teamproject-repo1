package com.zeus.backend.chat.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.zeus.backend.domain.ChatMessage;
import com.zeus.backend.mapper.ChatMessageMapper;

@Service
public class ChatMessageServiceImpl implements ChatMessageService {

    private final ChatMessageMapper chatMessageMapper;

    public ChatMessageServiceImpl(ChatMessageMapper chatMessageMapper) {
        this.chatMessageMapper = chatMessageMapper;
    }

    @Override
    @Transactional
    public void saveMessage(ChatMessage chatMessage) {
        chatMessageMapper.saveMessage(chatMessage);
    }

    @Override
    public List<ChatMessage> getMessagesByRoomId(String room_id) {
        return chatMessageMapper.getMessagesByRoomId(room_id);
    }

    @Override
    public ChatMessage getMessageById(Long message_no) {
        return chatMessageMapper.getMessageById(message_no);
    }

    @Override
    @Transactional
    public void deleteMessagesByRoomId(String room_id) {
        chatMessageMapper.deleteMessagesByRoomId(room_id);
    }
}
