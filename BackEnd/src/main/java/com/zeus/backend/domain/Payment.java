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
public class Payment {
	private int payment_id;
	private String item_id;
	private int user_no;
	private String user_id;
	private String user_name;
	private String user_email;
	private String user_tel;
	private int price;
	private Date reg_date;
}
