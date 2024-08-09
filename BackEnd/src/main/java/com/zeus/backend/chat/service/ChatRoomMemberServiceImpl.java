package com.zeus.backend.chat.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zeus.backend.domain.ChatRoomMember;
import com.zeus.backend.mapper.ChatRoomMemberMapper;

@Service
public class ChatRoomMemberServiceImpl implements ChatRoomMemberService {

    @Autowired
    private ChatRoomMemberMapper chatRoomMemberMapper;

    @Override
    public void addMemberToRoom(ChatRoomMember chatRoomMember) throws Exception {
        chatRoomMemberMapper.insertIfNotExists(chatRoomMember.getRoom_id(), chatRoomMember.getUser_id());
    }
}