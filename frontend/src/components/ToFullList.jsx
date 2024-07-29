import "./ToFullList.css";
import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus} from "@fortawesome/free-solid-svg-icons";
const ToFullList=({URL})=>{
  return(
    <div className="toFullList">
      <Button text={<FontAwesomeIcon icon={faPlus} />} onClick={() => {
                window.location.href = URL;
      }}/>
    </div>
  )
}

export default ToFullList;