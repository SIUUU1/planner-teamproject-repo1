import PaymentComponent from "../components/PaymentComponent";
import React, { useState, useEffect} from 'react';

const PaymentRegForm = ()=>{
  

  // useEffect(() => {
  //   fetch('http://localhost:8080/api/user', { credentials: 'include' })
  //     .then(response => response.json())
  //     .then(data => {
  //       // user_birthday를 YYYY-MM-DD 형식으로 변환
  //       const formattedBirthday = formatDateString(data.user_birthday);
  //       setUser({ ...user, ...data, user_birthday: formattedBirthday });
  //     })
  //     .catch(error => console.error('Error:', error));
  // }, []);

  return(
  <div className="paymentRegForm">
   선택한 상품 보여주기 상품보여주기 useEffect
   <PaymentComponent />
  </div>
  );
};
export default PaymentRegForm;