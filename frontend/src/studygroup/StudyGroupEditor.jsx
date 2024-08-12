// src/studygroup/StudyGroupEditor.jsx
import React, { useState, useContext } from 'react';
import './StudyGroupEditor.css';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { StudyGroupContext } from './StudyGroupContext';

const StudyGroupEditor = () => {
  const { addGroup } = useContext(StudyGroupContext);
  const nav = useNavigate();
  const [groupData, setGroupData] = useState({
    groupName: '',
    category: '',
    groupGoal: '',
    groupContent: '',
    customModalContent: '', // New field for custom modal content
    image: null
  });

  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setGroupData(prev => ({ ...prev, image: files[0] }));
    } else {
      setGroupData(prev => ({ ...prev, [name]: value }));
    }
  };

  const validateInput = () => {
    if (!groupData.groupName || !groupData.category || !groupData.groupGoal || !groupData.groupContent || !groupData.image) {
      setError('모든 필드를 채워주세요.');
      return false;
    }
    return true;
  };

  const formatModalContent = (content) => {
    return content
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .map((line, index) => (line === '---' ? <hr key={index} /> : <p key={index}>{line}</p>));
  };

  const handleSubmit = () => {
    if (!validateInput()) {
      return;
    }

    setIsSubmitting(true);
    const newGroup = {
      name: groupData.groupName,
      image: URL.createObjectURL(groupData.image),
      tags: [groupData.category],
      capacity: '0/20',
      attendance: '0%',
      privacy: '공개', // Default privacy
      customModalContent: groupData.customModalContent // Include custom modal content
    };

    addGroup(newGroup);

    setTimeout(() => {
      setIsSubmitting(false);
      setError('');
      nav('/manager/groupmain', { replace: true });
    }, 2000);
  };

  const allGroups = [
    { name: "KH정보교육원 1", image: "/images/wakeup.jpg", tags: ["HTML", "CSS", "Spring"], capacity: "2/20", attendance: "100%", privacy: "비공개" },
    { name: "KH정보교육원 2", image: "/images/dog1.jpg", tags: ["HTML", "CSS", "Spring"], capacity: "2/20", attendance: "100%", privacy: "비공개" },
    { name: "KH정보교육원 3", image: "/images/dog3.jpg", tags: ["HTML", "CSS", "Spring"], capacity: "2/20", attendance: "100%", privacy: "비공개" },
    { name: "KH정보교육원 4", image: "/images/wakeup.jpg", tags: ["React", "Node.js", "MongoDB"], capacity: "3/20", attendance: "95%", privacy: "공개" },
    { name: "KH정보교육원 5", image: "/images/dog1.jpg", tags: ["Python", "Flask", "Django"], capacity: "1/15", attendance: "85%", privacy: "비공개" },
    { name: "KH정보교육원 6", image: "/images/dog3.jpg", tags: ["Java", "Spring Boot", "Microservices"], capacity: "5/25", attendance: "90%", privacy: "공개" }
  ];

  // Extract unique tags for category options
  const categoryOptions = Array.from(new Set(allGroups.flatMap(group => group.tags)));

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
                {categoryOptions.map(tag => (
                  <option key={tag} value={tag}>{tag}</option>
                ))}
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
          <tr>
            <td>모달 내용</td>
            <td><textarea name="customModalContent" id="customModalContent" cols="30" rows="5" placeholder='모달에 표시될 내용을 적어주세요.' onChange={handleInputChange}></textarea></td>
          </tr>
        </tbody>
      </table>
      {error && <div className="error">{error}</div>}
      <section className='buttonSection'>
        <Button text={'취소'} onClick={() => nav(-1)} />
        <Button text={'완료'} onClick={handleSubmit} disabled={isSubmitting} />
      </section>
    </div>
  );
};

export default StudyGroupEditor;
