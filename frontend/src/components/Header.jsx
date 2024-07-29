import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell} from "@fortawesome/free-solid-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { faChartSimple } from "@fortawesome/free-solid-svg-icons";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";

const Header = () => {
return (
<header className="header">
      <div className="headerContent">
            <div className="headerTitle">WePlAN</div>
                  <div className="headerBottom">
                        <div className="leftHeader">
                              <div className='headerFirstChild'><Button text={<FontAwesomeIcon icon={faBars}/>}/></div>
                              <div className="leftMiddleHeader">
                                    <div className='headerSecondChild'><Button text={<FontAwesomeIcon icon={faRightFromBracket}/>}/></div>
                                    <div className='headerThirdChild'><Button text={<FontAwesomeIcon icon={faUserGroup}/>}/></div>
                                    <div className='headerForthChild'><Button text={<FontAwesomeIcon icon={faChartSimple}/>}/>
                              </div>
                        </div>
                  </div>
                  <div className='rightHeader'>
                  <div className='headerFifthChild'><Button text={<FontAwesomeIcon icon={faPaperPlane}/>}/></div>
                  <div className='headerSixthChild'><Button text={<FontAwesomeIcon icon={faBell}/>}/></div>
                  </div>
            </div> 
      </div>     
</header>
);
};
export default Header;