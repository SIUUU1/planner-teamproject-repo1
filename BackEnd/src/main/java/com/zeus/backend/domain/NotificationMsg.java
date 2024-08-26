package com.zeus.backend.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NotificationMsg {
	private int notificationmsg_id; // NotificationMsg pk
	private String type; // NotificationMsg type
	private String content; // 내용
}
