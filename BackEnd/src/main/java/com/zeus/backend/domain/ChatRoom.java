package com.zeus.backend.domain;

import java.sql.Timestamp;

import lombok.Data;

@Data
public class ChatRoom {
    private Long room_no;
    private String room_id;
    private String room_name;
    private String room_info;
    private String creater;
    private String room_url;
    private Timestamp reg_date;
}