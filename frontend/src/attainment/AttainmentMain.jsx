import "./AttainmentMain.css";
import Attainment from "./Attainment";
import DateNav from '../components/DateNav';
import Button from "../components/Button";
import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesLeft } from "@fortawesome/free-solid-svg-icons";
import { faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import { faPlus} from "@fortawesome/free-solid-svg-icons";
import useLoading from '../util/useLoading';
import useSendPost from '../util/useSendPost';
import { useParams } from 'react-router-dom';

const AttainmentMain = () => {
  const {user_id,group_id} = useParams();
  //등록
  const { postRequest, loading: postLoading, error: postError } = useSendPost('http://localhost:8080/api/user/attainments');
  const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [attainment_duration,setAttainment_duration]=useState('short_term');
  const [importance, setImportance] = useState(0);
  // const apiShortUrl = user_id
  // ?`http://localhost:8080/api/user/attainments/searchUser?attainment_duration=short_term&selectDate=${date}&user_id=${user_id}`:
  // (group_id?`http://localhost:8080/api/user/attainments/searchUser?attainment_duration=short_term&selectDate=${date}&group_id=${group_id}`:
  // `http://localhost:8080/api/user/attainments/search?attainment_duration=short_term&selectDate=${date}`);

  // const apiLongUrl = user_id
  // ?`http://localhost:8080/api/user/attainments/searchUser?attainment_duration=long_term&selectDate=${date}&user_id=${user_id}`:
  // `http://localhost:8080/api/user/attainments/search?attainment_duration=long_term&selectDate=${date}`;

  // 공통된 부분
  const baseUrl = `http://localhost:8080/api/user/attainments/`;
  const shortTermParams = `?attainment_duration=short_term&selectDate=${date}`;
  const longTermParams = `?attainment_duration=long_term&selectDate=${date}`;

  // Short Term URL 구성
  let shortTermUrl;

  if (user_id) {
    shortTermUrl = `${baseUrl}searchUser${shortTermParams}&user_id=${user_id}`;
  } else if (group_id) {
    shortTermUrl = `${baseUrl}searchGroup${shortTermParams}&group_id=${group_id}`;
  } else {
    shortTermUrl = `${baseUrl}search${shortTermParams}`;
  }

  // Long Term URL 구성
  let longTermUrl;

  if (user_id) {
    longTermUrl = `${baseUrl}searchUser${longTermParams}&user_id=${user_id}`;
  } else if (group_id) {
    longTermUrl = `${baseUrl}searchGroup${longTermParams}&group_id=${group_id}`;
  } else {
    longTermUrl = `${baseUrl}search${longTermParams}`;
  }


  const { data:shortData=[],refetch:refetchShort } = useLoading(shortTermUrl, 'json');
  const { data:longData=[],refetch:refetchLong } = useLoading(longTermUrl, 'json');
  const [isRegister,setIsRegister]=useState(false);
  const onClickLeft = () => setDate(dayjs(date).subtract(1, 'day').format('YYYY-MM-DD'));
  const onClickRight = () => setDate(dayjs(date).add(1, 'day').format('YYYY-MM-DD'));
  const [longHeight, setLongHeight] = useState(longData ? longData.length * 70 : 50);
  const [shortHeight, setShortHeight] = useState(shortData ? shortData.length * 70 : 50);

  useEffect(() => {
    if (longData) {
      setLongHeight(longData.length * 70);
    }
  }, [longData]);

  useEffect(() => {
    if (shortData) {
      setShortHeight(shortData.length * 70);
    }
  }, [shortData]);

  const [data, setData] = useState({
    attainment_name: '',
    attainment_type: 'count',
    attainment_target: '',
    attainment_duration: 'short_term',
    start_date: '',
    end_date: '',
    star: 0,
    group_id:group_id,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const handleRegister=async()=>{
    await postRequest(data);
    if(!postError){
      setIsRegister(false);
      refetchShort();
      refetchLong();
      setData({
        attainment_name: '',
        attainment_type: 'count',
        attainment_target: '',
        attainment_duration: 'short_term',
        start_date: '',
        end_date: '',
        star: 0})
    }
  }

  return (
    <div className="attainmentMain" >
      <div className="attainmentContent backWhite">
        <div className="todoDate">
          <DateNav
            firstChild={<Button text={<FontAwesomeIcon icon={faAnglesLeft} />} onClick={onClickLeft} />}
            title={date}
            secondChild={<Button text={<FontAwesomeIcon icon={faAnglesRight} />} onClick={onClickRight}/>}
          />
        </div>
        {!user_id&&<Button onClick={()=>setIsRegister(!isRegister)} className={'addAttainment'} text={<FontAwesomeIcon icon={faPlus} />}></Button>}
        <div className="attainmentList" style={{ height: `${shortHeight}px`, minHeight:'50px'}}>
          {(shortData&&shortData.length!==0)?shortData.map((i) => (<Attainment key={i.id} data={i} padding={0.2}/>)) : 
          <p>등록된 오늘의 목표가 없습니다!</p>}
        </div>
        <div className="attainmentList" style={{ height: `${longHeight}px`, minHeight:'50px' }}>
        {longData&&longData.length!==0 ? longData.map((i) => (<Attainment key={i.id} data={i} padding={0.2}/>)) : 
          <p>등록된 장기적인 목표가 없습니다!</p>}
        </div>
      </div>
      {isRegister&&<div className="registerDiv">
          <div className="registerContent backWhite">
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
              value={data.start_date}
              onChange={handleInputChange}
              placeholder="시작일" 
              className="input-field" 
            />
            {data.attainment_duration === 'long_term' && (
              <input 
                type="date" 
                name="end_date"
                value={data.end_date}
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
            <button className="submitBtn" onClick={handleRegister}>등록</button>
            <button className="cancelBtn" onClick={()=>{setIsRegister(!isRegister); setAttainment_duration('short_term');}}>취소</button>
            
          </div>
        </div>}
    </div>
  );
};

export default AttainmentMain;
