import "./ToFullList.css";
import useMove from "../util/useMove";
import {useNavigate} from "react-router-dom";
import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus} from "@fortawesome/free-solid-svg-icons";
const ToFullList=({URL})=>{
  const onClickEvent = useMove(URL);
  return(
    <div className="toFullList">
      <Button text={<FontAwesomeIcon icon={faPlus} />} onClick={onClickEvent}/>
    </div>
  )
}

export default ToFullList;