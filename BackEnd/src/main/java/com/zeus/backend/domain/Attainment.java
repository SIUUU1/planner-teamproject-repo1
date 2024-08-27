package com.zeus.backend.domain;

import java.util.Date;

import lombok.Data;

@Data
public class Attainment {
	private Long attainment_no;
	private String user_id;
	private Long group_id;
	private String attainment_name;
	private String attainment_type;			//횟수/시간
	private String attainment_duration;		//단기(하루)/장기
	private int attainment_target;
	private int attainment_finish;
	private int attainment_rate;
	private int star;
	private Date reg_date;
	private Date start_date;
	private Date end_date;

}
