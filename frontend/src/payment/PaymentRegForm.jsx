import PaymentComponent from "../components/PaymentComponent";
import React, { useState, useEffect} from 'react';

const PaymentRegForm = ()=>{
  // IMP.init("imp22776507");
  // const [emoji_group_id, setEmoji_group_id] = useState(null);
  // const [price, setPrice] = useState(null);
  const emoji_group_id = 'order_id_1234';  // 전달할 값
  const price = 1000;  // 전달할 값

  return(
  <div className="paymentRegForm">
   선택한 상품 보여주기 상품보여주기 useEffect
   <PaymentComponent emoji_group_id={emoji_group_id} price={price}/>
  </div>
  );
};
export default PaymentRegForm;