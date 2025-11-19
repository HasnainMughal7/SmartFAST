import { Zap, LogOut } from "lucide-react";
import { useApp } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, Logout } = useApp();
  const navigate = useNavigate();

  // console.log("Navbar User:", user);

  if (!user) return null;

  return (
    <nav className="bg-white border-b border-slate-200 px-6 py-3 flex justify-between items-center sticky top-0 z-50 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="bg-indigo-600 p-2 rounded-lg shadow-indigo-200 shadow-md">
          <Zap className="text-white w-5 h-5" />
        </div>
        <div>
          <h1 className="font-bold text-slate-800 leading-tight text-lg">SmartFAST</h1>
          <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">{user.role} ACCESS</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right hidden sm:block">
          <p className="text-sm font-bold text-slate-700">{user.username}</p>
          <p className="text-xs text-slate-400 font-medium">{user.email}</p>
        </div>
        <div className="h-8 w-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold border border-indigo-200">
          {user.username?.charAt(0)}
        </div>
        <button 
          onClick={Logout} 
          className="p-2 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-full transition duration-200"
          title="Logout"
        >
          <LogOut size={20} onClick={()=>navigate("/login")} />
        </button>
      </div>
    </nav>
  );
};


export default Navbar;