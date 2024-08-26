import ManagerMenuInfo from "./ManagerMenuInfo";
import './ManagerHome.css';
import React, { useState , useEffect} from 'react';
const ManagerCustomerService=()=>{
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
  return(
    <div className="managerCustomerService">
      <div className="managerContent backWhite">
        <ManagerMenuInfo/>
        <div>
          <h2 className="subTitle" style={{textAlign:'center'}}>
            <span className="subTitleItem">공지사항</span> | 
            <span className="subTitleItem" > 자주 묻는 질문</span> | 
            <span className="subTitleItem"> 고객의 소리</span>
          </h2>
        </div>
        <div className="supportForm">
          <label className="formLabel title">
             {/* <strong>{mode === 'create' ? '접수하기' : '문의내역 수정'}</strong> */}
             <strong>답변하기</strong>
            <span className="subtitle">
            </span>
          </label>
          <div className="formGroup">
            <label className="formLabel">상담유형</label>
            <div className="radioGroup">
              <label>
                <input type="radio" value="불편/불만" name="category"  checked={qna.category === '불편/불만'}/>불편/불만
              </label>
              <label>
                <input type="radio" value="칭찬/격려" name="category" checked={qna.category === '칭찬/격려'}/>칭찬/격려
              </label>
              <label>
                <input type="radio" value="기타문의" name="category"  checked={true}/>기타문의
              </label>
            </div>
          </div>
          <div className="formGroup">
            <label className="formLabel">이름</label>
            <input type="text" className="formInput" name="user_name" value={'김유나'}/>
          </div>
          <div className="formGroup">
            <label className="formLabel">전화번호</label>
            <input type="text" className="formInput" name="user_tel" value={'010-1234-1234'}/>
          </div>
          <div className="formGroup">
            <label className="formLabel">이메일</label>
            <input type="text" className="formInput" name="user_email" value={'kyn@mail.com'}/>
          </div>
          <div className="formGroup">
            <label className="formLabel">제목</label>
            <input type="text" className="formInput"  name="qna_subject" value={'테마 종류 추가해주세요.'} />
          </div>
          <div className="formGroup">
            <label className="formLabel">답변 내용</label>
            <textarea className="formTextarea"  name="qna_content" value={qna.qna_content}></textarea>
          </div>
          {/* <button type="button" className="submitButton" onClick={handleRequest}>{mode === 'create' ? '등록' : '수정'}</button> */}
          <button type="button" className="submitButton">등록</button>
        </div>
      </div>
    </div>
  )
}
export default ManagerCustomerService;