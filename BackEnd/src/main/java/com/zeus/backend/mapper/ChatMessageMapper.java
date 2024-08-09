package com.zeus.backend.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.zeus.backend.domain.ChatMessage;

@Mapper
public interface ChatMessageMapper {

    // 메시지 저장
    void saveMessage(ChatMessage chatMessage);

    // 특정 채팅방의 모든 메시지 조회
    List<ChatMessage> getMessagesByRoomId(String room_id);

    // 특정 메시지 조회
    ChatMessage getMessageById(Long message_no);

    // 특정 채팅방의 메시지 삭제
    void deleteMessagesByRoomId(String room_id);
}