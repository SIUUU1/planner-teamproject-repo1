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
import {useUser} from '../contexts/UserContext'
import { useTheme } from '../contexts/ThemeContext';

const TodoMain = () => {
  const { type, date, user_no, user_id, group_id } = useParams();
  const {theme, updateTheme } = useTheme(); 
  const [isResigter,setIsResigter]=useState(false);
  const [isCreater,setIsCreater]=useState(false);
  const [todoTitle, setTodoTitle] = useState(''); 
  // const [localData,setLocalData]=useState([]);
  const { postRequest } = useSendPost('http://localhost:8080/api/user/todos/register', {}, 'json');
  const {user:userData} =useUser();
  // user_id에 따라 테마 업데이트
  useEffect(() => {
    if (user_id) {
      updateTheme('other', user_id);
    } else {
      updateTheme('user');
    }
  }, [user_id, updateTheme]);
  
  useEffect(() => {
    if (!user_no) {
      setIsCreater(true);
    }
  }, [user_no]);
  const onClickResigter=()=>{
    setIsResigter(!isResigter);
  };
  const onClickSub = async () => {
    const newTodo = {
      todo_title: todoTitle,
      todo_date: date,
      type: type.toLowerCase,
      group_id:group_id,
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

  // URL 생성 함수
  const createUrl = (direction, date) => {
    if (user_no) {
      return `/todomain/${user_no}/${type}/${date}`;
    } else if (group_id) {
      return `/${group_id}/todomain/${type}/${date}`;
    } else {
      return `/todomain/${type}/${date}`;
    }
  };

  // onClickLeft 및 onClickRight 함수 정의
  const onClickLeft = useMove(createUrl('left', previousDay));
  const onClickRight = useMove(createUrl('right', nextDay));

  // 공통된 부분
  const baseUrl = 'http://localhost:8080/api/user/todos/';

  // URL 구성
  let apiUrl;

  if (user_no) {
    apiUrl = `${baseUrl}searchUser?todo_date=${date}&user_no=${user_no}`;
  } else if (group_id) {
    apiUrl = `${baseUrl}searchGroup?todo_date=${date}&group_id=${group_id}`;
  } else {
    apiUrl = `${baseUrl}search?todo_date=${date}`;
  }

  // todo 데이터 로드
  const { data: todoData, loading: loadingData, error: errorData, refetch } = useLoading(apiUrl, 'json');
  
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
          {isCreater&&<Button text={<FontAwesomeIcon icon={faPlus} />} onClick={onClickResigter}/>}
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
          {todoData.map((i) => (
            <TodoItem
              key={i.todo_no}
              todoData={todoData.find((e) => e.todo_no === i.todo_no)}
              clickEvent={`/todoDetail/${i.todo_no}/${type}/${date}`}
              refetch={refetch}
              userData={userData}
            />
          ))}
          {todoData.length === 0 && <p className='noDataInfo'>아직 등록된 내용이 없습니다</p>}
        </div>
      </div>
    </div>
  );
};

export default TodoMain;
