import React, { useState, useEffect } from 'react';
import './Chat.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faComments, faCog, faMessage } from "@fortawesome/free-solid-svg-icons";
import { faFacebookMessenger } from "@fortawesome/free-brands-svg-icons";
import OpenChatRoom from './OpenChatRoom';
import CreateRoom from './CreateRoom';
import MyOpenChatRoom from './MyOpenChatRoom';
import SettingChatRoom from './SettingChatRoom'

const Chat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState('my');

  useEffect(() => {
    if (!isOpen) {
      setView('my');
    }
  }, [isOpen]);

  const toggleOpen = () => {
    setIsOpen(prevState => !prevState);
  };

  const registerChatRoom = () => {
    setView('register');
  };

  const openSettings = () => {
    setView('settings');
  };

  const allChatList = () => {
    setView('all');
  };

  const myChatList = () => {
    setView('my');
  };

  return (
    <div className="messenger">
      <button className="messengerButton" onClick={toggleOpen}>
        <FontAwesomeIcon icon={faFacebookMessenger} />
      </button>
      {isOpen && (
        <div className="messengerWindow">
          {view === 'settings' && <SettingChatRoom />}
          {view === 'all' && (<OpenChatRoom />)}
          {view === 'my' && (<MyOpenChatRoom />)}
          {view === 'register' && (<div className='registerChat'><CreateRoom/></div>)}
          
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
            <button className="footerButton" onClick={openSettings}>
              <FontAwesomeIcon icon={faCog} />
              <span>설정</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
