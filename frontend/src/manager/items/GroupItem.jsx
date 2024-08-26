import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/Button";
import useSendPost from "../../util/useSendPost";
const GroupItem=({data,refetch})=>{
  const { postRequest, loading, error } = useSendPost('http://localhost:8080/api/group/delete');
  const onDelClick = async () => {

    await postRequest({ group_id: data.group_id });
    if (!loading && !error) {
      console.log(`Group ${data.group_id} deleted successfully`);
      refetch();
    }
  };
  return(
    <tr className="groupItems">
      <td style={{ width: '70px' }}>{data.category}</td>
      <td style={{ width: '250px' }}>{data.leader_id}</td>
      <td style={{ width: '150px' }}>{data.group_name}</td>
      <td style={{ width: '120px' }}>{data.groupone_count}</td>
      <td style={{ width: '220px' }}>{data.group_goal}</td>
      <td style={{ width: '40px' }}><Button text={<FontAwesomeIcon icon={faX} id='del' />} onClick={onDelClick}/></td>
    </tr>
  );
};
export default GroupItem;