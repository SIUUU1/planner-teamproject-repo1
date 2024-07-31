import './TodoItem.css'
import Button from "../components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";
// import { TodoStateContext } from '../App';
// const { todoData } = useContext(TodoStateContext);
// const { todoEmoji } = useContext(TodoStateContext);
// const { emoji } = useContext(TodoStateContext);
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
  },
  {
    "todoNo":3,
    "userNo":1,
    "todoTitle":"운동하기",
    "isDone": "N",
    "regDate": "2024-07-31",
  },
]
const TodoItem= ({todoNo,clickEvent})=>{
  let data=todoData.find((i)=>i.todoNo===todoNo);
  return(
    <div className="todoItem">
      <input type="checkbox" className={data.todoNo}/>
      <div className="todoInput">
        <input type="text" className="todoTitle" value={data.todoTitle} onClick={clickEvent} readOnly/>
        <div className='btnIcon'>
          <FontAwesomeIcon icon={faPencil} id='pencil'/>
          <FontAwesomeIcon icon={faX} id='del'/>
        </div>
      </div>
      
      
    </div>
  );
};
export default TodoItem;