import React, { useContext, useState, useEffect } from 'react';
import './Welcome.css';
import { ThemeContext } from '../contexts/ThemeContext';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faBars, faUserGroup, faChartSimple, faRightFromBracket, faPaperPlane, faSignInAlt, faRegistered } from "@fortawesome/free-solid-svg-icons";
import Button from '../components/Button';
import MessageForm from '../message/MessageForm';
import { useNavigate } from 'react-router-dom';

const images = [
  '/images/dog1.jpg',
  '/images/dog2.jpg',
  '/images/dog3.jpg',
  '/images/dog4.jpg',
  '/images/dog5.jpg'
];

const Welcome = () => {
  const { themeColor } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMessageForm, setShowMessageForm] = useState(false);
  const [notifications] = useState([
    { id: 1, date: '7월 12일', category: '보안기능', message: '새로운 환경에서 로그인 되었습니다.' }
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds
    return () => clearInterval(interval);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const toggleMessageForm = () => {
    setShowMessageForm(!showMessageForm);
  };

  const handleClickOutside = (event) => {
    if (showNotifications && !event.target.closest('.notifications-container') && !event.target.closest('.fa-bell')) {
      setShowNotifications(false);
    }
    if (showMessageForm && !event.target.closest('.message-form-container') && !event.target.closest('.fa-paper-plane')) {
      setShowMessageForm(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showNotifications, showMessageForm]);

  return (
    <div className="welcome" style={{ backgroundColor: themeColor }}>
            <div className="mainContent">
        <div className="slideShow">
          <img src={images[currentIndex]} alt={`Slide ${currentIndex}`} className="slideImage" />
          <button className="prevButton" onClick={goToPrevious}>&lt;</button>
          <button className="nextButton" onClick={goToNext}>&gt;</button>
        </div>
      </div>
      {showNotifications && (
        <div className="notificationsContainer">
          <div className="notificationsHeader">
            <span>알림</span>
          </div>
          <div className="notificationsBody">
            <div className="notificationsTab">
              <span className="active">전체</span>
              <span>문의내역</span>
            </div>
            <div className="notificationsList">
              {notifications.map(notification => (
                <div key={notification.id} className="notificationItem">
                  <span className="notificationCategory">{notification.category}</span>
                  <span className="notificationDate">{notification.date}</span>
                  <span className="notificationMessage">{notification.message}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {showMessageForm && <MessageForm onClose={toggleMessageForm} />}
    </div>
  );
};

export default Welcome;
