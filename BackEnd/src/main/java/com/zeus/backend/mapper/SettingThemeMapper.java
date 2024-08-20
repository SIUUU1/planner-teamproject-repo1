package com.zeus.backend.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.zeus.backend.domain.SettingTheme;

@Mapper
public interface SettingThemeMapper {
    SettingTheme selectByUserId(String user_id);
    void insert(SettingTheme settingTheme);
    void update(SettingTheme settingTheme);
    void delete(String user_id);
}