package com.zeus.backend.domain;

import lombok.Data;

@Data
public class ChatRoomMember {
    private Long chat_room_member_no;
    private String room_id;
    private String user_id;
}