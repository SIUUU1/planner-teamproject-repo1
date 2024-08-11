package com.zeus.backend.service;

import java.util.List;

import com.zeus.backend.domain.TodoComment;

public interface TodoCommentService {
	TodoComment addComment(TodoComment comment);

	List<TodoComment> getCommentsByTodoNo(Long todo_no);

	void deleteComment(Long todo_comment_no);

	void updateComment(TodoComment comment);
}