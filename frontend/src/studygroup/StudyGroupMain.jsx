import React, { useState, useEffect, useRef} from 'react';
import './StudyGroupMain.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faCamera } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import StudyGroupList from './StudyGroupList';
import Modal from './Modal';
import useLoading from '../util/useLoading';
import useSendPost from '../util/useSendPost';
import GroupBestItem from './GroupBestItem';
import { useTheme } from '../contexts/ThemeContext';

function StudyGroupMain() {
  const { data: groupListData, loading: loadingGroupList, error: errorGroupList, refetch: refetchGroupList } = useLoading('http://localhost:8080/api/group/list', 'json');
  const { data: groupBestListData, loading: loadingGroupBestList, error: errorGroupBestList, refetch: refetchGroupBestList } = useLoading('http://localhost:8080/api/group/list/best', 'json');
  const { data: myGroupListData, loading: loadingMyGroupList, error: errorMyGroupList, refetch: refetchMyGroupList } = useLoading('http://localhost:8080/api/group/list/my', 'json');

  const [searchList, setSearchList] = useState([]);
  const [searching, setSearching] = useState(false); // 검색 중 여부를 나타내는 상태
  const [searchTerm, setSearchTerm] = useState(''); // 실제 검색어를 저장하는 상태
 
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null); 

  const [displayedGroups, setDisplayedGroups] = useState([]);
  const navigate = useNavigate();

  const {theme, updateTheme } = useTheme(); 
  // 테마 업데이트
  useEffect(() => {
      updateTheme('user');
    }, [updateTheme]);

 useEffect(() => {
    if (groupListData) {
      setGroups(groupListData);
      setDisplayedGroups(groupListData.slice(0, 3));
    }
  }, [groupListData]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight && displayedGroups.length < groups.length) {
        loadMoreGroups();
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [displayedGroups, groups]);

  // 검색(카테고리 , 그룹명, 그룹목표)
  const searchRequest = useSendPost('http://localhost:8080/api/group/search',{},'json');
  const { data: searchData, postRequest: postRequestSearch, loading: loadingSearch, error: errorSearch } = searchRequest;

  useEffect(() => {
    if (searchData) {
      setSearchList(searchData);
      setSearching(true);
    }
  }, [searchData]);

  const onSearch = async () => {
    try {
      await postRequestSearch({ search: searchTerm });
    } catch (error) {
      console.error('Error search:', error);
    }
  };
  
  const loadMoreGroups = () => {
    if (groups.length > 0) {
      setDisplayedGroups((prevGroups) => {
        const nextGroups = groups.slice(prevGroups.length, prevGroups.length + 3);
        return [...prevGroups, ...nextGroups];
      });
    }
  };
  
  if(loadingGroupList || loadingGroupBestList || loadingMyGroupList || loadingSearch){
    return<div>loading...</div>;
  }
  return (
    <div className="studyGroupMain">
      <header className="header">
        <h3>스터디그룹</h3>
        <div className="searchBar">
          <input type="text" placeholder="Search" value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value); }} />
          <button className="searchButton" onClick={onSearch}>검색</button>
          <button className="addGroupButton" onClick={()=>{ navigate('/groupedit/0');}}>그룹 추가</button>
        </div>
      </header>
      {searching ? (
             searchList && searchList.length === 0 ?(
              <div>검색결과 없습니다.</div>
            ):(
            <>
      <div className="studyGroupSection">
        <span>검색결과</span>
      </div>
      <StudyGroupList groups={searchList} onItemClick={setSelectedGroup} />
            </>
            )
      ):(
            <> 
            <div className="missionGroup">
              <span>인기 그룹</span>
              <div className="missionCards">
                {groupBestListData.map((group, index) => (
              <GroupBestItem key={index} group={group} onClick={() => setSelectedGroup(group)} index={index + 1}/>
                ))}
              </div>
            </div>

            <div className="studyGroupSection">
              <span>내 그룹</span>
            </div>
            <StudyGroupList groups={myGroupListData} onItemClick={setSelectedGroup} />

            <div className="studyGroupSection">
              <span>그룹</span>
            </div>
            <StudyGroupList groups={displayedGroups} onItemClick={setSelectedGroup} />
            </>
      )}
     
      {/* 모달 표시 */}
      {selectedGroup && <Modal group={selectedGroup} onClose={() => setSelectedGroup(null)} />}
    </div>
  );
}

export default StudyGroupMain;
