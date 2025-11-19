import { useEffect, useState } from 'react';
import { PlusCircle, Search, Trash2, AlertCircle, CheckCircle, X } from 'lucide-react';
import type { UserRole, User } from '../../types';
import { MOCK_USERS } from '../../data/mockData';
import axios from 'axios';

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [fetching, setFetching] = useState(false);

  // --- Search State ---
  const [searchTerm, setSearchTerm] = useState('');

  // --- Notification States ---
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const showError = (message: string) => {
    setErrorMsg(message);
    setSuccessMsg(null);
    setTimeout(() => setErrorMsg(null), 3000);
  };

  const showSuccess = (message: string) => {
    setSuccessMsg(message);
    setErrorMsg(null);
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      if (fetching) return;
      try {
        setFetching(true);
        const res = await axios.get('http://localhost:5172/api/dashboard/profiles')
        if (res.data.users) setUsers(res.data.users);
        setFetching(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setFetching(false);
      }
    }
    fetchUsers();
  }, [])

  const [newUser, setNewUser] = useState<User>({ username: '', password: '', email: '', role: 'teacher' });

  const addUser = async (newUser: User) => {
    try {
      const res = await axios.post('http://localhost:5172/api/auth/profile/create', newUser);
      console.log(res);
      showSuccess("User added successfully!");
      setTimeout(() => window.location.reload(), 1000);
    } catch (error: any) {
      const backendMessage = error.response?.data?.message || "Something went wrong!";
      showError(backendMessage);
      console.error('Error adding user:', error);
    }
  }

  const deleteUser = async (userId: string | undefined) => {
    console.log("Deleting user with ID:", userId);
    try {
      console.log(userId);
      const res = await axios.delete(`http://localhost:5172/api/auth/profile/${userId}`);
      console.log(res);
      showSuccess("User Deleted successfully!");
      setTimeout(() => window.location.reload(), 2000);
    } catch (error: any) {
      const backendMessage = error.response?.data?.message || "Something went wrong!";
      showError(backendMessage);
      console.error('Error adding user:', error);
    }
  }

  const handleAdd = () => {
    if (!newUser.username || !newUser.email || !newUser.password || !newUser.role) {
      showError("All fields are required!");
      return;
    }
    if (newUser.password.length < 8) {
      showError("Password must be at least 8 chars.");
      return;
    }
    addUser(newUser);
  };

  // --- Filter Logic ---
  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 animate-fadeIn relative">

      {/* --- ERROR ALERT (RED) --- */}
      {errorMsg && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 animate-slideInDown">
          <div className="bg-red-50 border border-red-200 text-red-800 px-6 py-3 rounded-xl shadow-xl flex items-center gap-3 relative overflow-hidden min-w-[300px]">
            <AlertCircle size={20} className="text-red-600" />
            <span className="font-medium text-sm flex-1">{errorMsg}</span>
            <button onClick={() => setErrorMsg(null)} className="text-red-400 hover:text-red-700"><X size={16} /></button>
            <div className="absolute bottom-0 left-0 h-1 bg-red-500 w-full animate-progressBar"></div>
          </div>
        </div>
      )}

      {/* --- SUCCESS ALERT (GREEN) --- */}
      {successMsg && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 animate-slideInDown">
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-6 py-3 rounded-xl shadow-xl flex items-center gap-3 relative overflow-hidden min-w-[300px]">
            <CheckCircle size={20} className="text-emerald-600" />
            <span className="font-medium text-sm flex-1">{successMsg}</span>
            <button onClick={() => setSuccessMsg(null)} className="text-emerald-400 hover:text-emerald-700"><X size={16} /></button>
            <div className="absolute bottom-0 left-0 h-1 bg-emerald-500 w-full animate-progressBar"></div>
          </div>
        </div>
      )}

      {
        fetching ? <p className="text-slate-500 text-center py-10">Loading users...</p> :
          (<>
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl font-bold text-slate-800">User Management</h2>
                <p className="text-slate-500 text-sm">Manage access for Teachers and Maintainers</p>
              </div>
              {/* --- Search Bar --- */}
              <div className="relative">
                <Search className="absolute left-3 top-3 text-slate-400" size={16} />
                <input
                  placeholder="Search users..."
                  className="pl-9 pr-4 py-2 bg-slate-50 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-64 transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Add User Form */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-8 p-5 bg-slate-50 rounded-xl border border-slate-200">
              <div className="md:col-span-4">
                <input
                  className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="Full Name"
                  value={newUser.username}
                  onChange={e => setNewUser({ ...newUser, username: e.target.value })}
                />
              </div>
              <div className="md:col-span-4">
                <input
                  className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="Email Address"
                  value={newUser.email}
                  onChange={e => setNewUser({ ...newUser, email: e.target.value })}
                />
              </div>
              <div className="md:col-span-4">
                <input
                  className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="Password"
                  type="password"
                  value={newUser.password}
                  onChange={e => setNewUser({ ...newUser, password: e.target.value })}
                />
              </div>
              <div className="md:col-span-2">
                <select
                  className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
                  value={newUser.role}
                  onChange={e => setNewUser({ ...newUser, role: e.target.value as UserRole })}
                >
                  <option value="teacher">Teacher</option>
                  <option value="maintainer">Maintainer</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <button
                  onClick={handleAdd}
                  className="w-full h-full bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-bold transition shadow-md shadow-indigo-200 flex items-center justify-center gap-2"
                >
                  <PlusCircle size={18} /> Add
                </button>
              </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-slate-200">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider font-semibold">
                  <tr>
                    <th className="p-4">Name / Email</th>
                    <th className="p-4">Role</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {/* Map over filteredUsers instead of users */}
                  {!fetching && filteredUsers.length > 0 ? (
                    filteredUsers.map((u, i) => (
                      <tr key={i} className="hover:bg-slate-50/50 transition">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center font-bold text-slate-500">
                              {u.username.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p className="font-bold text-slate-700">{u.username}</p>
                              <p className="text-xs text-slate-400">{u.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-bold capitalize border ${u.role === 'admin' ? 'bg-indigo-50 text-indigo-700 border-indigo-100' :
                            u.role === 'teacher' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                              'bg-amber-50 text-amber-700 border-amber-100'
                            }`}>
                            {u.role}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
                            <span className="w-2 h-2 bg-green-500 rounded-full"></span> Active
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => deleteUser(u._id)}
                            className="text-slate-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-lg transition"
                            title="Delete User"
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="p-8 text-center text-slate-500">
                        No users found matching "{searchTerm}"
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>)
      }
    </div>
  );
};
export default UserManagement;
