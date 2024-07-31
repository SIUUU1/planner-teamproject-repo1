import './TodoMain.css'
import useMove from "../util/useMove";
import Header from '../components/Header';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell} from "@fortawesome/free-solid-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { faChartSimple } from "@fortawesome/free-solid-svg-icons";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { faAnglesLeft } from "@fortawesome/free-solid-svg-icons";
import { faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import Button from '../components/Button';
import DateNav from '../components/DateNav';
import TodoItem from './TodoItem';
const todoData=[
  {
    "todoNo":0,
    "userNo":1,
    "todoTitle":"스트레칭하기",
    "isDone": "N",
    "regDate": "2024-07-30",
  },
  {
    "todoNo":2,
    "userNo":1,
    "todoTitle":"다이소 다녀오기",
    "isDone": "N",
    "regDate": "2024-07-31",
    "type": "my",
  },
  {
    "todoNo":3,
    "userNo":1,
    "todoTitle":"운동하기",
    "isDone": "N",
    "regDate": "2024-07-31",
    "type": "my",
  },
]

const TodoMain =()=>{
  const { type,date } = useParams();
  let data;
  if(type=='my'){
    data=todoData.filter(i=>i.type==='my'&&i.regDate===date);

  }else if(type=='team'){
  }

  return(
    <div className='todoMain'>
      <div className='todoMainContent backWhite'>
        <div className='todoDate'>
            <DateNav firstChild={<Button text={<FontAwesomeIcon icon={faAnglesLeft}/>}/>} 
            title={'2024-07-22'}
            secondChild={<Button text={<FontAwesomeIcon icon={faAnglesRight}/>}/>}/>
        </div>
        <div className='todoItemList'>
            {data.map((i)=>{return<TodoItem todoNo={i.todoNo} clickEvent={useMove(`/todoDetail/${i.todoNo}/${type}/${date}`)}></TodoItem>})}
        </div>
      </div>
    </div>
  );
  };
  export default TodoMain;