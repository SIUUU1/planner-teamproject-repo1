package com.zeus.backend.domain;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Group {
	private int group_id; // 그룹 ID (Primary Key)
	private String category; // 카테고리
	private String leader_id; // 그룹 생성자 ID
	private String group_name; // 그룹명
	private int groupone_count; //인원수 
	private String group_detail; // 그룹 설명
	private String group_notice; // 그룹 공지
	private String group_goal; // 목표
	private String image_url; // 그룹 이미지 URL
	private int apply_count; //지원수
	private Date reg_date; // 등록 날짜
}
