import { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { useLocation, useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles, children }: { allowedRoles: string[], children: any }) => {
  const { user } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else if (!allowedRoles.includes(user.role)) {
      // Redirect based on role
      if (user.role === 'admin') navigate('/admin/dashboard');
      else if (user.role === 'teacher') navigate('/teacher/home');
      else if (user.role === 'maintainer') navigate('/maintainer/tasks');
    }
  }, [user, navigate, allowedRoles]);

  if (user && allowedRoles.includes(user.role)) return children;
  return null;
};

export default ProtectedRoute;