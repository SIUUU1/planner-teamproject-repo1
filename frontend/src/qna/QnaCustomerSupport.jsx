// src/pages/QnaCustomerSupport.jsx
import React, { useState, useEffect } from 'react';
import './QnaCustomerSupport.css';
import NoticeBoard from './NoticeBoard';
import useSendPost from '../util/useSendPost';
import useLoading from '../util/useLoading';
import QnaVocie from '../components/QnaVoice';
import Faq from '../components/Faq';
import MyQnaList from '../components/MyQnaList';
import { useParams } from 'react-router-dom';
const QnaCustomerSupport = () => {
  const { mode, qna_id } = useParams();
  
  // 메뉴 선택
  const [selectedTab, setSelectedTab] = useState(null);
  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
  };

  // 수정 예정 문의내역 정보
  // 수정 예정 문의내역 정보
  const qnaDataUrl = mode === 'edit' ? `http://localhost:8080/api/qna/read/${qna_id}` : null;
  const { data: qnaData, loading: loadingQnaData, error: errorQnaData } = useLoading(qnaDataUrl, 'json');

  // Faq
  const { data: faqListData, loading: loadingFaqList, error: errorFaqList } = useLoading('http://localhost:8080/api/faq/list', 'json');
  
  // 사용자 QnaList
  const [qnaList, setQnaList] = useState([]);
  const { data: qnaListData, loading: loadingQnaList, error: errorQnaList } = useLoading('http://localhost:8080/api/user/qna/list', 'json');
  
  useEffect(() => {
    // if(mode==='list'){
    //   setSelectedTab('myqna');
    // }
    if(mode==='edit'){
      setSelectedTab('voice');
    }
    if (qnaListData) {
      setQnaList(qnaListData);
    }
  }, [qnaListData,mode, qna_id]);

//   if (loadingQnaList) {
//     return <div>Loading...</div>;
// }

// if (errorQnaList) {
//     return <div>Error: {errorQnaList.message}</div>;
// }
  return (
    <div className="qnaCustomerSupport">
      <h1 className="mainTitle">고객센터</h1>
      <h2 className="subTitle">
        <span className="subTitleItem" onClick={() => setSelectedTab('notice')}>공지사항</span> | 
        <span className="subTitleItem" onClick={() => setSelectedTab('faq')}>자주 묻는 질문</span> | 
        <span className="subTitleItem" onClick={() => setSelectedTab('voice')}>고객의 소리</span> |
        <span className="subTitleItem" onClick={() => setSelectedTab('myqna')}>내 문의내역</span>
      </h2>
      <div className="contentBox">
        <p>
          고객의 소중한 의견에 귀 기울이겠습니다.
        </p>
        <p>...</p>
        <p>...</p>
        <p>...</p>
        <p>
          위플랜에 보내주신 관심은 더욱 좋은 서비스로 보답하겠습니다.
        </p>
      </div>
      {selectedTab === 'notice' && <NoticeBoard />}
      {selectedTab === 'faq' && <Faq faqs={faqListData || []} />}
      {selectedTab === 'voice' && <QnaVocie mode={mode} qnaData={qnaData || null}/>}
      {selectedTab === 'myqna' && <MyQnaList qnas={qnaListData || []}/>}
    </div>
  );
};

export default QnaCustomerSupport;
