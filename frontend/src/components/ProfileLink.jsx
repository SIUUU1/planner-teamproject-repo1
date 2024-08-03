import useOpenInNewTab from "../util/useOpenInNewTab";

const ProfileLink = ({ user_nickname, user_no }) => {
  const openProfile = useOpenInNewTab;

  return (
    <div className="user_nickname">
      <span onClick={openProfile(`userHome/${user_no}`)}>{user_nickname}</span>
    </div>
  );
};

export default ProfileLink;