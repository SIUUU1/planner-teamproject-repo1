import React, { useState, useEffect } from 'react';
import './Chat.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faComments, faCog, faMessage } from "@fortawesome/free-solid-svg-icons";
import { faFacebookMessenger } from "@fortawesome/free-brands-svg-icons";
import SettingsPage from './SettingsPage';
import OpenChatRoom from './OpenChatRoom';
import CreateRoom from './CreateRoom';
import MyOpenChatRoom from './MyOpenChatRoom';

const Chat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState('home');

  useEffect(() => {
    if (!isOpen) {
      setView('home');
    }
  }, [isOpen]);

  const toggleOpen = () => {
    setIsOpen(prevState => !prevState);
  };

  const registerChatRoom = () => {
    setView('home');
  };

  const openSettings = () => {
    setView('settings');
  };

  const allChatList = () => {
    setView('individualChat');
  };

  const myChatList = () => {
    setView('groupChats');
  };

  return (
    <div className="messenger">
      <button className="messengerButton" onClick={toggleOpen}>
        <FontAwesomeIcon icon={faFacebookMessenger} />
      </button>
      {isOpen && (
        <div className="messengerWindow">
          {view === 'settings' && <SettingsPage />}
          {view === 'individualChat' && (
              <OpenChatRoom />
          )}
          {view === 'groupChats' && (
              <MyOpenChatRoom />
          )}
          {view === 'home' && (

            <div className='registerChat'>
              <CreateRoom></CreateRoom>
            </div>
            // <>
            //   <div className="messengerHeader">
            //     <div className="messengerTitle">
            //       <img src="/images/creed.png" alt="Logo" className="logo" />
            //       <div>
            //         <div className="messengerCompany">위플 We&Plan</div>
            //         <div className="messengerHours">공부시간 보기</div>
            //       </div>
            //     </div>
            //     <button onClick={toggleOpen} className="closeButton">×</button>
            //   </div>
            //   <div className="messengerBody">
            //     <div className="messengerMessage">
            //       <div className="messengerMessageHeader">
            //         <span className="messengerMessageTitle">위플</span>
            //       </div>
            //       <div className="messengerMessageContent">
            //         안녕하세요, 학생여러분 🧑‍💼<br />
            //         위플 서비스 이용에 도움이 필요하신가요?<br />
            //         문의를 남겨주시면 답변 드리겠습니다.<br />
            //         <span className="warning">⚠️ 채팅으로는 공부 및 진행률 상담을...</span>
            //       </div>
            //     </div>
            //   </div>
            // </>
          )}
          <div className="messengerFooter">
            <button className="footerButton" onClick={registerChatRoom}>
              <FontAwesomeIcon icon={faHome} />
              <span>채팅 추가</span>
            </button>
            <button className="footerButton" onClick={allChatList}>
              <FontAwesomeIcon icon={faMessage} />
              <span>전체 채팅</span>
            </button>
            <button className="footerButton" onClick={myChatList}>
              <FontAwesomeIcon icon={faComments} />
              <span>내 채팅</span>
            </button>
            {/* <button className="footerButton" onClick={openSettings}>
              <FontAwesomeIcon icon={faCog} />
              <span>설정</span>
            </button> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
