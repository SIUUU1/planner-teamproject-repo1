import React, { useState } from 'react';
import './Profile.css';


const existingNames = ['choco', '초코', 'RedOcean', 'Chris'];

const Profile = () => {
  const [profile, setProfile] = useState({
    email: 'choco4study@gmail.com',
    password: '****',
    name: '초코',
    contact: '01012345678',
    introduction: '관리자입니다.',
  });

  const [editField, setEditField] = useState('');
  const [editValue, setEditValue] = useState('');
  const [isDuplicate, setIsDuplicate] = useState(false);

  const handleEditClick = (field) => {
    setEditField(field);
    setEditValue(profile[field]);
  };

  const handleSaveClick = () => {
    if (editField === 'name' && existingNames.includes(editValue)) {
      setIsDuplicate(true);
    } else {
      setProfile({
        ...profile,
        [editField]: editValue,
      });
      setEditField('');
      setEditValue('');
      setIsDuplicate(false);
    }
  };

  return (
    <div className="profile">
     
      <div className="profileContainer">
        <h1>My Page</h1>
        <nav className="profileNav">
          <span>내가 쓴 글</span>
          <span>내가 공감한 글</span>
          <span className="active">내 정보 변경</span>
        </nav>
        <div className="profileContent">
          
          <table className="profileTable">
            <tbody>
              {Object.entries(profile).map(([field, value]) => (
                <tr key={field}>
                  <td>{field.toUpperCase()}</td>
                  <td>
                    {editField === field ? (
                      <input
                        type={field === 'password' ? 'password' : 'text'}
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                      />
                    ) : (
                      value
                    )}
                    {isDuplicate && field === 'name' && (
                      <div className="errorMessage">이미 있는 이름입니다.</div>
                    )}
                  </td>
                  <td>
                    {editField === field ? (
                      <button onClick={handleSaveClick}>확인</button>
                    ) : (
                      <button onClick={() => handleEditClick(field)}>변경</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Profile;
