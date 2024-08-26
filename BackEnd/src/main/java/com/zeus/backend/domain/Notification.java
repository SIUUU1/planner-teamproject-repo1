package com.zeus.backend.domain;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Notification {
	private int notifications_id; // 알림 번호
	private String user_id; // user fk
	private String type; // NotificationMsg type
	private String content; // 내용
	private String link; // 이동 링크
	private int is_read; // 0:안 읽음, 1:읽음
	private Date sent_at; // 보낸날짜
}
