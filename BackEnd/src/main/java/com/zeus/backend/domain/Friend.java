package com.zeus.backend.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Friend {
	private int no;
	private String user_id;
	private String friend_id;
	private String friend_nickname;
}
