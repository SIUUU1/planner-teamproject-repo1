import { useState } from 'react';
import './TodoDetail.css';
import { useParams } from 'react-router-dom';
import DateInfo from '../components/DateInfo';
import Header from '../components/Header';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faPlus } from "@fortawesome/free-solid-svg-icons";
import { faFaceSmile } from "@fortawesome/free-regular-svg-icons";
import Button from '../components/Button';
import TodoItem from './TodoItem';
import CheeringEmoji from './CheeringEmoji';
import CheeringComment from './CheeringComment';
import ToBack from '../components/ToBack';
import RegisterEmoji from './RegisterEmoji'
import InputEmoji from '../emoji/InputEmoji.jsx'
import useLoading from '../util/useLoading.jsx';

const TodoDetail = () => {
  // const todoData = [
  //   {
  //     "todo_no": 0,
  //     "user_no": 1,
  //     "todo_title": "스트레칭하기",
  //     "is_done": "N",
  //     "reg_date": "2024-07-30",
  //     "type": "my",
  //   },
  //   {
  //     "todo_no": 2,
  //     "user_no": 1,
  //     "todo_title": "다이소 다녀오기",
  //     "is_done": "N",
  //     "reg_date": "2024-07-31",
  //     "type": "my",
  //   },
  //   {
  //     "todo_no": 3,
  //     "user_no": 1,
  //     "todo_title": "운동하기",
  //     "is_done": "N",
  //     "reg_date": "2024-07-31",
  //     "type": "my",
  //   },
  // ];

  const todoCommentData = [
    {
      "todo_comment_no": 0,
      "todo_no": 2,
      "user_no": 0,
      "todo_comment_content": "화이팅~",
      "reg_date": "2024-07-31 16:53:23",
      "emoji_item_no": null,
      "emoji_item_url": 'https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f970.png',
    },
    {
      "todo_comment_no": 1,
      "todo_no": 2,
      "user_no": 1,
      "todo_comment_content": "화이팅~!!!",
      "reg_date": "2024-07-31 16:59:23",
      "emoji_item_no": 0,
      "emoji_item_url": null,
    },
    {
      "todo_comment_no": 1,
      "todo_no": 4,
      "user_no": 1,
      "todo_comment_content": "화이팅~!!!",
      "reg_date": "2024-07-31 16:59:23",
    },
  ];

  const CheeringEmojiData = [
    {
      "cheering_emoji_no": 0,
      "emoji_item_no": 0,
      "user_no": 1,
      "todo_no": 2,
      "emoji_item_url": null,
    },
    {
      "cheering_emoji_no": 1,
      "emoji_item_no": 1,
      "user_no": 1,
      "todo_no": 2,
      "emoji_item_url": null,
    },
    {
      "cheering_emoji_no": 2,
      "emoji_item_no": null,
      "user_no": 2,
      "todo_no": 2,
      "emoji_item_url": 'https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f970.png',
    },
    {
      "cheering_emoji_no": 3,
      "emoji_item_no": 3,
      "user_no": 3,
      "todo_no": 1,
    },
  ];

  const { no, type, date } = useParams();
  const todoNo = parseInt(no, 10);
  
  const commentData = todoCommentData.filter(i => i.todo_no === todoNo);
  const emojiData = CheeringEmojiData.filter(e => e.todo_no == todoNo);
  const [isRegisterEmojiVisible, setRegisterEmojiVisible] = useState(false);
  const [isInputEmojiVisible, setInputEmojiVisible] = useState(false);
  //todo 데이터 로드
  const { data: todoData, loading: loadingdata, error: errordata } = useLoading(`http://localhost:8080/api/user/todos/${no}`, 'json');
  // 로딩 중, 오류 처리
  if (loadingdata) {
    return <div>Loading...</div>;
  }
  
  if (errordata) {
    return <div>Error: {errordata.message}</div>;
  }
  
  // const data = todoData/*.find(i => i.todo_no === todoNo)*/;
  if (!todoData) {
    return <div className='todoDetail'><div className='todoDetailContent backWhite'>Todo not found</div></div>;
  }

  return (
    <div className='todoDetail'>
      <div className='todoDetailContent backWhite'>
        <ToBack URL={`/todomain/${type}/${date}`} />
        <div className='todoDate'>
          <DateInfo firstChild={<Button text={<FontAwesomeIcon icon={faCalendar} />} />}
            title={todoData.reg_date}
          />
        </div>
        <div className='todoDetailSection'>
          <TodoItem todoNo={todoData.todo_no} todoData={todoData}/>
          <div className='cheeringEmojiList'>
            <Button text={<FontAwesomeIcon icon={faPlus} />} className={'registerEmojiBtn'} onClick={() => setRegisterEmojiVisible(!isRegisterEmojiVisible)} />
            {isRegisterEmojiVisible && <RegisterEmoji />}
            {emojiData.map((e) => (
              <CheeringEmoji key={e.cheering_emoji_no} data={e} user_no={e.user_no} />
            ))}
          </div>
          <div className='cheeringCommentList'>
            {commentData.map((i) => (
              <CheeringComment key={i.todo_comment_no} commentData={i} />
            ))}
            <div className='commentRegister'>
              <div className='commentInputDiv'>
                <input className='commentInput' placeholder='응원의 메세지를 남겨주세요!' />
                <Button text={<FontAwesomeIcon icon={faFaceSmile} />} className={'inputEmojiBtn'} onClick={() => setInputEmojiVisible(!isInputEmojiVisible)} />
              </div>
              <Button text={'등록'} />
            </div>
            {isInputEmojiVisible && <InputEmoji isInputEmojiVisible={isInputEmojiVisible}></InputEmoji>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoDetail;