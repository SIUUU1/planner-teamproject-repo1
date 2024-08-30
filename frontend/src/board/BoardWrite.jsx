import React, { useRef,useEffect,useState } from 'react';
import {useParams,useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './BoardWrite.css';
import useLoading from '../util/useLoading';
import useMove from '../util/useMove';

const BoardWrite = () => {
  const initBoard = {
    no: 0,
    group_id: 0,
    user_id: '',
    user_nickname: '',
    category:'',
    subject: '',
    content: '',
    filename:'',
    ref: 1,
    step: 0,
    depth:0,
    read_count:'',
    reg_date:'',
  };
  const img = useRef(null);
  const {no, group_id=0} = useParams();
  const [board, setBoard] = useState(initBoard);
  const {data: boardData, loading: loadingBoardData, error: errorBoardData, refetch: refetchBoardData } = useLoading(`http://localhost:8080/api/board/read/${no}`, 'json');
  // 사용자 정보
  const { data: userData, loading: loadingUser, error: errorUser } = useLoading('http://localhost:8080/api/user/userInfo', 'json');
  const navigate = useNavigate();

  useEffect(() => {
    if (userData) {
      setBoard(prevBoard => ({
        ...prevBoard,
        user_id: userData.user_id,
        user_nickname: userData.user_nickname,
      }));
    }
    if(group_id!=0){
      setBoard(prevBoard => ({
        ...prevBoard,
        group_id: group_id,
      }));
    }
    if (boardData) {
      setBoard(boardData);
    }
  }, [boardData, userData]);
  
  const onChange = (e) => {
    const { name, value } = e.target;
    setBoard((prevData) => ({
      ...prevData,
      [name]: value,
  }));
  };
  const handleQuillChange = (value) => {
    setBoard(prevBoard => ({
      ...prevBoard,
      content: value,
    }));
  };

  //카테고리  
  const [categories, setCategories] = useState(['Java', 'Html', 'Css', 'Spring boot', 'React','기타']);
  const [newCategory, setNewCategory] = useState('');

  const handleAddCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setNewCategory('');
    }
  };

  const move = useMove(`/boardlist`);
  //등록
  const onSubmit = async () => {
    if (!board.subject || !board.content) {
      alert('모든 필드를 채워주세요.');
      return;
    }
    try {
      const formData = new FormData();
      
      for (const key in board) {
        formData.append(key, board[key]);
      }
      if (img.current.files.length>0) {
        formData.append('img',img.current.files[0]);
      }
      const response = await fetch('http://localhost:8080/api/board/insert', {
        method: 'POST', 
        encType: 'multipart/form-data',
        body: formData,
        credentials: 'include',
      });
      console.log('formdata'+formData);
      if (response.ok) {
        alert('게시판이 성공적으로 등록되었습니다.');
        refetchBoardData();
         // 목록으로 
      if(group_id !=0 ){
        navigate(`/boardlist/group/${group_id}`);
      }else {
      navigate('/boardlist');
    }
      } else {
        throw new Error('게시판 등록 실패');
      }
    } catch (error) {
      console.error('게시판 등록 실패:', error);
      alert('게시판 등록 실패했습니다.');
    }
  };

  //수정
  const onUpdate = async ()=>{
    if (!board.subject || !board.content) {
      alert('모든 필드를 채워주세요.');
      return;
    }
    try {
      const formData = new FormData();
      for (const key in board) {
        formData.append(key, board[key]);
      }
      if (img.current.files.length>0) {
        formData.append('img',img.current.files[0]);
      }
      const response = await fetch('http://localhost:8080/api/board/update', {
        method: 'POST', 
        encType: 'multipart/form-data',
        body: formData,
        credentials: 'include',
      });
      console.log('formdata'+formData);
      if (response.ok) {
        alert('게시판이 성공적으로 수정되었습니다.');
        refetchBoardData();
        //목록으로
        if(group_id !=0 || group_id){
          navigate(`/boardlist/group/${group_id}`);
        }else {
        navigate('/boardlist');
      }
      } else {
        throw new Error('게시판 수정 실패');
      }
    } catch (error) {
      console.error('게시판 수정 실패:', error);
      alert('게시판 수정에 실패했습니다.');
    }
  };

  const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      ['link', 'image', 'video'],
      ['clean'],
    ],
  };

  return (
    <div className="boardWrite backWhite">
      <h1>게시판 글쓰기</h1>
      <div className="formGroup">
        <label htmlFor="subject">제목:</label>
        <input type="text" name="subject" value={board.subject} onChange={onChange}/>
      </div>
      <div className="formGroup">
        <label htmlFor="category">카테고리:</label>
        <select id="category" name="category" value={board.category} onChange={onChange} >
          <option value="" disabled> 카테고리를 선택하세요
          </option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="formGroup newCategory">
        {/* <label htmlFor="newCategory">카테고리 추가:</label> */}
        <input type="text" id="newCategory" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} placeholder="새 카테고리 추가"/>
        <button onClick={handleAddCategory} className="addCategoryButton">추가</button>
      </div>
      <div className="formGroup">
        <label htmlFor="content">내용:</label>
        <ReactQuill value={board.content} name="content" modules={modules} onChange={handleQuillChange}/>
      </div>
      <div className="formGroup">
        <label htmlFor="imageUpload">파일 업로드:</label>
        <input type="file" id="imageUpload" multiple accept="image/*" ref={img}/>
        {board.filename && <span>{board.filename}</span>}
      </div>
      <div className="formGroup btnSub">
        {no!=0 ?(
        <button onClick={onUpdate} className="completeButton">수정</button>
      ):(
        <button onClick={onSubmit} className="completeButton">등록</button>)}
      </div>
    </div>
  );
};

export default BoardWrite;
