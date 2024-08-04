import React, { useState } from 'react';
import './MessageForm.css';

const MessageForm = ({ onClose }) => {
  const [recipient, setRecipient] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // 쪽지 전송 로직 추가
    console.log(`쪽지 전송: ${recipient}, 내용: ${message}`);
    onClose(); // 폼 닫기
  };

  return (
    <div className="messageForm">
      <div className="messageFormHeader">
        <span>쪽지 보내기</span>
        <button onClick={onClose}>닫기</button>
      </div>
      <form onSubmit={handleSubmit} className="messageFormBody">
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

export default MessageForm;
