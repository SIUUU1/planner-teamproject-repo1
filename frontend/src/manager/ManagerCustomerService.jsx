import ManagerMenuInfo from "./ManagerMenuInfo";
import './ManagerHome.css';
import React, { useState , useEffect} from 'react';
import ManagerQnaList from "./ManagerQnaList";
import ManagerNoticeBoard from "./ManagerNoticeBoard";
import ManagerFaq from "./ManagerFaq";

const ManagerCustomerService=()=>{
 
  // 메뉴 선택
  const [selectedTab, setSelectedTab] = useState(null);

  return(
    <div className="managerCustomerService">
      <div className="managerContent backWhite">
        <ManagerMenuInfo/>

        <div>
          <div className="subTitle" >
            <span className="subTitleItem" onClick={() => setSelectedTab('notice')}>공지사항</span> | 
            <span className="subTitleItem" onClick={() => setSelectedTab('faq')}>자주 묻는 질문</span> | 
            <span className="subTitleItem" onClick={() => setSelectedTab('voice')}>고객 문의 내역</span>
          </div>
          <div className="contentBox">
          <p>여러분의 헌신과 노력이 고객의 만족을 만듭니다. 함께 만들어가는 최고의 고객 경험!</p>
          <p>매 순간 최선을 다하는 여러분이 있어 고객에게 신뢰를 주고 있습니다. 여러분의 열정에 감사합니다!</p>
          </div>
          {selectedTab === 'notice' && <ManagerNoticeBoard onChangeTab={setSelectedTab}/>}
          {selectedTab === 'faq' && <ManagerFaq onChangeTab={setSelectedTab}/>}
          {selectedTab === 'voice' && <ManagerQnaList onChangeTab={setSelectedTab}/>}
        </div>

      </div>
    </div>
  );
};
export default ManagerCustomerService;