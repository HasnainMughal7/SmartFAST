import { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import Login from '../Pages/Login';

const LoginWrapper = () => {
  const { user } = useApp();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (user) {
      if (user.role === 'admin') navigate('/admin/dashboard');
      else if (user.role === 'teacher') navigate('/teacher/home');
      else if (user.role === 'maintainer') navigate('/maintainer/tasks');
    }
  }, [user, navigate]);

  return <Login />;
};
export default LoginWrapper;