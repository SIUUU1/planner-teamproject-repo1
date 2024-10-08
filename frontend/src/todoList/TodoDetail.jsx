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
import useSendPost from '../util/useSendPost.jsx';

const TodoDetail = () => {
  const { no, type, date } = useParams();
  const todoNo = parseInt(no, 10);

  const [isRegisterEmojiVisible, setRegisterEmojiVisible] = useState(false);
  const [isInputEmojiVisible, setInputEmojiVisible] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [new_comment_emoji_url, setNew_comment_emoji_url] = useState(null);

  //사용자 정보 로드
  const { data: userData, loading: loadingUser, error: errorLoadingUser } = useLoading('http://localhost:8080/api/user/userInfo', 'json');

  //todo 데이터 로드
  const { data: todoData, loading: loadingdata, error: errordata } = useLoading(`http://localhost:8080/api/user/todos/${no}`, 'json');
  
  //응원 이모지 로드
  const { data: cheeringEmojis, loadingEmoji, errorEmoji,refetch:refetchEmoji } = useLoading(`http://localhost:8080/api/user/todos/${todoNo}/cheering-emojis`, 'json');
  
  // useLoading 훅을 사용하여 댓글 목록 로드
  const { data: comments = [], loading, error, refetch } = useLoading(`http://localhost:8080/api/user/todos/${todoNo}/comments`, 'json');

  // useSendPost 훅을 사용하여 새 댓글을 추가
  const { postRequest, loading: postLoading, error: postError } = useSendPost(`http://localhost:8080/api/user/todos/${todoNo}/comments`);
  const addComment = async () => {
    await postRequest({
      todoNo,
      todo_comment_text: newComment,
      emoji_item_url: new_comment_emoji_url,
    });

    if (!postError) {
      setNewComment('');
      refetch(); // 댓글 목록을 다시 불러옵니다.
      setNew_comment_emoji_url(null);
      setInputEmojiVisible(false);
    }
  };
  
  // 로딩 중, 오류 처리
  if (loadingdata||loadingUser) {
    return <div className='todoDetail'><div className='todoDetailContent backWhite'>Loading...</div></div>;
  }
  
  if (errordata||errorLoadingUser) {
    return <div  className='todoDetail'><div className='todoDetailContent backWhite'>Error: {errordata.message}</div></div>;
  }
  
  // const data = todoData/*.find(i => i.todo_no === todoNo)*/;
  if (!todoData) {
    return <div className='todoDetail'><div className='todoDetailContent backWhite'>Todo not found</div></div>;
  }
  if (loading) return <div>댓글을 불러오는 중...</div>;
  if (error) return <div> 댓글 로드 중 오류 발생: {error}</div>;


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
          <TodoItem todoNo={todoData.todo_no} todoData={todoData} userData={userData}/>
          <div className='cheeringEmojiList'>
            <Button text={<FontAwesomeIcon icon={faPlus} />} className={'registerEmojiBtn'} onClick={() => setRegisterEmojiVisible(!isRegisterEmojiVisible)} />
            {isRegisterEmojiVisible && <RegisterEmoji userData={userData} todoNo={todoNo} refetchEmoji={refetchEmoji}/>}
            {cheeringEmojis&&cheeringEmojis.map((e) => (
              <CheeringEmoji key={e.cheering_emoji_no} data={e} userData={userData}  refetchEmoji={refetchEmoji}/>
            ))}
          </div>
          <div className='cheeringCommentList'>
            {comments && comments.length > 0 ? (
                comments.map((i) => (
                  <CheeringComment key={i.todo_comment_no} commentData={i} userData={userData} refetch={refetch}/>
                ))
              ) : (
                <p>첫 번째 응원 메시지를 남겨보세요!</p>
            )}
            <div className='commentRegister'>
              <div className='commentInputDiv'>
                <input className='commentInput' placeholder='응원의 메세지를 남겨주세요!' value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}/>
                <Button text={<FontAwesomeIcon icon={faFaceSmile} />} className={'inputEmojiBtn'} onClick={() => setInputEmojiVisible(!isInputEmojiVisible)} />
              </div>
              <Button text={'등록'} onClick={addComment}/>
            </div>
            {isInputEmojiVisible && <InputEmoji isInputEmojiVisible={isInputEmojiVisible} setEmoji_url={setNew_comment_emoji_url} emoji__url={new_comment_emoji_url}></InputEmoji>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoDetail;