import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

const UserItem = ({ data }) => {
  return (
    <tr className="userItem">
      <td style={{ width: '70px' }}>{data.user_name}</td>
      <td style={{ width: '250px' }}>{data.user_id}</td>
      <td style={{ width: '150px' }}>{data.role}</td>
      <td style={{ width: '120px' }}>{data.user_tel}</td>
      <td style={{ width: '220px' }}>{data.user_email}</td>
      <td style={{ width: '40px' }}>{data.user_gender}</td>
      <td style={{ width: '40px' }}><FontAwesomeIcon icon={faX} id='del' /></td>
    </tr>
  );
};

export default UserItem;
