import './CheerLeader.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan} from "@fortawesome/free-solid-svg-icons";
const CheerLeader=()=>{
  return(
    <div className="cheerLeader">
      
      <a href="http://" className="cheerLeaderId">작성자닉네임</a>
      <FontAwesomeIcon icon={faTrashCan} />
    </div>
  );
};

export default CheerLeader; 