import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faChartSimple, faUserGear, faUserGroup, faComments } from "@fortawesome/free-solid-svg-icons";
import Button from '../components/Button';
import useMove from "../util/useMove";
import { useState, useEffect } from "react";

const ManagerMenuInfo = () => {
  const [activeButton, setActiveButton] = useState('');

  const moveCustomerService = useMove('/manager/customer-service/notice');
  const moveChart = useMove('/manager/chart');
  const moveUser = useMove('/manager/User');
  const moveGroup = useMove('/manager/Group');
  const moveChat = useMove('/manager/Chat');

  useEffect(() => {
    console.log('Active Button:', activeButton);
  }, [activeButton]);

  const handleButtonClick = (buttonName, moveFunction) => {
    console.log('Button Clicked:', buttonName); // 클릭 시 로그 확인
    setActiveButton(buttonName);
    moveFunction();
  };

  return (
    <div className='managerMenuInfo'>
      <div className='managerMenuBtn'>
        <Button 
          text={<FontAwesomeIcon icon={faPenToSquare} />} 
          className={'MenuBtn'} 
          onClick={() => handleButtonClick('customerService', moveCustomerService)}
          textColor={activeButton === 'customerService' ? 'skyblue' : 'black'}
        />
        <span>고객센터</span>
      </div>
      <div className='managerMenuBtn'>
        <Button 
          text={<FontAwesomeIcon icon={faChartSimple} />} 
          className={'MenuBtn'} 
          onClick={() => handleButtonClick('chart', moveChart)}
          textColor={activeButton === 'chart' ? 'skyblue' : 'black'}
        />
        <span>통계</span>
      </div>
      <div className='managerMenuBtn'>
        <Button 
          text={<FontAwesomeIcon icon={faUserGear} />} 
          className={'MenuBtn'} 
          onClick={() => handleButtonClick('user', moveUser)}
          textColor={activeButton === 'user' ? 'skyblue' : 'black'}
        />
        <span>유저 관리</span>
      </div>
      <div className='managerMenuBtn'>
        <Button 
          text={<FontAwesomeIcon icon={faUserGroup} />} 
          className={'MenuBtn'} 
          onClick={() => handleButtonClick('group', moveGroup)}
          textColor={activeButton === 'group' ? 'skyblue' : 'black'}
        />
        <span>스터디 그룹 관리</span>
      </div>
      <div className='managerMenuBtn'>
        <Button 
          text={<FontAwesomeIcon icon={faComments} />} 
          className={'MenuBtn'} 
          onClick={() => handleButtonClick('chat', moveChat)}
          textColor={activeButton === 'chat' ? 'skyblue' : 'black'}
        />
        <span>채팅방 관리</span>
      </div>
    </div>
  );
}

export default ManagerMenuInfo;
