package com.zeus.backend.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.zeus.backend.domain.Theme;
import com.zeus.backend.domain.SettingTheme;
import com.zeus.backend.service.ThemeService;
import com.zeus.backend.service.SettingThemeService;

@RestController
@RequestMapping("/api/user")
public class ThemeController {

    @Autowired
    private ThemeService themeService;

    @Autowired
    private SettingThemeService settingThemeService;

    // 기존 Theme 관련 API
    @GetMapping("/themes")
    public ResponseEntity<List<Theme>> getAllThemes() {
        List<Theme> themes = themeService.getAllThemes();
        return ResponseEntity.ok(themes);
    }

    @GetMapping("/themes/{theme_name}")
    public ResponseEntity<Theme> getThemeByNo(@PathVariable String theme_name) {
        Theme theme = themeService.getThemeByName(theme_name);
        if (theme != null) {
            return ResponseEntity.ok(theme);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/themes")
    public ResponseEntity<Void> saveTheme(@RequestBody Theme theme) {
        themeService.saveTheme(theme);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/themes/{theme_no}")
    public ResponseEntity<Void> updateTheme(@PathVariable Long theme_no, @RequestBody Theme theme) {
        theme.setTheme_no(theme_no);
        themeService.updateTheme(theme);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/themes/{theme_no}")
    public ResponseEntity<Void> deleteTheme(@PathVariable Long theme_no) {
        themeService.deleteTheme(theme_no);
        return ResponseEntity.ok().build();
    }

    // 추가된 SettingTheme 관련 API
    @GetMapping("/setting-themes")
    public ResponseEntity<List<SettingTheme>> getAllSettingThemes() {
        List<SettingTheme> settingThemes = settingThemeService.getAllThemes();
        return ResponseEntity.ok(settingThemes);
    }

    @GetMapping("/setting-themes/{setting_theme_no}")
    public ResponseEntity<SettingTheme> getSettingThemeByNo(@PathVariable Long setting_theme_no) {
        SettingTheme settingTheme = settingThemeService.getThemeByNo(setting_theme_no);
        if (settingTheme != null) {
            return ResponseEntity.ok(settingTheme);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/setting-themes/user/{user_id}")
    public ResponseEntity<SettingTheme> getSettingThemesByUserId(@PathVariable String user_id) {
        SettingTheme settingThemes = settingThemeService.getThemesByUserId(user_id);
        if (settingThemes != null) {
            return ResponseEntity.ok(settingThemes);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/setting-themes")
    public ResponseEntity<Void> saveSettingTheme(@RequestBody SettingTheme settingTheme) {
        settingThemeService.saveTheme(settingTheme);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/setting-themes/update")
    public ResponseEntity<Void> updateSettingTheme(@RequestBody SettingTheme settingTheme) {
        System.out.println("==================");
        System.out.println("updateSettingTheme");
        System.out.println("settingTheme:"+settingTheme.toString());
    	settingThemeService.updateTheme(settingTheme);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/setting-themes/{setting_theme_no}")
    public ResponseEntity<Void> deleteSettingTheme(@PathVariable Long setting_theme_no) {
        settingThemeService.deleteTheme(setting_theme_no);
        return ResponseEntity.ok().build();
    }

//    // 새로운 메서드: Theme 및 SettingTheme 데이터를 객체로 반환
//    @GetMapping("/themes-and-settings")
//    public ResponseEntity<Map<String, List<?>>> getThemesAndSettings() {
//        Map<String, List<?>> response = new HashMap<>();
//        
//        List<Theme> allThemes = themeService.getAllThemes();
//        List<SettingTheme> allSettingThemes = settingThemeService.getAllThemes();
//
//        response.put("allThemes", allThemes);
//        response.put("allSettingThemes", allSettingThemes);
//
//        return ResponseEntity.ok(response);
//    }
}
