import React, { useRef,useEffect,useState } from 'react';
import {useParams } from 'react-router-dom';
import './ManagerHome.css';
import useLoading from '../util/useLoading';
import useMove from '../util/useMove';
import useSendPost from '../util/useSendPost';
import ManagerMenuInfo from './ManagerMenuInfo';

const ManagerQnaEditor =()=>{
  const initQna = {
    no: 0,
    user_id: '',
    user_name: '',
    user_email: '',
    category:'',
    qna_subject:'',
    qna_content:'',
    group_id: 0,
    qora: 2,
  };
  const {no} = useParams();
  const [qna, setQna] = useState(initQna);
  const {data: qnaData, loading: loadingQnaData, error: errorQnaData} = useLoading(`http://localhost:8080/api/qna/read/${no}`, 'json');
  
   // 사용자 정보
   const { data: userData, loading: loadingUser, error: errorUser } = useLoading('http://localhost:8080/api/user/userInfo', 'json');
  
   // 답변 데이터
  const { data: replyData, loading: loadingReplyData, error: errorReplyData } = useLoading(
    qnaData && qnaData.group_id ? `http://localhost:8080/api/qna/readbygroup/${qnaData.group_id}` : null, 'json');

   useEffect(() => {
     if (userData) {
      //관리자
      setQna(prevQna => ({
         ...prevQna,
         user_id: userData.user_id,
         user_name: userData.user_name,
       }));
     }

     if (qnaData) {
       if(qnaData.reply ===1 && replyData){    //답변수정
         setQna(replyData);

        }else{  //답변등록
          let subject = "RE: "+qnaData.qna_subject;
          setQna(prevQna => ({
            ...prevQna,
            group_id: qnaData.group_id,
            qna_subject: subject,
            category: qnaData.category,
            user_email: qnaData.user_email,
          }));}
        }

   }, [qnaData, userData, replyData]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setQna((prevData) => ({
      ...prevData,
      [name]: value,
  }));
  };

  const moveToQnaList = useMove('/manager/customer-service/voice');

  //등록
  const { postRequest: sendRequest } = useSendPost('http://localhost:8080/api/mngr/qna/insert', {}, 'json');
  const onSubmit =async()=>{
    if (!qna.qna_subject || !qna.qna_content) {
      alert('모든 필드를 채워주세요.');
      return;
    }
    try {
      await sendRequest(qna);
      alert('qna 등록 되었습니다.');
      setQna({
        ...initQna,
      });
      moveToQnaList();//목록
    } catch (error) {
      console.error('qna 등록 실패:', error);
      alert('qna 등록 실패했습니다.');
    }
  };

  //수정
  const { postRequest: updateRequest } = useSendPost('http://localhost:8080/api/qna/update', {}, 'json');
  const onUpdate =async()=>{
    if (!qna.qna_subject || !qna.qna_content) {
      alert('모든 필드를 채워주세요.');
      return;
    }
    try {
      await updateRequest(qna);
      alert('qna 수정 되었습니다.');
      setQna({
        ...initQna,
      });
      moveToQnaList();//목록
    } catch (error) {
      console.error('qna 수정 실패:', error);
      alert('qna 수정 실패했습니다.');
    }
  }
  if(loadingQnaData||loadingReplyData||loadingUser){
    return <div>loading...</div>;
  }
  return(
    <>
     <div className="managerFaqEditor">
      <div className="managerContent backWhite">
        <ManagerMenuInfo/>
        
      <div className='managerEditorForm'> 
      <div className="formGroup">
        <label htmlFor="faq_title">제목:</label>
        <input type="text" name="qna_subject" value={qna.qna_subject} onChange={onChange}/>
      </div>

      <div className="formGroup">
        <label htmlFor="qna_content">내용:</label>
        <textarea name="qna_content" value={qna.qna_content} onChange={onChange} />
      </div>
      <div className="formGroup btnSub">
        {qnaData && qnaData.reply === 1 ?(
        <button onClick={onUpdate} className="completeButton">수정</button>
      ):(
        <button onClick={onSubmit} className="completeButton">등록</button>)}
        <button onClick={moveToQnaList} className="completeButton">목록</button>
      </div>
      </div>
      </div>
    </div>
    </>
  );
};
export default ManagerQnaEditor;