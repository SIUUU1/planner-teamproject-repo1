import './TodoMain.css'
import useMove from "../util/useMove";
import Header from '../components/Header';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faBars, faUserGroup, faChartSimple, faRightFromBracket, faPaperPlane, faAnglesLeft, faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import Button from '../components/Button';
import DateNav from '../components/DateNav';
import TodoItem from './TodoItem';

const todoData = [
  {
    "todo_no": 0,
    "user_no": 1,
    "todo_title": "스트레칭하기",
    "is_done": "N",
    "reg_date": "2024-07-30",
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

const TodoMain = () => {
  const { type, date } = useParams();
  const moveToDetail = useMove; // useMove 훅 호출
  let data;

  if (type === 'my') {
    data = todoData.filter(i => i.type === 'my' && i.reg_date === date);
  } else if (type === 'team') {
    data = todoData.filter(i => i.type === 'team' && i.reg_date === date);
  }

  return (
    <div className='todoMain'>
      <div className='todoMainContent backWhite'>
        <div className='todoDate'>
          <DateNav
            firstChild={<Button text={<FontAwesomeIcon icon={faAnglesLeft} />} />}
            title={'2024-07-22'}
            secondChild={<Button text={<FontAwesomeIcon icon={faAnglesRight} />} />}
          />
        </div>
        <div className='todoItemList'>
          {data.map((i) => (
            <TodoItem
              key={i.todo_no}
              todoNo={i.todo_no}
              clickEvent={moveToDetail(`/todoDetail/${i.todo_no}/${type}/${date}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodoMain;
