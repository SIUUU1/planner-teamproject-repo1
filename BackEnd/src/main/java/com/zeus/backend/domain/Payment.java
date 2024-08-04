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
	private String merchant_uid;
	private int user_no;
	private String user_id;
	private int amount;
	private Date reg_date;
}
