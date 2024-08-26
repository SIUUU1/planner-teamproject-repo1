import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faChartSimple,faUserGear,faUserGroup,faComments } from "@fortawesome/free-solid-svg-icons";
import Button from '../components/Button';
import useMove from "../util/useMove";
import { useState } from "react";
const ManagerMenuInfo=()=>{
  const [url,setUrl]=useState(null);
  const moveCustomerService = useMove('/manager/customer-service');
  const moveChart = useMove('/manager/chart');
  const moveUser = useMove('/manager/User');
  const moveGroup = useMove('/manager/Group');
  const moveChat = useMove('/manager/Chat');
  return(
    <div className='managerMenuInfo'>
          <div className='managerMenuBtn'>
            <Button text={<FontAwesomeIcon icon={faPenToSquare} />} className={'MenuBtn'} onClick={moveCustomerService}></Button>
            <span>고객센터</span>
          </div>
          <div className='managerMenuBtn'>
            <Button text={<FontAwesomeIcon icon={faChartSimple} />} className={'MenuBtn'} onClick={moveChart}></Button>
            <span>통계</span>
          </div>
          <div className='managerMenuBtn'>
            <Button text={<FontAwesomeIcon icon={faUserGear} />} className={'MenuBtn'} onClick={moveUser}></Button>
            <span>유저 관리</span>
          </div>
          <div className='managerMenuBtn'>
            <Button text={<FontAwesomeIcon icon={faUserGroup} />} className={'MenuBtn'} onClick={moveGroup}></Button>
            <span>스터디 그룹 관리</span>
          </div>
          <div className='managerMenuBtn'>
            <Button text={<FontAwesomeIcon icon={faComments} />} className={'MenuBtn'} onClick={moveChat}></Button>
            <span>채팅방 관리</span>
          </div>
        </div>
  )
}

export default ManagerMenuInfo;