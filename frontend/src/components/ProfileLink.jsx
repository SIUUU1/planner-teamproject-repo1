import useOpenInNewTab from "../util/useOpenInNewTab";

const ProfileLink = ({ user_nickname, user_id }) => {
  const openProfile = useOpenInNewTab;

  return (
    <div className="user_nickname">
      <span onClick={openProfile(`/user/${user_id}`)}>{user_nickname}</span>
    </div>
  );
};

export default ProfileLink;