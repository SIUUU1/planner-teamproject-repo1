import React from 'react';
import { useParams } from 'react-router-dom';
import ToBack from '../components/ToBack';
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
    "attainmentFinish":25,
    "attainmentRate": 25,
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
    "attainmentFinish":25,
    "attainmentRate": 25,
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
    "star": 2,
  },
]

const AttainmentDetail=()=>{
  const { id, type } = useParams();
  const attainmentId = parseInt(id, 10);

  let data;
  if (type === 'log') {
    data = data2.find(item => item.attainmentId === attainmentId);
  } else if (type === 'short') {
    data = data1.find(item => item.attainmentId === attainmentId);
  }

  // if (!data) {
  //   return <div>잘못된 주소입니다</div>;
  // }

  return(
    <div>
      <ToBack URL={'/attainmentMain'}></ToBack>
      <h1>{data.attainmentName}</h1>
      <p>Type: {data.attainmentType}</p>
      <p>Target: {data.attainmentTarget}</p>
      <p>Finish: {data.attainmentFinish}</p>
      <p>Rate: {data.attainmentRate}</p>
      <p>Star: {data.star}</p>
    </div>

  )
}
export default AttainmentDetail;