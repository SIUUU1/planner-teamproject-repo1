import "./AttainmentMain.css";
import Attainment from "./Attainment";
import DateNav from '../components/DateNav';
import Button from "../components/Button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesLeft } from "@fortawesome/free-solid-svg-icons";
import { faAnglesRight } from "@fortawesome/free-solid-svg-icons";

const AttainmentMain = () => {
  const data1 = [
    {
      "attainment_id": 0,
      "attainment_name": "팀프로젝트하기",
      "attainment_type": "time",
      "attainment_target": 100,
      "attainment_finish": 10,
      "attainment_rate": 10,
      "hot_dog_color": "hsl(113, 70%, 50%)",
      "star": 10,
    },
    {
      "attainment_id": 1,
      "attainment_name": "100",
      "attainment_type": "time",
      "attainment_target": 100,
      "attainment_finish": 100,
      "attainment_rate": 100,
      "burger_color": "hsl(291, 70%, 50%)",
      "star": 1,
    },
    {
      "attainment_id": 2,
      "attainment_name": "AF22",
      "attainment_type": "number",
      "attainment_target": 100,
      "attainment_finish": 50,
      "attainment_rate": 50,
      "sandwich_color": "hsl(173, 70%, 50%)",
      "star": 11,
    },
    {
      "attainment_id": 3,
      "attainment_name": "AG33",
      "attainment_type": "number",
      "attainment_target": 100,
      "attainment_finish": 85,
      "attainment_rate": 85,
      "kebab_color": "hsl(124, 70%, 50%)",
      "star": 2,
    },
    {
      "attainment_id": 4,
      "attainment_name": "AG44",
      "attainment_type": "number",
      "attainment_target": 100,
      "attainment_finish": 35,
      "attainment_rate": 35,
      "kebab_color": "hsl(124, 70%, 50%)",
      "star": 0,
    },
    {
      "attainment_id": 5,
      "attainment_name": "AG55",
      "attainment_type": "number",
      "attainment_target": 100,
      "attainment_finish": 85,
      "attainment_rate": 85,
      "kebab_color": "hsl(124, 70%, 50%)",
      "star": 0,
    },
  ];

  const data2 = [
    {
      "attainment_id": 0,
      "attainment_name": "팀프로젝트하기",
      "attainment_type": "time",
      "attainment_target": 100,
      "attainment_finish": 10,
      "attainment_rate": 10,
      "hot_dog_color": "hsl(113, 70%, 50%)",
      "star": 10,
    },
    {
      "attainment_id": 1,
      "attainment_name": "100",
      "attainment_type": "time",
      "attainment_target": 100,
      "attainment_finish": 100,
      "attainment_rate": 100,
      "burger_color": "hsl(291, 70%, 50%)",
      "star": 1,
    },
    {
      "attainment_id": 2,
      "attainment_name": "AF22",
      "attainment_type": "number",
      "attainment_target": 100,
      "attainment_finish": 50,
      "attainment_rate": 50,
      "sandwich_color": "hsl(173, 70%, 50%)",
      "star": 11,
    },
    {
      "attainment_id": 3,
      "attainment_name": "AG33",
      "attainment_type": "number",
      "attainment_target": 100,
      "attainment_finish": 85,
      "attainment_rate": 85,
      "kebab_color": "hsl(124, 70%, 50%)",
      "star": 2,
    },
    {
      "attainment_id": 4,
      "attainment_name": "AG44",
      "attainment_type": "number",
      "attainment_target": 100,
      "attainment_finish": 35,
      "attainment_rate": 35,
      "kebab_color": "hsl(124, 70%, 50%)",
      "star": 0,
    },
    {
      "attainment_id": 5,
      "attainment_name": "AG55",
      "attainment_type": "number",
      "attainment_target": 100,
      "attainment_finish": 85,
      "attainment_rate": 85,
      "kebab_color": "hsl(124, 70%, 50%)",
      "star": 0,
    },
  ];

  const height1 = data1.length * 70;
  const height2 = data2.length * 70;

  return (
    <div className="attainmentMain">
      <div className="attainmentContent backWhite">
        <div className="todoDate">
          <DateNav
            firstChild={<Button text={<FontAwesomeIcon icon={faAnglesLeft} />} />}
            title={"2024-07-22"}
            secondChild={<Button text={<FontAwesomeIcon icon={faAnglesRight} />} />}
          />
        </div>
        <div className="attainmentList" style={{ height: `${height1}px` }}>
          <Attainment data={data1} padding={0.2} type={"short"} />
        </div>
        <div className="attainmentList" style={{ height: `${height2}px` }}>
          <Attainment data={data2} padding={0.2} type={"long"} />
        </div>
      </div>
    </div>
  );
};

export default AttainmentMain;
