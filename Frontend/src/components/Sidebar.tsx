import { LayoutDashboard, MessageSquare, Users, Bell } from "lucide-react";
import { useApp } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const currentPath = window.location.pathname;

  const isActive = (path: string) => currentPath === path;
  const linkClass = (path: string) => `
    w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-all duration-200 font-medium
    ${isActive(path) 
      ? 'bg-indigo-50 text-indigo-700 shadow-sm translate-x-1' 
      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}
  `;

  return (
    <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col h-[calc(100vh-70px)] sticky top-[70px]">
      <div className="p-4 space-y-2 mt-4">
        <p className="px-4 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Main Menu</p>
        <button onClick={() => navigate("/admin/dashboard")} className={linkClass('/admin/dashboard')}>
          <LayoutDashboard size={20} /> Dashboard
        </button>
        <button onClick={() =>  navigate("/admin/chat")} className={linkClass('/admin/chat')}>
          <MessageSquare size={20} /> Admin Chat
        </button>
        <button onClick={() =>  navigate("/admin/users")} className={linkClass('/admin/users')}>
          <Users size={20} /> User Management
        </button>
        
        <div className="my-4 border-t border-slate-100"></div>
        
        <p className="px-4 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">System</p>
        <button className="w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 text-slate-400 cursor-default">
          <Bell size={20} /> Notifications
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;