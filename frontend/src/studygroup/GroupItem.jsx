const GroupItem =({ group, onClick })=>{
  let src='/images/cat1.jpg';
  if(group.image_url){
    src=`http://localhost:8080/static/images/group/${group.image_url}`;
  }
  return(
    <>
    <div className="groupItem" onClick={() => onClick(group)}>
      <img src={src} className="groupImage" />
      <div className="groupContent">
        <h3 className="groupName">{group.group_name}</h3>
        <div className="groupTags">{group.group_goal}</div>
        <div className="groupTags">{group.group_notice}</div>
        <div className="groupStats">
          <p>인원수: {group.groupone_count}</p>
        </div>
      </div>
    </div>
    </>
  );
};
export default GroupItem;