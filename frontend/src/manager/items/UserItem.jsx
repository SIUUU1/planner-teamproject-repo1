import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/Button";
import useSendPost from "../../util/useSendPost";
import React, { useState } from 'react';

const UserItem = ({ data,refetch,no }) => {
  const { postRequest, loading, error } = useSendPost('http://localhost:8080/api/mngr/user/delete');
  const onDelClick = async () => {

    await postRequest({ user_id: data.user_id });
    if (!loading && !error) {
      console.log(`User ${data.user_id} deleted successfully`);
      refetch();
    }
  };
  
  return (
    <tr className="userItem">
      <td style={{ width: '70px' }}>{no}</td>
      <td style={{ width: '70px' }}>{data.user_name}</td>
      <td style={{ width: '250px' }}>{data.user_id}</td>
      <td style={{ width: '150px' }}>{data.role}</td>
      <td style={{ width: '120px' }}>{data.user_tel}</td>
      <td style={{ width: '220px' }}>{data.user_email}</td>
      <td style={{ width: '40px' }}>{data.user_gender}</td>
      <td style={{ width: '40px' }}><Button text={<FontAwesomeIcon icon={faX} id='del' />} onClick={onDelClick}/></td>
    </tr>
  );
};

export default UserItem;
