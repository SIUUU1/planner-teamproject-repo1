package com.zeus.backend.domain;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LoginLog {
	private int login_log_id;
	private int user_no;
	private String user_id;
	private int status_code;
	private String ip;
	private int fail_count;
	private String fail_reason;
	private Date login_date;
}
