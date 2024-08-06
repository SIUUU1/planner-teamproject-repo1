package com.zeus.backend.service;

import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Service;

import com.zeus.backend.domain.Todo;
import com.zeus.backend.mapper.TodoMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TodoServiceImpl implements TodoService {

    private final TodoMapper todoMapper;

    @Override
    public void registerTodo(Todo todo) {
        todoMapper.registerTodo(todo);
    }

    @Override
    public List<Todo> getAllTodos() {
        return todoMapper.getAllTodos();
    }

    @Override
    public Todo getTodoByNO(int todo_no) {
        return todoMapper.getTodoByNO(todo_no);
    }

    @Override
    public void updateTodo(Todo todo) {
        todoMapper.updateTodo(todo);
    }

    @Override
    public void deleteTodo(int todo_no) {
        todoMapper.deleteTodo(todo_no);
    }

    @Override
    public List<Todo> getTodosByUserAndDate(int user_no, Date reg_date) {
        return todoMapper.getTodosByUserAndDate(user_no, reg_date);
    }
}