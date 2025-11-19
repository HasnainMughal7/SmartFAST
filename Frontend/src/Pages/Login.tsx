import { useState } from 'react';
import { Zap, Mail, Lock } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Login = () => {
  const { Login } = useApp();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl w-full max-w-md p-8 border border-slate-200">
        <div className="text-center mb-8">
          <div className="bg-indigo-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg rotate-3 hover:rotate-0 transition-all duration-300">
            <Zap className="text-white w-8 h-8" />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-800">SFD Portal</h1>
          <p className="text-slate-500 mt-1">SmartFAST Dashboard</p>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); Login(username, password); }} className="space-y-5">
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700 ml-1">Enter Username</label>
            <div className="relative flex items-center justify-center">
              <Mail className="absolute left-3 top-3 text-slate-400" size={18} />
              <input type="text" value={username} required onChange={(e) => setUsername(e.target.value)} placeholder="Enter username" className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition" />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700 ml-1">Password</label>
            <div className="relative flex items-center justify-center">
              <Lock className="absolute left-3 top-3 text-slate-400" size={18} />
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition" />
            </div>
          </div>
          <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3.5 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl shadow-indigo-200 transition-all transform hover:-translate-y-0.5">Login to Dashboard</button>
        </form>
      </div>
    </div>
  );
};
export default Login;