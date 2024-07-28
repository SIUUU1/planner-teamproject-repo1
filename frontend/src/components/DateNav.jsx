import "./DateNav.css";
const DateNav = ({ title, firstChild, secondChild}) => {
return (
<div className="dateNav">
      <div className='dateNavFirstChild'>{firstChild}</div>
      <div className='dateNavTitle'>{title}</div>
      <div className='dateNavSecondChild'>{secondChild}</div>
</div>
);
};
export default DateNav;