import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faBars, faUserGroup, faChartSimple, faRightFromBracket, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";
import React, { useState, useEffect } from 'react';
import MenuBar from './MenuBar';
import useMove from "../util/useMove";
import useLoading from "../util/useLoading";
import MessageForm from '../message/MessageForm';

const Header = () => {
  
  const {data: UserData, loading: loadingUser, error: errorUser } = useLoading('http://localhost:8080/api/user/userInfo', 'json');

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMessageForm, setShowMessageForm] = useState(false);
  // const [notifications] = useState([
  //   { id: 1, date: '7월 12일', category: '보안기능', message: '새로운 환경에서 로그인 되었습니다.' }
  // ]);

  const onMoveLoginform = useMove('/loginForm');
  const onLogout = ()=>{
    fetch('http://localhost:8080/logout', {
      method: 'POST',
      credentials: 'include', // 자격 증명을 포함
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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleMessageForm = () => {
    setShowMessageForm(!showMessageForm);
  };

  const handleClickOutside = (event) => {
    if (isMenuOpen && !event.target.closest('.menuBar') && !event.target.closest('.fa-bars')) {
      setIsMenuOpen(false);
    }
    if (showMessageForm && !event.target.closest('.messageForm') && !event.target.closest('.fa-paper-plane')) {
      setShowMessageForm(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen, showNotifications, showMessageForm]);
  
  return (
    <header className="header">
      <div className="headerContent">
        <div className="headerTitle"><a href="http://localhost:5173/">WePlAN</a></div>
        <div className="headerBottom">
          <div className="leftHeader">
            <div className='headerFirstChild'><Button text={<FontAwesomeIcon icon={faBars} />} onClick={toggleMenu} /></div>
            <div className="leftMiddleHeader">
              {/* 로그인 성공 시: 로그아웃 기능, 아니면 : 로그인 기능 */}
              <div className='headerSecondChild'><Button text={<FontAwesomeIcon icon={faRightFromBracket} />} onClick={UserData?(() => onLogout()):(() => onMoveLoginform())} /></div>
              <div className='headerThirdChild'><Button text={<FontAwesomeIcon icon={faUserGroup} onClick={()=>{location.href='/friends'}} />} /></div>
              <div className='headerForthChild'><Button text={<FontAwesomeIcon icon={faChartSimple} onClick={()=>{location.href='/userChart'}}/>} /></div>
            </div>
          </div>
          <div className='rightHeader'>
            <div className='headerFifthChild'><Button text={<FontAwesomeIcon icon={faPaperPlane} onClick={toggleMessageForm} />} /></div>
            <div className='headerSixthChild'><Button text={<FontAwesomeIcon icon={faBell} onClick={()=>{location.href='/notificationlist'}} />} /></div>
          </div>
        </div>
      </div>
      {isMenuOpen && <MenuBar isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />}
      {showMessageForm && <MessageForm isOpen={showMessageForm} onClose={()=>{setShowMessageForm(false)}}/>}
    </header>
  );
};

export default Header;
