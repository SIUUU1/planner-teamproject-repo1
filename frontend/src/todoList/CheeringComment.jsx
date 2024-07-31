import './CheeringComment.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";

const CheeringComment = ({cheeringCommentData})=>{
  return(
    <div className="cheeringComment">
      <span>댓글작성자</span>
      <input className='comment' value="화이팅 하자" readOnly/>
        <div className='btnIcon'>
          <FontAwesomeIcon icon={faPencil} id='pencil'/>
          <FontAwesomeIcon icon={faX} id='del'/>
        </div>
    </div>
  );
};

export default CheeringComment;