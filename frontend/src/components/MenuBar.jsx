import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import './MenuBar.css';

const MenuBar = ({ isOpen, onClose }) => {
  const [isEditingAvatar, setIsEditingAvatar] = useState(false);

  const handleAvatarEdit = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Here you can handle the file upload logic, like sending it to the server or displaying it
      console.log('Selected file:', file);
    }
  };

  return (
    <div className={`menuBar ${isOpen ? 'open' : ''}`}>
      <div className="menuHeader">
        <span className="menuTitle">마이페이지</span>
        <button className="closeButton" onClick={onClose}>×</button>
      </div>
      <div className="menuContent">
        <div className="profile">
          <div 
            className="avatarWrapper"
            onMouseEnter={() => setIsEditingAvatar(true)}
            onMouseLeave={() => setIsEditingAvatar(false)}
          >
             <img src="/images/creed.png" alt="Profile" className="avatar" />
            {isEditingAvatar && (
              <>
                <label htmlFor="avatarUpload" className="editIcon">
                  <FontAwesomeIcon icon={faPencilAlt} />
                </label>
                <input 
                  type="file" 
                  id="avatarUpload" 
                  style={{ display: 'none' }} 
                  onChange={handleAvatarEdit}
                />
              </>
            )}
          </div>
          <span>Marcus.Lim 님</span>
          <span>환영합니다! :)</span>
        </div>
        <div className="menuItem">
          <Link to="/profile" className="menuItemLink" onClick={onClose}><b>내 정보</b></Link>
        </div>
        <div className="menuItem">
          <Link to="/themeChange" className="menuItemLink" onClick={onClose}><b>테마변경</b></Link>
        </div>
        <div className="menuItem">
          <Link to="/friends" className="menuItemLink" onClick={onClose}><b>친구목록</b></Link>
        </div>
        <div className="menuItem"><span><b>알림설정</b></span></div>
        <div className="menuItem"><span><b>학습통계</b></span></div>
        <div className="menuItem">
          <Link to="/qnaCustomerSupport" className="menuItemLink" onClick={onClose}><b>고객센터</b></Link>
        </div>
        <div className="menuItem"><span><b>로그아웃</b></span></div>
      </div>
    </div>
  );
};

export default MenuBar;
