// src/pages/QnaCustomerSupport.jsx
import React, { useState } from 'react';
import './QnaCustomerSupport.css';
import NoticeBoard from './NoticeBoard';

const QnaCustomerSupport = () => {
  const [selectedTab, setSelectedTab] = useState(null);
  const [selectedType, setSelectedType] = useState('불편/불만');

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
  };

  const faqs = [
    {
      question: '운영 시간이 어떻게 되나요?',
      answer: '독서실 08:00 - 02:00 / 위플랜 스터디카페 24시간\n일부 지점은 운영 시간이 다르기 때문에 이용 전 지점에 문의 바랍니다.'
    },
    {
      question: '이용 금액은 어떻게 되나요?',
      answer: '지역 및 지점 별로 다르기 때문에 지점에 문의 바랍니다.'
    },
    {
      question: '커피, 음료 등이 무료인가요?',
      answer: '지점 카페라운지에서 커피, 음료, 간단한 다과 등을 무료로 제공하고 있습니다.'
    },
    {
      question: '퇴실 시 퇴실처리를 해야하나요?',
      answer: '시간충전권의 경우, 퇴실 처리를 하지 않으면 시간이 차감됩니다. 퇴실 시 키오스크에서 퇴실처리 버튼을 필수로 눌러주세요.'
    },
    {
      question: '환불은 어떻게 하나요?',
      answer: '환불 규정에 따라 환불이 진행됩니다. 각 지점마다 환불규정이 다르기 때문에 지점에 문의 바랍니다.'
    },
    {
      question: '스터디카페 이용권으로 스터디룸을 이용할 수 있나요?',
      answer: '스터디카페 이용권과 스터디룸 이용권은 별개입니다. 스터디룸 이용권을 별도로 구매 후 이용해주세요.'
    },
    {
      question: '자리이동이 가능한가요?',
      answer: '플랜에이 스터디카페는 자유 좌석으로 운영되기 때문에 자리이동이 가능합니다. 자리 이동은 키오스크 or 모바일 어플에서 이용하는 좌석 선택 후 가능합니다.'
    },
    {
      question: '주차가 가능한가요?',
      answer: '지점마다 주차 가능여부가 상이하기 때문에 이용 전 지점에 카카오톡을 통해 문의 바랍니다.'
    }
  ];

  return (
    <div className="qnaCustomerSupport">
      <h1 className="mainTitle">고객센터</h1>
      <h2 className="subTitle">
        <span className="subTitleItem" onClick={() => setSelectedTab('notice')}>공지사항</span> | 
        <span className="subTitleItem" onClick={() => setSelectedTab('faq')}>자주 묻는 질문</span> | 
        <span className="subTitleItem" onClick={() => setSelectedTab('voice')}>고객의 소리</span>
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
      {selectedTab === 'faq' && (
        <div className="faqSection">
          {faqs.map((faq, index) => (
            <div key={index} className="faqItem">
              <div className="faqQuestion">
                Q. {faq.question}
              </div>
              <div className="faqAnswer">
                A. {faq.answer.split('\n').map((line, idx) => (
                  <p key={idx}>{line}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
      {selectedTab === 'voice' && (
        <form className="supportForm">
          <label className="formLabel title">
            <strong>접수하기</strong>
            <span className="subtitle">
              *센터 이용(이용권 구매 및 연장, 잔여시간, 스터디룸 이용, 지정 개별 이벤트 등)에 대한 내용은 이용하시는 센터의 카카오채널로 문의해주세요.
            </span>
          </label>
          <div className="formGroup">
            <label className="formLabel">상담유형</label>
            <div className="radioGroup">
              <label>
                <input 
                  type="radio" 
                  value="불편/불만" 
                  checked={selectedType === '불편/불만'} 
                  onChange={handleTypeChange} 
                />
                불편/불만
              </label>
              <label>
                <input 
                  type="radio" 
                  value="칭찬/격려" 
                  checked={selectedType === '칭찬/격려'} 
                  onChange={handleTypeChange} 
                />
                칭찬/격려
              </label>
              <label>
                <input 
                  type="radio" 
                  value="기타문의" 
                  checked={selectedType === '기타문의'} 
                  onChange={handleTypeChange} 
                />
                기타문의
              </label>
            </div>
          </div>
          <div className="formGroup">
            <label className="formLabel">이름</label>
            <input type="text" className="formInput" placeholder="*익명으로 문의 시 답변을 드릴 수 없습니다." />
          </div>
          <div className="formGroup">
            <label className="formLabel">전화번호</label>
            <input type="text" className="formInput" placeholder="*전화번호를 정확하게 입력하지 않으면 답변을 드릴 수 없습니다." />
          </div>
          <div className="formGroup">
            <label className="formLabel">수강명</label>
            <input type="text" className="formInput" placeholder="*보다 원활한 상담을 위해 수강명을 꼭 입력해주세요." />
          </div>
          <div className="formGroup">
            <label className="formLabel">제목</label>
            <input type="text" className="formInput" />
          </div>
          <div className="formGroup">
            <label className="formLabel">내용</label>
            <textarea className="formTextarea"></textarea>
          </div>
          <button type="submit" className="submitButton">제출하기</button>
        </form>
      )}
    </div>
  );
};

export default QnaCustomerSupport;
