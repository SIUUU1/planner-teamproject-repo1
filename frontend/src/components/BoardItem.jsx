import './BoardItem.css'
import { useNavigate } from 'react-router-dom';

const BoardItem =({ board })=>{
  const nav = useNavigate();
  const onClick = async (no) => {
    await incrementReadCount(no);
    nav(`/boarddetail/${no}`);
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

  const truncateContent = (content) => {
    // 텍스트를 먼저 추출한 후 자릅니다.
    const div = document.createElement('div');
    div.innerHTML = content;
    const textContent = div.textContent || div.innerText || "";

    // 텍스트가 20자를 넘을 경우 자르고, HTML 구조를 유지한 상태로 반환합니다.
    if (textContent.length > 20) {
      const truncatedText = `${textContent.substring(0, 20)}...`;
      return truncatedText;
    }
    return content; // 텍스트가 20자 이하라면 그대로 반환
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