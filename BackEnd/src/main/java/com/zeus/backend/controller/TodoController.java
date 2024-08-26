package com.zeus.backend.controller;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.zeus.backend.domain.Todo;
import com.zeus.backend.domain.TodoCheeringEmoji;
import com.zeus.backend.domain.TodoComment;
import com.zeus.backend.domain.User;
import com.zeus.backend.service.TodoCheeringEmojiService;
import com.zeus.backend.service.TodoCommentService;
import com.zeus.backend.service.TodoService;
import com.zeus.backend.service.UserServiceImpl;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/user/todos")
@RequiredArgsConstructor
public class TodoController {

	@Autowired
	private TodoService todoService;

	@Autowired
	private ObjectMapper objectMapper;

	@Autowired
	private UserServiceImpl userServiceImpl;

	@Autowired
	private HttpServletRequest request;

	@Autowired
	private TodoCommentService todoCommentService;
	@Autowired
	private TodoCheeringEmojiService todoCheeringEmojiService;

	@PostMapping("/register")
	public ResponseEntity<List<Todo>> registerTodo(@RequestBody Todo todo) {
		System.out.println("todo_title: " + todo.getTodo_title());
		System.out.println("todo_date: " + todo.getTodo_date());
		System.out.println("type: " + todo.getType());

		User user = null;
		try {
			user = userServiceImpl.read();
		} catch (Exception e) {
			e.printStackTrace();
		}
		if (user == null) {
			return ResponseEntity.status(499).build(); // 499 Custom Unauthorized
		}
		todo.setUser_no(user.getUser_no());

		todoService.registerTodo(todo);
		System.out.println("getUser_no: " + todo.getUser_no());

		return new ResponseEntity<>(HttpStatus.OK); // 200 OK
	}

	@GetMapping
	public List<Todo> getAllTodos() {
		return todoService.getAllTodos();
	}

	@GetMapping("/{todo_no}")
	public Todo getTodoByNO(@PathVariable int todo_no) {
		System.out.println("=============================");
		System.out.println("start getTodoByNO");
		System.out.println("todoNo:" + todo_no);
		return todoService.getTodoByNO(todo_no);
	}

	@PostMapping("/updateState")
	public ResponseEntity<Map<String, Object>> updateTodoState(@RequestBody Map<String, String> payload) {
		int todoNo = Integer.parseInt(payload.get("todo_no"));
		String isDone = payload.get("is_done");

		System.out.println("=============================");
		System.out.println("start update todoState");
		System.out.println("todoNo:" + todoNo);
		System.out.println("isDone:" + isDone);

		// 상태 업데이트 처리 로직
		todoService.updateTodoState(todoNo, isDone);

		Map<String, Object> response = new HashMap<>();
		try {
			// 성공적인 업데이트 후 JSON 응답 반환
			response.put("success", true);
			response.put("message", "Todo 상태가 업데이트되었습니다.");
			return ResponseEntity.ok(response);
		} catch (Exception e) {
			response.put("success", false);
			response.put("message", "Todo 상태 업데이트 중 오류가 발생했습니다.");
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
		}
	}
	@PostMapping("/update")
	public ResponseEntity<Void> updateComment(@RequestBody Todo todo) {
		System.out.println("====================");
		System.out.println("start update todo");
		System.out.println(todo.getTodo_title());
		todoService.updateTodo(todo);
		return ResponseEntity.ok().build();
	}


	@PostMapping("/delete")
	public ResponseEntity<Map<String, Object>> deleteTodo(@RequestBody Map<String, String> payload) {
		int todoNo = Integer.parseInt(payload.get("todo_no"));

		System.out.println("=============================");
		System.out.println("start deleteTodo");
		System.out.println("todoNo:" + todoNo);
		todoService.deleteTodo(todoNo);

		Map<String, Object> response = new HashMap<>();
		try {
			// 성공적인 업데이트 후 JSON 응답 반환
			response.put("success", true);
			response.put("message", "Todo가 삭제 되었습니다.");
			return ResponseEntity.ok(response);
		} catch (Exception e) {
			response.put("success", false);
			response.put("message", "Todo 삭제 중 오류가 발생했습니다.");
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
		}
	}

	@GetMapping("/search")
	public ResponseEntity<List<Todo>> getTodosByUserAndDate(
			@RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date todo_date) {
		System.out.println("=============================");
		System.out.println("start getTodosByUserAndDate");

		User user = null;
		try {
			user = userServiceImpl.read();
		} catch (Exception e) {
			e.printStackTrace();
		}
		if (user == null) {
			return ResponseEntity.status(499).build(); // 499 Custom Unauthorized
		}
		List<Todo> todos = todoService.getTodosByUserAndDate(user.getUser_no(), todo_date);
		return new ResponseEntity<>(todos, HttpStatus.OK); // 200 OK
	}
	@GetMapping("/searchUser")
	public ResponseEntity<List<Todo>> getTodosByUserIdAndDate(
	        @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date todo_date, @RequestParam int user_no) {
		System.out.println("=============================");
		System.out.println("start getTodosByUserIdAndDate");
		System.out.println("user_no:"+user_no);

		List<Todo> todos = todoService.getTodosByUserAndDate(user_no, todo_date);
		return new ResponseEntity<>(todos, HttpStatus.OK); // 200 OK
	}

	@GetMapping("/{todo_no}/comments")
	public ResponseEntity<List<TodoComment>> getCommentsByTodoNo(@PathVariable Long todo_no) {
		List<TodoComment> comments = todoCommentService.getCommentsByTodoNo(todo_no);
		return ResponseEntity.ok(comments);
	}

	@PostMapping("/{todo_no}/comments")
	public ResponseEntity<TodoComment> addComment(@PathVariable Long todo_no, @RequestBody TodoComment comment) {
		comment.setTodo_no(todo_no);

		User user = null;
		try {
			user = userServiceImpl.read();
		} catch (Exception e) {
			e.printStackTrace();
		}
		if (user == null) {
			return ResponseEntity.status(499).build(); // 499 Custom Unauthorized
		}
		comment.setUser_id(user.getUser_id());
		System.out.println("getUser_no: " + comment.getUser_id());

		TodoComment savedComment = todoCommentService.addComment(comment);
		return ResponseEntity.ok(savedComment);
	}

	@PostMapping("/comments/update")
	public ResponseEntity<Void> updateComment(@RequestBody TodoComment comment) {
		System.out.println("====================");
		System.out.println("start update comment");
		System.out.println(comment.getEmoji_item_url());
		System.out.println(comment.getTodo_comment_text());
		todoCommentService.updateComment(comment);
		return ResponseEntity.ok().build();
	}

	@PostMapping("/comments/delete")
	public ResponseEntity<Void> deleteComment(@RequestBody TodoComment comment) {
		todoCommentService.deleteComment(comment.getTodo_comment_no());
		return ResponseEntity.ok().build();
	}
	
	@GetMapping("/{todo_no}/cheering-emojis")
	public ResponseEntity<List<TodoCheeringEmoji>> getEmojiByTodoNo(@PathVariable Long todo_no) {
		System.out.println("==================");
		System.out.println("start getEmojiByTodoNo");
		System.out.println("todo_no: "+todo_no);
		List<TodoCheeringEmoji> emojis = todoCheeringEmojiService.getEmojiByTodoNo(todo_no);
		System.out.println("emojis(list):"+emojis);
		return ResponseEntity.ok(emojis);
	}
	
	@PostMapping("/cheering-emojis")
	public ResponseEntity<Void> addCheeringEmoji (@RequestBody TodoCheeringEmoji Emoji){
		System.out.println("==================");
		System.out.println("start registerCheeringEmoji");
		todoCheeringEmojiService.addCheeringEmoji(Emoji);
		return ResponseEntity.ok().build();
	}
	@PostMapping("/cheering-emojis/delete")
	public ResponseEntity<Void> deleteCheeringEmoji (@RequestBody TodoCheeringEmoji Emoji){
		System.out.println("==================");
		System.out.println("start deleteCheeringEmoji");
		todoCheeringEmojiService.deleteCheeringEmoji(Emoji);
		return ResponseEntity.ok().build();
	}

}