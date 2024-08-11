import './TodoItem.css';
import { useState ,useEffect} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faX } from "@fortawesome/free-solid-svg-icons";
import useSendPost from '../util/useSendPost';
import useMove from '../util/useMove';
import Button from '../components/Button';

const TodoItem = ({todoData, clickEvent, refetch, userData }) => {
  const onClick = useMove(clickEvent);
  const [localData, setLocalData] = useState(todoData);
  const [isCreater,setIsCreater]=useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todoData.todo_title);

  useEffect(() => {
    if (userData && userData.user_no) {
      setIsCreater(todoData.user_no === userData.user_no);
    }
  }, [userData, todoData.user_no]);


  const updateStateRequest = useSendPost(
    'http://localhost:8080/api/user/todos/updateState',
    { todo_no: localData.todo_no, is_done: localData.is_done },
    'json'
  );

  const {postRequest: updateRequest, error:updateError} = useSendPost(
    'http://localhost:8080/api/user/todos/update',
    {},
    'json'
  );
  const deleteRequest = useSendPost(
    'http://localhost:8080/api/user/todos/delete',
    { todo_no: localData.todo_no },
    'json'
  );

  const { postRequest, loading, error } = updateStateRequest;
  const { postRequest: postRequestDel, loading: loadingDel, error: errorDel } = deleteRequest;

  const onclickEdit=  () => {
    setIsEditing(true);
  };
  const updateClick=async()=>{
    const updatedData = {
      todo_no: todoData.todo_no,
      todo_title: newTitle
    };
    await updateRequest(updatedData);
    setIsEditing(false);
    
    if (!updateError) {
      refetch();
    }

  }
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
      // window.location.reload();
      refetch();
  };

  const onclickDel = async () => {
    try {
      await postRequestDel({ todo_no: localData.todo_no });
    } catch (error) {
      console.error("Error delete:", error);
    }
    refetch();
  };

  return (
    <div className="todoItem">
      <input
        type="checkbox"
        className={localData.todo_no}
        checked={localData.is_done === 'Y'}
        onChange={handleCheckboxClick}
        disabled={!isCreater || loading}
      />
      <div className="todoInput">
        <input
          type="text"
          className="todoTitle"
          value={newTitle}
          onClick={!isEditing&&onClick}
          readOnly={!isEditing}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        {isCreater&&<div className='btnIcon'>
          {isEditing ? (
            <Button className='updateBtn' onClick={updateClick} text={'수정'}></Button>
            ):(<FontAwesomeIcon icon={faPencil} id='pencil'  onClick={onclickEdit}/>)}
          <FontAwesomeIcon icon={faX} id='del' onClick={onclickDel}/>
        </div>}
      </div>
      {(error || errorDel) && <p className="error">{error || errorDel}</p>}
    </div>
  );
};

export default TodoItem;
