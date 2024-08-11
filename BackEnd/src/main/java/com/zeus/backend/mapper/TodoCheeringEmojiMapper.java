package com.zeus.backend.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.zeus.backend.domain.TodoCheeringEmoji;

@Mapper
public interface TodoCheeringEmojiMapper {
	List<TodoCheeringEmoji> getAllCheeringEmojis();

	TodoCheeringEmoji getCheeringEmojiById(Long cheering_emoji_no);

	void addCheeringEmoji(TodoCheeringEmoji cheeringEmoji);

	void updateCheeringEmoji(TodoCheeringEmoji cheeringEmoji);

	void deleteCheeringEmoji(TodoCheeringEmoji emoji);

	List<TodoCheeringEmoji> getEmojiByTodoNo(Long todo_no);
}