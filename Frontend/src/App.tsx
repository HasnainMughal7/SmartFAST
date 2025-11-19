import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { useApp } from './context/AppContext';
import {Login, Teacher, UserManagement, Maintainer, AdminChat, AdminDashboard} from "./Pages";
import ProtectedRoute from './components/ProtectedRoute';
import LoginWrapper from './components/LoginWrapper';
import AppLayout from '../layouts/AppLayout';
import { Navigate } from 'react-router-dom';

function App() {
  const { user } = useApp();
  
  if (!user) {
    return <Login />;
  }
  const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <Navigate to="/login" replace /> },
      
      // Protected Admin Routes
      { path: "admin/dashboard", element: <ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute> },
      { path: "admin/chat", element: <ProtectedRoute allowedRoles={['admin']}><AdminChat /></ProtectedRoute> },
      { path: "admin/users", element: <ProtectedRoute allowedRoles={['admin']}><UserManagement /></ProtectedRoute> },
      
      // Protected Teacher Routes
      { path: "teacher/home", element: <ProtectedRoute allowedRoles={['teacher']}><Teacher /></ProtectedRoute> },
      
      // Protected Maintainer Routes
      { path: "maintainer/tasks", element: <ProtectedRoute allowedRoles={['maintainer']}><Maintainer /></ProtectedRoute> }
    ]
  },
  {
    path: "/login",
    element: <LoginWrapper />
  },
  {
    path: "*",
    element: <LoginWrapper />
  }
]);

  return (
    <>

      <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col">
        <div className="flex flex-1">
          <main className="flex-1 overflow-x-hidden">
            <RouterProvider router={router} />
          </main>
        </div>
      </div>

    </>
  )
}

export default App
