import React from 'react';
import { useParams } from 'react-router-dom';
import ToBack from '../components/ToBack';

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
    "attainment_finish": 25,
    "attainment_rate": 25,
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
    "attainment_finish": 25,
    "attainment_rate": 25,
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
    "star": 2,
  },
];

const AttainmentDetail = () => {
  const { id, type } = useParams();
  const attainmentId = parseInt(id, 10);

  let data;
  if (type === 'log') {
    data = data2.find(item => item.attainment_id === attainmentId);
  } else if (type === 'short') {
    data = data1.find(item => item.attainment_id === attainmentId);
  }

  return data ? (
    <div>
      <ToBack URL={'/attainmentMain'} />
      <h1>{data.attainment_name}</h1>
      <p>Type: {data.attainment_type}</p>
      <p>Target: {data.attainment_target}</p>
      <p>Finish: {data.attainment_finish}</p>
      <p>Rate: {data.attainment_rate}</p>
      <p>Star: {data.star}</p>
    </div>
  ) : (
    <div>잘못된 주소입니다</div>
  );
};

export default AttainmentDetail;
