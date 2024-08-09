package com.zeus.backend.domain;

import java.sql.Timestamp;
import java.util.Date;

import lombok.Data;

@Data
public class ChatMessage {
    private Long message_no;
    private Long room_no;
    private String room_id;
    private String user_id;
    private String user_nickname;
    private String message_text;
    private Timestamp sent_at;
}