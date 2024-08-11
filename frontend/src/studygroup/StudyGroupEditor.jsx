import React, { useState } from 'react';
import './StudyGroupEditor.css';
import { useNavigate } from "react-router-dom";
import Button from '../components/Button';

const StudyGroupEditor = () => {
  const nav = useNavigate();
  const [groupData, setGroupData] = useState({
    groupName: '',
    category: '',
    groupGoal: '',
    groupContent: '',
    image: null
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setGroupData(prev => ({ ...prev, image: files[0] }));
    } else {
      setGroupData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = () => {
    // Implement the logic to create the group here
    console.log(groupData);  // Log the data or send it to the server
    // Redirect to the main group page after creation
    nav('/manager/groupmain', { replace: true });
  };

  return (
    <div className='studyGroupEditor'>
      <table>
        <tbody>
          <tr>
            <td>그룹이미지</td>
            <td><input type="file" id="groupImage" name="image" onChange={handleInputChange} /></td>
          </tr>
          <tr>
            <td>그룹명</td>
            <td><input type="text" id="groupName" name="groupName" placeholder='그룹명을 적어주세요.' onChange={handleInputChange} /></td>
          </tr>
          <tr>
            <td>카테고리</td>
            <td>
              <select name="category" id="category" onChange={handleInputChange}>
                <option value="">카테고리를 선택해주세요.</option>
                {/* Add the options here */}
              </select>
            </td>
          </tr>
          <tr>
            <td>그룹목표</td>
            <td><input type="text" id="groupGoal" name="groupGoal" placeholder='그룹목표를 적어주세요.' onChange={handleInputChange} /></td>
          </tr>
          <tr>
            <td>그룹 설명</td>
            <td><textarea name="groupContent" id="groupContent" cols="30" rows="10" placeholder='어떤 그룹인지 설명해주세요.' onChange={handleInputChange}></textarea></td>
          </tr>
        </tbody>
      </table>
      <section className='buttonSection'>
        <Button text={'취소'} onClick={() => nav(-1)} />
        <Button text={'완료'} onClick={handleSubmit} />
      </section>
    </div>
  );
};

export default StudyGroupEditor;
