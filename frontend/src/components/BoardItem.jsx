import './BoardItem.css'
import { useNavigate } from 'react-router-dom';

const BoardItem =({ board, user_id, group_id })=>{
  const nav = useNavigate();
  const onClick = async (no) => {
    await incrementReadCount(no);
    let apiUrl=''
    if(user_id){
      apiUrl=`/boarddetail/${no}/${user_id}`;
    }
    else if(group_id){
      apiUrl=`/boarddetail/group/${no}/${group_id}`;
    }
    else {
      apiUrl=`/boarddetail/${no}`;
    }
    nav(apiUrl);
  };

  const incrementReadCount = async (no) => {
    try {
      await fetch(`http://localhost:8080/api/board/readCount/${no}`, {
        method: 'GET',
      });
      //refetchBoardData();
    } catch (error) {
      console.error('Failed to increment read count', error);
    }
  };

   // 텍스트가 30자를 넘을 경우 자르고 '...'을 추가
  const truncateContent = (content) => {
    // 임시 div 요소를 생성하여 HTML을 텍스트로 변환
    const div = document.createElement('div');
    div.innerHTML = content;
    const textContent = div.textContent || div.innerText || "";
   
    if (textContent.length > 30) {
      return `${textContent.substring(0, 30)}...`;
    }
    return textContent;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return(
    <>
       <div className="boardItem" onClick={() => onClick(board.no)}>
          <div className="boardItemSubject"><span>{board.subject}</span> {formatDate(board.reg_date)} &middot; {board.category}</div>
          <div>{truncateContent(board.content)}</div>
      </div>
    </>
  );
};
export default BoardItem;