package com.zeus.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zeus.backend.domain.Theme;
import com.zeus.backend.service.ThemeService;

@RestController
@RequestMapping("/api/user/themes")
public class ThemeController {

    @Autowired
    private ThemeService themeService;

    @GetMapping
    public List<Theme> getAllThemes() {
        return themeService.getAllThemes();
    }

    @GetMapping("/{theme_no}")
    public Theme getThemeByNo(@PathVariable Long theme_no) {
        return themeService.getThemeByNo(theme_no);
    }

    @PostMapping
    public void saveTheme(@RequestBody Theme theme) {
        themeService.saveTheme(theme);
    }

    @PutMapping("/{theme_no}")
    public void updateTheme(@PathVariable Long theme_no, @RequestBody Theme theme) {
        theme.setTheme_no(theme_no);
        themeService.updateTheme(theme);
    }

    @DeleteMapping("/{theme_no}")
    public void deleteTheme(@PathVariable Long theme_no) {
        themeService.deleteTheme(theme_no);
    }
}