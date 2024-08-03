import './CheerLeader.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import ProfileLink from '../components/ProfileLink';
const CheerLeader = ({ user_no, user_nickname }) => {
  return (
    <div className="cheerLeader">
      <ProfileLink user_no={user_no} user_nickname={user_nickname}></ProfileLink>
      <FontAwesomeIcon icon={faTrashCan} />
    </div>
  );
};

export default CheerLeader; 