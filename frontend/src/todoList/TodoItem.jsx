import './TodoItem.css';
import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faX } from "@fortawesome/free-solid-svg-icons";
import useSendPost from '../util/useSendPost';

const TodoItem = ({ todoNo, todoData, clickEvent }) => {
  const [localData, setLocalData] = useState(todoData.find((i) => i.todo_no === todoNo));

  const { postRequest, loading, error } = useSendPost(
    'http://localhost:8080/api/user/todos/updateState',
    { todo_no: localData.todo_no, is_done: localData.is_done },
    'json'
  );

  const handleCheckboxClick = async () => {
    const newStatus = localData.is_done === 'Y' ? 'N' : 'Y';

    try {
      setLocalData((prevData) => ({
        ...prevData,
        is_done: newStatus
      }));
      await postRequest({ todo_no: localData.todo_no, is_done: newStatus });
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div className="todoItem">
      <input
        type="checkbox"
        className={localData.todo_no}
        checked={localData.is_done === 'Y'}
        onChange={handleCheckboxClick}
        disabled={loading}
      />
      <div className="todoInput">
        <input
          type="text"
          className="todoTitle"
          value={localData.todo_title}
          onClick={clickEvent}
          readOnly
        />
        <div className='btnIcon'>
          <FontAwesomeIcon icon={faPencil} id='pencil' />
          <FontAwesomeIcon icon={faX} id='del' />
        </div>
      </div>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default TodoItem;