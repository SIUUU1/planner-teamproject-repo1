import React from 'react';
import { useNavigate } from 'react-router-dom';
import useLoading from '../util/useLoading';

const ManagerRoute = ({ element }) => {
  const navigate = useNavigate();

  const { data, loading, error, refetch } = useLoading('http://localhost:8080/api/user/role', 'text');

  React.useEffect(() => {
    if (error) {
      console.error('Error checking user role:', error);
      navigate('/welcome'); 
    } else if (data) {
      if (data === 'ROLE_MANAGER') {
        return;
      } else {
        navigate('/welcome'); 
      }
    }
  }, [data, error, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return data === 'ROLE_MANAGER' ? element : null;
};

export default ManagerRoute;
