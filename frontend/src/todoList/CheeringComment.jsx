import React,{ useState, useEffect } from 'react';
import './CheeringComment.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX,faPencil } from "@fortawesome/free-solid-svg-icons";
import ProfileLink from '../components/ProfileLink';
import EmojiItem from '../emoji/EmojiItem';
import Button from '../components/Button';
import InputEmoji from '../emoji/InputEmoji';
import { faFaceSmile } from "@fortawesome/free-regular-svg-icons";
import useSendPost from '../util/useSendPost';
const CheeringComment = ({ commentData, userData, refetch }) => {
  const [isEmojiNull, setIsEmojiNull] = useState(commentData.emoji_item_url === null);
  const [isCreater, setIsCreater] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [commentText, setCommentText] = useState(commentData.todo_comment_text);
  const [localEmojiUrl,setLocalEmojiUrl]=useState(commentData.emoji_item_url);
  const [isEditEmojiVisible, setEditEmojiVisible] = useState(false);

  const { postRequest: updateCommentRequest, loading: updateLoading, error: updateError } = useSendPost(`http://localhost:8080/api/user/todos/comments/update`, {});
  const { postRequest: deleteCommentRequest, loading: deleteLoading, error: deleteError } = useSendPost(`http://localhost:8080/api/user/todos/comments/delete`, {});

  useEffect(() => {
    if (userData && userData.user_no) {
      setIsCreater(commentData.user_ip === userData.user_ip);
    }
  }, [userData, commentData.user_ip]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const updateClick = async () => {
    const updatedData = {
      todo_comment_no: commentData.todo_comment_no,
      todo_comment_text: commentText,
      emoji_item_url: localEmojiUrl,
    };
    
    await updateCommentRequest(updatedData);
    setIsEditing(false);
    
    if (!updateError) {
      refetch();
    }
  };
  const deleteClick= async () => {
    await deleteCommentRequest({ todo_comment_no: commentData.todo_comment_no });
    
    if (!deleteError) {
      refetch();
    }
  };

  return (
    <div className="cheeringComment">
      <div className="cheeringCommentText">
        <ProfileLink user_nickname={commentData.user_nickname} user_no={commentData.user_no} />
        :<input
          className='comment'
          value={commentText}
          readOnly={!isEditing}
          onChange={(e) => setCommentText(e.target.value)}
        />
        {isCreater && (
          <div className='btnIcon'>
            {isEditing ? (
              <>
              <div className='editComment'>
                <Button text={<FontAwesomeIcon icon={faFaceSmile} />} className={'inputEmojiBtn'} onClick={() => setEditEmojiVisible(!isEditEmojiVisible)} />
                <Button className='updateBtn' onClick={updateClick} text={'수정'}></Button>
                {isEditEmojiVisible&&<InputEmoji isInputEmojiVisible={isEditEmojiVisible} setEmoji_url={setLocalEmojiUrl} emoji__url={localEmojiUrl}></InputEmoji>}
              </div>
              </>
            ) : (
              <FontAwesomeIcon icon={faPencil} id='pencil' onClick={handleEditClick} />
            )}
            <Button text={<FontAwesomeIcon icon={faX} id='del' /> } onClick={deleteClick}></Button>
          </div>
        )}
      </div>
      {!isEmojiNull && <EmojiItem emoji_item_url={localEmojiUrl} customHeight={50} />}
    </div>
  );
};

export default CheeringComment;
