import React, { useState , useEffect} from 'react';
import useSendPost from '../util/useSendPost';
import Button from '../components/Button';
import ProfileLink from '../components/ProfileLink';

const NoticeItem =({selectedNotice,backToList,comments,userData,onEvent})=>{
  const initComment = {
    no: 0,
    user_id: '',
    user_nickname: '',
    category:'',
    subject: '',
    content: '',
    ref: 1,
    step: 0,
    depth:0,
    read_count:0,
    reg_date:'',
  };

  const [comment, setComment] = useState({initComment});
  const [editingCommentId, setEditingCommentId] = useState(null); // 현재 수정 중인 댓글 ID
  const [editedContent, setEditedContent] = useState(''); // 수정된 댓글 내용

  const handleEditClick = (comment) => {
    setEditingCommentId(comment.no); 
    setEditedContent(comment.content);
  };

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
        //step: comments.length,
        step: selectedNotice.step,
        depth: selectedNotice.depth,
        reg_date: new Date().toISOString(),
      });
    }
  }, [selectedNotice, userData, comments]);


  const changeComment = (e) => {
    setComment((prevComment) => ({
      ...prevComment,
      content: e.target.value,
    }));
  };

  const handleEditChange = (e) => {
    setEditedContent(e.target.value);
  };

  //notice insert
  const insertRequest = useSendPost('http://localhost:8080/api/notice/insert', {}, 'json');

  //notice modify
  const modifyRequest = useSendPost('http://localhost:8080/api/notice/update', {}, 'json');
  
  //댓글 추가
  const submitComment = async () => {
  try {
    await insertRequest.postRequest(comment);
    alert('댓글이 추가되었습니다.');
    setComment((prevComment) => ({
      ...prevComment,
      content: '', // 댓글 입력 필드 초기화
    }));
    onEvent(); // 리패치 호출
  } catch (error) {
    console.error('댓글 추가 실패:', error);
    alert('댓글 추가에 실패했습니다.');
  }
};

//댓글 수정
const handleConfirmEdit = async (comment) => {
  try {
    const updatedComment = { ...comment, content: editedContent };
    await modifyRequest.postRequest(updatedComment); // 댓글 업데이트 API 호출
    alert('댓글이 수정되었습니다.');
    setEditingCommentId(null); // 수정 완료 후 수정 상태 해제
    onEvent(); // 댓글 목록을 갱신하기 위한 리패치 호출
  } catch (error) {
    console.error('댓글 수정 실패:', error);
    alert('댓글 수정에 실패했습니다.');
  }
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};
  return(
    <>
      <div className="noticeDetail">
        <h2>{selectedNotice.subject}</h2>
        <p className='noticeDetailContent'>{selectedNotice.content}</p>
        <div className='noticeCommentList'>
          {/* <h2>댓글</h2> */}
          {comments.map((comment) => (
            <div key={comment.no}>
              {editingCommentId === comment.no ? (
                <div className='noticeCommentItem'>
                  <ProfileLink user_id={comment.user_id} user_nickname={comment.user_nickname}></ProfileLink>
                  <input type="text"  value={editedContent}  onChange={handleEditChange} />
                  <Button text={'확인'} onClick={() => handleConfirmEdit(comment)} />
                </div>
                ) : ( 
                <div className='noticeCommentItem'>
                  <ProfileLink user_id={comment.user_id} user_nickname={comment.user_nickname}></ProfileLink>
                  <p className='noticeCommentContent'>: {comment.content}</p> <p>({formatDate(comment.reg_date)})</p>
                  {comment.user_id === userData.user_id && (
                    <Button text={'수정'} onClick={() => handleEditClick(comment)} />
                  )}
                </div>
              )}
            </div>
          ))}
          <br/>
          <div className='noticeAddComment'>
            <p>{userData.user_nickname}:</p>
            <textarea className='noticeCommentTextarea' value={comment.content} onChange={changeComment} rows="4" ></textarea>
            <button onClick={submitComment}>등록</button>
          </div>
        </div>
        <button onClick={backToList}>목록으로</button>
     </div>
    </>
  );
};
export default NoticeItem;