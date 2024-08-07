package com.zeus.backend.domain;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Qna {
	private int qna_id; // qna 글번호
	private String user_id; // 작성자 아이디
	private String user_name; // 작성자 이름
	private String user_tel; // 작성자 전화번호
	private String user_email; // 문의내역 받을 이메일
	private String qna_subject; // 제목
	private String qna_content; // 내용
	private int group_id; // 그룹아이디
	private int qora; // qora==1 qna, qora==2 답변
	private int reply;// 답변여부
	private Date reg_date;// 등록날짜
}
