// src/contexts/ThemeContext.jsx
import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [themeColor, setThemeColor] = useState(localStorage.getItem('themeColor') || '#ffffff');
  const [themeMode, setThemeMode] = useState(localStorage.getItem('themeMode') || 'light');

  useEffect(() => {
    localStorage.setItem('themeColor', themeColor);
    localStorage.setItem('themeMode', themeMode);
  }, [themeColor, themeMode]);

  return (
    <ThemeContext.Provider value={{ themeColor, setThemeColor, themeMode, setThemeMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
