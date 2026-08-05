import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { translations, formatCurrency } from '../lib/i18n';
import { Trash2, Search, Calendar, Filter } from 'lucide-react';

export const TransactionHistoryScreen: React.FC = () => {
  const { customers, transactions, deleteTransaction, settings, setSelectedCustomerId, setActiveTab } = useApp();
  const [filter, setFilter] = useState<'ALL' | 'DUE' | 'RECEIVED' | 'THIS_WEEK'>('ALL');
  const [search, setSearch] = useState('');

  const lang = settings.language;
  const isBn = lang === 'bn';
  const t = translations[lang];

  const filteredTx = transactions.filter((tx) => {
    const cust = customers.find((c) => c.id === tx.customerId);
    const matchesSearch =
      (cust && cust.name.toLowerCase().includes(search.toLowerCase())) ||
      (tx.note && tx.note.toLowerCase().includes(search.toLowerCase()));

    if (!matchesSearch) return false;

    if (filter === 'DUE') return tx.type === 'DUE_SALE';
    if (filter === 'RECEIVED') return tx.type === 'RECEIVE_DUE' || tx.type === 'CASH_SALE';
    return true;
  });

  return (
    <div className="pb-24 pt-3 px-4 space-y-3 animate-in fade-in duration-200">
      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={isBn ? 'লেনদেন বা কাস্টমার খুঁজুন...' : 'Search transaction or customer...'}
          className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00875A]"
        />
      </div>

      {/* Filter Tabs matching Screen #6 */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs font-semibold no-scrollbar">
        <button
          onClick={() => setFilter('ALL')}
          className={`px-3 py-1.5 rounded-xl border transition ${
            filter === 'ALL'
              ? 'bg-[#00875A] text-white border-[#00875A]'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800'
          }`}
        >
          {isBn ? 'সব' : 'All'}
        </button>
        <button
          onClick={() => setFilter('DUE')}
          className={`px-3 py-1.5 rounded-xl border transition ${
            filter === 'DUE'
              ? 'bg-rose-600 text-white border-rose-600'
              : 'bg-white dark:bg-slate-900 text-rose-600 border-rose-200 dark:border-slate-800'
          }`}
        >
          {isBn ? 'বাকীতে' : 'Credit'}
        </button>
        <button
          onClick={() => setFilter('RECEIVED')}
          className={`px-3 py-1.5 rounded-xl border transition ${
            filter === 'RECEIVED'
              ? 'bg-emerald-600 text-white border-emerald-600'
              : 'bg-white dark:bg-slate-900 text-emerald-600 border-emerald-200 dark:border-slate-800'
          }`}
        >
          {isBn ? 'আদায়' : 'Received'}
        </button>
      </div>

      {/* Grouped Transactions List */}
      {filteredTx.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 text-center border border-slate-100 dark:border-slate-800 text-slate-400">
          <p className="text-xs font-semibold">কোনো লেনদেন রেকর্ড পাওয়া যায়নি</p>
        </div>
      ) : (
        <div className="space-y-2">
          {filteredTx.map((tx) => {
            const cust = customers.find((c) => c.id === tx.customerId);
            const isDue = tx.type === 'DUE_SALE';

            return (
              <div
                key={tx.id}
                className="bg-white dark:bg-slate-900 rounded-2xl p-3 border border-slate-100 dark:border-slate-800 flex items-center justify-between shadow-sm hover:border-slate-200 transition"
              >
                <div
                  onClick={() => {
                    if (cust) {
                      setSelectedCustomerId(cust.id);
                      setActiveTab('customer_profile');
                    }
                  }}
                  className="flex items-center gap-3 cursor-pointer flex-1"
                >
                  <div
                    className={`w-10 h-10 rounded-full ${
                      cust?.avatarColor || 'bg-emerald-500'
                    } text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-sm`}
                  >
                    {cust?.name.charAt(0) || '?'}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 dark:text-white leading-tight">
                      {cust?.name || 'কাস্টমার'}
                    </h4>
                    <p className="text-[10px] text-slate-500 font-medium">
                      {tx.note || (isDue ? t.dueSale : t.receiveDue)}
                    </p>
                    <span className="text-[9px] text-slate-400 block">{tx.date} • {tx.time}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-right">
                  <div>
                    <span
                      className={`text-xs font-bold ${
                        isDue ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400'
                      }`}
                    >
                      {formatCurrency(tx.amount, isBn, settings.currencySymbol)}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      if (confirm(isBn ? 'এই লেনদেন মুছে ফেলতে চান?' : 'Delete transaction?')) {
                        deleteTransaction(tx.id);
                      }
                    }}
                    className="p-1.5 text-slate-300 hover:text-rose-500 transition"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
