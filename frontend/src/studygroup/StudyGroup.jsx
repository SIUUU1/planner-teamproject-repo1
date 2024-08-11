import Button from '../components/Button';
import './StudyGroup.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

const StudyGroup= ()=>{
  return(
    <tr className='studyGroup'>
          <td>그룹이미지</td>
          <td>취업</td>
          <td>정처기</td>
          <td>정처기 합격</td>
          <td>캡틴</td>
          <td>12명</td>
          <td>2024.04.02</td>
          <td><Button text={<FontAwesomeIcon icon={faX}/>}/></td>
    </tr>
  );
};
export default StudyGroup;