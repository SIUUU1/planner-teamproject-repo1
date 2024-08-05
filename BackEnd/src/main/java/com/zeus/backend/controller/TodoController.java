package com.zeus.backend.controller;

import java.util.Date;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.zeus.backend.domain.Todo;
import com.zeus.backend.service.TodoService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/user/todos")
@RequiredArgsConstructor
public class TodoController {

    private final TodoService todoService;

    @PostMapping
    public void registerTodo(@RequestBody Todo todo) {
        todoService.registerTodo(todo);
    }

    @GetMapping
    public List<Todo> getAllTodos() {
        return todoService.getAllTodos();
    }

    @GetMapping("/{todo_no}")
    public Todo getTodoByNO(@PathVariable int todo_no) {
        return todoService.getTodoByNO(todo_no);
    }

    @PutMapping("/{todo_no}")
    public void updateTodo(@PathVariable int todo_no, @RequestBody Todo todo) {
        todo.setTodo_no(todo_no);
        todoService.updateTodo(todo);
    }

    @DeleteMapping("/{todo_no}")
    public void deleteTodo(@PathVariable int todo_no) {
        todoService.deleteTodo(todo_no);
    }

    @GetMapping("/search")
    public List<Todo> getTodosByUserAndDate(@RequestParam int user_no, @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date reg_date) {
        return todoService.getTodosByUserAndDate(user_no, reg_date);
    }
}