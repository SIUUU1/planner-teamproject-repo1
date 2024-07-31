import "./ToBack.css";
import useMove from "../util/useMove";
import Button from "./Button";
import {useNavigate} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCaretLeft} from "@fortawesome/free-regular-svg-icons";
const ToBack=({URL})=>{
  const onClickEvent = useMove(URL);
  
  return(
    <div className="toFullList">
      <Button text={<FontAwesomeIcon icon={faSquareCaretLeft} />} onClick={onClickEvent}/>
    </div>
  )
}

export default ToBack;