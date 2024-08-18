import './Button.css'

//text : 버튼내용, type: 버튼색상, onClick :이벤트기능
const Button = ({ text, type, onClick, className, themeColor }) => {
  return (
    <button
      onClick={onClick}
      className={`button button_${type} ${className}`}
      style={{ color: themeColor }}
    >{text}</button>
  );
};
export default Button;