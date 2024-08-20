import React, { createContext, useState, useContext, useEffect } from 'react';
import useLoading from '../util/useLoading';

// 테마 Context 생성
export const ThemeContext = createContext({
  currentTheme: null,
  setCurrentTheme: () => {},
});

// 테마 제공 컴포넌트
export const ThemeProvider = ({ children }) => {
  // //사용자 정보를 가져옵니다.
  // const { data: userData, loading: loadingUser, error: errorLoadingUser } = useLoading('http://localhost:8080/api/user/userInfo', 'json');
  // // 현제 사용자 테마 가져오기
  // const { data: themeData, loading: loadingTheme, error: errorTheme } = useLoading(`http://localhost:8080/api/user/setting-theme/`, 'json');
  
  // 초기 테마 설정 (초기값 null로 설정, 데이터를 가져온 후 설정)
  const [currentTheme, setCurrentTheme] = useState({
    theme_name: 'Theme Defualt',
    theme_main: '#F1F6FF',
    theme_dark: '#D3B3E5',
    theme_right: '#E5CCF2',
    theme_btn_dark: '#6A0DAD',
    theme_btn_right: '#A36BCF',
  });

  // // themeData가 업데이트 될 때 currentTheme 설정
  // useEffect(() => {
  //   if (themeData && themeData.length > 0) {
  //     setCurrentTheme(themeData[0]);
  //   }
  // }, [themeData]);

  const changeTheme = (theme) => {
    setCurrentTheme(theme);
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// 테마 Context 사용을 위한 커스텀 훅
export const useTheme = () => useContext(ThemeContext);