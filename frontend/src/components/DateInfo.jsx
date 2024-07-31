import "./DateInfo.css";
const DateInfo = ({ title, firstChild}) => {
return (
<div className="dateInfo">
      <div className='dateInfoFirstChild'>{firstChild}</div>
      <div className='dateInfoTitle'>{title}</div>
</div>
);
};
export default DateInfo;