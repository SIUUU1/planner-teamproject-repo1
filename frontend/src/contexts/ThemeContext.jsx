import React, { createContext, useContext, useState, useEffect } from 'react';
import useLoading from '../util/useLoading';
import { useUser } from './UserContext'; 
// 기본 테마 설정

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const { user, isLoggedIn } = useUser(); // UserContext에서 가져온 값
  const [theme, setTheme] = useState(null); // 현재 적용된 테마
  const [themeType, setThemeType] = useState(null); // 현재 적용된 테마 타입
  const [userId, setUserId] = useState(null); // 현재 사용자 ID
  const [otherUserId, setOtherUserId] = useState(null); // 요청된 사용자 ID
  
  // API URL
  const allThemeUrl = `http://localhost:8080/api/user/themes`; // 기본 테마
  const basicThemeUrl = `http://localhost:8080/api/user/themes/basic`; // 기본 테마
  const userThemeUrl = userId ? `http://localhost:8080/api/user/setting-themes/user/${userId}` : null;
  const otherUserThemeUrl = otherUserId ? `http://localhost:8080/api/user/setting-themes/user/${otherUserId}` : null;
  
  // useLoading 훅을 통해 테마를 로드
  const { data: allThemeData } = useLoading(allThemeUrl, 'json');
  const { data: basicThemeData } = useLoading(basicThemeUrl, 'json');
  const { data: userThemeSettingData, refetch: refetchUserTheme } = useLoading(userThemeUrl, 'json');
  const { data: otherUserSettingThemeData, refetch: refetchOtherUserTheme } = useLoading(otherUserThemeUrl, 'json');

// 사용자 id 업데이트
useEffect(() => {
  if (user) {
    setUserId(user.user_id);
    refetchUserTheme();
  }else{
    setUserId(null);
  }
}, [user]);

// 사용자 테마 데이터가 로드되면 테마 상태를 업데이트
useEffect(() => {
  if (user&&userThemeSettingData) {
    setTheme(allThemeData.find(theme => theme.theme_no === userThemeSettingData.theme_no));
  }else{
    setTheme(basicThemeData);
  }
}, [userThemeSettingData,allThemeData]);

// 다른 사용자 테마 업데이트
useEffect(() => {
  if (otherUserId) {
    refetchOtherUserTheme();
  }
}, [otherUserId]);

useEffect(() => {
  if (themeType=='user'&&allThemeData&&userThemeSettingData) {
    setTheme(allThemeData.find(theme => theme.theme_no === userThemeSettingData.theme_no));
  }else if (themeType === 'other'&&allThemeData&&otherUserSettingThemeData) {
   setTheme(allThemeData.find(theme => theme.theme_no === otherUserSettingThemeData.theme_no));
  }
}, [themeType,allThemeData,userThemeSettingData,otherUserSettingThemeData]);

const updateTheme = (type = 'user', newUserId = userId) => {
  if (type === 'user') {
    setThemeType('user')
  } else if (type === 'other') {
    if (newUserId) {
      setOtherUserId(newUserId);
      setThemeType('other')
    }
  }
};

  return (
    <ThemeContext.Provider value={{basicThemeData,allThemeData, theme, updateTheme, otherUserSettingThemeData,themeType}}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);