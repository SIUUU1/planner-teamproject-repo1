package com.zeus.backend.domain;

import lombok.Data;

@Data
public class TodoComment {
    private Long todo_comment_no;
    private Long todo_no;
    private String user_id;
    private String user_nickname;
    private String emoji_item_url;
    private String todo_comment_text;
}