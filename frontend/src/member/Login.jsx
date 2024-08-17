// src/Login.jsx
import React,{useRef} from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import useMove from '../util/useMove';

function Login() {
  const user_id = useRef();
  const password = useRef();
  const onMove = useMove('/');

  const login = ()=>{
    const data = {
      user_id : user_id.current.value,
      password: password.current.value,
    };
    fetch('http://localhost:8080/login', {
      method: 'post',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    }).then(response => response.json())
    .then(res => {
      console.log(res);
      alert('로그인 성공');
      onMove(); // 로그인 성공 후 유저홈으로 이동
    })
    .catch(error => {
      console.log(error);
      alert('로그인 실패');
    });
  };

  

  return (
    <div className="login">
      <div className="loginBox">
        <div className="left">
          {/* <div className="topLink">
            <a href="/">
              <img src="https://i.imgur.com/0G2U2u9.png" alt="back" className='backImg'/>
              Return home
            </a>
          </div> */}
          <div className="contact">
            <form>
              <input type="text" ref={user_id} placeholder="Id" />
              <input type="password" ref={password} placeholder="Password" />
              <button className="submit" type="button" onClick={login}>로그인</button>
              <button className="submit" type="button" onClick={login}>아이디 / 패스워드 찾기</button>
              <Link to="/joinForm" className="signupButton">회원가입</Link>
            </form>
            <div className='snsLogin'>
                <div onClick={()=>{
                location.href="http://localhost:8080/oauth2/authorization/kakao"
              }}><img src="/images/kakao_login.png"/></div>
                <div onClick={()=>{
                location.href="http://localhost:8080/oauth2/authorization/naver"
              }}><img src="/images/naver_login.png"/></div>
                <div className='google' onClick={()=>{
                location.href="http://localhost:8080/oauth2/authorization/google"
              }}><img src="/images/google_login.jpg"/> </div>
              </div>
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
