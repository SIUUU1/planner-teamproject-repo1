import React, { useState , useEffect} from 'react';
import './SignUp.css';
import useLoading from '../util/useLoading';
import useMove from '../util/useMove';

function SignUp() {
  const initUserState = {
    user_id: '',
    user_name: '',
    image_url:'',
    user_email:'',
    user_tel: '',
    user_nickname: '',
    user_gender: '',
    user_birthday: '',
    password:'',
  };

  const [user, setUser] = useState(initUserState);
  const [message, setMessage] = useState('');
  const [isCheckId, setIsCheckId] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [maxDate, setMaxDate] = useState('');
 
 
  const onMove = useMove('/loginform');

  const { data: UserData, loading: loadingUser, error: errorUser } = useLoading('http://localhost:8080/api/auth/joinform', 'json');
  
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setMaxDate(today);
    if (UserData) {
        const formattedBirthday = formatDateString(UserData.user_birthday);
        setUser({ ...UserData, user_birthday: formattedBirthday });
        setIsCheckId(true);
        setIsUser(true);  //아이디 비밀번호 아이디 중복체크, display none
    }
  }, [UserData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'image_url') {
      setUser({ ...user, [name]: e.target.files[0] });
    } else {
      setUser({ ...user, [name]: value });
    }
  };

  //등록 함수
  const register = () => {
      // 서버로 보내기 전 내용 점검

      //아이디 중복
     if(isCheckId===false){
      alert(`아이디 중복 체크하세요.`);
      return;
    }
    //패스워드 
    const userPwPettern = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^*+=-]).{6,20}$/;
    const passwdValue=user.password;
    if (passwdValue === "") {
      alert(`패스워드를 입력하세요.`);
      return;
    } else if (!passwdValue.match(userPwPettern)) {
      alert(`패스워드 6~16자 영문자와 숫자,특수기호를 조합해 입력하세요.`);
      return;
    }
    if(user.user_gender === ''){
      alert('성별을 선택하세요.');
      return;
    }
    //이메일
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const emailValue = user.user_email;
    if(emailValue===''){
      alert(`이메일을 입력하세요.`);
      return;
    }  else if (!emailValue.match(emailPattern)) {
      alert(`hong@gmail.com 형식으로 입력하세요.`);
      return;
    }
    //이름
    const namePattern = /^[가-힣]{2,4}$/;
    const nameValue=user.user_name;
      if (nameValue === "") {
        alert(`이름을 입력하세요.`);
        return;
      } else if (!nameValue.match(namePattern)) {
        alert(`이름 2~4자 이내 한글만 입력하세요.`);
        return;
      }
      //닉네임
    if (user.user_nickname === "") {
      alert(`닉네임을 입력하세요.`);
      return;
    }
    //핸드폰 번호
    const telPattern = /^(01[016789]{1})-?[0-9]{3,4}-?[0-9]{4}$/;
    const telValue = user.user_tel;
    if (telValue === "") {
      alert(`핸드폰 번호를 입력하세요.`);
      return;
    } else if (!telValue.match(telPattern)) {
      alert(`010-1111-1111 형식으로 입력하세요.`);
      return;
    }
    //생년월일 
    if(user.user_birthday==''){
      alert(`생년월일을 입력하세요.`);
      return;
    }

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
       setUser(initUserState);
       onMove(); // 회원가입 완료 후 로그인폼으로 이동
    })
    .catch(error => console.error('Error:', error));
  };

  // ID 중복 체크 함수
  const checkId = () => {
    //아이디 체크
    const idPattern = /^[a-zA-Z0-9]{4,20}$/;
    const idValue = user.user_id;
    if (idValue === "") {
      alert(`아이디를 입력하세요.`);
      return;
    } else if (!idValue.match(idPattern)) {
      alert(`아이디 4~20자 이내 알파벳와 숫자만 입력하세요.`);
      return;
    }

    fetch(`http://localhost:8080/api/auth/checkId/${user.user_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => 
      response.text()
      )
    .then(data => {
      console.log(data);
      console.log("중복아이디 체크");
      setMessage(data);
      setIsCheckId(true);
      alert(data);
      if (data === '이미 존재하는 아이디입니다.') {
        setUser({ ...user, user_id: '' });
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

  if (loadingUser) {
    return <div>Loading...</div>;
  }
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
              {!isUser && (
                <>
                <input type="text" name="user_id" value={user.user_id} onChange={handleChange} placeholder="Id" />
                <button type="button" className="idCheckBtn" onClick={checkId}>아이디 중복체크</button>
                <input type="password" name="password" value={user.password} onChange={handleChange} placeholder="비밀번호 (문자, 숫자, 특수문자 포함 6~20자)" />
                </> )
              }
              {/* <input type="file"  name="image_url" value={user.image_url} onChange={handleChange} placeholder="프로필 사진" /> 기본이미지*/}
              <input type="text" name="user_email" value={user.user_email} onChange={handleChange} placeholder="복구 이메일" />
              <select name="user_gender" value={user.user_gender} onChange={handleChange}>
                <option value="">성별 선택</option>
                <option value="M">남자</option>
                <option value="F">여자</option>
              </select>
              <input type="tel" name="user_tel" value={user.user_tel} onChange={handleChange} placeholder="핸드폰 번호" />
              <input type="text"  name="user_name" value={user.user_name} onChange={handleChange} placeholder="이름" />
              <input type="date" name="user_birthday" value={user.user_birthday} onChange={handleChange} placeholder="생년월일" max={maxDate}/>
              <input type="text" name="user_nickname" value={user.user_nickname} onChange={handleChange} placeholder="닉네임" />
              <button className="submit" type="button" onClick={register}>가입하기</button>
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
