package com.zeus.backend.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Faq {
	private int faq_id; // faq 글번호
	private String faq_category; // 카테고리
	private String faq_title; // 제목
	private String faq_content; // 내용
}
