package com.zeus.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zeus.backend.domain.SettingTheme;
import com.zeus.backend.service.SettingThemeService;

@RestController
@RequestMapping("/api/user/setting-theme")
public class SettingThemeController {

    @Autowired
    private SettingThemeService settingThemeService;

    @GetMapping
    public SettingTheme getSettingTheme(@PathVariable String userId) {
        return settingThemeService.getSettingTheme(userId);
    }

//    @PostMapping
//    public void createSettingTheme(@RequestBody SettingTheme settingTheme) {
//        settingThemeService.createSettingTheme(settingTheme);
//    }

    @PostMapping
    public void updateSettingTheme(@RequestBody SettingTheme settingTheme) {
        settingThemeService.updateSettingTheme(settingTheme);
    }

//    @DeleteMapping("/{userId}")
//    public void deleteSettingTheme(@PathVariable String userId) {
//        settingThemeService.deleteSettingTheme(userId);
//    }
}