import './CheeringEmoji.css';
import EmojiItem from '../emoji/EmojiItem';
import CheerLeader from './CheerLeader';
import useCheckEmojiType from '../util/useCheckEmojiType';
import { useState } from 'react';
const CheeringEmoji = ({ data, userData ,refetchEmoji}) => {
  const[isCreater,setIsCreater]=useState(data.user_id===userData.user_id);
  if (!userData) {
    console.error('Invalid user_no:', userData);
    return <div className="cheeringEmoji">유저 정보를 찾을 수 없습니다.</div>;
  }


  return (
    <div className="cheeringEmoji">
      <EmojiItem emoji_item_url={data.emoji_item_url} customHeight={'22px'} />
      <CheerLeader data={data} userData={userData} isCreater={isCreater} refetchEmoji={refetchEmoji}/>
    </div>
  );
};

export default CheeringEmoji;