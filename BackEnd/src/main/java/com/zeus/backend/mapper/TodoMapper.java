package com.zeus.backend.mapper;

import java.util.Date;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.zeus.backend.domain.Todo;


@Mapper
public interface TodoMapper {

	// 투두 데이터 등록
    void registerTodo(Todo todo);

    // 모든 투두 항목 가져오기
    List<Todo> getAllTodos();

    // 특정 투두 항목 가져오기 (todo_no로 검색)
    Todo getTodoByNO(int todo_no);

    // 투두 데이터 업데이트
    void updateTodo(Todo todo);

    // 투두 데이터 삭제
    void deleteTodo(int todo_no);

    // 특정 사용자와 날짜에 따른 투두 항목 가져오기
    List<Todo> getTodosByUserAndDate(int user_no, Date todo_date);
    
    // 투두 완료 여부 업데이트
	void updateTodoState(int todo_no, String is_done);
}
