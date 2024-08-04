// src/Login.jsx
import React from 'react';
import './Login.css';
import { Link } from 'react-router-dom';

function Login() {
  const handleGoogleLogin = () => {
    window.location.href = "https://accounts.google.com/signin"; // 구글 로그인 페이지 URL
  };

  const handleKakaoLogin = () => {
    window.location.href = "https://accounts.kakao.com/login"; // 카카오 로그인 페이지 URL
  };

  return (
    <div className="login">
      <div className="login_box">
        <div className="left">
          <div className="top_link">
            <a href="/">
              <img src="https://i.imgur.com/0G2U2u9.png" alt="back" />
              Return home
            </a>
          </div>
          <div className="contact">
            <form>
              <input type="email" placeholder="Email" />
              <input type="password" placeholder="Password" />
              <button type="button" className="Google" onClick={handleGoogleLogin}>Google로 로그인</button>
              <button type="button" className="Kakao" onClick={handleKakaoLogin}>카카오로 로그인</button>
              <button className="submit">로그인</button>
              <Link to="/signup" className="signupButton">회원가입</Link>
            </form>
          </div>
        </div>
        <div className="right">
          <div className="right-text">
            <h2>WELCOME BACK</h2>
            <h5>We are happy to see you again</h5>
          </div>
          <div className="right-inductor"></div>
        </div>
      </div>
    </div>
  );
}

export default Login;
