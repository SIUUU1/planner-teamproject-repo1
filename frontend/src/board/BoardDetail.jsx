import React, { useState, useEffect,useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './BoardDetail.css';
import useSendPost from '../util/useSendPost';
import useLoading from '../util/useLoading';
import Button from '../components/Button';
import ProfileLink from '../components/ProfileLink'
import Toback from '../components/ToBack'

const BoardDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const initComment = {
    no: 0,
    user_id: '',
    user_nickname: '',
    category:'',
    subject: '',
    content: '',
    filename:'',
    ref: 1,
    step: 0,
    depth:0,
    read_count:0,
    reg_date:'',
  };
  
  const [board, setBoard] = useState({
    no: 0,
    user_id: '',
    user_nickname: '',
    category:'',
    subject: '',
    content: '',
    filename:'',
    ref: 1,
    step: 0,
    depth:0,
    read_count:0,
    reg_date:'',
  });

  const {data: boardData, loading: loadingBoardData, error: errorBoardData, refetch: refetchBoardData } = useLoading(`http://localhost:8080/api/board/read/${id}`, 'json');
  const {data: boardListData, loading: loadingBoardList, error: errorBoardList, refetch: refetchBoardListData } = useLoading('http://localhost:8080/api/board/list', 'json');
  const { data: userData, loading: loadingUser, error: errorUser, refetch: refetchUserData } = useLoading('http://localhost:8080/api/user/userInfo', 'json');
  
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState({initComment});
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedContent, setEditedContent] = useState('');

  const [replyingCommentId, setReplyingCommentId] = useState(null); // 대댓글 입력 상태
  
  useEffect(() => {
    if (boardData) {
      setBoard(boardData);
    }
    if (boardListData) {
      const filteredComments = boardListData.filter(e => e.step !== 0 && e.ref === boardData?.ref);
      setComments(filteredComments);
    }
    if (userData && boardData) {
      setComment(prevComment => ({
        ...prevComment,
        no: boardData.no,
        user_id: userData.user_id,
        user_nickname: userData.user_nickname,
        category: boardData.category,
        subject: boardData.subject,
        ref: boardData.ref,
        step: boardData.step ,
        depth: boardData.depth,
        reg_date: new Date().toISOString(),
      }));
    }
  }, [boardData, userData, boardListData]);

  const handleEditClick = (comment) => {
    setEditingCommentId(comment.no); 
    setEditedContent(comment.content);
  };

  const onEdit = () => {
    navigate(`/boardwrite/${board.no}`);
  }
  //게시판 삭제
  const { postRequest: deleteRequest } = useSendPost('http://localhost:8080/api/board/delete', {}, 'json');

  const onDelete = async () => {
    try {
      const no = id;
      await deleteRequest({no});
      alert('게시판이 삭제되었습니다.');
      navigate('/boardlist');
      refetchBoardListData();
    } catch (error) {
      console.error('게시판 삭제 실패:', error);
      alert('게시판 삭제에 실패했습니다.');
    }
  };

  // 댓글 생성
  const { postRequest: submitCommentRequest } = useSendPost('http://localhost:8080/api/board/insert/comment', {}, 'json', true);

  const submitComment = async () => {
    try {
      const formData = new FormData();
      for (const key in comment) {
        formData.append(key, comment[key]);
      }
      await submitCommentRequest(formData);
      alert('댓글이 추가되었습니다.');
      refetchBoardListData();
    } catch (error) {
      console.error('댓글 추가 실패:', error);
      alert('댓글 추가에 실패했습니다.');
    }
  };

  const changeComment = (e) => {
    setComment((prevComment) => ({
      ...prevComment,
      content: e.target.value,
    }));
  };

  //대댓글
  const handleReplyClick = (comment) => {
    setReplyingCommentId(replyingCommentId === comment.no ? null : comment.no);
  };

  const replyContent =useRef();

  const submitReply = async (parentComment) => {
    if(!replyContent.current.value){
      alert('댓글을 작성하세요.');
      return;
    }
    try {
      const replyComment = {
        ...comment,
        no: parentComment.no,
        subject: parentComment.subject,
        content: replyContent.current.value,
        ref: parentComment.ref,
        step: parentComment.step,
        depth: parentComment.depth,
      };
      const formData = new FormData();
      for (const key in replyComment) {
        formData.append(key, replyComment[key]);
      }
      await submitCommentRequest(formData);
      setReplyingCommentId(null);
      //초기화
      replyContent.current.value='';
      refetchBoardListData();
    } catch(error){
      console.error('대댓글 추가 실패:', error);
      alert('대댓글 추가에 실패했습니다.');
    }
  };

  const handleEditChange = (e) => {
    setEditedContent(e.target.value);
  };
  
  // 댓글 수정
  const { postRequest: modifyCommentRequest } = useSendPost('http://localhost:8080/api/board/update/comment', {}, 'json', true);
  
  const handleConfirmEdit = async (comment) => {
    try {
      const updatedComment = { ...comment, content: editedContent };
      const formData = new FormData();
      for (const key in updatedComment) {
        formData.append(key, updatedComment[key]);
      }
      await modifyCommentRequest(formData);
      alert('댓글이 수정되었습니다.');
      setEditingCommentId(null);
      refetchBoardListData();
    } catch (error) {
      console.error('댓글 수정 실패:', error);
      alert('댓글 수정에 실패했습니다.');
    }
  };

  //댓글 삭제
  const { postRequest: deleteCommentRequest } = useSendPost('http://localhost:8080/api/board/delete/comment', {}, 'json');

  const DeleteComment = async (comment) => {
    try {
      if (!comment.no) {
        alert('삭제할 댓글 번호가 없습니다.');
        return;
    }
      await deleteCommentRequest({no : comment.no});
      alert('댓글이 삭제되었습니다.');
      refetchBoardListData();
    } catch (error) {
      console.error('댓글 삭제 실패:', error);
      alert('댓글 삭제에 실패했습니다.');
    }
  };

  // 파일 다운로드
  const handleFileDownload = async (filename) => {
    try {
      const encodedFilename = encodeURIComponent(filename);
      const response = await fetch(`http://localhost:8080/api/board/download/${encodedFilename}`, {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('File download failed');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      console.error('File download failed:', error);
      alert('파일 다운로드에 실패했습니다.');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  if(loadingUser || loadingBoardData){
    return <div>loading</div>;
  }

  return (
    <div className="boardDetail">
      <div className='boardContent backWhite'>
        <Toback URL={'/boardlist'} />
        <h1>{board.subject}</h1>
        <div className='boardInfo'>
          <p>{formatDate(board.reg_date)} &middot; {board.category}</p>
          <div className="buttonGroup">
            <Button onClick={onEdit} className={"editButton"} text={'수정'}/>
            <Button onClick={onDelete} className={"deleteButton"} text={'삭제'}/>
          </div>
        </div>
        <div className='boardContentText'>
          <div dangerouslySetInnerHTML={{ __html: board.content }} />
        </div>
        <div className="attachedFiles">
          {board.filename && board.filename.length > 0 ? (
            <span className='file' onClick={() => handleFileDownload(board.filename)}>{board.filename}</span>
          ) : (<span>첨부파일이 없습니다.</span>)}
        </div>

        <div className='boardComment'>
          {comments.map((com) => (
            <div key={com.no}>
              {editingCommentId === com.no ? (
                <div className='boardCommentItem'>
                  <ProfileLink user_id={com.user_id} user_nickname={com.user_nickname}></ProfileLink>
                  <input type="text"  value={editedContent}  onChange={handleEditChange} />
                  <Button text={'확인'} onClick={() => handleConfirmEdit(com)} />
                </div>
              ) : ( 
                <>
                <div className='boardCommentItem'>
                  {/* 대댓글 표시 */}
                   {Array.from({ length: com.depth-1 }, (_, index) => (<span key={index} style={{ marginLeft: '5px' }}>&ensp;</span>
                  ))}
                  <ProfileLink user_id={com.user_id} user_nickname={com.user_nickname}></ProfileLink>
                  <p className='boardCommentContent'>: {com.content}</p> <p>({formatDate(comment.reg_date)})</p>
                  <Button text={'댓글'} onClick={() => handleReplyClick(com)} />
                  {com.user_id === userData.user_id && (
                    <>
                    <Button text={'수정'} onClick={() => handleEditClick(com)} />
                    <Button text={'삭제'} onClick={() => DeleteComment(com)} />
                    </>
                  )}
                   
                </div>
                {replyingCommentId === com.no && (
                  <div className="replyInput">
                    <textarea ref={replyContent} rows="4"></textarea>
                    <Button onClick={() => submitReply(com)} text={'추가'} className={'replyButton'} />
                  </div>
                )}
                </>
              )}
            </div>
          ))}
          <div className='commentRegister'>
            <p>{userData.user_nickname} </p>
            <textarea value={comment.content} onChange={changeComment}  rows="4"></textarea>
            <Button onClick={submitComment} text={'댓글 추가'} className={'commentRegisterBtn'}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardDetail;