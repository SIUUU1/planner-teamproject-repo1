// src/pages/QnaCustomerSupport.jsx
import React, { useState, useEffect } from 'react';
import './QnaCustomerSupport.css';
import NoticeBoard from './NoticeBoard';
import useSendPost from '../util/useSendPost';
import useLoading from '../util/useLoading';
import QnaVocie from './QnaVoice';
import Faq from './Faq';
import MyQnaList from './MyQnaList';
import { useParams } from 'react-router-dom';

const QnaCustomerSupport = () => {
  const { mode, qna_id } = useParams();
  
  // 메뉴 선택
  const [selectedTab, setSelectedTab] = useState(null);

  // FaqList
  const { data: faqListData, loading: loadingFaqList, error: errorFaqList } = useLoading('http://localhost:8080/api/faq/list', 'json');
  
  //  QnaList
  const [qnaList, setQnaList] = useState([]);
  const { data: qnaListData, loading: loadingQnaList, error: errorQnaList, refetch: refetchQnaList} = useLoading('http://localhost:8080/api/qna/list', 'json');
  
   // 사용자 정보
   const { data: userData, loading: loadingUser, error: errorUser } = useLoading('http://localhost:8080/api/user/userInfo', 'json');
  
  useEffect(() => {
    if(mode==='edit'){
      setSelectedTab('voice');
    }
    if(mode==='notice'){
      setSelectedTab('notice');
    }
    if(mode==='myqna'){
      setSelectedTab('myqna');
    }
    if (qnaListData) {
      setQnaList(qnaListData);
    }
  }, [qnaListData, mode]);

  const onEventHandler = ()=>{
    refetchQnaList();
  };

//   if (loadingQnaList) {
//     return <div>Loading...</div>;
// }

// if (errorQnaList) {
//     return <div>Error: {errorQnaList.message}</div>;
// }
  return (
    <div className="qnaCustomerSupport backWhite">
      <h1 className="mainTitle">고객센터</h1>
      <h2 className="subTitle">
        <span className="subTitleItem" onClick={() => setSelectedTab('notice')}>공지사항</span> | 
        <span className="subTitleItem" onClick={() => setSelectedTab('faq')}>자주 묻는 질문</span> | 
        <span className="subTitleItem" onClick={() => setSelectedTab('voice')}>고객의 소리</span> |
        <span className="subTitleItem" onClick={() => setSelectedTab('myqna')}>내 문의내역</span>
      </h2>
      <div className="contentBox">
        <p>고객의 소중한 의견에 귀 기울이겠습니다.</p>
        <p>위플랜에 보내주신 관심은 더욱 좋은 서비스로 보답하겠습니다.</p>
      </div>
      {selectedTab === 'notice' && <NoticeBoard userData={userData}/>}
      {selectedTab === 'faq' && <Faq faqs={faqListData || []} />}
      {selectedTab === 'voice' && <QnaVocie mode={mode} qna_id={qna_id} onEvent={onEventHandler} onChangeTab={setSelectedTab} userData={userData}/>}
      {selectedTab === 'myqna' && <MyQnaList user_id={userData.user_id} qnas={qnaListData || []} onChangeTab={setSelectedTab}/>}
    </div>
  );
};

export default QnaCustomerSupport;
