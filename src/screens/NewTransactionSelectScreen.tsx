import React from 'react';
import { useApp } from '../context/AppContext';
import { translations } from '../lib/i18n';
import { TransactionType } from '../types';
import {
  ShoppingBag,
  Banknote,
  HandCoins,
  PiggyBank,
  RotateCcw,
  ArrowUpRight,
  UserCheck,
  ChevronDown,
} from 'lucide-react';

export const NewTransactionSelectScreen: React.FC = () => {
  const {
    customers,
    selectedCustomerId,
    setSelectedCustomerId,
    setSelectedTxType,
    setActiveTab,
    settings,
  } = useApp();

  const lang = settings.language;
  const isBn = lang === 'bn';
  const t = translations[lang];

  // Default to first customer if none selected
  const activeCustomer = customers.find((c) => c.id === selectedCustomerId) || customers[0];

  const handleSelectType = (type: TransactionType) => {
    if (activeCustomer) {
      setSelectedCustomerId(activeCustomer.id);
    }
    setSelectedTxType(type);
    setActiveTab('tx_details');
  };

  const txTypes: { type: TransactionType; title: string; icon: React.ReactNode; color: string; bg: string }[] = [
    {
      type: 'DUE_SALE',
      title: t.dueSale,
      icon: <ShoppingBag className="w-6 h-6 text-rose-600" />,
      color: 'text-rose-700 dark:text-rose-300',
      bg: 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900/50 hover:border-rose-400',
    },
    {
      type: 'CASH_SALE',
      title: t.cashSale,
      icon: <Banknote className="w-6 h-6 text-sky-600" />,
      color: 'text-sky-700 dark:text-sky-300',
      bg: 'bg-sky-50 dark:bg-sky-950/40 border-sky-200 dark:border-sky-900/50 hover:border-sky-400',
    },
    {
      type: 'RECEIVE_DUE',
      title: t.receiveDue,
      icon: <HandCoins className="w-6 h-6 text-emerald-600" />,
      color: 'text-emerald-700 dark:text-emerald-300',
      bg: 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-900/50 hover:border-emerald-400',
    },
    {
      type: 'ADVANCE_DEPOSIT',
      title: t.advanceDeposit,
      icon: <PiggyBank className="w-6 h-6 text-purple-600" />,
      color: 'text-purple-700 dark:text-purple-300',
      bg: 'bg-purple-50 dark:bg-purple-950/40 border-purple-200 dark:border-purple-900/50 hover:border-purple-400',
    },
    {
      type: 'PRODUCT_RETURN',
      title: t.productReturn,
      icon: <RotateCcw className="w-6 h-6 text-amber-600" />,
      color: 'text-amber-700 dark:text-amber-300',
      bg: 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-900/50 hover:border-amber-400',
    },
    {
      type: 'RETURN_MONEY',
      title: t.returnMoney,
      icon: <ArrowUpRight className="w-6 h-6 text-indigo-600" />,
      color: 'text-indigo-700 dark:text-indigo-300',
      bg: 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200 dark:border-indigo-900/50 hover:border-indigo-400',
    },
  ];

  return (
    <div className="pb-24 pt-3 px-4 space-y-4 animate-in fade-in duration-200">
      {/* Active Customer Selector Banner matching Screen #3 */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-3.5 border border-slate-200 dark:border-slate-800 shadow-sm">
        <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
          {isBn ? 'কাস্টমার নির্বাচন করুন' : 'Select Customer'}
        </label>
        <div className="relative">
          <select
            value={activeCustomer?.id || ''}
            onChange={(e) => setSelectedCustomerId(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-2.5 px-3 pr-8 text-xs font-bold text-slate-800 dark:text-white appearance-none focus:outline-none focus:ring-2 focus:ring-[#00875A]"
          >
            {customers.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} ({c.phone})
              </option>
            ))}
          </select>
          <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* Title */}
      <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300 tracking-wide uppercase px-1">
        {t.selectTransactionType}
      </h3>

      {/* 2-Column Action Tiles matching Screen 3 */}
      <div className="grid grid-cols-2 gap-3">
        {txTypes.map((item) => (
          <button
            key={item.type}
            onClick={() => handleSelectType(item.type)}
            className={`${item.bg} border rounded-2xl p-4 flex flex-col items-center justify-center text-center shadow-sm hover:shadow active:scale-95 transition min-h-[110px] group`}
          >
            <div className="p-2.5 rounded-2xl bg-white dark:bg-slate-900 shadow-sm mb-2 group-hover:scale-110 transition transform">
              {item.icon}
            </div>
            <span className={`text-xs font-bold ${item.color} leading-tight`}>{item.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
