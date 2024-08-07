import './TodoItem.css'
import Button from "../components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";



const TodoItem = ({ todoNo, todoData, clickEvent }) => {
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
