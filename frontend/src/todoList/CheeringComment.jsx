import './CheeringComment.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";
import ProfileLink from '../components/ProfileLink';

const userProfileData = [
  {
    "profile_id": 0,
    "user_no": 0,
    "user_nickname": "유저1",
    "image_url": "어쩌구 주소",
    "reg_date": "2024-01-01",
    "update_date": "2024-01-01",
  },
  {
    "profile_id": 1,
    "user_no": 1,
    "user_nickname": "유저2",
    "image_url": "어쩌구 주소",
    "reg_date": "2024-01-01",
    "update_date": "2024-01-01",
  },
];

const CheeringComment = ({ commentData }) => {
  const modifiedData = userProfileData.find(i => i.user_no === commentData.user_no);
  return (
    <div className="cheeringComment">
      <ProfileLink user_nickname={modifiedData?.user_nickname} user_no={commentData.user_no}></ProfileLink>
      <input className='comment' value={commentData.todo_comment_content} readOnly />
      <div className='btnIcon'>
        <FontAwesomeIcon icon={faPencil} id='pencil' />
        <FontAwesomeIcon icon={faX} id='del' />
      </div>
    </div>
  );
};

export default CheeringComment;