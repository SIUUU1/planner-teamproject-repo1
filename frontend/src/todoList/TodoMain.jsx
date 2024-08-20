import './TodoMain.css'
import { useState, useEffect } from 'react';
import useMove from "../util/useMove";
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesLeft, faAnglesRight,faPlus } from "@fortawesome/free-solid-svg-icons";
import Button from '../components/Button';
import DateNav from '../components/DateNav';
import TodoItem from './TodoItem';
import useLoading from '../util/useLoading';
import dayjs from 'dayjs';
import useSendPost from '../util/useSendPost';

const TodoMain = () => {
  const { type, date, user_no } = useParams();
  const [isResigter,setIsResigter]=useState(false);
  const [todoTitle, setTodoTitle] = useState(''); 
  const [localData,setLocalData]=useState([]);
  const { postRequest } = useSendPost('http://localhost:8080/api/user/todos/register', {}, 'json');
  //사용자 정보를 가져옵니다.
  const { data: userData, loading: loadingUser, error: errorLoadingUser } = useLoading('http://localhost:8080/api/user/userInfo', 'json');

  const onClickResigter=()=>{
    setIsResigter(!isResigter);
  };
  const onClickSub = async () => {
    const newTodo = {
      todo_title: todoTitle,
      todo_date: date,
      type: 'my'
    };

    try {
      await postRequest(newTodo); // 서버에 POST 요청
      setIsResigter(false);
      setTodoTitle(''); // 입력 필드 초기화
    } catch (error) {
      console.error('Error adding todo:', error);
    }
    refetch();
  };

  // date가 주어지지 않았을 경우를 대비하여 기본값을 설정
  const currentDate = dayjs(date || dayjs().format('YYYY-MM-DD'));
  const previousDay = currentDate.subtract(1, 'day').format('YYYY-MM-DD');
  const nextDay = currentDate.add(1, 'day').format('YYYY-MM-DD');

  const onClickLeft = useMove(user_no ? `/todomain/${user_no}/${type}/${previousDay}`:`/todomain/${type}/${previousDay}`) ;
  const onClickRight = useMove(user_no ? `/todomain/${user_no}/${type}/${nextDay}`: `/todomain/${type}/${nextDay}`);
  
  // user_id 유무에 따라 다른 URL을 설정
   const apiUrl = user_no 
   ? `http://localhost:8080/api/user/todos/searchUser?todo_date=${date}&user_no=${user_no}`
   : `http://localhost:8080/api/user/todos/search?todo_date=${date}`;

  // todo 데이터 로드
  const { data: todoData, loading: loadingData, error: errorData, refetch } = useLoading(apiUrl, 'json');
  
  useEffect(() => {
    if (todoData) {
      if (type === 'my') {
        setLocalData(todoData.filter(i => i.type === 'my' && i.todo_date === date));
      } else if (type === 'team') {
        setLocalData(todoData.filter(i => i.type === 'team' && i.todo_date === date));
      }
    }
  }, [todoData, type, date]);
  
  // 로딩 중, 오류 처리
  if (loadingData) {
    return <div className='todoMain'><div className='todoMainContent backWhite'>Loading...</div></div>;
  }

  if (errorData) {
    return <div className='todoMain'><div className='todoMainContent backWhite'>Error: {errorData.message}</div></div>;
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
        <div className="isResigterTodo">
          {isResigter&&<Button text={<FontAwesomeIcon icon={faPlus} />} onClick={onClickResigter}/>}
        </div>
        {isResigter&&(<div className="resigterTodo">
          <input
            type="text"
            className="resigterTodoInput"
            placeholder='해야 할 일을 입력해주세요!'
            onChange={(e) => setTodoTitle(e.target.value)}
          />
          <Button text={'등록'} onClick={onClickSub} />
        </div>)}


        <div className='todoItemList'>
          {localData.map((i) => (
            <TodoItem
              key={i.todo_no}
              todoData={localData.find((e) => e.todo_no === i.todo_no)}
              clickEvent={`/todoDetail/${i.todo_no}/${type}/${date}`}
              refetch={refetch}
              userData={userData}
            />
          ))}
          {localData.length === 0 && <p className='noDataInfo'>아직 등록된 내용이 없습니다</p>}
        </div>
      </div>
    </div>
  );
};

export default TodoMain;
