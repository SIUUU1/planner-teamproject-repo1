import React from 'react';
import './ManagerHome.css';
import ManagerMenuInfo from './ManagerMenuInfo';

const ManagerHome = () => {
  return (
    <div className='managerHome'>
      <div className='managerContent backWhite'>
        <ManagerMenuInfo></ManagerMenuInfo>
        <div className='managerHomeInfo'>
          <h1>WEPLAN 관리자님 환영합니다!</h1>
        </div>
      </div>
    </div>
  );
};

export default ManagerHome;
