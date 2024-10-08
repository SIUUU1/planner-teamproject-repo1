package com.zeus.backend.domain;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Todo {
    private int todo_no;
    private int user_no;
    private Long group_id;
    private String todo_title;
    private String is_done;
    private LocalDate todo_date;
    private LocalDate reg_date;
    private String type;
}
