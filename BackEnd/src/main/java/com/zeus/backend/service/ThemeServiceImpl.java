package com.zeus.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zeus.backend.domain.Theme;
import com.zeus.backend.mapper.ThemeMapper;

@Service
public class ThemeServiceImpl implements ThemeService {

    @Autowired
    private ThemeMapper themeMapper;

    @Override
    public List<Theme> getAllThemes() {
        return themeMapper.getAllThemes();
    }

    @Override
    public Theme getThemeByName(String theme_name) {
        return themeMapper.getThemeByName(theme_name);
    }

    @Override
    public void saveTheme(Theme theme) {
        themeMapper.saveTheme(theme);
    }

    @Override
    public void updateTheme(Theme theme) {
        themeMapper.updateTheme(theme);
    }

    @Override
    public void deleteTheme(Long theme_no) {
        themeMapper.deleteTheme(theme_no);
    }
}