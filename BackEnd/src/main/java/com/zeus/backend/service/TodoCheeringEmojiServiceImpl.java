package com.zeus.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zeus.backend.domain.TodoCheeringEmoji;
import com.zeus.backend.mapper.TodoCheeringEmojiMapper;

@Service
public class TodoCheeringEmojiServiceImpl implements TodoCheeringEmojiService {

    @Autowired
    private TodoCheeringEmojiMapper todoCheeringEmojiMapper;

    @Override
    public List<TodoCheeringEmoji> getAllCheeringEmojis() {
        return todoCheeringEmojiMapper.getAllCheeringEmojis();
    }

    @Override
    public TodoCheeringEmoji getCheeringEmojiById(Long cheering_emoji_no) {
        return todoCheeringEmojiMapper.getCheeringEmojiById(cheering_emoji_no);
    }

    @Override
    public void addCheeringEmoji(TodoCheeringEmoji cheeringEmoji) {
        todoCheeringEmojiMapper.addCheeringEmoji(cheeringEmoji);
    }

    @Override
    public void updateCheeringEmoji(TodoCheeringEmoji cheeringEmoji) {
        todoCheeringEmojiMapper.updateCheeringEmoji(cheeringEmoji);
    }

    @Override
    public void deleteCheeringEmoji(TodoCheeringEmoji emoji) {
        todoCheeringEmojiMapper.deleteCheeringEmoji(emoji);
    }

	@Override
	public List<TodoCheeringEmoji> getEmojiByTodoNo(Long todo_no) {
		return todoCheeringEmojiMapper.getEmojiByTodoNo(todo_no);
	}
    
    
}