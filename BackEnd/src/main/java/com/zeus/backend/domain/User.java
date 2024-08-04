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
public class User {	
	private int user_no;
	private String user_id;
	private String password;
	private String user_name;
	private String provider;	// 값을 받아온 도메인('google')
	private String provider_id;	// 도메인에서 사용하는 id('sub값')
	private int coin;
	private String role;
	//Profile
	private String user_nickname;
	private String image_url;
	private Date reg_date;
	private Date update_date;
	//Authentication
	private String user_tel;
	private String user_email;
	private String user_gender;
	private Date user_birthday;
	private boolean enable;
	
	private boolean isFirstLogin;
}
