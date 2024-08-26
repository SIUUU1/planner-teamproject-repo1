package com.zeus.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zeus.backend.domain.SettingTheme;
import com.zeus.backend.mapper.SettingThemeMapper;

@Service
public class SettingThemeServiceImpl implements SettingThemeService {

    @Autowired
    private SettingThemeMapper settingThemeMapper;

    @Override
    public List<SettingTheme> getAllThemes() {
        return settingThemeMapper.selectAllThemes();
    }

    @Override
    public SettingTheme getThemeByNo(Long setting_theme_no) {
        return settingThemeMapper.selectThemeByNo(setting_theme_no);
    }

    @Override
    public SettingTheme getThemesByUserId(String user_id) {
        return settingThemeMapper.selectThemesByUserId(user_id);
    }

    @Override
    public void saveTheme(SettingTheme settingTheme) {
        settingThemeMapper.insertTheme(settingTheme);
    }

    @Override
    public void updateTheme(SettingTheme settingTheme) {
        settingThemeMapper.updateTheme(settingTheme);
    }

    @Override
    public void deleteTheme(Long setting_theme_no) {
        settingThemeMapper.deleteTheme(setting_theme_no);
    }
}