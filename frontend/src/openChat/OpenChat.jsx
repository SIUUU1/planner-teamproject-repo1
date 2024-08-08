import React, { useEffect, useState } from 'react';
import './OpenChat.css';

const OpenChat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = new WebSocket('ws://192.168.20.5:8080/chat');

    newSocket.onopen = () => {
      console.log('WebSocket connection established');
      setSocket(newSocket);
    };

    newSocket.onmessage = (event) => {
      const newMessage = event.data;
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    newSocket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    newSocket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      if (newSocket.readyState === WebSocket.OPEN) {
        newSocket.close();
      }
    };
  }, []);

  const sendMessage = () => {
    if (message.trim() && socket && socket.readyState === WebSocket.OPEN) {
      socket.send(message);
      setMessage('');
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-window">
        {messages.map((msg, index) => (
          <div key={index} className="chat-message">
            {msg}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' ? sendMessage() : null}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default OpenChat;