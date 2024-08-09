import React, { useState, useEffect } from 'react';
import './MyQnaList.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import Button from '../components/Button';
import useSendPost from '../util/useSendPost';
import { useNavigate } from 'react-router-dom';

function MyQnaList({qnas}) {
  // 클릭 시 내용 보기 
  const [visible, setVisible] = useState({});
  const [inquiries, setInquiries] = useState(qnas);

  const handleToggle = (group_id) => {
    setVisible((prevVisible) => ({
      ...prevVisible,
      [group_id]: !prevVisible[group_id],
    }));
  };

  // 문의내역 삭제
  const { postRequest, loading, error } = useSendPost(
    'http://localhost:8080/api/qna/delete',{},'json'
  );

  const onDelete = async (qna_id) => {
    try {
      await postRequest({ qna_id });
      alert('Qna 삭제 성공');
      setInquiries((prevInquiries) => prevInquiries.filter(qna => qna.qna_id !== qna_id));
    } catch (error) {
      alert('Qna 삭제 실패');
      console.error("Error deleting Qna:", error);
    }
  };

  const navigate = useNavigate();
  // 수정 페이지로 이동
  const goEdit = (qna_id) => {
    navigate(`/qna/edit/${qna_id}`);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 월은 0부터 시작하므로 1을 더함
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="support">
    <h1>1:1 문의 내역</h1>
    <table className="inquiries">
      <thead>
        <tr>
          <th>번호</th>
          <th>제목</th>
          <th>내용</th>
          <th>상태</th>
          <th>날짜</th>
          <th>수정/삭제</th>
        </tr>
      </thead>
      <tbody>
        {inquiries.filter(qna => qna.qora === 1).map((inquiry, index) => (
          <React.Fragment key={index}>
            <tr onClick={() => handleToggle(inquiry.group_id)}>
              <td>{index}</td>
              <td>{inquiry.qna_subject}</td>
              <td>{inquiry.qna_content}</td>
              <td className={inquiry.reply === 1 ? 'answered' : 'pending'}>
                {inquiry.reply === 1 ? '답변 완료' : '답변 대기중'}
              </td>
              <td>{formatDate(inquiry.reg_date)}</td>
              <td><Button className='qnaBtn' text={<FontAwesomeIcon icon={faPenToSquare} onClick={(e) => { e.stopPropagation(); goEdit(inquiry.qna_id); }}/>}/> 
              <Button className='qnaBtn' text={<FontAwesomeIcon icon={faMinus} onClick={(e) => { e.stopPropagation(); onDelete(inquiry.qna_id); }}/>} /></td>
            </tr>
            {visible[inquiry.group_id] &&
              inquiries.filter(response => response.group_id === inquiry.group_id && response.qora === 2).map((response, resIndex) => (
                <tr key={`${index}-${resIndex}`} className="responseRow">
                  <td colSpan="4">
                    <div className="response">
                      <h3>답변</h3>
                      <textarea value={response.qna_content} readOnly></textarea>
                    </div>
                  </td>
                </tr>
              ))}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  </div>
  );
}

export default MyQnaList;
