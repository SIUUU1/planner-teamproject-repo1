package com.zeus.backend.domain;

import java.time.LocalDate;
import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChatMessage {
	private Long ChatMessage_no;
	private Long chatRoom_no;
	private String user_id;
	private String user_nickname;
	private String message;
	private Date reg_date;

}
