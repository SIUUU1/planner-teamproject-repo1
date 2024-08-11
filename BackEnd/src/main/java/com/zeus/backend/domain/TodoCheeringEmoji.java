package com.zeus.backend.domain;

import lombok.Data;

@Data
public class TodoCheeringEmoji {
    private Long cheering_emoji_no;
    private Long todo_no;
    private String user_id;
    private String emoji_item_url;
}