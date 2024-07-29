import "./AttainmentMain.css";
import Attainment from "./Attainment";
import DateNav from '../components/DateNav';
import Button from "../components/Button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesLeft } from "@fortawesome/free-solid-svg-icons";
import { faAnglesRight } from "@fortawesome/free-solid-svg-icons";
const AttainmentMain=()=>{
  const data1 = [
    {
      "attainmentId": 0,
      "attainmentName": "팀프로젝트하기",
      "attainmentType":"time",
      "attainmentTarget":100,
      "attainmentFinish":10,
      "attainmentRate": 10,
      "hot dogColor": "hsl(113, 70%, 50%)",
      "star": 10,
  
    },
    {
      "attainmentId": 1,
      "attainmentName": "100",
      "attainmentType":"time",
      "attainmentTarget":100,
      "attainmentFinish":100,
      "attainmentRate": 100,
      "burgerColor": "hsl(291, 70%, 50%)",
      "star": 1,
    },
    {
      "attainmentId": 2,
      "attainmentName": "AF22",
      "attainmentType":"number",
      "attainmentTarget":100,
      "attainmentFinish":50,
      "attainmentRate": 50,
      "sandwichColor": "hsl(173, 70%, 50%)",
      "star": 11,
    },
    {
      "attainmentId": 3,
      "attainmentName": "AG33",
      "attainmentType":"number",
      "attainmentTarget":100,
      "attainmentFinish":85,
      "attainmentRate": 85,
      "kebabColor": "hsl(124, 70%, 50%)",
      "star": 2,
    },
    {
      "attainmentId": 4,
      "attainmentName": "AG44",
      "attainmentType":"number",
      "attainmentTarget":100,
      "attainmentFinish":35,
      "attainmentRate": 35,
      "kebabColor": "hsl(124, 70%, 50%)",
      "star": 0,
    },
    {
      "attainmentId": 5,
      "attainmentName": "AG55",
      "attainmentType":"number",
      "attainmentTarget":100,
      "attainmentFinish":85,
      "attainmentRate": 85,
      "kebabColor": "hsl(124, 70%, 50%)",
      "star": 0,
    },
  ]
  const data2 = [
    {
      "attainmentId": 0,
      "attainmentName": "팀프로젝트하기",
      "attainmentType":"time",
      "attainmentTarget":100,
      "attainmentFinish":10,
      "attainmentRate": 10,
      "hot dogColor": "hsl(113, 70%, 50%)",
      "star": 10,
  
    },
    {
      "attainmentId": 1,
      "attainmentName": "100",
      "attainmentType":"time",
      "attainmentTarget":100,
      "attainmentFinish":100,
      "attainmentRate": 100,
      "burgerColor": "hsl(291, 70%, 50%)",
      "star": 1,
    },
    {
      "attainmentId": 2,
      "attainmentName": "AF22",
      "attainmentType":"number",
      "attainmentTarget":100,
      "attainmentFinish":50,
      "attainmentRate": 50,
      "sandwichColor": "hsl(173, 70%, 50%)",
      "star": 11,
    },
    {
      "attainmentId": 3,
      "attainmentName": "AG33",
      "attainmentType":"number",
      "attainmentTarget":100,
      "attainmentFinish":85,
      "attainmentRate": 85,
      "kebabColor": "hsl(124, 70%, 50%)",
      "star": 2,
    },
    {
      "attainmentId": 4,
      "attainmentName": "AG44",
      "attainmentType":"number",
      "attainmentTarget":100,
      "attainmentFinish":35,
      "attainmentRate": 35,
      "kebabColor": "hsl(124, 70%, 50%)",
      "star": 0,
    },
    {
      "attainmentId": 5,
      "attainmentName": "AG55",
      "attainmentType":"number",
      "attainmentTarget":100,
      "attainmentFinish":85,
      "attainmentRate": 85,
      "kebabColor": "hsl(124, 70%, 50%)",
      "star": 0,
    },
  ]
  const height1 = data1.length * 70;
  const height2 = data2.length * 70;
  return (
    <div className="attainmentMain">
      <div className="attainmentContent">
        <div className='todoDate'>
            <DateNav firstChild={<Button text={<FontAwesomeIcon icon={faAnglesLeft}/>}/>} 
            title={'2024-07-22'}
            secondChild={<Button text={<FontAwesomeIcon icon={faAnglesRight}/>}/>}/>
        </div>
        <div className="attainmentList" style={{ height: `${height1}px` }}>
          <Attainment data={data1} padding={0.2} type={'short'}></Attainment>
        </div>
        <div className="attainmentList" style={{ height: `${height2}px` }}>
          <Attainment data={data2} padding={0.2} type={'long'}></Attainment>
        </div>
      </div>
    </div>
  )
}

export default AttainmentMain;