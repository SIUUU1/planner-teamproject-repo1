package com.zeus.backend.domain;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Schedule {
    private int schedule_no;
    private int user_no;
    private Date reg_date;
    private int start_time;
    private int end_time;
    private String schedule_name;
    private int value;
}