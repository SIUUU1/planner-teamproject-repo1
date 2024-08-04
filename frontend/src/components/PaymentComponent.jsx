import React, { useState} from 'react';

const PaymentComponent = ({ emoji_group_id, price }) => {
  const [response, setResponse] = useState(null);
  IMP.init("imp22776507");

  const requestPay = () => {
    const data = {
      pg: "{PG사 코드}.{상점 ID}",
      pay_method: "card",
      merchant_uid: `payment-${crypto.randomUUID()}`, // 주문 고유 번호
      name: "노르웨이 회전 의자",
      amount: price,
      buyer_email: "gildong@gmail.com",
      buyer_name: "홍길동",
      buyer_tel: "010-4242-4242",
      buyer_addr: "서울특별시 강남구 신사동",
      buyer_postcode: "01181",
    };
    
    IMP.request_pay(data, async (response) => { // param을 올바르게 전달
      if (response.error_code != null) {
        return alert(`결제에 실패하였습니다. 에러 내용: ${response.error_msg}`);
      }
      // 고객사 서버에서 /payment/complete 엔드포인트를 구현해야 합니다.
      const notified = await fetch(`http://localhost:8080/api/payment/complete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // imp_uid와 merchant_uid, 주문 정보를 서버에 전달합니다
        body: JSON.stringify({
          imp_uid: response.imp_uid,
          merchant_uid: response.merchant_uid,
          // 추가적인 주문 정보가 필요하다면 여기에 포함
        }),
      });
      
      if (!notified.ok) {
        console.error('Failed to notify server');
      }

      const result = await notified.json();
      setResponse(result);
    });
  };

  

  // const Pay = async () => {
  //   try {
  //     const response = await fetch(`http://localhost:8080/api/payments/prepare?emoji_group_id=${emoji_group_id}&price=${price}`, {
  //       method: 'POST'
  //     });

  //     if (!response.ok) {
  //       throw new Error('Payment preparation failed');
  //     }

  //     const data = await response.json();
  //     setResponse(data);
  //   } catch (error) {
  //     console.error('Payment preparation failed', error);
  //     setResponse({ error: error.message });
  //   }
  // };

  return (
    <div className='paymentComponent'>
      <h1>Payment Request</h1>
      <button onClick={requestPay}>Prepare Payment</button>
      {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
    </div>
  );
};

export default PaymentComponent;
