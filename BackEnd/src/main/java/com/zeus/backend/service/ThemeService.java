package com.zeus.backend.service;

import java.util.List;

import com.zeus.backend.domain.Theme;

public interface ThemeService {
    List<Theme> getAllThemes();
    Theme getThemeByNo(Long theme_no);
    void saveTheme(Theme theme);
    void updateTheme(Theme theme);
    void deleteTheme(Long theme_no);
}
