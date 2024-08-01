import './TodoItem.css'
import Button from "../components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";

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
  },
  {
    "todo_no": 3,
    "user_no": 1,
    "todo_title": "운동하기",
    "is_done": "N",
    "reg_date": "2024-07-31",
  },
]

const TodoItem = ({ todoNo, clickEvent }) => {
  let data = todoData.find((i) => i.todo_no === todoNo);
  return (
    <div className="todoItem">
      <input type="checkbox" className={data.todo_no} />
      <div className="todoInput">
        <input type="text" className="todoTitle" value={data.todo_title} onClick={clickEvent} readOnly />
        <div className='btnIcon'>
          <FontAwesomeIcon icon={faPencil} id='pencil' />
          <FontAwesomeIcon icon={faX} id='del' />
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
