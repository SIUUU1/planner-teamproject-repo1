import React, { useState } from 'react';
import './NotificationList.css';

const NotificationList = ({ isOpen, onClose }) => {
  const [recipient, setRecipient] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // 쪽지 전송 로직 추가
    console.log(`쪽지 전송: ${recipient}, 내용: ${message}`);
    onClose(); // 폼 닫기
  };

  return (
    <div className={`notificationList ${isOpen ? 'open' : ''}`}>
      <div className="notiListHeader">
        <span>알림</span>
        <button onClick={onClose}>닫기</button>
      </div>
      <form onSubmit={handleSubmit} className="notiListBody">
        <label>
          받는 사람:
          <input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            required
          />
        </label>
        <label>
          메시지:
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </label>
        <button type="submit">보내기</button>
      </form>
    </div>
  );
};

export default NotificationList;