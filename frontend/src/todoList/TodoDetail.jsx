import './TodoDetail.css';
import { useParams } from 'react-router-dom';
import DateInfo from '../components/DateInfo';
import Header from '../components/Header';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faBell, faBars, faUserGroup, faChartSimple, faRightFromBracket, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import Button from '../components/Button';
import TodoItem from './TodoItem';
import CheeringEmoji from './CheeringEmoji';
import CheeringComment from './CheeringComment.jsx';
import ToBack from '../components/ToBack';

const TodoDetail = () => {
  const todoData = [
    {
      "todo_no": 0,
      "user_no": 1,
      "todo_title": "스트레칭하기",
      "is_done": "N",
      "reg_date": "2024-07-30",
      "type": "my",
    },
    {
      "todo_no": 2,
      "user_no": 1,
      "todo_title": "다이소 다녀오기",
      "is_done": "N",
      "reg_date": "2024-07-31",
      "type": "my",
    },
    {
      "todo_no": 3,
      "user_no": 1,
      "todo_title": "운동하기",
      "is_done": "N",
      "reg_date": "2024-07-31",
      "type": "my",
    },
  ];

  const todoCommentData = [
    {
      "todo_comment_no": 0,
      "todo_no": 2,
      "user_no": 0,
      "todo_comment_content": "화이팅~",
      "reg_date": "2024-07-31 16:53:23",
    },
    {
      "todo_comment_no": 1,
      "todo_no": 2,
      "user_no": 1,
      "todo_comment_content": "화이팅~!!!",
      "reg_date": "2024-07-31 16:59:23",
    },
    {
      "todo_comment_no": 1,
      "todo_no": 4,
      "user_no": 1,
      "todo_comment_content": "화이팅~!!!",
      "reg_date": "2024-07-31 16:59:23",
    },
  ];

  const CheeringEmojiData = [
    {
      "cheering_emoji_no": 0,
      "emoji_item_no": 0,
      "user_no": 1,
      "todo_no": 2,
    },
    {
      "cheering_emoji_no": 1,
      "emoji_item_no": 1,
      "user_no": 1,
      "todo_no": 2,
    },
    {
      "cheering_emoji_no": 2,
      "emoji_item_no": 2,
      "user_no": 2,
      "todo_no": 2,
    },
    {
      "cheering_emoji_no": 3,
      "emoji_item_no": 3,
      "user_no": 3,
      "todo_no": 1,
    },
  ];

  const { no, type, date } = useParams();
  const todoNo = parseInt(no, 10);
  const data = todoData.find(i => i.todo_no === todoNo);
  const commentData = todoCommentData.filter(i => i.todo_no === todoNo);
  const emojiData = CheeringEmojiData.filter(e => e.todo_no == todoNo);

  if (!data) {
    return <div className='todoDetail'><div className='todoDetailContent backWhite'>Todo not found</div></div>;
  }

  return (
    <div className='todoDetail'>
      <div className='todoDetailContent backWhite'>
        <ToBack URL={`/todomain/${type}/${date}`} />
        <div className='todoDate'>
          <DateInfo firstChild={<Button text={<FontAwesomeIcon icon={faCalendar} />} />}
            title={data.reg_date}
          />
        </div>
        <div className='todoDetailSection'>
          <TodoItem todoNo={data.todo_no} />
          <div className='cheeringEmojiList'>
            {emojiData.map((e) => (
              <CheeringEmoji key={e.cheering_emoji_no} emoji_item_no={e.emoji_item_no} user_no={e.user_no} />
            ))}
          </div>
          <div className='cheeringCommentList'>
            {commentData.map((i) => (
              <CheeringComment key={i.todo_comment_no} commentData={i} />
            ))}
            <div className='commentRegister'>
              <input className='commentInput' placeholder='응원의 메세지를 남겨주세요!' />
              <Button text={'등록'} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoDetail;