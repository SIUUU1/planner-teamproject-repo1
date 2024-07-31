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
      "todoNo": 0,
      "userNo": 1,
      "todoTitle": "스트레칭하기",
      "isDone": "N",
      "regDate": "2024-07-30",
      "type": "my",
    },
    {
      "todoNo": 2,
      "userNo": 1,
      "todoTitle": "다이소 다녀오기",
      "isDone": "N",
      "regDate": "2024-07-31",
      "type": "my",
    },
    {
      "todoNo": 3,
      "userNo": 1,
      "todoTitle": "운동하기",
      "isDone": "N",
      "regDate": "2024-07-31",
      "type": "my",
    },
  ];

  const { no, type,date } = useParams();
  const todoNo = parseInt(no, 10);
  const data = todoData.find(i => i.todoNo === todoNo);

  if (!data) {
    return <div className='todoDetail'><div className='todoDetailContent backWhite'>Todo not found</div></div>;
  }

  return (
    <div className='todoDetail'>
      <div className='todoDetailContent backWhite'>
        <ToBack URL={`/todomain/${type}/${date}`} />
        <div className='todoDate'>
          <DateInfo firstChild={<Button text={<FontAwesomeIcon icon={faCalendar} />} />} 
            title={data.regDate}
          />
        </div>
        <div className='todoDetailSection'>
          <TodoItem todoNo={data.todoNo} />
          <div className='cheeringEmojiList'>
            <CheeringEmoji />
            <CheeringEmoji />
          </div>
          <div className='cheeringCommentList'>
            <CheeringComment />
            <CheeringComment />
            <CheeringComment />
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
