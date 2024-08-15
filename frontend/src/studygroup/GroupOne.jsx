import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useSendPost from '../util/useSendPost';
import useLoading from '../util/useLoading';

const GroupOne = () => {
  const { id } = useParams();
  // 그룹원 정보
  const { data: groupOneData, loading: loadingGroupOne, error: errorGroupOne, refetch: refetchGroupOne } = useLoading(`http://localhost:8080/api/group/groupone/list/${id}`, 'json');
  
  //지원 수락
  const {postRequest: updateRequest, error:updateError} = useSendPost(
    'http://localhost:8080/api/group/groupone/accept',
    {},
    'json'
  );

  const onAccept =async(groupone)=>{
    try {
      await updateRequest({ user_id: groupone.user_id, group_id: groupone.group_id });
      alert(`${groupone.user_nickname} 지원 수락하셨습니다.`);
    } catch (error) {
      console.error("Error accept:", error);
    }
    refetchGroupOne();
  };

  //지원 거절 및 그룹 탈퇴시키기
  const deleteRequest = useSendPost(
    'http://localhost:8080/api/group/groupone/delete',
    {},
    'json'
  );
  const { postRequest: postRequestDel, loading: loadingDel, error: errorDel } = deleteRequest;

  const onRefuse = async (groupone) => {
    try {
      await postRequestDel({ user_id: groupone.user_id });
      alert(`${groupone.user_nickname} 지원 거절하셨습니다.`);
    } catch (error) {
      console.error("Error refuse:", error);
    }
    refetchGroupOne();
  };

  const onDelete = async (groupone) => {
    try {
      await postRequestDel({ user_id: groupone.user_id });
      alert(`${groupone.user_nickname} 탈퇴시켰습니다.`);
    } catch (error) {
      console.error("Error delete:", error);
    }
    refetchGroupOne();
  };

if(loadingGroupOne){
return <div>loading...</div>;
}
  return (
      <div>
        <h3>그룹원 관리</h3>
        <table>
            <thead>
                <tr>
                    <th>번호</th>
                    <th>닉네임</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {groupOneData.map((groupone, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{groupone.user_nickname}</td>
                        <td>
                        {index > 0 && (
                  groupone.enable === '1' ? (
                    <button onClick={() => onDelete(groupone)}>탈퇴</button>
                  ) : (
                    <>
                      <button onClick={() => onAccept(groupone)}>수락</button>
                      <button onClick={() => onRefuse(groupone)}>거절</button>
                    </>
                  ))}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
    );
};

export default GroupOne;
