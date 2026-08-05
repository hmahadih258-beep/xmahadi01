import React from 'react';
import { useApp } from '../context/AppContext';
import { translations } from '../lib/i18n';
import { LayoutDashboard, Users, Plus, History, BarChart3, Settings } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab, settings, setSelectedCustomerId, setSelectedTxType } = useApp();
  const lang = settings.language;
  const t = translations[lang];

  const handleOpenAddTx = () => {
    setSelectedTxType(null);
    setActiveTab('add_tx');
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800 px-2 py-1.5 z-30 shadow-lg flex items-center justify-around">
      {/* 1. Dashboard */}
      <button
        onClick={() => setActiveTab('dashboard')}
        className={`flex flex-col items-center py-1 px-3 rounded-xl transition ${
          activeTab === 'dashboard'
            ? 'text-[#00875A] font-bold dark:text-emerald-400'
            : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'
        }`}
      >
        <LayoutDashboard className="w-5 h-5 mb-0.5" />
        <span className="text-[10px]">{t.dashboard}</span>
      </button>

      {/* 2. Customers */}
      <button
        onClick={() => setActiveTab('customers')}
        className={`flex flex-col items-center py-1 px-3 rounded-xl transition ${
          activeTab === 'customers' || activeTab === 'customer_profile'
            ? 'text-[#00875A] font-bold dark:text-emerald-400'
            : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'
        }`}
      >
        <Users className="w-5 h-5 mb-0.5" />
        <span className="text-[10px]">{t.customerList}</span>
      </button>

      {/* 3. Floating (+) Add Transaction Center Button */}
      <div className="-mt-6 flex flex-col items-center">
        <button
          onClick={handleOpenAddTx}
          className="w-12 h-12 rounded-full bg-[#00875A] hover:bg-[#00704a] text-white shadow-lg shadow-emerald-600/30 flex items-center justify-center active:scale-95 transition transform"
          aria-label="Add Transaction"
        >
          <Plus className="w-6 h-6 stroke-[2.5]" />
        </button>
        <span className="text-[9px] text-[#00875A] dark:text-emerald-400 font-semibold mt-0.5">
          {t.newTransaction}
        </span>
      </div>

      {/* 4. History */}
      <button
        onClick={() => setActiveTab('history')}
        className={`flex flex-col items-center py-1 px-3 rounded-xl transition ${
          activeTab === 'history'
            ? 'text-[#00875A] font-bold dark:text-emerald-400'
            : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'
        }`}
      >
        <History className="w-5 h-5 mb-0.5" />
        <span className="text-[10px]">{t.transactionHistory}</span>
      </button>

      {/* 5. Reports / Settings */}
      <button
        onClick={() => setActiveTab('reports')}
        className={`flex flex-col items-center py-1 px-3 rounded-xl transition ${
          activeTab === 'reports' || activeTab === 'settings'
            ? 'text-[#00875A] font-bold dark:text-emerald-400'
            : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'
        }`}
      >
        <BarChart3 className="w-5 h-5 mb-0.5" />
        <span className="text-[10px]">{t.reports}</span>
      </button>
    </nav>
  );
};
