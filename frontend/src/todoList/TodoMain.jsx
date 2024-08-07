import './TodoMain.css'
import useMove from "../util/useMove";
import Header from '../components/Header';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faBars, faUserGroup, faChartSimple, faRightFromBracket, faPaperPlane, faAnglesLeft, faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import Button from '../components/Button';
import DateNav from '../components/DateNav';
import TodoItem from './TodoItem';
import useLoading from '../util/useLoading';
import dayjs from 'dayjs';

const TodoMain = () => {
  const moveToDetail = useMove(); // useMove 훅 호출
  const { type, date } = useParams();

  // date가 주어지지 않았을 경우를 대비하여 기본값을 설정
  const currentDate = dayjs(date || dayjs().format('YYYY-MM-DD'));
  const previousDay = currentDate.subtract(1, 'day').format('YYYY-MM-DD');
  const nextDay = currentDate.add(1, 'day').format('YYYY-MM-DD');

  const onClickLeft = useMove(`/todomain/${type}/${previousDay}`);
  const onClickRight = useMove(`/todomain/${type}/${nextDay}`);
  // todo 데이터 로드
  const { data: todoData, loading: loadingdata, error: errordata } = useLoading(`http://localhost:8080/api/user/todos/search?reg_date=${date}`, 'json');
  // 로딩 중, 오류 처리
  if (loadingdata) {
    return <div>Loading...</div>;
}

if (errordata) {
    return <div>Error: {errordata.message}</div>;
}

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
            firstChild={<Button text={<FontAwesomeIcon icon={faAnglesLeft} onClick={onClickLeft}/>} />}
            title={date}
            secondChild={<Button text={<FontAwesomeIcon icon={faAnglesRight} onClick={onClickRight}/>} />}
          />
        </div>
        <div className='todoItemList'>
          {data.map((i) => (
            <TodoItem
              key={i.todo_no}
              todoNo={i.todo_no}
              todoData={todoData}
              clickEvent={()=>moveToDetail(`/todoDetail/${i.todo_no}/${type}/${date}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodoMain;
