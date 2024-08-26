package com.zeus.backend.mapper;


import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.zeus.backend.domain.Theme;

@Mapper
public interface ThemeMapper {
    List<Theme> getAllThemes();
    Theme getThemeByName(String theme_name);
    void saveTheme(Theme theme);
    void updateTheme(Theme theme);
    void deleteTheme(Long theme_no);
}
