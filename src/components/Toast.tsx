import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toast } = useApp();

  if (!toast) return null;

  const iconMap = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />,
    info: <Info className="w-5 h-5 text-blue-500 shrink-0" />,
  };

  return (
    <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 max-w-xs w-full px-4 animate-in fade-in slide-in-from-top-2 duration-200">
      <div className="bg-slate-900 text-white dark:bg-slate-800 rounded-xl px-4 py-3 shadow-xl border border-slate-700/50 flex items-center gap-3">
        {iconMap[toast.type]}
        <span className="text-sm font-medium">{toast.message}</span>
      </div>
    </div>
  );
};
