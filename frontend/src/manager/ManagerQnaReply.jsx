import useSendPost from '../util/useSendPost';
import useLoading from '../util/useLoading';
import React, { useState , useEffect} from 'react';
import useMove from'../util/useMove';

const ManagerQnaReply =({ mode = 'create', qna_id, onEvent, onChangeTab, userData=null})=>{
  const initQan = {
    qna_id: '',
    user_id: '',
    user_name: '',
    user_tel: '',
    user_email:'',
    category:'',
    qna_subject: '',
    qna_content: '',
    group_id: '',
    qora: '',
    reply:'',
    reg_date:'',
  };

  //qna 정보
  const [qna, setQna] = useState(initQan);
  const qnaDataUrl = mode === 'edit' ? `http://localhost:8080/api/qna/read/${qna_id}` : null;
  const { data: qnaData, loading: loadingQnaData, error: errorQnaData, refetch: refetchQnaData } = useLoading(qnaDataUrl, 'json');
  
  // 사용자 정보
  const [user, setUser] = useState({ user_id: '', user_name: '', user_email:'', user_tel: '',});
  //const { data: userData, loading: loadingUser, error: errorUser } = useLoading('http://localhost:8080/api/user/userInfo', 'json');
  
  //mode === 'create'
  useEffect(() => {
    if (userData) {
      setUser(userData);
      if (mode === 'create') {
        setQna((prevQna) => ({
          ...prevQna,
          user_id: userData.user_id,
          user_name: userData.user_name,
          user_tel: userData.user_tel,
          user_email: userData.user_email,
          category : "불편/불만",
        }));
      }
    }
  }, [userData, mode]);

  //mode === 'edit'
 useEffect(() => {
  if (mode === 'edit' && qnaData) {
    setQna(qnaData);
  }
}, [mode, qnaData, qna_id]);

  // qna insert
  const insertRequest = useSendPost('http://localhost:8080/api/user/qna/insert', {}, 'json');
  // qna update
  const updateRequest = useSendPost('http://localhost:8080/api/qna/update', {}, 'json');

  const onMove =useMove(`/qna/create/0`);
  const onInit = ()=>{
     // 입력 초기화
     setQna(prevQna => ({...prevQna, category: '불편/불만',qna_subject: '',qna_content: '',}));
     onEvent(); //refetch
     onMove(); //주소 초기화하기
     onChangeTab('myqna'); //탭 바꾸기
  };

  const handleRequest = async () => {
    try {
      if (mode === 'create') {
        await insertRequest.postRequest(qna);
        alert('Qna 등록 성공');
      } else {
        await updateRequest.postRequest(qna);
        alert('Qna 수정 성공');
      }
      onInit();
    } catch (error) {
      alert(`Qna ${mode === 'create' ? '등록' : '수정'} 실패`);
      console.error(`Error ${mode === 'create' ? 'creating' : 'updating'} Qna:`, error);
    }
  };

  // 바뀐 값 처리
  const onRadioChange = (e) => {
    setQna((prevData) => ({
      ...prevData,
      category: e.target.value,
    }));
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setQna((prevData) => ({
      ...prevData,
      [name]: value,
  }));
  };

  
  
//   if (loadingQnaData) {
//     return <div>Loading...</div>;
// }

// if (errorQnaData) {
//     return <div>Error: {errorQnaData.message}</div>;
// }
  return(
    <div className="supportForm">
          <label className="formLabel title">
             <strong>{mode === 'create' ? '접수하기' : '문의내역 수정'}</strong>
            <span className="subtitle">
              *문의내용에 대한 답변을 받을 이메일을 정확히 입력하세요.
            </span>
          </label>
          <div className="formGroup">
            <label className="formLabel">상담유형</label>
            <div className="radioGroup">
              <label>
                <input type="radio" value="불편/불만" name="category" onChange={onRadioChange}  checked={qna.category === '불편/불만'}/>불편/불만
              </label>
              <label>
                <input type="radio" value="칭찬/격려" name="category" onChange={onRadioChange}  checked={qna.category === '칭찬/격려'}/>칭찬/격려
              </label>
              <label>
                <input type="radio" value="기타문의" name="category" onChange={onRadioChange}  checked={qna.category === '기타문의'}/>기타문의
              </label>
            </div>
          </div>
          <div className="formGroup">
            <label className="formLabel">이름</label>
            <input type="text" className="formInput" name="user_name" value={qna.user_name} onChange={onChange}/>
          </div>
          <div className="formGroup">
            <label className="formLabel">전화번호</label>
            <input type="text" className="formInput" name="user_tel" value={qna.user_tel} onChange={onChange}/>
          </div>
          <div className="formGroup">
            <label className="formLabel">이메일</label>
            <input type="text" className="formInput" name="user_email" value={qna.user_email} onChange={onChange} />
          </div>
          <div className="formGroup">
            <label className="formLabel">제목</label>
            <input type="text" className="formInput"  name="qna_subject" value={qna.qna_subject} onChange={onChange} />
          </div>
          <div className="formGroup">
            <label className="formLabel">내용</label>
            <textarea className="formTextarea"  name="qna_content" value={qna.qna_content} onChange={onChange}></textarea>
          </div>
          <button type="button" className="submitButton" onClick={handleRequest}>{mode === 'create' ? '등록' : '수정'}</button>
          {mode==='edit' && <button type="button" className="submitButton" onClick={() => onInit()}>취소</button>}
        </div>
  );
};
export default ManagerQnaReply;