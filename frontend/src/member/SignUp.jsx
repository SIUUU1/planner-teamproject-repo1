import React, { useState } from 'react';
import './SignUp.css';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleEmailChange = (e) => setEmail(e.target.value);
  
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    // Validate password strength
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,20}$/.test(newPassword)) {
      setPasswordError('비밀번호는 문자, 숫자, 특수문자를 포함한 6~20자여야 합니다');
    } else {
      setPasswordError('');
    }
  };

  return (
    <div className="signUp">
      <div className="signUpBox">
        <div className="left">
          <div className="topLink">
            <a href="/">
              <img src="https://i.imgur.com/0G2U2u9.png" alt="back" />
              Return home
            </a>
          </div>
          <div className="contact">
            <form>
              <div className="inputGroup">
                <input type="email" placeholder="이메일" value={email} onChange={handleEmailChange} />
                <button type="button" className="emailCheckBtn">이메일 확인</button>
              </div>
              <div className="inputGroup">
                <input type="password" placeholder="비밀번호 (문자, 숫자, 특수문자 포함 6~20자)" value={password} onChange={handlePasswordChange} />
                {passwordError && <div className="passwordError">{passwordError}</div>}
              </div>
              <input type="file" placeholder="Profile Image" />
              <input type="email" placeholder="복구 이메일" />
              <select>
                <option value="">성별 선택</option>
                <option value="male">남자</option>
                <option value="female">여자</option>
              </select>
              <input type="tel" placeholder="핸드폰 번호" />
              <input type="text" placeholder="이름" />
              <input type="date" placeholder="생년월일" />
              <input type="text" placeholder="닉네임" />
              <button className="submit">가입하기</button>
            </form>
          </div>
        </div>
        <div className="right">
          <div className="rightText">
            <h2>환영합니다</h2>
            <h5>최고의 경험을 기대하세요</h5>
          </div>
          <div className="rightInductor"></div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
