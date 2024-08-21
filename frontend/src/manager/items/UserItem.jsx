const UserItem=({data})=>{
  return(
    <div className="userItem">
      <span>{data.user_id}</span>
      <span>{data.user_name}</span>
      <span>{data.role}</span>
      <span>{data.user_nickname}</span>
      <span>{data.reg_date.split('T')[0]}</span>
      <span>{data.user_tel}</span>
      <span>{data.user_email}</span>
      <span>{data.user_gender}</span>
      <span>{data.user_birthday.split('T')[0]}</span>
    </div>
  );
};
export default UserItem;
