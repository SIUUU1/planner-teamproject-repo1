package com.zeus.backend.chat.service;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.zeus.backend.domain.ChatRoom;
import com.zeus.backend.mapper.ChatRoomMapper;

@Service
public class ChatRoomServiceImpl implements ChatRoomService {

    private final ChatRoomMapper chatRoomMapper;

    public ChatRoomServiceImpl(ChatRoomMapper chatRoomMapper) {
        this.chatRoomMapper = chatRoomMapper;
    }

    @Override
    public String createChatRoom(ChatRoom chatRoom, String creater, String clientIp) {
        String room_id = UUID.randomUUID().toString();
        String room_url = "ws://" + clientIp + ":8080/api/chat/" + room_id;
        
        chatRoom.setRoom_id(room_id);
        chatRoom.setCreater(creater);
        chatRoom.setRoom_url(room_url);

        chatRoomMapper.createChatRoom(chatRoom);
        return room_url;
    }

    @Override
    public ChatRoom getChatRoomById(String room_id) {
        return chatRoomMapper.getChatRoomById(room_id);
    }

    @Override
    public List<ChatRoom> getAllChatRooms() {
        return chatRoomMapper.getAllChatRooms();
    }
}
