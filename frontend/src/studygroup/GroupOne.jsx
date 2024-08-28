import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useSendPost from '../util/useSendPost';
import useLoading from '../util/useLoading';
import useMove from '../util/useMove';
import './GroupOne.css';
import GroupOneItem from './GroupOneItem';

const GroupOne = () => {
  const { id } = useParams();
  // 그룹원 정보
  const { data: groupOneData, loading: loadingGroupOne, error: errorGroupOne, refetch: refetchGroupOne } = useLoading(`http://localhost:8080/api/group/groupone/list/${id}`, 'json');
  // 그룹 수정
  const moveToEdit = useMove(`/groupedit/${id}`);

  //그룹 삭제
  const deleteGroupRequest = useSendPost(
    'http://localhost:8080/api/group/delete',
    { group_id: id },
    'json'
  );
  const { postRequest: postRequestDelGroup, loading: loadingDelGroup, error: errorDelGroup } = deleteGroupRequest;

  const onDelGroup = async () => {
    if(!window.confirm('정말로 삭제하시겠습니까?')){
      return;
    }
    try {
      await postRequestDelGroup({ group_id: id });
    } catch (error) {
      console.error("Error delete:", error);
    }
    moveToMain();
  };

if(loadingGroupOne){
return <div>loading...</div>;
}
  return (
      <div className='groupOne backWhite'>
        <h3>그룹 관리</h3>
        <div className='joinBtnDiv'>
        <button className="joinButton" onClick={()=>{moveToEdit()}}>그룹 수정</button>
        <button className="joinButton" onClick={onDelGroup}>그룹 삭제</button>
        </div>
        <table className='groupOneTable'>
            <thead>
                <tr>
                    <th style={{ width: '70px' }}>번호</th>
                    <th style={{ width: '250px' }}>닉네임</th>
                    <th style={{ width: '250px' }}>가입날짜</th>
                    <th style={{ width: '150px' }}>수락 / 거절</th>
                </tr>
            </thead>
            <tbody>
              {groupOneData && groupOneData.map((i, index) => (
                <GroupOneItem key={i.groupone_id} data={i} refetch={refetchGroupOne}  no={index + 1}/>
              ))}
            </tbody>
        </table>
        </div>
    );
};

export default GroupOne;
