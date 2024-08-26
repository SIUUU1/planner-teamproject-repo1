import React, { createContext, useState, useEffect, useContext } from 'react';

const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [retrying, setRetrying] = useState(false); // 재요청 여부를 체크하는 상태

  const fetchData = async (retry = true) => {
    try {
      const response = await fetch('http://localhost:8080/api/user/userInfo', { credentials: 'include' });

      if (response.status === 499) {
        if (!retrying) {
          setRetrying(true);
          await fetchData(false); // 재요청 시도
        }
        return;
      }

      if (!response.ok) {
        // 에러 처리
        console.error('Failed to fetch user info', response.status);
        setIsLoggedIn(false);
        setUser(null);
        return;
      }

      const data = await response.json();
      setUser(data);
      setIsLoggedIn(true);
      console.log('정상적으로 로그인 정보를 가져왔습니다.'); // 정상적으로 로그인 정보를 가져온 경우 로그 출력
      setRetrying(false);
    } catch (error) {
      // 에러 처리
      console.error('Error fetching user info', error);
      setIsLoggedIn(false);
      setUser(null);
    }
  };

  const logout = async () => {
    try {
      // 로그아웃 요청을 보내고
      const response = await fetch('http://localhost:8080/logout', { 
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        // 로그아웃 성공 시 상태 업데이트
        setUser(null);
        setIsLoggedIn(false);
        console.log('로그아웃 성공');
        location.href='/welcome';
      } else {
        console.error('로그아웃 실패', response.status);
      }
    } catch (error) {
      console.error('로그아웃 중 오류 발생', error);
      location.href='/welcome';
    }
  };

  useEffect(() => {
    fetchData(); // 컴포넌트 마운트 시 유저 정보 fetch
  }, []);

  return (
    <UserContext.Provider value={{ user, isLoggedIn, fetchData, logout }}>
      {children}
    </UserContext.Provider>
  );
}
