package com.zeus.backend.domain;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GroupOne {
	private int groupone_id; // GroupOne ID (Primary Key)
	private int group_id; // Group ID (Foreign Key)
	private String user_id; // 그룹원 아이디
	private String user_nickname; // 그룹원 닉네임
	private String enable; // 승낙 여부 ('0': no, '1': accept)
	private Date regDate; // 등록 날짜
}
