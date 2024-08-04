import React, { useState } from 'react';
import './MenuBar.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faPaintRoller, faUserGroup, faBell, faChartSimple, faCircleInfo, faLock } from "@fortawesome/free-solid-svg-icons";

const MenuBar = ({ isOpen, onClose }) => {
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  const handleNavigation = (path) => {
    window.location.href = path;
    onClose();
  };

  const handleLogout = () => {
    setIsLoggedOut(true);
    setTimeout(() => {
      setIsLoggedOut(false);
      onClose();
    }, 3000); // 3초 후에 메시지를 숨김
  };

  return (
    <div className={`menuBar ${isOpen ? 'open' : ''}`}>
      <div className="menuHeader">
        <span className="menuTitle">마이페이지</span>
        <button className="closeButton" onClick={onClose}>×</button>
      </div>
      <div className="profile">
        <img src="/images/creed.png" alt="Profile" className="avatar" />
        <span>Marcus.Lim 님</span>
        <span>환영합니다! :)</span>
      </div>
      <div className="menuContent">
        <div className="menuItem">
          <button className="menuItemLink" onClick={() => handleNavigation('/profile')}>
            <FontAwesomeIcon icon={faUser} /> <span>내 정보</span>
          </button>
        </div>
        <div className="menuItem">
          <button className="menuItemLink active" onClick={() => handleNavigation('/themechange')}>
            <FontAwesomeIcon icon={faPaintRoller} /> <span>테마변경</span>
          </button>
        </div>
        <div className="menuItem">
          <button className="menuItemLink" onClick={() => handleNavigation('/friends')}>
            <FontAwesomeIcon icon={faUserGroup} /> <span>친구목록</span>
          </button>
        </div>
        <div className="menuItem">
          <button className="menuItemLink" onClick={() => handleNavigation('/analytics')}>
            <FontAwesomeIcon icon={faBell} /> <span>알림설정</span>
          </button>
        </div>
        <div className="menuItem">
          <button className="menuItemLink" onClick={() => handleNavigation('/attainmentMain')}>
            <FontAwesomeIcon icon={faChartSimple} /> <span>학습통계</span>
          </button>
        </div>
        <div className="menuItem">
          <button className="menuItemLink" onClick={() => handleNavigation('/qna')}>
            <FontAwesomeIcon icon={faCircleInfo} /> <span>고객센터</span>
          </button>
        </div>
      </div>
      <div className="footer">
        {isLoggedOut ? (
          <p className="logoutMessage">로그아웃 되었습니다</p>
        ) : (
          <button className="menuItemLink" onClick={handleLogout}>
            <FontAwesomeIcon icon={faLock} /> <span>로그아웃</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default MenuBar;
