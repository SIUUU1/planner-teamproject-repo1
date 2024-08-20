import React, { useRef,useEffect,useState } from 'react';
import './FriendsList.css';
import useLoading from '../util/useLoading';
import useSendPost from '../util/useSendPost';
import ProfileLink from '../components/ProfileLink';

const FriendsList = () => {
  const { data: userData, loading: loadingUser, error: errorUser, refetch: refetchUserData } = useLoading('http://localhost:8080/api/user/userInfo', 'json');
  const [profiles, setProfiles] = useState({
    user_no: '',
    user_id: '',
    password: '',
    user_name: '',
    user_nickname: '',
    image_url: '',
    user_tel: '',
    user_email: '',
  });
  const { data: friendData, loading: loadingFriend, error: errorfriend, refetch: refetchFriendData } = useLoading('http://localhost:8080/api/user/friend/list', 'json');
  const [friends, setFriends] = useState([]);
  //이미지
  const [selectedImage, setSelectedImage] = useState('/images/cat1.jpg');
  //검색결과
  const [searchList, setSearchList] = useState([]);
  
   useEffect(() => {
    if (userData) {
      setProfiles(userData);
      let src='';
      if(userData.image_url){
        src=`http://localhost:8080/static/images/profile/${userData.image_url}`;
        setSelectedImage(src || '/images/cat1.jpg');
      }
    }
    if(friendData){
      setFriends(friendData);
    }
  }, [userData,friendData]);
  
  // 검색
  const searchkey = useRef();
  const search =  useRef();
  const { data, loading, error, postRequest } = useSendPost(
    'http://localhost:8080/api/user/friend/search',
    null,
    'json',
    true // FormData를 사용하므로 isFormData를 true로 설정
  );
  useEffect(() => {
    if (data) {
      setSearchList(data);
    }
  }, [data]);

  const onSearch = () => {
    const form = new FormData();
    form.append('searchkey', searchkey.current.value);
    form.append('search', search.current.value);
    
    console.log('URL:', 'http://localhost:8080/api/user/friend/search');
    console.log('searchkey:', searchkey.current.value);
    console.log('search:', search.current.value);

    postRequest(form);
  };
  // const onSearch = () => {
  //   let url = 'http://localhost:8080/api/user/friend/search';
  //   const form = new FormData();
  //   form.append('searchkey', searchkey.current.value);
  //   form.append('search', search.current.value);
  //   console.log(url);
  //   console.log(searchkey.current.value);
  //   console.log(search.current.value);
  //   fetch(url, { method: 'post', body: form ,credentials: 'include',})
  //   .then(response => { return response.json(); })
  //   .then(data => { setSearchList(data); });
  // };

  // 친구등록
  const insertRequest = useSendPost('http://localhost:8080/api/user/friend/insert', {}, 'json');
  const addFriend = async (e) => {
    const newFriend = {
      no: '',
      user_id: profiles.user_id,
      friend_id: e.user_id,
      friend_nickname: e.user_nickname,
    };
    if (!friends.some(friend => friend.friend_id === newFriend.friend_id)) {
      try {
        await insertRequest.postRequest(newFriend);
        setFriends([...friends, newFriend]);
        setSearchList([]);
        refetchFriendData();
      } catch (error) {
        console.error('친구 추가 실패:', error);
      }
    }
  };
 
  // 친구삭제
  const deleteRequest = useSendPost('http://localhost:8080/api/user/friend/delete', {}, 'json');
  const onDeleteFriend = async(no) => {
    setFriends(friends.filter((f) => f.no !== no));
    try {
      await deleteRequest.postRequest({no});
      console.log('친구 삭제 성공');
      refetchFriendData();
    } catch (error) {
      console.log('친구 삭제 실패');
      console.error("Error deleting Qna:", error);
    }
  };

  return (
    <div className="friendsList">
      <div className="profileSection">
        <div className="avatarWrapper">
          <img src={selectedImage} className="profilePicture" />
        </div>
        <div className="profileInfo">
          <h2>{profiles.user_nickname} 님</h2>
          <p>{profiles.user_email}</p>
        </div>
        <div className="friendsHeader">친구 목록</div>
        <div className="friendsLists backWhite">
          {friends.map((friend) => (
            <div key={friend.user_id} className="friendItem">
              <ProfileLink user_id={friend.friend_id} user_nickname={friend.friend_nickname}></ProfileLink>
              {/* {friend.friend_nickname} */}
              <button className="deleteButton" onClick={() => onDeleteFriend(friend.no)}>삭제</button>
            </div>
          ))}
        </div>
      </div>
      <div className="searchSection backWhite">
        <h2>채팅 친구를 찾아보세요!</h2>
        <p>친구의 아이디를 검색해서 찾을 수 있습니다.</p>
        <div className="searchSectiondetail" >
          <select ref={searchkey}>
            <option value="all">전체</option>
            <option value="user_name">이름</option>
            <option value="user_nickname">닉네임</option>
            <option value="user_email">이메일</option>
          </select>&nbsp;
          <input type="text" ref={search}/>
          <button onClick={onSearch}>친구 찾기</button>
        </div>
        {searchList.length > 0 && (
          <div className="searchResult">
            {searchList.map((search, index) => (
              <div key={index} className="friendInfo">
                {search.image_url ?(<img src={`http://localhost:8080/static/images/profile/${search.image_url}`}/>
              ):(
                <img src='/images/cat1.jpg'/>
              )}
                {/* <span>{search.user_nickname}</span> */}
                <ProfileLink user_id={search.user_id} user_nickname={search.user_nickname}></ProfileLink>
                <button onClick={() => addFriend(search)}>추가</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FriendsList;
