import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './BoardDetail.css';
import useSendPost from '../util/useSendPost';
import useLoading from '../util/useLoading';
import Button from '../components/Button';

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
  
  //본 게시글
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
  //게시글 전체 (댓글 불러오기)
  const {data: boardListData, loading: loadingBoardListt, error: errorBoardList,refetch: refetchBoardListData } = useLoading('http://localhost:8080/api/board/list', 'json');
  // 유저 정보
  const { data: userData, loading: loadingUser, error: errorUser, refetch: refetchUserData } = useLoading('http://localhost:8080/api/user/userInfo', 'json');
  
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState({initComment});
  const [editingCommentId, setEditingCommentId] = useState(null); // 현재 수정 중인 댓글 ID
  const [editedContent, setEditedContent] = useState(''); // 수정된 댓글 내용
  
  useEffect(() => {
    if (boardData) {
      setBoard(boardData);
    }
    if (boardListData) {
      const filteredComments = boardListData.filter(e => e.step !== 0 && e.ref === boardData?.ref);
      setComments(filteredComments);
    }
    if (userData&&boardData) {
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
  }, [boardData,userData,boardListData]);

  const handleEditClick = (comment) => {
    setEditingCommentId(comment.no); 
    setEditedContent(comment.content);
  };

  const handleBack = () => {
    navigate('/boardlist');
  };

  const onEdit =()=>{
    navigate(`/boardwrite/${board.no}`);
  }
  // board delete
  const { postRequest: deleteRequest } = useSendPost('http://localhost:8080/api/board/delete', {}, 'json');

  const onDelete =async ()=>{
    try {
      const no = id;
      await deleteRequest({no});
      console.log("no"+no)
      alert('게시판이 삭제되었습니다.');
      navigate('/boardlist');
      refetchBoardListData();
    } catch (error) {
      console.error('게시판 삭제 실패:', error);
      alert('게시판 삭제에 실패했습니다.');
    }
  };

  //board comment insert
  //댓글 추가
  const submitComment = async () => {
  try {
    const formData = new FormData();
    for (const key in comment) {
      formData.append(key, comment[key]);
    }
    const response = await fetch('http://localhost:8080/api/board/insert/comment', {
        method: 'POST', 
        body: formData,
        credentials: 'include',
      });
      console.log('formdata'+formData);
      if (response.ok) {
        alert('댓글이 추가되었습니다.');
        refetchBoardListData();
      } else {
        throw new Error('댓글 추가 실패');
      }
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

  const handleEditChange = (e) => {
    setEditedContent(e.target.value);
  };
  
  //board comment modify
  //const { postRequest: modifyRequest } = useSendPost('http://localhost:8080/api/board/update/comment', {}, 'map');
  
  //댓글 수정
  const handleConfirmEdit = async (comment) => {
    try {
      const updatedComment = { ...comment, content: editedContent };
      const formData = new FormData();
      for (const key in updatedComment) {
        formData.append(key, updatedComment[key]);
      }
      const response = await fetch('http://localhost:8080/api/board/update/comment', {
          method: 'POST', 
          body: formData,
          credentials: 'include',
        });
        console.log('formdata'+formData);
        if (response.ok) {
          alert('댓글이 수정되었습니다.');
          setEditingCommentId(null);
          refetchBoardListData();
        } else {
          throw new Error('댓글 수정 실패');
        }
      } catch (error) {
        console.error('댓글 수정 실패:', error);
        alert('댓글 수정에 실패했습니다.');
      }
  };

 // 파일 다운로드
  const handleFileDownload = async(filename) => {
       await fetch(`http://localhost:8080/api/board/download/${filename}`, {
          method: 'GET', 
          credentials: 'include',
        })
        .then((res)=>{
          if (res.ok) {
            alert('파일 다운로드');
          } else {
            throw new Error('파일 다운로드 실패');
          }
        })
        .then((error)=>{
          console.error('파일 다운로드 실패:', error);
          alert('파일 다운로드 실패했습니다.');
        });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  if(loadingUser || loadingBoardData){
    return<div>loading</div>;
  }
  return (
    <div className="boardDetail">
      <h1>제목: {board.title}</h1>
      <p><strong>카테고리:</strong> {board.subject}</p>
      <p><strong>등록날짜:</strong> {board.reg_date}</p>
      <div>
        <strong>내용:</strong>
        <div dangerouslySetInnerHTML={{ __html: board.content }} />
      </div>
        <div className="attachedFiles">
          <h2>첨부 파일 </h2>
      {board.filename && board.filename.length > 0 ? (
      <a href="#" onClick={() => handleFileDownload(board.filename)}>{board.filename}</a>
          ):(<span>첨부파일이 없습니다.</span>)}
        </div>
      <div className="buttonGroup">
          <button onClick={onEdit} className="editButton">수정</button>
          <button onClick={onDelete} className="deleteButton">삭제</button>
      </div>

      <div>
        <h2>댓글</h2>
        {comments.map((com) => (
          <div key={com.no}>
            {editingCommentId === com.no ? (
              <>
                <strong>{com.user_nickname}</strong>
                <input type="text"  value={editedContent}  onChange={handleEditChange} />
                <Button text={'확인'} onClick={() => handleConfirmEdit(com)} />
              </>) : ( <>
                <p><strong>{com.user_nickname} : {com.content}</strong> ({formatDate(comment.reg_date)})</p>
                {com.user_id === userData.user_id && (
                  <Button text={'수정'} onClick={() => handleEditClick(com)} />
                )}
              </>
            )}
          </div>
        ))}
        <input type="text" value={userData.user_nickname} readOnly />
        <textarea value={comment.content} onChange={changeComment}  rows="4"></textarea>
        <button onClick={submitComment}>댓글 추가</button>
      </div>
      <button onClick={handleBack} className="backButton">돌아가기</button>
    </div>
  );
};

export default BoardDetail;
