import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import './PaymentComponent.css'

const PaymentComponent = ({
  // payInfo,
}) => {
  const navigate = useNavigate();
  const payInfo={
    user_no:1,
    user_id: 'aaa',
    user_name: 'hong',
    user_email: 'aaa@gmail.com',
    user_tel: '010-1111-1111',
    item_id: 'asdfasdf',
    price: 101,
  };

  const handlePayment = (e) => {

    const { IMP } = window;
    if (!IMP) {
      console.error("IMP 객체를 찾을 수 없습니다.");
      return;
    }

    IMP.init("imp19424728"); // 가맹점 식별코드

    const data = {
      pg: 'html5_inicis', // 기본 테스트용 PG사
      pay_method: 'card',
      merchant_uid: `mid${new Date().getTime()}`,
      amount: payInfo.price,
      buyer_email: payInfo.user_email,
      buyer_name: payInfo.user_name,
      buyer_tel: payInfo.user_tel,
    };

    console.log("결제 요청 데이터:", data);

    IMP.request_pay(data, (response) => {
      console.log("결제 응답:", response);
      if (response.success) {
       
        alert("결제에 성공하였습니다.");
        navigate(`/mypage/${userNo}`);
      } else {
        alert("결제에 실패하였습니다: " + response.error_msg);
      }
    });
  };

  return(
     <div className="paymentComponent">
      <h2>결제하기</h2>
      <div className="paymentMethods">
        <button name="card" onClick={handlePayment}>결제하기</button>
      </div>
    </div>
  );
};

export default PaymentComponent;
