import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

const UserRoute = ({ element }) => {
  const navigate = useNavigate();
  const { user, loading} = useUser();

  React.useEffect(() => {
    if(!loading){
      if (!user) {
        console.error('로그인 한 계정이 없습니다.');
        navigate('/welcome');
      } else if (user.role === 'ROLE_MANAGER') {
        navigate('/manager');
      } else if (user.role === 'ROLE_USER' || user.role === 'ROLE_PRO') {
        return;
      }
    }
  }, [user,loading, navigate]);

  return loading ? null : (user && (user.role === 'ROLE_USER' || user.role === 'ROLE_PRO') ? element : null);
};

export default UserRoute;
