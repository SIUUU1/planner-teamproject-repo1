import React, { useState, useEffect } from 'react';
import './MenuBar.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faPaintRoller, faUserGroup, faBell, faChartSimple, faCircleInfo, faLock,faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import useLoading from "../util/useLoading";

const MenuBar = ({ isOpen, onClose }) => {
  const { data: userData, loading: loadingUser, error: errorUser, refetch: refetchUserData } = useLoading('http://localhost:8080/api/user/userInfo', 'json');
   //이미지
   const [selectedImage, setSelectedImage] = useState('/images/cat1.jpg');
   useEffect(() => {
    if (userData) {
      let src='';
      if(userData.image_url){
        src=`http://localhost:8080/static/images/profile/${userData.image_url}`;
        setSelectedImage(src || '/images/cat1.jpg');
      }
    }
  }, [userData]);

  const onMove = (path) => {
    location.href=path;
    onClose();
  };
  
  const onLogout = ()=>{
    fetch('http://localhost:8080/logout', {
      method: 'POST',
      credentials: 'include',
    })
    .then(res => {
      console.log(res);
      alert('로그아웃 성공');
      location.href='/welcome';
    })
    .catch(error => {
      console.log(error);
      alert('로그아웃 성공');
      location.href='/welcome';
    });
  }

  return (
    <div className={`menuBar ${isOpen ? 'open' : ''}`}>
      <div className="menuHeader">
        <span className="menuTitle">마이페이지</span>
        <button className="closeButton" onClick={onClose}>×</button>
      </div>
      <div className="profile">
        <img src={selectedImage} className="avatar" />
        <span>{userData ? `${userData.user_nickname} 님`
        : (<sapn onClick={()=>onMove('/loginForm')}>로그인</sapn>)}</span>
      </div>
      <div className="menuContent">
        <div className="menuItem">
          <button className="menuItemLink" onClick={() => onMove('/profile')}>
            <FontAwesomeIcon icon={faUser} /> <span>내 정보</span>
          </button>
        </div>
        <div className="menuItem">
          <button className="menuItemLink active" onClick={() => userData.role==='ROLE_PRO'?onMove('/themechange'):onMove('/payForm')}>
          <FontAwesomeIcon icon={faPaintRoller} /> <span>테마변경</span>
          </button>
        </div>
        <div className="menuItem">
          <button className="menuItemLink" onClick={() => onMove('/friends')}>
            <FontAwesomeIcon icon={faUserGroup} /> <span>친구목록</span>
          </button>
        </div>
        <div className="menuItem">
          <button className="menuItemLink" onClick={() => onMove('/msglist')}>
            <FontAwesomeIcon icon={faPaperPlane} /> <span>쪽지함</span>
          </button>
        </div>
        <div className="menuItem">
          <button className="menuItemLink" onClick={() => onMove('/notificationlist')}>
            <FontAwesomeIcon icon={faBell} /> <span>알림</span>
          </button>
        </div>
        <div className="menuItem">
          <button className="menuItemLink" onClick={() => onMove('/attainmentMain')}>
            <FontAwesomeIcon icon={faChartSimple} /> <span>학습통계</span>
          </button>
        </div>
        <div className="menuItem">
          <button className="menuItemLink" onClick={() => onMove('/qna/create/0')}>
            <FontAwesomeIcon icon={faCircleInfo} /> <span>고객센터</span>
          </button>
        </div>
      </div>
      <div className="footer">
        {userData &&
          <button className="menuItemLink" onClick={onLogout}>
            <FontAwesomeIcon icon={faLock} /> <span>로그아웃</span>
          </button>
        }
      </div>
    </div>
  );
};

export default MenuBar;
