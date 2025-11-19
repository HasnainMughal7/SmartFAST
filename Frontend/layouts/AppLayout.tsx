import { useEffect } from 'react';
import { useApp } from '../src/context/AppContext';
import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from '../src/components/Navbar';
import Sidebar from '../src/components/Sidebar';

const AppLayout = () => {
  const { user } = useApp();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col">
      <Navbar />
      <div className="flex flex-1 h-[calc(100vh-70px)] overflow-hidden">
        {user.role === 'admin' && <Sidebar />}
        <main className="flex-1 overflow-y-auto m-2">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
export default AppLayout;