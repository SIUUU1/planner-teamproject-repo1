import React, { useState, useEffect, useRef} from 'react';
import './StudyGroupMain.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faCamera } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import StudyGroupList from './StudyGroupList';
import Modal from './Modal';
import useLoading from '../util/useLoading';
import useSendPost from '../util/useSendPost';

function StudyGroupMain() {
  const { data: groupListData, loading: loadingGroupList, error: errorGroupList, refetch: refetchGroupList } = useLoading('http://localhost:8080/api/group/list', 'json');
  const { data: groupBestListData, loading: loadingGroupBestList, error: errorGroupBestList, refetch: refetchGroupBestList } = useLoading('http://localhost:8080/api/group/list/best', 'json');
  const { data: myGroupListData, loading: loadingMyGroupList, error: errorMyGroupList, refetch: refetchMyGroupList } = useLoading('http://localhost:8080/api/group/list/my', 'json');

  const [searchList, setSearchList] = useState([]);
  const [searching, setSearching] = useState(false); // 검색 중 여부를 나타내는 상태
  const [searchTerm, setSearchTerm] = useState(''); // 실제 검색어를 저장하는 상태
 
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null); 
  const navigate = useNavigate();

  useEffect(() => {
    let filteredGroups =[];
    if (searching) {
      filteredGroups = searchList;
    } else if (groupListData) {
      filteredGroups = groupListData;
    } 
    setGroups(filteredGroups);
  }, [groupListData,groupBestListData,searchList,searching,myGroupListData]);
  
  const [displayedGroups, setDisplayedGroups] = useState(groups.slice(0, 3));
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight && displayedGroups.length < groups.length) {
        loadMoreGroups();
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [displayedGroups, groups]);

// 검색
const { data, loading, error, postRequest } = useSendPost(
  'http://localhost:8080/api/group/search',
  null,
  'json',
  true // FormData를 사용하므로 isFormData를 true로 설정
);
useEffect(() => {
  if (data) {
    let filteredSearch = data.filter(board => board.step === 0);
    setSearchList(filteredSearch);
  }
}, [data]);

const onSearch = () => {
  const form = new FormData();
  form.append('search', searchTerm);
  
  console.log('URL:', 'http://localhost:8080/api/group/search');
  console.log('search', searchTerm);

  postRequest(form);
};
  
  // const onSearch = () => {
  //   let url = 'http://localhost:8080/api/group/search';
  //   const form = new FormData();
  //   form.append('search', searchTerm);

  //   setSearching(true);

  //   fetch(url, { method: 'POST', body: form, credentials: 'include' })
  //     .then(response => response.json())
  //     .then(data => {
  //       let filteredSearch = data.filter(board => board.step === 0);
  //       setSearchList(filteredSearch);
  //       setCurrentPage(1);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching search results:', error);
  //       setSearchList([]);
  //     });
  // };


  const [activeFilter, setActiveFilter] = useState(0);
 // 선택된 그룹을 추적하기 위한 상태

  const filterRefs = [useRef(null), useRef(null), useRef(null)];
  
  

  const loadMoreGroups = () => {
    setDisplayedGroups((prevGroups) => {
      const nextGroups = groups.slice(prevGroups.length, prevGroups.length + 3);
      return [...prevGroups, ...nextGroups];
    });
  };

  const handleFilterClick = (index) => {
    setActiveFilter(index);
  };

  // const sliderStyle = {
  //   transform: `translateX(${filterRefs[activeFilter].current ? filterRefs[activeFilter].current.offsetLeft : 0}px)`,
  //   width: `${filterRefs[activeFilter].current ? filterRefs[activeFilter].current.offsetWidth : 0}px`,
  //   transition: 'transform 0.3s ease'
  // };

  const redirectToNewGroupPage = () => {
    navigate('/groupedit/0');
  };

  if(loadingGroupList||loadingGroupBestList||loadingMyGroupList){
    return<div>loading...</div>;
  }
  return (
    <div className="studyGroupMain">
      <header className="header">
        <h1>스터디그룹</h1>
        <div className="searchBar">
          <input type="text" placeholder="Search" value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value); }} />
          <button className="searchButton" onClick={onSearch}>검색</button>
          <button className="addGroupButton" onClick={redirectToNewGroupPage}>그룹 추가</button>
        </div>
      </header>

      <div className="missionGroup">
        <span>미션 그룹</span>
        <div className="missionCards">
          {groupBestListData.map((group,index) => (
            <div className="missionCard" key={index}>
              {/* <img src={mission.image} /> */}
              <div className="missionInfo">
                <div className="missionTime">{group.groupone_count}</div>
                <div className="missionTag">#{group.group_goal}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="studyGroupSection">
        <span>내 그룹</span>
      </div>
      <StudyGroupList groups={myGroupListData} onItemClick={setSelectedGroup} />

      <div className="studyGroupSection">
        <span>그룹</span>
        <div className="filters">
          {['신규', '출석률', '학습률'].map((filter, index) => (
            <b key={filter} ref={filterRefs[index]} onClick={() => handleFilterClick(index)}>
              {filter}
            </b>
          ))}
          {/* <div className="slider" style={sliderStyle}></div> */}
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
      <StudyGroupList groups={displayedGroups} onItemClick={setSelectedGroup} />
      {/* 모달 표시 */}
      {selectedGroup && <Modal group={selectedGroup} onClose={() => setSelectedGroup(null)} />}
    </div>
  );
}

export default StudyGroupMain;
