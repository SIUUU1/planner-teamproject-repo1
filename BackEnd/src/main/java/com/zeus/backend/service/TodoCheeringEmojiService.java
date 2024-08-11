package com.zeus.backend.service;

import java.util.List;

import com.zeus.backend.domain.TodoCheeringEmoji;

public interface TodoCheeringEmojiService {
	List<TodoCheeringEmoji> getAllCheeringEmojis();

	TodoCheeringEmoji getCheeringEmojiById(Long cheering_emoji_no);

	void addCheeringEmoji(TodoCheeringEmoji cheeringEmoji);

	void updateCheeringEmoji(TodoCheeringEmoji cheeringEmoji);

	void deleteCheeringEmoji(TodoCheeringEmoji emoji);

	List<TodoCheeringEmoji> getEmojiByTodoNo(Long todo_no);
}