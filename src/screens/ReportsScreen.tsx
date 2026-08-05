import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { translations, formatCurrency } from '../lib/i18n';
import { getDashboardSummary } from '../lib/storage';
import {
  FileText,
  FileSpreadsheet,
  Printer,
  Calendar,
  BarChart3,
  TrendingUp,
  ArrowDownLeft,
  Wallet,
  Gift,
  RotateCcw,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from 'recharts';

export const ReportsScreen: React.FC = () => {
  const { customers, transactions, settings, exportPDF, exportExcel } = useApp();
  const [period, setPeriod] = useState<'TODAY' | 'WEEK' | 'MONTH' | 'ALL'>('MONTH');

  const lang = settings.language;
  const isBn = lang === 'bn';
  const t = translations[lang];

  const summary = getDashboardSummary(customers, transactions);

  // Generate Recharts chart data for June 2025 (matching reference screenshot #10)
  const chartData = [
    { date: isBn ? '৫ জুন' : '5 Jun', sale: 12450, collection: 8300 },
    { date: isBn ? '৯ জুন' : '9 Jun', sale: 18200, collection: 15400 },
    { date: isBn ? '১৬ জুন' : '16 Jun', sale: 24500, collection: 21000 },
    { date: isBn ? '২২ জুন' : '22 Jun', sale: 31000, collection: 28500 },
    { date: isBn ? '৩০ জুন' : '30 Jun', sale: 38350, collection: 25100 },
  ];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="pb-24 pt-3 px-4 space-y-4 animate-in fade-in duration-200">
      {/* Date Range Selector Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-3 border border-slate-200 dark:border-slate-800 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-200">
          <Calendar className="w-4 h-4 text-[#00875A]" />
          <span>{isBn ? '০১ জুন, ২০২৫ - ৩০ জুন, ২০২৫' : '01 Jun, 2025 - 30 Jun, 2025'}</span>
        </div>
      </div>

      {/* Period Chips matching Screen #10 */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs font-semibold no-scrollbar">
        <button
          onClick={() => setPeriod('TODAY')}
          className={`px-3 py-1.5 rounded-xl border transition ${
            period === 'TODAY'
              ? 'bg-[#00875A] text-white border-[#00875A]'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800'
          }`}
        >
          {t.today}
        </button>
        <button
          onClick={() => setPeriod('WEEK')}
          className={`px-3 py-1.5 rounded-xl border transition ${
            period === 'WEEK'
              ? 'bg-[#00875A] text-white border-[#00875A]'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800'
          }`}
        >
          {t.thisWeek}
        </button>
        <button
          onClick={() => setPeriod('MONTH')}
          className={`px-3 py-1.5 rounded-xl border transition ${
            period === 'MONTH'
              ? 'bg-[#00875A] text-white border-[#00875A]'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800'
          }`}
        >
          {t.thisMonth}
        </button>
        <button
          onClick={() => setPeriod('ALL')}
          className={`px-3 py-1.5 rounded-xl border transition ${
            period === 'ALL'
              ? 'bg-[#00875A] text-white border-[#00875A]'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800'
          }`}
        >
          {t.allTime}
        </button>
      </div>

      {/* 5 Summary Stat Cards matching Screen #10 */}
      <div className="grid grid-cols-2 gap-2.5">
        <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/50 rounded-2xl p-3">
          <span className="text-[10px] font-bold text-emerald-800 dark:text-emerald-300 block mb-1">
            {t.totalSales}
          </span>
          <p className="text-base font-bold text-emerald-900 dark:text-emerald-100">
            {formatCurrency(124500, isBn, settings.currencySymbol)}
          </p>
        </div>

        <div className="bg-sky-50 dark:bg-sky-950/40 border border-sky-100 dark:border-sky-900/50 rounded-2xl p-3">
          <span className="text-[10px] font-bold text-sky-800 dark:text-sky-300 block mb-1">
            {t.todayCollection}
          </span>
          <p className="text-base font-bold text-sky-900 dark:text-sky-100">
            {formatCurrency(98300, isBn, settings.currencySymbol)}
          </p>
        </div>

        <div className="bg-pink-50 dark:bg-pink-950/40 border border-pink-100 dark:border-pink-900/50 rounded-2xl p-3">
          <span className="text-[10px] font-bold text-pink-800 dark:text-pink-300 block mb-1">
            {t.totalReceivable}
          </span>
          <p className="text-base font-bold text-pink-900 dark:text-pink-100">
            {formatCurrency(summary.totalReceivable, isBn, settings.currencySymbol)}
          </p>
        </div>

        <div className="bg-purple-50 dark:bg-purple-950/40 border border-purple-100 dark:border-purple-900/50 rounded-2xl p-3">
          <span className="text-[10px] font-bold text-purple-800 dark:text-purple-300 block mb-1">
            {t.totalAdvance}
          </span>
          <p className="text-base font-bold text-purple-900 dark:text-purple-100">
            {formatCurrency(summary.totalAdvance, isBn, settings.currencySymbol)}
          </p>
        </div>
      </div>

      {/* Bar Chart Analytics Card matching Screen 10 */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 border border-slate-100 dark:border-slate-800 shadow-sm space-y-3">
        <h3 className="text-xs font-bold text-slate-800 dark:text-white flex items-center gap-1.5">
          <BarChart3 className="w-4 h-4 text-[#00875A]" />
          <span>{t.salesAndCollectionChart}</span>
        </h3>

        <div className="h-52 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
              <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#64748B' }} />
              <YAxis tick={{ fontSize: 10, fill: '#64748B' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0F172A',
                  borderColor: '#334155',
                  borderRadius: '12px',
                  color: '#FFF',
                  fontSize: '11px',
                }}
              />
              <Bar dataKey="sale" name={isBn ? 'বিক্রি' : 'Sales'} fill="#F43F5E" radius={[4, 4, 0, 0]} />
              <Bar dataKey="collection" name={isBn ? 'আদায়' : 'Collection'} fill="#00875A" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Export & Print Actions */}
      <div className="grid grid-cols-3 gap-2">
        <button
          onClick={exportPDF}
          className="flex items-center justify-center gap-1.5 py-3 bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 rounded-2xl text-xs font-bold border border-rose-200 dark:border-rose-900/50 hover:bg-rose-100 transition"
        >
          <FileText className="w-4 h-4" />
          <span>PDF</span>
        </button>

        <button
          onClick={exportExcel}
          className="flex items-center justify-center gap-1.5 py-3 bg-emerald-50 dark:bg-emerald-950/50 text-[#00875A] dark:text-emerald-300 rounded-2xl text-xs font-bold border border-emerald-200 dark:border-emerald-900/50 hover:bg-emerald-100 transition"
        >
          <FileSpreadsheet className="w-4 h-4" />
          <span>Excel</span>
        </button>

        <button
          onClick={handlePrint}
          className="flex items-center justify-center gap-1.5 py-3 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-2xl text-xs font-bold border border-slate-200 dark:border-slate-700 hover:bg-slate-200 transition"
        >
          <Printer className="w-4 h-4" />
          <span>{isBn ? 'প্রিন্ট' : 'Print'}</span>
        </button>
      </div>
    </div>
  );
};
