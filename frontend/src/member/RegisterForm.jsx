// src/SignUp.jsx
import React, {useRef,useState, useEffect} from 'react';
// import './SignUp.css';

function RegisterForm() {
  const initUserState = {
    user_id: '',
    user_name: '',
    image_url:'',
    user_email:'',
    user_tel: '',
    user_nickname: '',
    user_gender: '', // 기본값 설정
    user_birthday: '',
    password:'',
  };

  const [user, setUser] = useState(initUserState);
  const [message, setMessage] = useState('');


  useEffect(() => {
    fetch('http://localhost:8080/api/auth/joinform', { credentials: 'include' })
      .then(response => response.json())
      .then(data => {
        // user_birthday를 YYYY-MM-DD 형식으로 변환
        const formattedBirthday = formatDateString(data.user_birthday);
        setUser({ ...user, ...data, user_birthday: formattedBirthday });
      })
      .catch(error => console.error('Error:', error));
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    fetch('http://localhost:8080/api/auth/joinProc', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(response => response.text())
    .then(data => {
      console.log(data);
       // 입력 필드 초기화
       setUser(initialUserState);
      window.location.href = '/'; // 회원가입 완료 후 대시보드로 이동
    })
    .catch(error => console.error('Error:', error));
  };

  // ID 중복 체크 함수
  const checkId = () => {
    fetch('http://localhost:8080//api/auth/checkId', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ user_id: user.user_id })
    })
    .then(response => response.text())
    .then(data => {
      setMessage(data);
      alert(data);
      if (data === '이미 존재하는 아이디입니다.') {
        setUser({ ...user, user_id: '' }); // 입력 필드 비우기
      }
    })
    .catch(error => console.error('Error:', error));
  };

// Date 객체를 'YYYY-MM-DD' 형식의 문자열로 변환하는 함수
const formatDateString = (date) => {
  if (!date) return '';
  const d = new Date(date);
  const month = ('0' + (d.getMonth() + 1)).slice(-2);
  const day = ('0' + d.getDate()).slice(-2);
  return `${d.getFullYear()}-${month}-${day}`;
};

  return (
    
    <div className="signUp">
      <div className="signUpBox">
        <div className="left">
          <div className="top_link">
            <a href="/">
              <img src="https://i.imgur.com/0G2U2u9.png" alt="back" />
              Return home
            </a>
          </div>
          <div className="contact">
            {/* <form action="http://localhost:8080/api/joinProc" method="POST"> */}
              <input type="text" name="user_id" value={user.user_id} onChange={handleChange} placeholder="Id" />
              <button type="button" className="emailCheckBtn" onClick={checkId}>Check Email</button>
              <input type="password" name="password" value={user.password} onChange={handleChange} placeholder="Password" />
              <input type="text" name="user_name" value={user.user_name} onChange={handleChange} placeholder="Name" />
              <input type="file" name="image_url" value={user.image_url} onChange={handleChange} placeholder="Profile Image" />
              <input type="email"name="user_email" value={user.user_email} onChange={handleChange}  placeholder="Recovery Email" />
              <select name="user_gender" value={user.user_gender} onChange={handleChange}>
                <option value="M" selected>Male</option>
                <option value="F">Female</option>
              </select>
              <input type="tel" name="user_tel" value={user.user_tel} onChange={handleChange} placeholder="Phone Number" />
              <input type="date"name="user_birthday" value={user.user_birthday} onChange={handleChange} placeholder="Birthdate" />
              <input type="text" name="user_nickname" value={user.user_nickname} onChange={handleChange} placeholder="Nickname" />
              <button className="submit" type="button" onClick={handleSubmit}>가입하기</button>
            {/* </form> */}
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

export default RegisterForm;
