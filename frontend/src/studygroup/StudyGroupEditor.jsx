import './StudyGroupEditor.css'
import {useNavigate} from "react-router-dom";
import Button from '../components/Button';

const StudyGroupEditor = ()=>{
  const nav = useNavigate();
  // //이벤트처리 전송
  // const onSubmit = input => {
  //   if(initItem){
  //     onUpdate();
  //   }else {
  //     onCreate();
  //   }
  //   //스터디그룹 메인화면으로 간다. 뒤로 방지
  //   nav('/groupmain',{replace:true});
  // };
  
  return(
  <div className='studyGroupEditor'>
    <table>
      <tbody>
      <tr>
        <td>그룹이미지</td>
        <td><input type="file" id="groupImage"/></td>
      </tr>
      <tr>
        <td>그룹명</td>
        <td><input type="text" id="groupName" placeholder='그룹명을 적어주세요.'/></td>
      </tr>
      <tr>
        <td><label htmlFor="category">카테고리</label></td>
        <td><select name="category" id="category">
      <option value="">카테고리를 선택해주세요.</option>
      <option value="1">고등학생</option>
      <option value="2">고3, N수생</option>
      <option value="3">대학생</option>
      <option value="4">일반/학사편입</option>
      <option value="5">PEET</option>
      <option value="6">MDEET</option>
      <option value="7">LEET</option>
      <option value="8">취업</option>
      <option value="9">직장인</option>
      <option value="10">어학</option>
      <option value="11">자격증</option>
      <option value="12">기타</option>
    </select></td>
      </tr>
      <tr>
        <td><label htmlFor="groupGoal">그룹목표</label></td>
        <td><input type="text" id="groupGoal" name="groupGoal" placeholder='그룹목표를 적어주세요.'/></td>
      </tr>
      <tr>
        <td><label htmlFor="groupContent">그룹 설명</label></td>
        <td><textarea name="groupContent" id="groupContent" cols="30" rows="10" placeholder='어떤 그룹인지 설명해주세요.(가입 규칙 또는 응원 문구 등)'></textarea></td>
      </tr>
      </tbody>
    </table>
    <section className='buttonSection'> 
    <Button text={'취소'}/>
    <Button text={'완료'}/>
    </section>
  </div>
);
};
export default StudyGroupEditor;