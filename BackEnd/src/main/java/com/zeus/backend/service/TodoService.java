package com.zeus.backend.service;

import java.util.Date;
import java.util.List;

import com.zeus.backend.domain.Todo;

public interface TodoService {
	void registerTodo(Todo todo);

	List<Todo> getAllTodos();

	Todo getTodoByNO(int todo_no);

	void updateTodo(Todo todo);

	void deleteTodo(int todo_no);

	List<Todo> getTodosByUserAndDate(int user_no, Date reg_date);

	void updateTodoState(int todo_no, String isDone);
}
