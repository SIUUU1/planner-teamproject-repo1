import React, { useState, useEffect } from 'react';
import './MyQnaList.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import Button from '../components/Button';
import useSendPost from '../util/useSendPost';
import { useNavigate } from 'react-router-dom';

function MyQnaList({ qnas, onChangeTab, user_id }) {
  const [visible, setVisible] = useState({});
  const [inquiries, setInquiries] = useState([]);
  const [replies, setReplies] = useState([]);

  useEffect(() => {
    if (qnas) {
      const filteredInquiries = qnas.filter(qna => qna.user_id === user_id && qna.qora === 1);
      const filteredReplies = qnas.filter(qna => qna.qora === 2);
      setInquiries(filteredInquiries);
      setReplies(filteredReplies);
    }
  }, [qnas, user_id]);

  const handleToggle = (group_id) => {
    setVisible(prevVisible => ({
      ...prevVisible,
      [group_id]: !prevVisible[group_id],
    }));
  };

  const { postRequest } = useSendPost('http://localhost:8080/api/qna/delete', {}, 'json');

  const onDelete = async (qna_id) => {
    try {
      await postRequest({ qna_id });
      alert('Qna 삭제 성공');
      setInquiries(prevInquiries => prevInquiries.filter(qna => qna.qna_id !== qna_id));
    } catch (error) {
      alert('Qna 삭제 실패');
      console.error("Error deleting Qna:", error);
    }
  };

  const navigate = useNavigate();

  const goEdit = (qna_id) => {
    navigate(`/qna/edit/${qna_id}`);
    onChangeTab('voice');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (`0${date.getMonth() + 1}`).slice(-2);
    const day = (`0${date.getDate()}`).slice(-2);
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
          {inquiries.map((inquiry, index) => (
            <React.Fragment key={inquiry.qna_id}>
              <tr onClick={() => handleToggle(inquiry.group_id)}>
                <td>{index + 1}</td>
                <td>{inquiry.qna_subject}</td>
                <td>{inquiry.qna_content}</td>
                <td className={inquiry.reply === 1 ? 'answered' : 'pending'}>
                  {inquiry.reply === 1 ? '답변 완료' : '답변 대기중'}
                </td>
                <td>{formatDate(inquiry.reg_date)}</td>
                <td>
                  <Button
                    className='qnaBtn'
                    text={<FontAwesomeIcon icon={faPenToSquare} />}
                    onClick={(e) => { e.stopPropagation(); goEdit(inquiry.qna_id); }}
                  />
                  <Button
                    className='qnaBtn'
                    text={<FontAwesomeIcon icon={faMinus} />}
                    onClick={(e) => { e.stopPropagation(); onDelete(inquiry.qna_id); }}
                  />
                </td>
              </tr>
              {visible[inquiry.group_id] && replies
                .filter(response => response.group_id === inquiry.group_id)
                .map((response) => (
                  <tr key={response.qna_id} className="responseRow">
                    <td colSpan="6">
                      <div className="response">
                        <h3>답변</h3>
                        <textarea value={response.qna_content} readOnly></textarea>
                      </div>
                    </td>
                  </tr>
                ))
              }
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MyQnaList;
