package com.zeus.backend.service;

import java.util.List;

import com.zeus.backend.domain.SettingTheme;

public interface SettingThemeService {

    List<SettingTheme> getAllThemes();

    SettingTheme getThemeByNo(Long setting_theme_no);

    SettingTheme getThemesByUserId(String user_id);

    void saveTheme(SettingTheme settingTheme);

    void updateTheme(SettingTheme settingTheme);

    void deleteTheme(Long setting_theme_no);
}