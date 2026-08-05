import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { translations, formatCurrency } from '../lib/i18n';
import { getCustomerBalance } from '../lib/storage';
import { Search, Plus, Phone, User, ArrowUpDown, Filter, ChevronRight } from 'lucide-react';

export const CustomerListScreen: React.FC = () => {
  const { customers, transactions, settings, setSelectedCustomerId, setActiveTab, setIsAddCustomerOpen } = useApp();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'ALL' | 'DUE' | 'ADVANCE'>('ALL');

  const lang = settings.language;
  const isBn = lang === 'bn';
  const t = translations[lang];

  const filteredCustomers = customers.filter((cust) => {
    const matchesSearch =
      cust.name.toLowerCase().includes(search.toLowerCase()) ||
      cust.phone.includes(search) ||
      (cust.address && cust.address.toLowerCase().includes(search.toLowerCase()));

    if (!matchesSearch) return false;

    const bal = getCustomerBalance(cust.id, transactions);
    if (filter === 'DUE') return bal.totalDue > 0;
    if (filter === 'ADVANCE') return bal.totalAdvance > 0;
    return true;
  });

  return (
    <div className="pb-24 pt-3 px-4 space-y-3 animate-in fade-in duration-200">
      {/* Search Bar + Add Customer Button Header */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t.searchCustomer}
            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00875A]"
          />
        </div>
        <button
          onClick={() => setIsAddCustomerOpen(true)}
          className="bg-[#00875A] hover:bg-[#00704a] text-white px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1 shadow-sm shrink-0 transition"
        >
          <Plus className="w-4 h-4" />
          <span>{isBn ? 'নতুন' : 'New'}</span>
        </button>
      </div>

      {/* Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-semibold no-scrollbar">
        <button
          onClick={() => setFilter('ALL')}
          className={`px-3 py-1.5 rounded-xl border transition ${
            filter === 'ALL'
              ? 'bg-[#00875A] text-white border-[#00875A]'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800'
          }`}
        >
          {isBn ? 'সকল কাস্টমার' : 'All Customers'} ({customers.length})
        </button>
        <button
          onClick={() => setFilter('DUE')}
          className={`px-3 py-1.5 rounded-xl border transition ${
            filter === 'DUE'
              ? 'bg-rose-600 text-white border-rose-600'
              : 'bg-white dark:bg-slate-900 text-rose-600 border-rose-200 dark:border-slate-800'
          }`}
        >
          {isBn ? 'শুধুমাত্র বাকী' : 'Due Only'}
        </button>
        <button
          onClick={() => setFilter('ADVANCE')}
          className={`px-3 py-1.5 rounded-xl border transition ${
            filter === 'ADVANCE'
              ? 'bg-emerald-600 text-white border-emerald-600'
              : 'bg-white dark:bg-slate-900 text-emerald-600 border-emerald-200 dark:border-slate-800'
          }`}
        >
          {isBn ? 'শুধুমাত্র অগ্রিম' : 'Advance Only'}
        </button>
      </div>

      {/* Customers List Cards */}
      <div className="space-y-2">
        {filteredCustomers.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 text-center border border-slate-100 dark:border-slate-800">
            <User className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <p className="text-xs font-semibold text-slate-500">কোনো কাস্টমার পাওয়া যায়নি</p>
          </div>
        ) : (
          filteredCustomers.map((cust) => {
            const bal = getCustomerBalance(cust.id, transactions);
            const hasDue = bal.totalDue > 0;
            const hasAdvance = bal.totalAdvance > 0;

            return (
              <div
                key={cust.id}
                onClick={() => {
                  setSelectedCustomerId(cust.id);
                  setActiveTab('customer_profile');
                }}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-3.5 flex items-center justify-between shadow-sm hover:border-emerald-300 dark:hover:border-slate-700 transition cursor-pointer active:scale-[0.99]"
              >
                <div className="flex items-center gap-3">
                  {/* Color Avatar */}
                  <div
                    className={`w-11 h-11 rounded-full ${
                      cust.avatarColor || 'bg-emerald-500'
                    } text-white font-bold text-sm flex items-center justify-center shadow-sm shrink-0`}
                  >
                    {cust.name.charAt(0)}
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-tight mb-0.5">
                      {cust.name}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 font-mono">
                      <Phone className="w-3 h-3 text-slate-400" />
                      <span>{cust.phone}</span>
                    </p>
                  </div>
                </div>

                <div className="text-right flex items-center gap-2">
                  <div>
                    {hasDue ? (
                      <span className="text-xs font-bold text-rose-600 dark:text-rose-400 block">
                        {t.dueTag} {formatCurrency(bal.totalDue, isBn, settings.currencySymbol)}
                      </span>
                    ) : hasAdvance ? (
                      <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 block">
                        {t.advanceTag} {formatCurrency(bal.totalAdvance, isBn, settings.currencySymbol)}
                      </span>
                    ) : (
                      <span className="text-xs font-medium text-slate-500 dark:text-slate-400 block">
                        {t.paidTag} 0 {settings.currencySymbol}
                      </span>
                    )}
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300" />
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
