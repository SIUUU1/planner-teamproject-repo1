import './CheeringEmoji.css';
import EmojiItem from '../emoji/EmojiItem';
import CheerLeader from './CheerLeader';
import useCheckEmojiType from '../util/useCheckEmojiType';

const cheeringData = [

]
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
  {
    "profile_id": 2,
    "user_no": 2,
    "user_nickname": "유저3",
    "image_url": "어쩌구 주소",
    "reg_date": "2024-01-01",
    "update_date": "2024-01-01",
  },
  {
    "profile_id": 3,
    "user_no": 3,
    "user_nickname": "유저4",
    "image_url": "어쩌구 주소",
    "reg_date": "2024-01-01",
    "update_date": "2024-01-01",
  },
  {
    "profile_id": 4,
    "user_no": 4,
    "user_nickname": "유저5",
    "image_url": "어쩌구 주소",
    "reg_date": "2024-01-01",
    "update_date": "2024-01-01",
  },
];
const CheeringEmoji = ({ data, user_no }) => {
  // const emoji = emojiData.find(e => e.emoji_item_no === data.emoji_item_no);
  const user = userProfileData.find(e => e.user_no === user_no);
  const emoji_item_url = useCheckEmojiType(data, emojiData);


  // if (!emoji) {
  //   console.error('Invalid emoji_item_no:', data.emoji_item_no);
  //   return <div className="cheeringEmoji">이모티콘을 찾을 수 없습니다.</div>;
  // }

  if (!user) {
    console.error('Invalid user_no:', user_no);
    return <div className="cheeringEmoji">유저 정보를 찾을 수 없습니다.</div>;
  }


  return (
    <div className="cheeringEmoji">
      <EmojiItem emoji_item_url={emoji_item_url} customHeight={'22px'} />
      <CheerLeader user_no={user.user_no} user_nickname={user.user_nickname} />
    </div>
  );
};

export default CheeringEmoji;