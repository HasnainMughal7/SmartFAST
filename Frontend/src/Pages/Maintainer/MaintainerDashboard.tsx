import { AlertTriangle, CheckCircle, Wrench } from "lucide-react";
import { useApp } from "../../context/AppContext";

const MaintainerDashboard = () => {
  const { alerts, updateAlertStatus } = useApp();
  const pendingAlerts = alerts.filter(a => a.status === 'pending');
  const activeAlerts = alerts.filter(a => a.status === 'in-progress');

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Incoming Column */}
        <div className="flex flex-col h-[calc(100vh-120px)]">
          <div className="bg-white p-4 rounded-t-2xl border border-slate-200 border-b-0 flex justify-between items-center shadow-sm z-10">
            <h2 className="font-bold text-slate-800 flex items-center gap-2 text-lg">
                <div className="bg-red-100 p-1.5 rounded-lg"><AlertTriangle size={20} className="text-red-600" /></div>
                Incoming Tickets
            </h2>
            <span className="bg-red-600 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-red-200 shadow-lg">{pendingAlerts.length}</span>
          </div>
          <div className="flex-1 bg-slate-100/50 border border-slate-200 rounded-b-2xl p-4 overflow-y-auto space-y-4">
            {pendingAlerts.map(alert => (
                <div key={alert.id} className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 group hover:border-indigo-200 transition">
                    <div className="flex justify-between items-start mb-3">
                        <span className="font-bold text-slate-800 text-lg">{alert.location}</span>
                        <span className="text-xs text-slate-400 font-mono bg-slate-50 px-2 py-1 rounded">{alert.timestamp}</span>
                    </div>
                    <div className="flex gap-2 mb-4">
                        <span className={`text-[10px] uppercase tracking-wide px-2 py-1 rounded-md font-bold ${alert.category === 'Urgent' ? 'bg-red-50 text-red-700 border border-red-100' : 'bg-amber-50 text-amber-700 border border-amber-100'}`}>
                            {alert.category}
                        </span>
                        <span className="text-[10px] bg-slate-50 text-slate-500 px-2 py-1 rounded-md border border-slate-100 font-bold">User: {alert.teacher}</span>
                    </div>
                    <p className="text-slate-600 mb-5 bg-slate-50 p-3 rounded-lg text-sm border border-slate-100 italic">"{alert.comment}"</p>
                    <button 
                        onClick={() => updateAlertStatus(alert.id, 'in-progress')}
                        className="w-full bg-slate-800 text-white py-3 rounded-lg hover:bg-indigo-600 transition-colors font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-slate-200"
                    >
                        Accept Task
                    </button>
                </div>
            ))}
            {pendingAlerts.length === 0 && <EmptyState message="No new tickets." />}
          </div>
        </div>

        {/* In Progress Column */}
        <div className="flex flex-col h-[calc(100vh-120px)]">
           <div className="bg-white p-4 rounded-t-2xl border border-slate-200 border-b-0 flex justify-between items-center shadow-sm z-10">
            <h2 className="font-bold text-slate-800 flex items-center gap-2 text-lg">
                <div className="bg-orange-100 p-1.5 rounded-lg"><Wrench size={20} className="text-orange-600" /></div>
                Work In Progress
            </h2>
            <span className="bg-orange-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-orange-200 shadow-lg">{activeAlerts.length}</span>
          </div>
          <div className="flex-1 bg-slate-100/50 border border-slate-200 rounded-b-2xl p-4 overflow-y-auto space-y-4">
            {activeAlerts.map(alert => (
                <div key={alert.id} className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 border-l-4 border-l-orange-500">
                    <div className="flex justify-between items-start mb-2">
                        <span className="font-bold text-slate-800 text-lg">{alert.location}</span>
                    </div>
                    <p className="text-slate-500 mb-6 text-sm">{alert.comment}</p>
                    <div className="flex gap-3">
                        <button className="flex-1 bg-slate-50 text-slate-600 border border-slate-200 py-2.5 rounded-lg font-bold text-sm hover:bg-white transition">
                            Chat Admin
                        </button>
                        <button 
                            onClick={() => updateAlertStatus(alert.id, 'completed')}
                            className="flex-1 bg-emerald-600 text-white py-2.5 rounded-lg hover:bg-emerald-700 transition font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-100"
                        >
                            <CheckCircle size={16} /> Mark Done
                        </button>
                    </div>
                </div>
            ))}
            {activeAlerts.length === 0 && <EmptyState message="No active tasks." />}
          </div>
        </div>

      </div>
    </div>
  );
};

const EmptyState = ({ message }: { message: string }) => (
    <div className="h-48 flex flex-col items-center justify-center text-slate-300">
        <CheckCircle size={48} className="mb-2 opacity-20" />
        <p>{message}</p>
    </div>
);

export default MaintainerDashboard;