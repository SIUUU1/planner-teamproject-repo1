package com.zeus.backend.domain;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChatRoom {
	private Long chatRoom_no;
	private String chatRoom_title;
	private Date reg_date;

}
