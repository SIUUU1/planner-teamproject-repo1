import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './PasswordReset.css';
import useSendPost from '../util/useSendPost';
import useLoading from '../util/useLoading';
import { useParams, useNavigate } from 'react-router-dom';

function PasswordReset() {
    const { type } = useParams();
    const { data: userData } = useLoading('http://localhost:8080/api/user/userInfo', 'json');
    const [userInput, setUserInput] = useState({ user_email: '', user_name: '', user_id: '', password: '' });
    const [step, setStep] = useState(1);
    const nav = useNavigate();
    const [isStepIncreased, setIsStepIncreased] = useState(false);
    const [isEmailChecked, setIsEmailChecked] = useState(false); // 상태 변수 추가
    const [isCodeSent, setIsCodeSent] = useState(false); // 상태 변수 추가
    const [isCodeVerified, setIsCodeVerified] = useState(false); // 상태 변수 추가
    const [isPasswordReset, setIsPasswordReset] = useState(false); // 상태 변수 추가

    useEffect(() => {
        if (userData) {
            setUserInput(prevState => ({
                ...prevState,
                user_email: userData.user_email,
                user_id: userData.user_id,
                user_name: userData.user_name,
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

    const handleNextStep = () => {
        setStep(prevStep => prevStep + 1);
    };

    // 이메일 확인하기
    const { postRequest: confirmRequest, data: confirmData, error : confirmError  } = useSendPost('http://localhost:8080/api/auth/checkEmail', {}, 'text');

    useEffect(() => {
        if (confirmData && !isEmailChecked) {
            setUserInput(prevState => ({
                ...prevState,
                user_id: confirmData,
            }));
            handleNextStep();
            setIsEmailChecked(true);  // `handleNextStep`이 한 번만 호출되도록 설정
        }
    }, [confirmData, isEmailChecked]);

    const checkEmail = async () => {
        try {
            await confirmRequest(userInput);
            setIsEmailChecked(false); // 새로운 요청을 할 때 다시 초기화
        } catch (error) {
            console.error('이메일 확인 실패:', error);
            alert('해당하는 계정이 없습니다.');
        }
    };

    //이메일로 인증코드 보내기
    const { postRequest: sendCodeRequest, loading: loadingSendCode } = useSendPost('http://localhost:8080/api/auth/sendVerificationCode', {}, 'json');
    const sendCode = async () => {
        try {
            if (!isCodeSent) {
                await sendCodeRequest({ user_email: userInput.user_email });
                handleNextStep();
                setIsCodeSent(true);  // `handleNextStep`이 한 번만 호출되도록 설정
            }
        } catch (error) {
            console.error('이메일 전송 실패:', error);
            alert('이메일 전송 실패');
        }
    };
    
    // 인증코드 확인
    const { postRequest: confirmCodeRequest, error: confirmCodeError } = useSendPost('http://localhost:8080/api/auth/verifyCode', {}, 'text');
    const code = useRef(null);
    const verifyCode = async () => {
        try {
            if (!isCodeVerified) {
            await confirmCodeRequest({ user_email: userInput.user_email, code: code.current.value });
            setIsCodeVerified(true);
            }
        } catch (error) {
            console.error('코드 인증 실패:', error);
            alert('코드 인증 실패');
        }
    };

    useEffect(() => {
        if (!confirmCodeError && isCodeVerified) {
            alert("Verification successful!");
            handleNextStep();
        } else if (confirmCodeError) {
            alert('코드 인증 실패');
            location.reload();
        }
    }, [confirmCodeError,isCodeVerified]);

    //패스워드 재설정
    const { postRequest: resetRequest } = useSendPost('http://localhost:8080/api/auth/resetPass', {}, 'json');
    const confirmPw = useRef(null);
    const resetPass = async () => {
        const userPwPattern = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^*+=-]).{6,20}$/;
        const passwdValue = userInput.password;
        if (!passwdValue || !confirmPw.current.value) {
            alert('패스워드를 입력하세요.');
            return;
        } else if (!passwdValue.match(userPwPattern) || !confirmPw.current.value.match(userPwPattern)) {
            alert('6~16자 영문자와 숫자, 특수기호를 조합해 입력하세요.');
            return;
        } else if (passwdValue !== confirmPw.current.value) {
            alert('패스워드와 패스워드 확인이 일치하지 않습니다.');
            return;
        }
        try {
            if (!isPasswordReset) {
                await resetRequest({ user_id: userInput.user_id, password: userInput.password });
                alert('패스워드 재설정에 성공하셨습니다.');
                handleNextStep();
                setIsPasswordReset(true);  // `handleNextStep`이 한 번만 호출되도록 설정
                nav(-1);
            }
        } catch (error) {
            console.error('패스워드 재설정 실패:', error);
            alert('패스워드 재설정 실패');
        }
    };

    const shouldHideEmailChangeButton = () => {
        const userId = userInput.user_id;
        if(userId.startsWith('google')){
            return 'Google';
        } else if(userId.startsWith('naver')){
            return 'Naver';
        } else if(userId.startsWith('kakao')){
            return 'Kakao';
        } else {
            return '';
        }
    };

    if(confirmError){
        console.error('이메일 확인 실패:', confirmError.message);
        alert('해당하는 계정이 없습니다.');
        location.reload();
    }
    return (
        <div className="passwordReset">
            <div className="passwordResetBox">
                {step === 1 && (
                    <div className="passwordContent">
                        <div className="passLeft">
                            {type === 'pw' ?(
                               <>
                                <h2>본인 인증</h2>
                                <p>개인정보를 안전하게 보호하기 위해 인증 절차가 필요해요.</p>
                               </> 
                            ):(
                                <>
                               <h2>아이디 찾기</h2>
                               <p>복구 이메일을 입력하세요.</p>
                               </>
                            )}
                        </div>
                        <div className="passRight">
                            <input type="text" name="user_email" placeholder="복구이메일" value={userInput.user_email} onChange={handleInputChange} /><br />
                            <button type="submit" className="resetButton" onClick={handleNextStep}>다음</button>
                            {type === 'id' && (<Link to="/loginForm">로그인으로 돌아가기</Link>)}
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="passwordContent">
                        <div className="passLeft">
                            <h2>이름을 입력하세요</h2>
                            <p>WePlan 계정 이름 입력</p>
                        </div>
                        <div className="passRight">
                            <input type="text" name="user_name" placeholder="이름" value={userInput.user_name} onChange={handleInputChange} /><br />
                            <button type="submit" className="resetButton" onClick={checkEmail}>다음</button>
                            {type === 'id' && (<Link to="/loginForm">로그인으로 돌아가기</Link>)}
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="passwordContent">
                        <div className="passLeft">
                            <h2>인증코드 받기</h2>
                            <p>계정보호를 위해 WePlan에서 본인 확인을 진행합니다.</p>
                        </div>
                        <div className="passRight">
                            {loadingSendCode ? (
                                <p className="rightP">이메일 전송 중...</p>
                            ) : (
                                <>
                                    <p className="rightP">WePlan에서 인증 코드를 {userInput.user_email}으로 전송합니다.</p>
                                    <button type="submit" className="resetButton" onClick={sendCode}>보내기</button>
                                </>
                            )}
                            {type === 'id' && (<Link to="/loginForm">로그인으로 돌아가기</Link>)}
                        </div>
                    </div>
                )}

                {step === 4 && (
                    <div className="passwordContent">
                        <div className="passLeft">
                            <h2>인증코드 받기</h2>
                            <p>계정보호를 위해 WePlan에서 본인 확인을 진행합니다.</p>
                        </div>
                        <div className="passRight">
                            <input type="text" placeholder="인증번호" ref={code} /><br />
                            <button type="submit" className="resetButton" onClick={verifyCode}>인증하기</button>
                            {type === 'id' && (<Link to="/loginForm">로그인으로 돌아가기</Link>)}
                        </div>
                    </div>
                )}

                {(step === 5 && type === 'pw') && (
                    <div className="passwordContent">
                        <div className="passLeft">
                            <h2>패스워드 재설정</h2>
                            <p className='rightP'>WePlan 계정 패스워드를 재설정 합니다.</p>
                        </div>
                        <div className="passRight">
                            <input type="password" placeholder="패스워드" name="password" value={userInput.password} onChange={handleInputChange} /><br/>
                            <input type="password" placeholder="패스워드 확인" ref={confirmPw} />
                            <button type="submit" className="resetButton" onClick={resetPass}>재설정</button>
                            {type === 'id' && (<Link to="/loginForm">로그인으로 돌아가기</Link>)}
                        </div>
                    </div>
                )}

                {(step === 5 && type === 'id') &&
                    (<div className="passwordContent">
                        <div className="passLeft">
                            <h2>본인 아이디</h2>
                            <p>WePlan 계정 아이디</p>
                        </div>
                        <div className="passRight">
                            {!shouldHideEmailChangeButton() ? (
                                <>
                                <p className='rightP'>WePlan 계정 아이디는 {userInput.user_id} 입니다.</p>
                                <a href="#" onClick={(e) => { e.preventDefault(); handleNextStep(); }}>패스워드 재설정하시겠습니까?</a>
                                </>
                            ):(
                                <>
                                <p className='rightP'>당신은 {shouldHideEmailChangeButton()} 소셜 로그인 회원입니다.</p>
                                </>
                            )}
                            <Link to="/loginForm">로그인으로 돌아가기</Link>
                        </div>
                    </div>
                )}

                {step === 6 && (
                    <div className="passwordContent">
                        <div className="passLeft">
                            <h2>패스워드 재설정</h2>
                            <p className='rightP'>WePlan 계정 패스워드를 재설정 합니다.</p>
                        </div>
                        <div className="passRight">
                            <input type="password" placeholder="패스워드" name="password" value={userInput.password} onChange={handleInputChange} /><br/>
                            <input type="password" placeholder="패스워드 확인" ref={confirmPw} /><br/>
                            <button type="submit" className="resetButton" onClick={resetPass}>재설정</button>
                            {type === 'id' && (<Link to="/loginForm">로그인으로 돌아가기</Link>)}
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}

export default PasswordReset;
