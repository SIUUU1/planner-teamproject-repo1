package com.zeus.backend.domain;

import java.util.Date;

import lombok.Data;

@Data
public class SettingTheme {
    private Long setting_theme_no;
    private String user_id;
    private Integer theme_no;
    private String theme_name;
    private Date update_date;
}