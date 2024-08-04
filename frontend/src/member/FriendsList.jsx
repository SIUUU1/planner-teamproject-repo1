import React, { useState } from 'react';
import './FriendsList.css';

const FriendsList = () => {
  const [friends, setFriends] = useState(['RedOcean', 'Chris']);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState('');
  const [profilePicture, setProfilePicture] = useState('/default-profile.png');

  const handleSearch = () => {
    if (searchTerm.trim() !== '') {
      // 여기에 실제 친구 검색 로직을 추가해야 합니다.
      setSearchResult(searchTerm);
    }
  };

  const handleAddFriend = () => {
    if (searchResult && !friends.includes(searchResult)) {
      setFriends([...friends, searchResult]);
      setSearchResult('');
    }
  };

  const handleDeleteFriend = (friend) => {
    setFriends(friends.filter((f) => f !== friend));
  };

  const handleProfilePictureChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('profilePicture', file);

      // 업로드 요청을 서버로 보냅니다.
      const response = await fetch('/api/upload-profile-picture', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setProfilePicture(data.url); // 서버에서 반환된 파일 URL을 사용합니다.
      } else {
        console.error('Failed to upload profile picture');
      }
    }
  };

  return (
    <div className="friendsList">
      <div className="profileSection">
        <div className="avatarWrapper">
          <img src={profilePicture} alt="Profile" className="profilePicture" />
          <label htmlFor="profilePictureUpload" className="profilePictureLabel">
            변경
          </label>
          <input
            type="file"
            id="profilePictureUpload"
            style={{ display: 'none' }}
            onChange={handleProfilePictureChange}
          />
        </div>
        <div className="profileInfo">
          <h2>Marcus.Lim</h2>
          <p>bahasmank@gmail.com</p>
        </div>
        <div className="friendsHeader">친구 목록</div>
        <ul className="friendsLists">
          {friends.map((friend, index) => (
            <li key={index} className="friendItem">
              {friend}
              <button className="deleteButton" onClick={() => handleDeleteFriend(friend)}>삭제</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="searchSection">
        <h2>채팅 친구를 찾아보세요!</h2>
        <p>친구의 아이디를 검색해서 찾을 수 있습니다.</p>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="친구 아이디"
        />
        <button onClick={handleSearch}>친구 찾기</button>
        {searchResult && (
          <div className="searchResult">
            <div className="profilePicture" />
            <div className="friendInfo">
              <h3>{searchResult}</h3>
              <button onClick={handleAddFriend}>친구 추가하기</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FriendsList;
