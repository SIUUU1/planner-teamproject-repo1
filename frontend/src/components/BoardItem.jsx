import './BoardItem.css'
import { useNavigate } from 'react-router-dom';

const BoardItem =({ board, user_id })=>{
  const nav = useNavigate();
  const onClick = async (no) => {
    await incrementReadCount(no);
    const apiUrl = user_id 
  ? `/boarddetail/${no}/${user_id}`
  : `/boarddetail/${no}`;
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

   // 텍스트가 20자를 넘을 경우 자르고 '...'을 추가
  const truncateContent = (content) => {
    // 임시 div 요소를 생성하여 HTML을 텍스트로 변환
    const div = document.createElement('div');
    div.innerHTML = content;
    const textContent = div.textContent || div.innerText || "";
   
    if (textContent.length > 20) {
      return `${textContent.substring(0, 20)}...`;
    }
    return textContent;
  };

  return(
    <>
       <div className="boardItem" onClick={() => onClick(board.no)}>
          <div className="boardItemSubject">{board.subject}</div>
          <div dangerouslySetInnerHTML={{ __html: truncateContent(board.content) }}/>
      </div>
    </>
  );
};
export default BoardItem;