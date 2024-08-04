// src/Login.jsx
import React, {useRef} from 'react';
import PaymentRegForm from '../payment/PaymentRegForm';
// import './Login.css';

function LoginForm() {
  const user_id = useRef();
  const password = useRef();

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
      window.location.href = '/'; // 로그인 성공 후 대시보드로 이동
    })
    .catch(error => {
      console.log(error);
    });
  };

  return (
    <div className="login">
      <div className="loginBox">
        <div className="left">
          <div className="top_link">
            <a href="/">
              <img src="https://i.imgur.com/0G2U2u9.png" alt="back" />
              Return home
            </a>
          </div>
          <div className="contact">
            {/* <form> */}

              <input type="text" ref={user_id} placeholder="Id" />
              <input type="password"  ref={password} placeholder="Password" />
              <button type="button" className="Google" onClick={()=>{
                location.href="http://localhost:8080/oauth2/authorization/google"
              }}>Google로 로그인</button>
              <button type="button" className="Kakao" onClick={()=>{
                location.href="http://localhost:8080/oauth2/authorization/kakao"
              }}>카카오로 로그인</button>
              <button type="button" className="Kakao" onClick={()=>{
                location.href="http://localhost:8080/oauth2/authorization/naver"
              }}>네이버로 로그인</button>
              <button className="submit"  type="button" onClick={login}>로그인</button>
            {/* </form> */}
            <a href="/joinForm">회원가입을 아직 하지 않으셨나요?</a>
            <PaymentRegForm/>
          </div>
        </div>
        <div className="right">
          <div className="rightText">
            <h2>WELCOME BACK</h2>
            <h5>We are happy to see you again</h5>
          </div>
          <div className="rightInductor"></div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
 