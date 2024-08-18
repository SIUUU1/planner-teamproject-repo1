import './Button.css'

//text : 버튼내용, type: 버튼색상, onClick :이벤트기능
const Button = ({ text, type, onClick, className, textColor, textHoverColor = '#000' }) => {
  return (
    <button
      onClick={onClick}
      className={`button button_${type} ${className}`}
      style={{
        '--text-color': textColor,
        '--hover-color': textHoverColor
      }}
    >{text}</button>
  );
};
export default Button;