package com.zeus.backend.service;

import com.zeus.backend.domain.SettingTheme;

public interface SettingThemeService {
	SettingTheme getSettingTheme(String userId);

	void createSettingTheme(SettingTheme settingTheme);

	void updateSettingTheme(SettingTheme settingTheme);

	void deleteSettingTheme(String userId);
}
