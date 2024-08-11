package com.zeus.backend.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.zeus.backend.domain.TodoComment;

@Mapper
public interface TodoCommentMapper {
	void insertComment(TodoComment comment);

	List<TodoComment> selectCommentsByTodoNo(Long todo_no);

	void deleteComment(Long todo_comment_no);

	void updateComment(TodoComment comment);
}