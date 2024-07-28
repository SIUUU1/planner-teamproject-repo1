import './Button.css'

//text : 버튼내용, type: 버튼색상, onClick :이벤트기능
const Button = ({ text, type, onClick }) => {
  return (
  <button
  onClick={onClick}
  className={`button button_${type}`}
  >
  {text}
  </button>
  );
  };
  export default Button;