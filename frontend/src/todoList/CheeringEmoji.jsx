import './CheeringEmoji.css';
import EmojiItem from '../emoji/EmojiItem';
import CheerLeader from './CheerLeader';

const cheeringData =[

]
const emojiData=[
  {

  },
]
const CheeringEmoji=()=>{

  
  return(
    <div className="cheeringEmoji">
      <EmojiItem EMOJIITEMURL={'http://localhost:8080/static/images/emoji/default/default1.png'} customHeight={'22px'}/>
      <CheerLeader/>
    </div>
  );
};

export default CheeringEmoji;