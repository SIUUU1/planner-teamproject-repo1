
const GroupBestItem =({ group, onClick, index })=>{
  let src='/images/cat1.jpg';
  if(group.image_url){
    src=`http://localhost:8080/static/images/group/${group.image_url}`;
  }
  return(
    <>
       <div className="missionCard" onClick={() => onClick(group)}>
              <div className="missionInfo">
                <div className="missionTime">{index}</div>
                  <img src={src} className="missionImg"/>
                <div className="missionTag">{group.group_name}</div>
                <div className="missionTag">{group.group_notice}</div>
              </div>
            </div>
    </>
  );
};
export default GroupBestItem;