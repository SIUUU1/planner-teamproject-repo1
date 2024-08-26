package com.zeus.backend.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.zeus.backend.domain.SettingTheme;


@Mapper
public interface SettingThemeMapper {

    List<SettingTheme> selectAllThemes();

    SettingTheme selectThemeByNo(Long setting_theme_no);

    SettingTheme selectThemesByUserId(String user_id);

    void insertTheme(SettingTheme settingTheme);

    void updateTheme(SettingTheme settingTheme);

    void deleteTheme(Long setting_theme_no);
}