// src/studygroup/StudyGroupMain.jsx
import React, { useState, useEffect, useRef, useContext } from 'react';
import './StudyGroupMain.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faCamera } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { StudyGroupContext } from './StudyGroupContext';

// Modal 컴포넌트 정의
function Modal({ group, onClose }) {
  if (!group) return null; // 그룹이 선택되지 않으면 모달을 표시하지 않음

  const handleJoinGroup = () => {
    console.log("그룹에 가입되었습니다!");  // 여기서 그룹 가입 로직을 구현하거나 다른 처리를 가능
    onClose();  // 가입 후 모달을 닫을 수 있음.
  };

  const formatModalContent = (content) => {
    return content
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .map((line, index) => line === '---' ? <hr key={index} /> : <p key={index}>{line}</p>);
  };

  return (
    <div className="modalOverlay">
      <div className="modalContent">
        <button className="closeButton" onClick={onClose}>X</button>
        <h1>{group.name}</h1>
        <hr />
        <div>{group.customModalContent ? formatModalContent(group.customModalContent) : '기본 모달 내용'}</div> {/* Display custom content */}
        <button className="joinButton" onClick={handleJoinGroup}>그룹 가입</button>
        <button className="cancelButton" onClick={onClose}>취소</button>
      </div>
    </div>
  );
}

// GroupItem 컴포넌트
function GroupItem({ group, onClick }) {
  return (
    <div className="groupItem" onClick={() => onClick(group)}>
      <img src={group.image} alt="Group" className="groupImage" />
      <div className="groupContent">
        <h3 className="groupName">{group.name}</h3>
        <div className="groupTags">{group.tags.map(tag => `#${tag} `)}</div>
        <div className="groupStats">
          <p>정원: {group.capacity}</p>
          <p>출석률: {group.attendance}</p>
          {group.privacy === "비공개" && <FontAwesomeIcon icon={faLock} />}
        </div>
      </div>
    </div>
  );
}

function StudyGroupList({ groups, onItemClick }) {
  return (
    <div className="groupList">
      {groups.map(group => (
        <GroupItem key={group.name} group={group} onClick={onItemClick} />
      ))}
    </div>
  );
}

function StudyGroupMain() {
  const { groups: allGroups = [] } = useContext(StudyGroupContext); // 기본값을 빈 배열로 설정 // Use groups from context
  const [activeFilter, setActiveFilter] = useState(0);
  const [searchQuery, setSearchQuery] = useState(""); // 검색 입력을 추적하기 위한 상태
  const [selectedGroup, setSelectedGroup] = useState(null); // 선택된 그룹을 추적하기 위한 상태
  const filterRefs = [useRef(null), useRef(null), useRef(null)];
  const navigate = useNavigate();

  const [displayedGroups, setDisplayedGroups] = useState(allGroups.slice(0, 3));

  const loadMoreGroups = () => {
    setDisplayedGroups((prevGroups) => {
      const nextGroups = allGroups.slice(prevGroups.length, prevGroups.length + 3);
      return [...prevGroups, ...nextGroups];
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight && displayedGroups.length < allGroups.length) {
        loadMoreGroups();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [displayedGroups, allGroups]);

  const handleFilterClick = (index) => {
    setActiveFilter(index);
  };

  const sliderStyle = {
    transform: `translateX(${filterRefs[activeFilter].current ? filterRefs[activeFilter].current.offsetLeft : 0}px)`,
    width: `${filterRefs[activeFilter].current ? filterRefs[activeFilter].current.offsetWidth : 0}px`,
    transition: 'transform 0.3s ease'
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // 필터링된 그룹을 검색 쿼리에 따라 결정
  const filteredGroups = displayedGroups.filter(group =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    group.tags.some(tag => `#${tag.toLowerCase()}`.includes(searchQuery.toLowerCase()))
  );

  const missions = [
    { time: "AM 8:00", image: "/images/wakeup.jpg", tag: "Morning" },
    { time: "AM 9:00", image: "/images/seat.png", tag: "Afternoon" },
    { time: "PM 10:00", image: "/images/dream.jpg", tag: "Evening" }
  ];

  const redirectToNewGroupPage = () => {
    navigate('/groupnew');
  };

  return (
    <div className="studyGroupMain">
      <header className="header">
        <h1>스터디그룹</h1>
        <div className="searchBar">
          <input type="text" placeholder="Search" value={searchQuery} onChange={handleSearchChange} />
          <button className="searchButton">검색</button>
          <button className="addGroupButton" onClick={redirectToNewGroupPage}>그룹 추가</button>
        </div>
      </header>

      <div className="missionGroup">
        <span>미션 그룹</span>
        <div className="missionCards">
          {missions.map(mission => (
            <div className="missionCard" key={mission.time}>
              <img src={mission.image} alt={mission.time} />
              <div className="missionInfo">
                <div className="missionTime">{mission.time}</div>
                <div className="missionTag">#{mission.tag}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="studyGroupSection">
        <span>스터디그룹</span>
        <div className="filters">
          {['신규', '출석률', '학습률'].map((filter, index) => (
            <b key={filter} ref={filterRefs[index]} onClick={() => handleFilterClick(index)}>
              {filter}
            </b>
          ))}
          <div className="slider" style={sliderStyle}></div>
        </div>
        <div className="options">
          <label><input type="checkbox" /> 개발자</label>
          <label><input type="checkbox" /><FontAwesomeIcon icon={faCamera} /> 사진</label>
          <label><input type="checkbox" /> 빈자리</label>
          <label><input type="checkbox" /> 공개</label>
        </div>
        <p>*그룹이 생성된 날짜순으로 정렬됩니다.</p>
      </div>

      {/* StudyGroupList 컴포넌트에서 그룹 아이템을 클릭했을 때 모달을 열 수 있게 수정 */}
      <StudyGroupList groups={filteredGroups} onItemClick={setSelectedGroup} />

      {/* 모달 표시 */}
      {selectedGroup && <Modal group={selectedGroup} onClose={() => setSelectedGroup(null)} />}
    </div>
  );
}

export default StudyGroupMain;
