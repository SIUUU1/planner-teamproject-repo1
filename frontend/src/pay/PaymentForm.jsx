import './PaymentForm.css'
import PaymentComponent from '../components/PaymentComponent'

const PaymentForm =()=>{
  return(
    <>
    <h3>Weplan Pro</h3>
    <p>당신의 삶을 계획하는 완벽한 파트너!</p>
    {/* Weplan과 함께라면, 당신의 목표는 결코 멀지 않습니다.
    더욱 효율적이고 의미 있는 일상을 경험할 수 있습니다. Weplan이 당신의 성공적인 삶을 응원합니다! */}
    <p>바쁜 일상 속에서 계획을 세우고, 목표를 달성하는 일이 어렵게 느껴지시나요? Weplan이 여러분의 일상에 새로운 변화를 가져다 드립니다. 
      이제는 고민할 필요 없이, Weplan 정기구독 서비스로 매달 체계적이고 효율적인 계획을 세워보세요!</p>
    <p>₩2900원에 새로운 테마와 디자인을 선택할 수 있습니다. 당신의 취향에 딱 맞는 플래너로 일상을 더 즐겁게 계획하세요.</p>
    <PaymentComponent type={'proPay'} item_id={'12123456'} price={2900}/>
    </>
  );
};
export default PaymentForm;