package com.zeus.backend.domain;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Message {
	private int message_id; // message pk
	private String sender_id; // 보낸이 아이디
	private String sender_nickname; // 보낸이 닉네임
	private String receiver_id; // 받는이 아이디
	private String receiver_nickname; // 받는이 닉네임
	private String content; // 내용
	private int is_read; // 0:안 읽음, 1:읽음
	private Date sent_at; // 보낸 날짜
}
