package com.zeus.backend.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GroupCategory {
	private int groupcategory_id; // 그룹카테고리 ID
	private String code; // 코드
	private String category_name; // 카테고리명
}
