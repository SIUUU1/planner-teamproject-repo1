package com.zeus.backend.service;

import java.util.List;

import com.zeus.backend.domain.Theme;

public interface ThemeService {
    List<Theme> getAllThemes();
    Theme getThemeByName(String theme_name);
    void saveTheme(Theme theme);
    void updateTheme(Theme theme);
    void deleteTheme(Long theme_no);
}
