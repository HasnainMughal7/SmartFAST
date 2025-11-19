import React from 'react';

const StatCard = ({ title, count, icon, color, bg, text }: any) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between group hover:shadow-md transition-all">
    <div>
      <p className="text-slate-500 text-sm font-medium mb-1">{title}</p>
      <h3 className="text-4xl font-bold text-slate-800">{count}</h3>
    </div>
    <div className={`w-14 h-14 rounded-2xl ${bg} ${text} flex items-center justify-center shadow-inner transform group-hover:scale-110 transition-transform duration-300`}>
      {React.cloneElement(icon, { size: 28 })}
    </div>
  </div>
);

export default StatCard;