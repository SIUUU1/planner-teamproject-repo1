import React, { useState } from 'react';
import './Auth.css';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: '',
    gender: '',
    birthday: ''
  });

  const handleInputChange = (e, setData) => {
    const { name, value } = e.target;
    setData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log('Login Data:', loginData);
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    console.log('Signup Data:', signupData);
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="auth">
      <div className="container">
        <div className="fullHeight">
          <div className="textCenter">
            <div className="section textCenter">
              <h6>
                <span className={isLogin ? 'active' : ''} onClick={() => setIsLogin(true)}>Log In</span>
                <span className={!isLogin ? 'active' : ''} onClick={() => setIsLogin(false)}>Sign Up</span>
              </h6>
              <input
                className="checkbox"
                type="checkbox"
                id="regLog"
                name="regLog"
                checked={!isLogin}
                onChange={toggleAuthMode}
              />
              <label htmlFor="regLog"></label>
              <div className="card3dWrap">
                <div className="card3dWrapper">
                  {isLogin ? (
                    <div className="cardFront">
                      <div className="centerWrap">
                        <div className="section textCenter">
                          <h4 className="log">로그인</h4>
                          <form onSubmit={handleLoginSubmit}>
                            <div className="formGroup">
                              <i className="inputIcon"></i>
                              <input
                                type="email"
                                name="email"
                                className="formStyle"
                                placeholder="이메일주소"
                                value={loginData.email}
                                onChange={(e) => handleInputChange(e, setLoginData)}
                                autoComplete="off"
                              />
                            </div>
                            <div className="formGroup">
                              <i className="inputIcon"></i>
                              <input
                                type="password"
                                name="password"
                                className="formStyle"
                                placeholder="비밀번호"
                                value={loginData.password}
                                onChange={(e) => handleInputChange(e, setLoginData)}
                                autoComplete="off"
                              />
                            </div>
                            <button type="submit" className="btn">Submit</button>
                          </form>
                          <p className="textCenter">
                            <a href="#0" className="link">Forgot your password?</a>
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="cardBack">
                      <div className="centerWrap">
                        <div className="section textCenter">
                          <h4 className="sign">회원가입</h4>
                          <form onSubmit={handleSignupSubmit}>
                            <div className="formGroup">
                              <i className="inputIcon uil uilUser"></i>
                              <input
                                type="text"
                                name="name"
                                className="formStyle"
                                placeholder="이름"
                                value={signupData.name}
                                onChange={(e) => handleInputChange(e, setSignupData)}
                                autoComplete="off"
                              />
                            </div>
                            <div className="formGroup">
                              <i className="inputIcon"></i>
                              <input
                                type="email"
                                name="email"
                                className="formStyle"
                                placeholder="이메일 주소"
                                value={signupData.email}
                                onChange={(e) => handleInputChange(e, setSignupData)}
                                autoComplete="off"
                              />
                            </div>
                            <div className="formGroup">
                              <i className="inputIcon"></i>
                              <input
                                type="password"
                                name="password"
                                className="formStyle"
                                placeholder="비밀번호"
                                value={signupData.password}
                                onChange={(e) => handleInputChange(e, setSignupData)}
                                autoComplete="off"
                              />
                            </div>
                            <div className="formGroup">
                              <i className="inputIcon"></i>
                              <input
                                type="date"
                                name="birthday"
                                className="formStyle"
                                value={signupData.birthday}
                                onChange={(e) => handleInputChange(e, setSignupData)}
                                autoComplete="off"
                              />
                            </div>
                            <div className="formGroup">
                              <i className="inputIcon"></i>
                              <select
                                name="gender"
                                className="formStyle"
                                value={signupData.gender}
                                onChange={(e) => handleInputChange(e, setSignupData)}
                              >
                                <option value="남">남</option>
                                <option value="여">여</option>
                              </select>
                            </div>
                            <button type="submit" className="btn">가입하기</button>
                          </form>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
