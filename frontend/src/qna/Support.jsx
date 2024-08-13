import React, { useState, useEffect } from 'react';
import './Support.css';

function Support() {
  const [inquiries, setInquiries] = useState([]);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [response, setResponse] = useState("");

  useEffect(() => {
    setInquiries([
      { id: 1, content: '비밀번호를 분실했어요', status: 'pending', date: '2022-09-01', lastResponse: '' },
      { id: 2, content: '일과표 수정은 어떻게 하나요?', status: 'answered', date: '2022-09-02', lastResponse: 'Your request has been processed.' }
    ]);
  }, []);

  const handleSelectInquiry = (inquiry) => {
    setSelectedInquiry(inquiry);
    setResponse("");
  };

  const handleResponseChange = (e) => {
    setResponse(e.target.value);
  };

  const handleSubmitResponse = () => {
    const newStatus = response ? 'answered' : 'pending';
    const updatedInquiries = inquiries.map(inquiry =>
      inquiry.id === selectedInquiry.id ? { ...inquiry, status: newStatus, lastResponse: response ? response : '답변을 기다려주세요.' } : inquiry
    );
    setInquiries(updatedInquiries);
    if (!response) {
      alert("답변을 기다려주세요.");
    }
  };

  return (
    <div className="support">
      <h1>1:1 문의 내역</h1>
      <table className="inquiries">
        <thead>
          <tr>
            <th>번호</th>
            <th>문의</th>
            <th>상태</th>
            <th>날짜</th>
          </tr>
        </thead>
        <tbody>
          {inquiries.map((inquiry, index) => (
            <tr key={index} onClick={() => handleSelectInquiry(inquiry)}>
              <td>{inquiry.id}</td>
              <td>{inquiry.content}</td>
              <td className={inquiry.status === 'answered' ? 'answered' : 'pending'}>
                {inquiry.status === 'answered' ? '답변 완료' : '답변 대기중'}
              </td>
              <td>{inquiry.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedInquiry && (
        <div className="selected">
          <h2>문의 내역</h2>
          <textarea value={selectedInquiry.content} readOnly></textarea>
          <textarea placeholder="답변을 입력해주세요" value={response} onChange={handleResponseChange}></textarea>
          <button onClick={handleSubmitResponse}>답변 등록</button>
          <div>마지막 답변: {selectedInquiry.lastResponse}</div>
        </div>
      )}
    </div>
  );
}

export default Support;
