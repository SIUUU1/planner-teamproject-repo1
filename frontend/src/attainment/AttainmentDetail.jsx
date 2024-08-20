import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ToBack from '../components/ToBack';
import useLoading from '../util/useLoading';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './AttainmentDetail.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faX } from "@fortawesome/free-solid-svg-icons";
import useSendPost from '../util/useSendPost';
import Button from '../components/Button';
import useMove from '../util/useMove';

const AttainmentDetail = () => {
  const { no, type } = useParams();
  const attainmentNo = parseInt(no, 10);
  const { data: attainmentdata, loading, refetch } = useLoading(`http://localhost:8080/api/user/attainments/${attainmentNo}`, 'json');
  const [isEdit, setIsEdit] = useState(false);
  const [data, setData] = useState(null);
  const [isCreater,setIsCreater]=useState(false);
  const { postRequest:updateRequest, error: updateError } = useSendPost('http://localhost:8080/api/user/attainments/update');
  const { postRequest:deleteRequest, error: deleteError } = useSendPost('http://localhost:8080/api/user/attainments/delete');
  //사용자 정보를 가져옵니다.
  const { data: userData, loading: loadingUser, error: errorLoadingUser } = useLoading('http://localhost:8080/api/user/userInfo', 'json');
  
  useEffect(() => {
    if (attainmentdata) {
      setData(attainmentdata);
    }
    if(userData){
      setIsCreater(attainmentdata.user_id === userData.user_id);
    }

  }, [userData, attainmentdata]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
    if (name === 'attainment_duration' && value === 'short_term') {
      setData(prev => ({ ...prev, 'end_date': '' }));
    }
  };

  const updateAttainment = async(newValue) => {
    if (data) {
      const updatedData = {
        ...data,
        attainment_finish: parseInt(newValue, 10),
        attainment_rate: calculateRate(parseInt(newValue, 10)),
      };
      setData(updatedData);
      await updateRequest(updatedData);
      if (!updateError) {
        refetch();
      }
    }
  };
  const updateClick=()=>{
    setIsEdit(false);
  }
  const onclickEdit=  () => {
    setIsEdit(true);
  };
  const handleUpdate=async()=>{
    await updateRequest(data);
    if (!updateError) {
      refetch();
    }
    setIsEdit(false);
  }
  const moveMain=useMove(`/attainmentMain`);
  const handleDelte=()=>{
    deleteRequest({attainment_no:data.attainment_no})
    if (!deleteError) {
      refetch();
      moveMain();
    }
  }

  const incrementAttainment = (amount) => {
    if (data) {
      const newValue = data.attainment_finish + amount;
      updateAttainment(newValue);
    }
  };

  const calculateRate = (finish) => {
    if (data) {
      return Math.round((finish / data.attainment_target) * 100);
    }
    return 0;
  };

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (!data) {
    return <div className='attainmentDetail'>잘못된 주소입니다</div>;
  }

  return (
    <div className='attainmentContent backWhite'>
      {isCreater?<ToBack URL={'/attainmentMain'} />:<ToBack URL={`/attainmentMain/${attainmentdata.user_id}`} />}
      <div className='attainmentItemContent'>
        <div className="attainmentProgressContainer">
          <CircularProgressbar
            value={data.attainment_rate}
            text={`${data.attainment_rate}%`}
            styles={buildStyles({
              textColor: "#3e98c7",
              pathColor: "#3e98c7",
              trailColor: "#d6d6d6"
            })}
          />
        </div>
        <div className="attainmentDetails">
          <div className="attainmentTitle">
            <h1>{data.attainment_name}</h1>
            <FontAwesomeIcon icon={faPencil} id='pencil'  onClick={onclickEdit}/>
            </div>
          <p>목표: {data.attainment_target} {data.attainment_type ? '분' : '회'}</p>
          <p>달성량: {data.attainment_finish} {data.attainment_type ? '분' : '회'}</p>
          <p>{'★'.repeat(data.star)}</p>
          <div className="update-controls">
            {isCreater&&<>
            <button onClick={() => incrementAttainment(-10)}>-10</button>
            <button onClick={() => incrementAttainment(-5)}>-5</button>
            <button onClick={() => incrementAttainment(-1)}>-1</button>
            </>}
            <input 
              type="number" 
              value={data.attainment_finish} 
              onChange={(e) => updateAttainment(e.target.value)}
              className="attainment-input"
              readOnly={!isCreater}
            />
            {isCreater&&<>
              <button onClick={() => incrementAttainment(1)}>+1</button>
              <button onClick={() => incrementAttainment(5)}>+5</button>
              <button onClick={() => incrementAttainment(10)}>+10</button>
            </>}
          </div>
          
        </div>
      </div>
          {isEdit&&<div className="attainmentEdit">
            <div className="attainmentEditContent backWhite">
              <input 
                name="attainment_name"
                value={data.attainment_name}
                onChange={handleInputChange}
                placeholder="목표 이름" 
                className="input-field" 
              />
              <select 
                name="attainment_type" 
                value={data.attainment_type}
                onChange={handleInputChange}
                className="select-field"
              >
                <option value="count">횟수</option>
                <option value="time">시간(분)</option>
              </select>
              <select 
                name="attainment_duration" 
                value={data.attainment_duration}
                onChange={handleInputChange}
                className="select-field"
              >
                <option value="short_term">단기</option>
                <option value="long_term">장기</option>
              </select>
              <input 
                type="date" 
                name="start_date"
                value={ new Date(data.start_date).toISOString().split('T')[0]}
                onChange={handleInputChange}
                placeholder="시작일" 
                className="input-field" 
              />
              {data.attainment_duration === 'long_term' && (
                <input 
                  type="date" 
                  name="end_date"
                  value={data.end_date?new Date(data.end_date).toISOString().split('T')[0]:""}
                  onChange={handleInputChange}
                  placeholder="종료일" 
                  className="input-field" 
                />
              )}
              <input 
                type="number" 
                name="attainment_target"
                value={data.attainment_target}
                onChange={handleInputChange}
                placeholder="목표량" 
                className="input-field"  
              />
              <label htmlFor="star">중요도: {data.star}</label>
              <input 
                type="range" 
                id="star"
                name="star"
                min="0" 
                max="10" 
                value={data.star}
                onChange={handleInputChange}
                className="star-slider"
              />
              {isCreater&&<><button className="submitBtn" onClick={handleUpdate}>수정</button>
              <button className="submitBtn" onClick={handleDelte}>삭제</button></>}
              <button className="cancelBtn" onClick={()=>{setIsEdit(!isEdit); setData(attainmentdata);}}>취소</button>
            </div>
          </div>}
    </div>
  );
};

export default AttainmentDetail;