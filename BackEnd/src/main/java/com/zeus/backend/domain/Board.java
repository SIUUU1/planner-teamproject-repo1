package com.zeus.backend.domain;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Board {
	private int no; // 공지사항 번호
	private int group_id; // 그룹 ID
	private String user_id; // 작성자 ID
	private String user_nickname; // 회원 닉네임
	private String filename; // 프로필 이미지 URL
	private String category; // 카테고리
	private String subject; // 제목
	private String content; // 내용
	private int ref; // 참조 번호
	private int step; // 답글 단계
	private int depth; // 답글 깊이
	private int read_count; // 조회수
	private Date reg_date; // 등록일
}
