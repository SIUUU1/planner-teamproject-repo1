package com.zeus.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zeus.backend.domain.TodoComment;
import com.zeus.backend.mapper.TodoCommentMapper;

@Service
public class TodoCommentServiceImpl implements TodoCommentService {

    @Autowired
    private TodoCommentMapper todoCommentMapper;

    @Override
    public TodoComment addComment(TodoComment comment) {
        todoCommentMapper.insertComment(comment);
        return comment;
    }

    @Override
    public List<TodoComment> getCommentsByTodoNo(Long todo_no) {
        return todoCommentMapper.selectCommentsByTodoNo(todo_no);
    }

    @Override
    public void deleteComment(Long todo_comment_no) {
        todoCommentMapper.deleteComment(todo_comment_no);
    }

	@Override
	public void updateComment(TodoComment comment) {
		todoCommentMapper.updateComment(comment);
	}
    
    
}