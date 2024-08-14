package com.zeus.backend.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zeus.backend.domain.GroupCategory;
import com.zeus.backend.service.GroupCategoryService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/category")
public class GroupCategoryController {

	@Autowired
	private GroupCategoryService categoryService;

	// 전체 카테고리 가져오기
	@GetMapping("/list")
	public ResponseEntity<List<GroupCategory>> getCategoryList() {
		System.out.println("getCategoryList :");
		List<GroupCategory> categoryList = null;
		try {
			categoryList = categoryService.list();
			System.out.println("getCategoryList :"+categoryList);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(categoryList);
		}
		return new ResponseEntity<>(categoryList, HttpStatus.OK);
	}

	// 카테고리 상세 보기
	@GetMapping("/read/{groupcategory_id}")
	public ResponseEntity<GroupCategory> getCategory(@PathVariable int groupcategory_id) {
		System.out.println("getCategory groupcategory_id:");
		GroupCategory categoryData = null;
		try {
			categoryData = categoryService.read(groupcategory_id);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(categoryData);
		}
		return new ResponseEntity<>(categoryData, HttpStatus.OK);
	}

	// 카테고리 등록
	@PostMapping("/insert")
	public ResponseEntity<Void> insert(@RequestBody GroupCategory category) throws Exception {
		System.out.println("insert category:" + category);
		categoryService.create(category);
		return new ResponseEntity<>(HttpStatus.CREATED);
	}

	// 카테고리 수정
	@PostMapping("/update")
	public ResponseEntity<Void> update(@RequestBody GroupCategory category) throws Exception {
		System.out.println("update category:" + category);
		categoryService.modify(category);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}

	// 카테고리 삭제
	@PostMapping("/delete")
	public ResponseEntity<Void> delete(@RequestBody Map<String, String> payload) throws Exception {
		int groupcategory_id = Integer.parseInt(payload.get("groupcategory_id"));
		System.out.println("delete category:" + groupcategory_id);
		categoryService.remove(groupcategory_id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
}
