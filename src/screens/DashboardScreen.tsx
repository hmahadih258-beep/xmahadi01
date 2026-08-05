import React from 'react';
import { useApp } from '../context/AppContext';
import { translations, toBnDigit, formatCurrency } from '../lib/i18n';
import { getDashboardSummary } from '../lib/storage';
import {
  TrendingUp,
  ArrowDownLeft,
  Wallet,
  Gift,
  RotateCcw,
  Users,
  ChevronRight,
  PlusCircle,
  FileText,
  UserPlus,
} from 'lucide-react';

export const DashboardScreen: React.FC = () => {
  const { customers, transactions, settings, setActiveTab, setSelectedCustomerId, setIsAddCustomerOpen } = useApp();
  const lang = settings.language;
  const isBn = lang === 'bn';
  const t = translations[lang];

  const summary = getDashboardSummary(customers, transactions);

  // Today Date formatted in Bangla/English
  const todayDate = new Date();
  const dateOptions: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
  const formattedDate = todayDate.toLocaleDateString(isBn ? 'bn-BD' : 'en-US', dateOptions);
  const weekdayName = todayDate.toLocaleDateString(isBn ? 'bn-BD' : 'en-US', { weekday: 'long' });

  // Get recent 5 transactions
  const recentTx = [...transactions].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5);

  return (
    <div className="pb-24 pt-3 px-4 space-y-4 animate-in fade-in duration-200">
      {/* Date Header Banner */}
      <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/50 rounded-2xl p-3.5 flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-emerald-900 dark:text-emerald-100">{formattedDate}</h2>
          <p className="text-xs text-emerald-700 dark:text-emerald-300 capitalize">{weekdayName}</p>
        </div>
        <div className="w-9 h-9 rounded-xl bg-[#00875A] text-white flex items-center justify-center font-bold text-xs shadow-sm">
          {toBnDigit(todayDate.getDate(), isBn)}
        </div>
      </div>

      {/* 6 Summary Metric Grid Cards matching Screenshot #1 */}
      <div className="grid grid-cols-2 gap-3">
        {/* 1. 今日 欠款 Today's Due */}
        <div className="bg-rose-50/80 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/40 rounded-2xl p-3.5 shadow-sm hover:shadow transition">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-rose-800 dark:text-rose-300">{t.todayDue}</span>
            <div className="w-8 h-8 rounded-xl bg-rose-100 dark:bg-rose-900/60 text-rose-600 dark:text-rose-300 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <p className="text-lg font-bold text-rose-900 dark:text-rose-100">
            {formatCurrency(summary.todayDue, isBn, settings.currencySymbol)}
          </p>
        </div>

        {/* 2. 今日 收款 Today's Collection */}
        <div className="bg-sky-50/80 dark:bg-sky-950/30 border border-sky-100 dark:border-sky-900/40 rounded-2xl p-3.5 shadow-sm hover:shadow transition">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-sky-800 dark:text-sky-300">{t.todayCollection}</span>
            <div className="w-8 h-8 rounded-xl bg-sky-100 dark:bg-sky-900/60 text-sky-600 dark:text-sky-300 flex items-center justify-center">
              <ArrowDownLeft className="w-4 h-4" />
            </div>
          </div>
          <p className="text-lg font-bold text-sky-900 dark:text-sky-100">
            {formatCurrency(summary.todayCollection, isBn, settings.currencySymbol)}
          </p>
        </div>

        {/* 3. 总 欠款 Total Receivable */}
        <div className="bg-pink-50/80 dark:bg-pink-950/30 border border-pink-100 dark:border-pink-900/40 rounded-2xl p-3.5 shadow-sm hover:shadow transition">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-pink-800 dark:text-pink-300">{t.totalReceivable}</span>
            <div className="w-8 h-8 rounded-xl bg-pink-100 dark:bg-pink-900/60 text-pink-600 dark:text-pink-300 flex items-center justify-center">
              <Wallet className="w-4 h-4" />
            </div>
          </div>
          <p className="text-lg font-bold text-pink-900 dark:text-pink-100">
            {formatCurrency(summary.totalReceivable, isBn, settings.currencySymbol)}
          </p>
        </div>

        {/* 4. 总 预付 Total Advance */}
        <div className="bg-purple-50/80 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/40 rounded-2xl p-3.5 shadow-sm hover:shadow transition">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-purple-800 dark:text-purple-300">{t.totalAdvance}</span>
            <div className="w-8 h-8 rounded-xl bg-purple-100 dark:bg-purple-900/60 text-purple-600 dark:text-purple-300 flex items-center justify-center">
              <Gift className="w-4 h-4" />
            </div>
          </div>
          <p className="text-lg font-bold text-purple-900 dark:text-purple-100">
            {formatCurrency(summary.totalAdvance, isBn, settings.currencySymbol)}
          </p>
        </div>

        {/* 5. 重新 支付 Repayment */}
        <div className="bg-amber-50/80 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/40 rounded-2xl p-3.5 shadow-sm hover:shadow transition">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-amber-800 dark:text-amber-300">{t.repayment}</span>
            <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-900/60 text-amber-600 dark:text-amber-300 flex items-center justify-center">
              <RotateCcw className="w-4 h-4" />
            </div>
          </div>
          <p className="text-lg font-bold text-amber-900 dark:text-amber-100">
            {formatCurrency(summary.repayment, isBn, settings.currencySymbol)}
          </p>
        </div>

        {/* 6. 总 客户 Total Customers */}
        <div className="bg-teal-50/80 dark:bg-teal-950/30 border border-teal-100 dark:border-teal-900/40 rounded-2xl p-3.5 shadow-sm hover:shadow transition">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-teal-800 dark:text-teal-300">{t.totalCustomers}</span>
            <div className="w-8 h-8 rounded-xl bg-teal-100 dark:bg-teal-900/60 text-teal-600 dark:text-teal-300 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <p className="text-lg font-bold text-teal-900 dark:text-teal-100">
            {toBnDigit(summary.totalCustomers, isBn)} {t.personCount}
          </p>
        </div>
      </div>

      {/* Quick Action Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar">
        <button
          onClick={() => setIsAddCustomerOpen(true)}
          className="flex items-center gap-1.5 px-3 py-2 bg-emerald-100 dark:bg-emerald-950/60 text-[#00875A] dark:text-emerald-300 rounded-xl text-xs font-semibold hover:bg-emerald-200 transition shrink-0"
        >
          <UserPlus className="w-4 h-4" />
          <span>{t.addNewCustomer}</span>
        </button>
        <button
          onClick={() => setActiveTab('add_tx')}
          className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-semibold hover:bg-slate-200 transition shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>{t.newTransaction}</span>
        </button>
        <button
          onClick={() => setActiveTab('reports')}
          className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-semibold hover:bg-slate-200 transition shrink-0"
        >
          <FileText className="w-4 h-4" />
          <span>{t.reports}</span>
        </button>
      </div>

      {/* Recent Transactions List Section */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-4 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <span>{t.recentTransactions}</span>
          </h3>
          <button
            onClick={() => setActiveTab('history')}
            className="text-xs font-semibold text-[#00875A] dark:text-emerald-400 hover:underline flex items-center gap-1"
          >
            <span>{t.viewAll}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {recentTx.length === 0 ? (
          <p className="text-xs text-slate-400 text-center py-6">কোনো লেনদেন পাওয়া যায়নি</p>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {recentTx.map((tx) => {
              const cust = customers.find((c) => c.id === tx.customerId);
              const isDue = tx.type === 'DUE_SALE';

              return (
                <div
                  key={tx.id}
                  onClick={() => {
                    if (cust) {
                      setSelectedCustomerId(cust.id);
                      setActiveTab('customer_profile');
                    }
                  }}
                  className="py-2.5 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-xl px-2 cursor-pointer transition"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-full ${
                        cust?.avatarColor || 'bg-emerald-500'
                      } text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-sm`}
                    >
                      {cust?.name ? cust.name.charAt(0) : '?'}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100">{cust?.name || 'কাস্টমার'}</h4>
                      <div className="flex items-center gap-2 text-[10px] text-slate-500">
                        <span className="font-medium text-slate-600 dark:text-slate-400">
                          {tx.type === 'DUE_SALE'
                            ? t.dueSale
                            : tx.type === 'RECEIVE_DUE'
                            ? t.receiveDue
                            : tx.type === 'ADVANCE_DEPOSIT'
                            ? t.advanceDeposit
                            : t.cashSale}
                        </span>
                        <span>•</span>
                        <span>{tx.time || '10:30 AM'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <span
                      className={`text-xs font-bold ${
                        isDue ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400'
                      }`}
                    >
                      {isDue ? '+' : ''}
                      {formatCurrency(tx.amount, isBn, settings.currencySymbol)}
                    </span>
                    {tx.note && <p className="text-[10px] text-slate-400 truncate max-w-[100px]">{tx.note}</p>}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
