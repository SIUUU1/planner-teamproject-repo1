import React, {useState} from "react";
import './PaymentComponent.css'
import useMove from '../util/useMove';
import Button from '../components/Button'

const PaymentComponent = ({
  // payInfo, url
}) => {
  const onMove = useMove('/');
  const url = 'http://localhost:8080/api/pay/emojiPay'; //emojiPay 또는 proPay
  const payInfo={
    user_no:1,
    user_id: 'aaa',
    item_id: 'asdfasdf', //상품아이디는 문자
    user_name: 'hong',
    user_email: 'aaa@gmail.com',
    user_tel: '010-1111-1111',
    price: 101,
  };

  // 결제 처리 Api
  const Payment = (e) => {

    const { IMP } = window;
    if (!IMP) {
      console.error("IMP 객체를 찾을 수 없습니다.");
      return;
    }

    IMP.init("imp19424728"); // 가맹점 식별코드

    const data = {
      pg: 'html5_inicis', // 기본 테스트용 PG사
      pay_method: 'card',
      merchant_uid: `mid${new Date().getTime()}`, // 결제사이트 필수요소 
      amount: payInfo.price,
      buyer_email: payInfo.user_email,
      buyer_name: payInfo.user_name,
      buyer_tel: payInfo.user_tel,
    };

    console.log("결제 요청 데이터:", data);

    IMP.request_pay(data, (response) => {
      console.log("결제 응답:", response);
      if (response.success) {
        completePay(); //결제등록
        alert("결제에 성공하였습니다.");
        onMove();
      } else {
        alert("결제에 실패하였습니다: " + response.error_msg);
      }
    });
  };

  // 결제 내역 등록
  const completePay = () => {
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payInfo)
    })
    .then(response => response.text())
    .then(data => {
      console.log(data);
      alert('결제등록완료');
    })
    .catch(error => console.error('Error:', error));
  };

  return(
     <><Button text={'결제하기'} onClick={Payment} className={'payBtn'}/></>
  );
};

export default PaymentComponent;
