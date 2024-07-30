// src/components/MessengerButton.jsx
import React, { useState } from 'react';
import './Messenger.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faComments, faCog } from "@fortawesome/free-solid-svg-icons";
import SettingsPage from './SettingsPage';

const MessengerButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
    setShowSettings(false); // Reset to hide settings when closing the messenger
  };

  const openSettings = () => {
    setShowSettings(true);
  };

  return (
    <div className="messenger">
      {isOpen && (
        <div className="messengerWindow">
          {showSettings ? (
            <SettingsPage />
          ) : (
            <>
              <div className="messengerHeader">
                <div className="messengerTitle">
                  <img src="/images/creed.png" alt="Logo" className="logo" />
                  <div>
                  <div className="messengerCompany">위플 We&Plan</div>
                <div className="messengerHours">공부시간 보기</div>
              </div>
            </div>
            <button onClick={toggleOpen} className="closeButton">×</button>
          </div>
          <div className="messengerBody">
            <div className="messengerMessage">
              <div className="messengerMessageHeader">
                <span className="messengerMessageTitle">위플</span>
              </div>
              <div className="messengerMessageContent">
                안녕하세요, 학생여러분 🧑‍💼<br />
                위플 서비스 이용에 도움이 필요하신가요?<br />
                문의를 남겨주시면 답변 드리겠습니다.<br />
                <span className="warning">⚠️ 채팅으로는 공부 및 진행률 상담을...</span>
              </div>
            </div>
            <button className="inquiryButton">문의하기</button>
            <div className="responseTime">몇 분 내 답변 받으실 수 있어요</div>
              </div>
              <div className="messengerFooter">
                <button className="footerButton">
                  <FontAwesomeIcon icon={faHome} />
                  <span>홈</span>
                </button>
                <button className="footerButton">
                  <FontAwesomeIcon icon={faComments} />
                  <span>대화</span>
                </button>
                <button className="footerButton" onClick={openSettings}>
                  <FontAwesomeIcon icon={faCog} />
                  <span>설정</span>
                </button>
              </div>
            </>
          )}
        </div>
      )}
      <button className="messengerButton" onClick={toggleOpen}>
        문의
      </button>
    </div>
  );
};

export default MessengerButton;
