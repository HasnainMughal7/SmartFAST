import { useState } from 'react'
import { PlusCircle, AlertTriangle, CheckCircle, Send } from 'lucide-react'
import { useApp } from '../../context/AppContext'

const TeacherDashboard = () => {
  const { user, addAlert, alerts } = useApp();
  const [formData, setFormData] = useState({ category: 'Moderate', location: '', comment: '' });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    addAlert({
        teacher: user.name,
        category: formData.category as 'Moderate' | 'Urgent',
        location: formData.location,
        comment: formData.comment
    });
    setFormData({ category: 'Moderate', location: '', comment: '' });
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-2xl font-bold text-slate-800">Welcome, {user?.name}</h1>
            <p className="text-slate-500">Submit maintenance requests directly to the admin team.</p>
        </div>
        <button className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-lg font-bold text-sm">
            System Status: Online
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 animate-fadeIn relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-emerald-600"></div>
                <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <PlusCircle className="text-emerald-600" /> Create Ticket
                </h2>

                {showSuccess && (
                    <div className="mb-6 p-4 bg-emerald-50 text-emerald-700 rounded-xl flex items-center gap-3 animate-pulse border border-emerald-100">
                        <CheckCircle size={20} /> 
                        <span className="font-bold">Request sent successfully!</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">Severity Level</label>
                        <div className="relative">
                            <select 
                                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none appearance-none"
                                value={formData.category}
                                onChange={e => setFormData({...formData, category: e.target.value})}
                            >
                                <option value="Moderate">Moderate Issue</option>
                                <option value="Urgent">Urgent / Hazardous</option>
                            </select>
                            <div className="absolute right-3 top-3.5 pointer-events-none">
                                <AlertTriangle size={16} className="text-slate-400"/>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">Location</label>
                        <input 
                            required
                            placeholder="e.g., Block B, Room 201"
                            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                            value={formData.location}
                            onChange={e => setFormData({...formData, location: e.target.value})}
                        />
                    </div>
                </div>
                
                <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Problem Description</label>
                    <textarea 
                        required
                        rows={4}
                        placeholder="Please describe the issue in detail..."
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none resize-none"
                        value={formData.comment}
                        onChange={e => setFormData({...formData, comment: e.target.value})}
                    ></textarea>
                </div>

                <button type="submit" className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-emerald-700 transition shadow-lg shadow-emerald-200 flex items-center justify-center gap-2">
                    <Send size={20} /> Submit Request
                </button>
                </form>
            </div>
          </div>

          {/* Recent History Sidebar */}
          <div className="space-y-4">
              <h3 className="font-bold text-slate-700 px-1">My Recent Requests</h3>
              {alerts.filter(a => a.teacher === user?.name).map(alert => (
                  <div key={alert.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 relative">
                      <div className={`absolute left-0 top-4 w-1 h-8 rounded-r-lg ${alert.status === 'completed' ? 'bg-green-500' : alert.status === 'in-progress' ? 'bg-orange-500' : 'bg-slate-300'}`}></div>
                      <div className="pl-3">
                        <div className="flex justify-between items-start mb-1">
                            <span className="text-sm font-bold text-slate-800">{alert.location}</span>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${alert.status === 'completed' ? 'bg-green-100 text-green-700' : alert.status === 'in-progress' ? 'bg-orange-100 text-orange-700' : 'bg-slate-100 text-slate-600'}`}>
                                {alert.status}
                            </span>
                        </div>
                        <p className="text-xs text-slate-500 line-clamp-2">{alert.comment}</p>
                        <p className="text-[10px] text-slate-300 mt-2 text-right">{alert.timestamp}</p>
                      </div>
                  </div>
              ))}
              {alerts.filter(a => a.teacher === user?.name).length === 0 && (
                  <div className="text-center p-8 border-2 border-dashed border-slate-200 rounded-xl text-slate-400">
                      <p className="text-sm">No history yet.</p>
                  </div>
              )}
          </div>
      </div>
    </div>
  );
};
export default TeacherDashboard;