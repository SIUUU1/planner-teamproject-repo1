
import { useState } from 'react';
import EmojiPicker from 'emoji-picker-react'
import EmojiItem from './EmojiItem';

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
const InputEmoji = ({ isInputEmojiVisible }) => {
  const modifiedData = emojiData.map(item => ({
    ...item,
    id: `custom_${item.emoji_item_no}`,
    names: [`custom_${item.emoji_item_no}`,],
    imgUrl: item.emoji_item_url,

  }));

  const [newEmoji, setNewEmoji] = useState("")
  const [newEmojiName, serNewEmojiName] = useState("")
  const [newInputEmojiUrl, setNewInputEmojiUrl] = useState("")
  const [showInputPicker, setShowInputPicker] = useState(isInputEmojiVisible);
  const onEmojiClick = (emojiObject) => {
    setNewEmoji(emojiObject)
    setNewInputEmojiUrl(emojiObject.getImageUrl)
    setShowInputPicker(false);
    serNewEmojiName(emojiObject.names)
  };

  return (
    <div className="inputEmoji">
      {showInputPicker && ( // showInputPicker true일 때만 EmojiPicker를 보여줌
        <EmojiPicker emojiStyle={"apple"} onEmojiClick={onEmojiClick} categories={categories} customEmojis={modifiedData} />
      )}
      {<EmojiItem emoji_item_url={newInputEmojiUrl} customHeight={50}></EmojiItem>}
      {newEmojiName}
    </div>
  )
}
export default InputEmoji;