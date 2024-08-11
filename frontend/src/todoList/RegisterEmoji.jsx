import { useState,useEffect } from 'react';
import './RegisterEmoji.css';
import EmojiPicker from 'emoji-picker-react'
import useSendPost from '../util/useSendPost';
import EmojiItem from '../emoji/EmojiItem';
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
const categories = [
  {
    category: 'suggested',
    name: 'Recently Used'
  },
  {
    category: 'custom',
    name: 'defualt'
  },
  {
    category: 'smileys_people',
    name: 'smileys&people'
  },
  {
    category: 'animals_nature',
    name: 'animals&nature'
  },
  {
    category: 'food_drink',
    name: 'food&drink'
  },
  {
    category: 'travel_places',
    name: 'travel&places'
  },
  {
    category: 'activities',
    name: 'activities'
  },
  {
    category: 'objects',
    name: 'objects'
  },
  {
    category: 'symbols',
    name: 'default'
  },
  {
    category: 'flags',
    name: 'flags'
  },

];
const RegisterEmoji = ({userData,todoNo,refetchEmoji}) => {
  const { postRequest: addRequest, loading: registerLoading, error: registerError } = useSendPost(`http://localhost:8080/api/user/todos/cheering-emojis`, {});
  const modifiedData = emojiData.map(item => ({
    ...item,
    id: `custom_${item.emoji_item_no}`,
    names: ["",],
    imgUrl: item.emoji_item_url,

  }));
  // const [newEmoji, setNewEmoji] = useState("")
  const [newEmojiUrl, setNewEmojiUrl] = useState("")
  const [showPicker, setShowPicker] = useState(true);
  // const [selectedEmoji, setSelectedEmoji] = useState(null);

useEffect(() => {
  if (newEmojiUrl) {
    const sendData = async () => {
      const newData = {
        todo_no: todoNo,
        user_id: userData.user_id,
        emoji_item_url: newEmojiUrl,
      };
      
      try {
        await addRequest(newData);
        if (!registerError) {
          refetchEmoji();
        }
      } catch (error) {
        console.error('Error sending emoji data:', error);
      }
    };

    sendData();
  }
}, [newEmojiUrl]);

const onEmojiClick = (emojiObject) => {
  setNewEmojiUrl(emojiObject.getImageUrl);
  setShowPicker(false);
};
  return (
    <div className="registerEmoji">
      {showPicker && ( // showPicker가 true일 때만 EmojiPicker를 보여줌
        <EmojiPicker emojiStyle={"apple"} onEmojiClick={onEmojiClick} categories={categories} customEmojis={modifiedData} />
      )}
    </div>
  );
};

export default RegisterEmoji;