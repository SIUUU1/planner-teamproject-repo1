import { useNavigate } from 'react-router-dom';

const useMove = (URL) => {
  const navigate = useNavigate();
  return () => navigate(URL);
};

export default useMove;
