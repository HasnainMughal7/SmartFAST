import { AlertTriangle, Bell, CheckCircle, Wrench } from "lucide-react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useApp } from "../../context/AppContext"
import StatCard from "../../components/StatCard";
import { POWER_DATA } from "../../data/mockData";

const AdminDashboard = () => {
  const { alerts } = useApp();
  
  const completedCount = alerts.filter(a => a.status === 'completed').length;
  const progressCount = alerts.filter(a => a.status === 'in-progress').length;
  const pendingCount = alerts.filter(a => a.status === 'pending').length;

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Tasks Completed" count={completedCount} icon={<CheckCircle />} color="bg-green-500" bg="bg-green-50" text="text-green-600" />
        <StatCard title="In Progress" count={progressCount} icon={<Wrench />} color="bg-orange-500" bg="bg-orange-50" text="text-orange-600" />
        <StatCard title="Critical Alerts" count={pendingCount} icon={<AlertTriangle />} color="bg-red-500" bg="bg-red-50" text="text-red-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Section */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="font-bold text-xl text-slate-800">Power Consumption</h3>
              <p className="text-sm text-slate-400">Real-time energy monitoring across campus</p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold border border-indigo-100">
              <span className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse"></span> LIVE
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={POWER_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }} 
                />
                <Bar dataKey="usage" fill="#6366f1" radius={[6, 6, 0, 0]} barSize={50} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Recent Alerts Section */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col h-full">
          <h3 className="font-bold text-xl text-slate-800 mb-4 flex items-center gap-2">
            <Bell className="text-indigo-500" size={20} /> Recent Alerts
          </h3>
          <div className="flex-1 overflow-y-auto space-y-3 pr-1 custom-scrollbar">
            {alerts.slice(0, 10).map(alert => (
              <div key={alert.id} className="p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition group">
                <div className="flex justify-between mb-1">
                  <span className={`font-bold text-[10px] uppercase tracking-wide px-2 py-0.5 rounded-full ${alert.category === 'Urgent' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>
                    {alert.category}
                  </span>
                  <span className="text-slate-400 text-xs font-medium">{alert.timestamp}</span>
                </div>
                <p className="font-bold text-slate-700 text-sm mb-0.5">{alert.location}</p>
                <p className="text-slate-500 text-xs truncate group-hover:text-slate-700">{alert.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
