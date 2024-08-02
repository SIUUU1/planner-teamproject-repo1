import { useState } from 'react';
import './CheeringComment.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";
import ProfileLink from '../components/ProfileLink';
import EmojiItem from '../emoji/EmojiItem';
import useCheckEmojiType from '../util/useCheckEmojiType';

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
const emojiData = [
  {
    "emoji_item_no": 0,
    "emoji_item_url": 'http://localhost:8080/static/images/emoji/default/default1.png',
  },
  {
    "emoji_item_no": 1,
    "emoji_item_url": 'http://localhost:8080/static/images/emoji/default/default2.png',
  },
  {
    "emoji_item_no": 2,
    "emoji_item_url": 'http://localhost:8080/static/images/emoji/default/default3.png',
  },
  {
    "emoji_item_no": 3,
    "emoji_item_url": 'http://localhost:8080/static/images/emoji/default/default4.png',
  },
];

const CheeringComment = ({ commentData }) => {
  const [isEmojiNull, setIsEmojiNull] = useState(commentData.emoji_item_url !== null || commentData.emoji_no !== null);
  const modifiedData = userProfileData.find(i => i.user_no === commentData.user_no);

  const emoji_item_url = useCheckEmojiType(commentData, emojiData)
  return (
    <div className="cheeringComment">
      <div className="cheeringCommentText">
        <ProfileLink user_nickname={modifiedData?.user_nickname} user_no={commentData.user_no}></ProfileLink>
        <input className='comment' value={commentData.todo_comment_content} readOnly />
        <div className='btnIcon'>
          <FontAwesomeIcon icon={faPencil} id='pencil' />
          <FontAwesomeIcon icon={faX} id='del' />
        </div>
      </div>
      {isEmojiNull && <EmojiItem emoji_item_url={emoji_item_url} customHeight={50}></EmojiItem>}
    </div>
  );
};

export default CheeringComment;