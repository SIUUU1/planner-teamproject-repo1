package com.zeus.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zeus.backend.domain.SettingTheme;
import com.zeus.backend.mapper.SettingThemeMapper;

@Service
public class SettingThemeServiceImpl implements SettingThemeService {

    @Autowired
    private SettingThemeMapper settingThemeMapper;

    @Override
    public SettingTheme getSettingTheme(String userId) {
        return settingThemeMapper.selectByUserId(userId);
    }

    @Override
    public void createSettingTheme(SettingTheme settingTheme) {
        settingThemeMapper.insert(settingTheme);
    }

    @Override
    public void updateSettingTheme(SettingTheme settingTheme) {
        settingThemeMapper.update(settingTheme);
    }

    @Override
    public void deleteSettingTheme(String userId) {
        settingThemeMapper.delete(userId);
    }
}