import React, { useState , useEffect, useRef} from 'react';
import { Link } from 'react-router-dom';
import './PasswordReset.css'; 
import useSendPost from '../util/useSendPost';
import useLoading from '../util/useLoading';
import { useParams,useNavigate } from 'react-router-dom';

function PasswordReset() {
    const { type } = useParams();
    const { data: userData, loading: loadingUser, error: errorUser, refetch: refetchUserData } = useLoading('http://localhost:8080/api/user/userInfo', 'json');
    const [userInput, setUserInput] = useState({ user_email: '', user_name: '' , user_id:'',password:''});
    const [step, setStep] = useState(1); // 현재 진행 중인 단계를 나타내는 상태
    const nav = useNavigate();

    useEffect(() => {
        if (userData) {
            setUserInput(prevState => ({
                ...prevState,
                user_email: userData.user_id,
                user_id: userData.user_id,
            }));
        }
    }, [userData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserInput({
            ...userInput,
            [name]: value,
        });
    };

    // 다음 단계로 진행
    const handleNextStep = () => {
        setStep(step + 1); 
    };

    // 이메일 확인
    const { postRequest: confirmRequest, data :confirmData, error } = useSendPost('http://localhost:8080/api/auth/checkEmail', {}, 'json');
    const checkEmail = async () => {
        try {
            const response = await confirmRequest(userInput);
            if (response) {
                handleNextStep();
            }
        } catch (error) {
            console.error('이메일 확인 실패:', error);
            alert('해당하는 계정이 없습니다.');
        }
    };

    // data가 변경될 때마다 user_id를 업데이트하고 다음 단계로 진행
    useEffect(() => {
        if (confirmData && confirmData.user_id) {
            setUserInput(prevState => ({
                ...prevState,
                user_id: confirmData.user_id,
            }));
        }
    }, [confirmData]);

    // 인증코드 이메일 보내기
    const { postRequest: sendCodeRequest } = useSendPost('http://localhost:8080/api/auth/sendVerificationCode', {}, 'json');
    const sendCode = async ()=>{
        try {
            const response = await sendCodeRequest({ user_email: userInput.user_email });
            if (response) {
                handleNextStep();
            }
        } catch (error) {
            console.error('이메일 전송 실패:', error);
            alert('이메일 전송 실패');
        }
    };

    // 코드 인증
    const { postRequest: confirmCodeRequest } = useSendPost('http://localhost:8080/api/auth/verifyCode', {}, 'json');
    const code = useRef(null);
    const verifyCode = async () => {
        try {
            const response = await confirmCodeRequest({ user_email: userInput.user_email, code: code.current.value });
            if (response === "Verification successful") {
                alert("Verification successful!");
                handleNextStep();  // 인증 성공 시 다음 단계로 이동
            } else {
                alert(response);  // 서버로부터 받은 메시지를 표시
            }
        } catch (error) {
            console.error('코드인증 실패:', error);
            alert('코드인증 실패');
        }
    };

    // 패스워드 재설정
    const { postRequest: resetRequest } = useSendPost('http://localhost:8080/api/auth/resetPass', {}, 'json');
    const confirmPw = useRef(null);
    const resetPass = async () => {
        const userPwPettern = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^*+=-]).{6,20}$/;
        const passwdValue=userInput.password;
        if (!passwdValue || !confirmPw.current.value) {
        alert(`패스워드를 입력하세요.`);
        return;
        } else if (!passwdValue.match(userPwPettern) || !confirmPw.current.value.match(userPwPettern)) {
        alert(`6~16자 영문자와 숫자,특수기호를 조합해 입력하세요.`);
        return;
        } else if (passwdValue !== confirmPw.current.value) {
        alert(`패스워드와 패스워드 확인이 일치하지 않습니다.`);
        return;
        } 
        try {
             await resetRequest({ user_id: userInput.user_id, password: userInput.password });
            alert('패스워드 재설정에 성공하셨습니다.')
            nav(-1);
        } catch (error) {
            console.error('패스워드 재설정 실패:', error);
            alert('패스워드 재설정 실패');
        }
    };

    return (
        <div className="passwordReset">
            <div className="passwordResetBox">
                {step === 1 && (
                    <div className='passwordContent'>
                        <div className='passLeft'>
                        <h2>아이디 찾기</h2>
                        <p>복구 이메일을 입력하세요.</p>
                        </div>
                        <div className='passRight'>
                        <input type="text" name="user_email" placeholder="복구이메일" value={userInput.user_email} onChange={handleInputChange} /><br/>
                        <button type="submit" className="resetButton" onClick={handleNextStep}>다음</button>
                        <Link to="/login">로그인으로 돌아가기</Link>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className='passwordContent'>
                        <div className='passLeft'>
                        <h2>이름을 입력하세요</h2>
                        <p>WePlan 계정 이름 입력</p>
                        </div>
                        <div className='passRight'>
                        <input type="text"  name="user_name" placeholder="이름" value={userInput.user_name} onChange={handleInputChange}/><br/>
                        <button type="submit" className="resetButton" onClick={checkEmail}>다음</button>
                        <Link to="/login">로그인으로 돌아가기</Link>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className='passwordContent'>
                        <div className='passLeft'>
                        <h2>인증코드 받기</h2>
                        <p>계정보호를 위해 WePlan에서 본인 확인을 진행합니다.</p>
                        </div>
                        <div className='passRight'>
                            <p>WePlan에서 인증 코드를 {userInput.user_email}으로 전송합니다.</p>
                            <button type="submit" className="resetButton" onClick={sendCode}>보내기</button>
                            <Link to="/login">로그인으로 돌아가기</Link>
                        </div>
                    </div>
                )}

                {step === 4 && (
                    <div className='passwordContent'>
                        <div className='passLeft'>
                        <h2>인증코드 받기</h2>
                        <p>계정보호를 위해 WePlan에서 본인 확인을 진행합니다.</p>
                        </div>
                        <div className='passRight'>
                            <input type="text"  placeholder="인증번호" ref={code}/><br/>
                            <button type="submit" className="resetButton" onClick={verifyCode}>인증하기</button>
                            <Link to="/login">로그인으로 돌아가기</Link>
                        </div>
                    </div>
                )}

                {(step === 5&&type==='pw') && (
                    <div className='passwordContent'>
                        <div className='passLeft'>
                        <h2>패스워드 재설정</h2>
                        </div>
                        <div className='passRight'>
                        <input type="password"  placeholder="패스워드" name="password"  value={userInput.password} onChange={handleInputChange}/>
                        <input type="password"  placeholder="패스워드 확인"  ref={confirmPw}/>
                        <button type="submit" className="resetButton" onClick={resetPass}>패스워드 재설정</button>
                        <Link to="/login">로그인으로 돌아가기</Link>
                        </div>
                    </div>

                )}

                {(step === 5&&type==='id')&&
                  (<div className='passwordContent'>
                        <div className='passLeft'>
                        <h2>본인 아이디</h2>
                        </div>
                        <div className='passRight'>
                        <p>WePlan 계정 아이디는 {userInput.user_id} 입니다.</p>
                        <a href='#' onClick={(e)=>{ e.preventDefault(); handleNextStep();}}>패스워드 재설정하시겠습니까?</a>
                        <button type="submit" className="resetButton" onClick={handleNextStep}>패스워드 재설정하시겠습니까?</button>
                        <Link to="/login">로그인으로 돌아가기</Link>
                        </div>
                    </div>
                )}

                {step === 6 && (
                        <div className='passwordContent'>
                            <div className='passLeft'>
                            <h2>패스워드 재설정</h2>
                            </div>
                            <div className='passRight'>
                            <input type="password"  placeholder="패스워드" name="password"  value={userInput.password} onChange={handleInputChange}/>
                            <input type="password"  placeholder="패스워드 확인"  ref={confirmPw}/>
                            <button type="submit" className="resetButton" onClick={resetPass}>패스워드 재설정</button>
                            <Link to="/login">로그인으로 돌아가기</Link>
                            </div>
                        </div>
                )}

            </div>
        </div>
    );
}

export default PasswordReset;
