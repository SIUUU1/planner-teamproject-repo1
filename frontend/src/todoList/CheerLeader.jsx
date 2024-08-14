import './CheerLeader.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import ProfileLink from '../components/ProfileLink';
import useSendPost from '../util/useSendPost';
import Button from '../components/Button';
const CheerLeader = ({data, userData, isCreater,refetchEmoji }) => {
  const { postRequest: delRequest, loading: delLoading, error: delError } = useSendPost(`http://localhost:8080/api/user/todos/cheering-emojis/delete`, {});
  const onClickDel= async ()=>{
    await delRequest(data);
    if (!delError) {
      refetchEmoji();
    }
  }
  return (
    <div className="cheerLeader backWhite">
      <ProfileLink user_id={userData.user_id} user_nickname={userData.user_nickname}></ProfileLink>
      {isCreater&& <Button text={<FontAwesomeIcon icon={faTrashCan} className={'trashCanBtn'}/>} onClick={onClickDel} />}
    </div>
  );
};

export default CheerLeader; 