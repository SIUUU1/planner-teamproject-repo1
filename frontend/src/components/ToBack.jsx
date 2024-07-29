import "./ToBack.css";
import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCaretLeft} from "@fortawesome/free-regular-svg-icons";
const ToBack=({URL})=>{
  return(
    <div className="toFullList">
      <Button text={<FontAwesomeIcon icon={faSquareCaretLeft} />} onClick={() => {
                window.location.href = URL;
      }}/>
    </div>
  )
}

export default ToBack;