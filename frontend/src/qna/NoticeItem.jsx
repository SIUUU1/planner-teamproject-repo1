import React, { useState , useEffect} from 'react';
import useSendPost from '../util/useSendPost';

const NoticeItem =({selectedNotice,backToList,comments,userData,onEvent})=>{
  const initComment = {
    no: 0,
    user_id: '',
    user_nickname: '',
    category:'',
    subject: '',
    content: '',
    ref: '',
    step: '',
    depth:'',
    read_count:'',
    reg_date:'',
  };

  const [comment, setComment] = useState({initComment});

  useEffect(() => {
    if (selectedNotice && userData) {
      setComment({
        ...comment,
        no : selectedNotice.no,
        user_id: userData.user_id,
        user_nickname: userData.user_nickname,
        category: selectedNotice.category,
        subject: selectedNotice.subject,
        ref: selectedNotice.ref,
        step: comments.length,
        depth: selectedNotice.depth + 1,
        read_count: selectedNotice.read_count,
        reg_date: new Date().toISOString(),  // 현재 시간을 등록일로 설정
      });
    }
  }, [selectedNotice, userData, comments]);


  const changeComment = (e) => {
    setComment((prevComment) => ({
      ...prevComment,
      content: e.target.value,
    }));
  };

  //notice insert
  const insertRequest = useSendPost('http://localhost:8080/api/notice/insert', {}, 'json');
  
  //댓글 추가
  const submitComment = async () => {
  try {
    await insertRequest.postRequest(comment);
    alert('댓글이 추가되었습니다.');
    setComment((prevComment) => ({
      ...prevComment,
      content: '', // 댓글 입력 필드 초기화
    }));
    onEvent(); // 댓글 목록을 갱신하기 위한 리패치 호출
  } catch (error) {
    console.error('댓글 추가 실패:', error);
    alert('댓글 추가에 실패했습니다.');
  }
};
  
  return(
    <>
    <div className="noticeDetail">
          <h2>제목 : {selectedNotice.subject}</h2>
          <p>내용: {selectedNotice.content}</p>
          <div>
          <h2>댓글</h2>
        {comments.map((comment, index) => (
          <p key={index}><strong>{comment.user_nickname} ({comment.reg_date}):</strong> {comment.content}</p>
        ))}
        <input type="text" value={userData.user_nickname} readOnly />
        <textarea value={comment.content} onChange={changeComment} rows="4" ></textarea>
        <button onClick={submitComment}>댓글 추가</button>
        <button onClick={backToList}>목록으로</button>
          </div>
    </div>
    </>
  );
};
export default NoticeItem;