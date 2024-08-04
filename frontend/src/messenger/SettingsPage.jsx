// src/pages/SettingsPage.jsx
import React from 'react';
import './SettingsPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faCommentDots, faBell } from '@fortawesome/free-solid-svg-icons';

const SettingsPage = () => {
  const handleNavigation = (path) => {
    window.location.href = path;
  };
  return (
    <div className="settingsPage">
      <div className="profileSection">
        <img src="/images/creed.png" alt="Avatar" className="avatar" />
        <div className="profileInfo">
          <div className="profileName">이름</div>
          <div className="profileContact">연락처 정보</div>
          <button className="editButton">정보 수정하기</button>
        </div>
      </div>
      <div className="settingsSection">
        <div className="settingsCategory">상담 환경</div>
        <div className="settingsItem">
          <FontAwesomeIcon icon={faGlobe} />
          <span>언어</span>
          <span className="settingsValue">한국어</span>
        </div>
        <div className="settingsItem">
          <FontAwesomeIcon icon={faCommentDots} />
          <span>메시지 번역 표시</span>
          <label className="switch">
            <input type="checkbox" defaultChecked />
            <span className="slider"></span>
          </label>
        </div>
        <div className="settingsItem">
          <FontAwesomeIcon icon={faBell} />
          <span>알림음</span>
          <label className="switch">
            <input type="checkbox" defaultChecked />
            <span className="slider"></span>
          </label>
        </div>
      </div>
      <div className="settingsSection">
        <div className="settingsCategory">광고 수신 설정</div>
        <div className="settingsItem">
          <span>문자 수신거부</span>
          <label className="switch">
            <input type="checkbox" />
            <span className="slider"></span>
          </label>
        </div>
        <div className="settingsItem">
          <span>이메일 수신거부</span>
          <label className="switch">
            <input type="checkbox" />
            <span className="slider"></span>
          </label>
        </div>
      </div>
      <button className="inquiryButton" onClick={() => handleNavigation('/qna')}>1:1 문의하기</button>
    </div>
  );
};

export default SettingsPage;
