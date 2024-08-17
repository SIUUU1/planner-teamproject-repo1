package com.zeus.backend.domain;

import lombok.Data;

@Data
public class Theme {
    private Long theme_no;
    private String theme_name;
    private String theme_main;
    private String theme_dark;
    private String theme_right;
    private String theme_btn_dark;
    private String theme_btn_right;
}