import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { translations, formatCurrency } from '../lib/i18n';
import { getCustomerBalance } from '../lib/storage';
import { Calendar, Tag, FileText, Check, RotateCcw, ArrowUpRight } from 'lucide-react';

interface SpecialFormsProps {
  mode: 'PRODUCT_RETURN' | 'RETURN_MONEY';
}

export const SpecialFormsScreen: React.FC<SpecialFormsProps> = ({ mode }) => {
  const {
    customers,
    transactions,
    selectedCustomerId,
    addTransaction,
    setActiveTab,
    settings,
    showToast,
  } = useApp();

  const lang = settings.language;
  const isBn = lang === 'bn';
  const t = translations[lang];

  const activeCustomer = customers.find((c) => c.id === selectedCustomerId) || customers[0];

  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [note, setNote] = useState(mode === 'PRODUCT_RETURN' ? 'পণ্য ফেরত দেওয়া হয়েছে' : 'দোকান থেকে টাকা ফেরত প্রদান');

  const currentBal = activeCustomer ? getCustomerBalance(activeCustomer.id, transactions) : { totalDue: 0, totalAdvance: 0, totalPaid: 0, netBalance: 0 };
  const numAmount = parseFloat(amount) || 0;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!numAmount || numAmount <= 0) {
      showToast(isBn ? 'সঠিক টাকার পরিমাণ দিন' : 'Enter valid amount', 'error');
      return;
    }

    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    addTransaction({
      customerId: activeCustomer.id,
      type: mode,
      amount: numAmount,
      date,
      time: timeStr,
      note,
    });

    setActiveTab('customer_profile');
  };

  return (
    <div className="pb-24 pt-3 px-4 space-y-4 animate-in fade-in duration-200">
      {/* Title Header Banner */}
      <div className="bg-[#00875A] text-white rounded-2xl p-4 shadow-sm flex items-center gap-3">
        {mode === 'PRODUCT_RETURN' ? <RotateCcw className="w-6 h-6" /> : <ArrowUpRight className="w-6 h-6" />}
        <div>
          <h2 className="text-base font-bold">
            {mode === 'PRODUCT_RETURN' ? 'পণ্য পরে দেওয়া হবে / ফেরত' : 'দোকান থেকে টাকা ফেরত প্রদান'}
          </h2>
          <p className="text-[10px] text-emerald-200">{activeCustomer?.name} - {activeCustomer?.phone}</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-4">
        {/* Date Field */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-3.5 border border-slate-200 dark:border-slate-800 shadow-sm">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 mb-1.5">
            <Calendar className="w-4 h-4 text-[#00875A]" />
            <span>{t.date}</span>
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-2 px-3 text-xs font-semibold text-slate-800 dark:text-white"
          />
        </div>

        {/* Amount Field */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-3.5 border border-slate-200 dark:border-slate-800 shadow-sm">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 mb-1.5">
            <Tag className="w-4 h-4 text-[#00875A]" />
            <span>{t.amount} ({settings.currencySymbol})</span>
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-2.5 px-3 text-base font-bold text-slate-900 dark:text-white"
            required
            autoFocus
          />
        </div>

        {/* Note Field */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-3.5 border border-slate-200 dark:border-slate-800 shadow-sm">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 mb-1.5">
            <FileText className="w-4 h-4 text-[#00875A]" />
            <span>{t.noteOptional}</span>
          </label>
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-2 px-3 text-xs text-slate-800 dark:text-white"
          />
        </div>

        {/* Summary status box matching screens 7 & 8 */}
        <div className="bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl p-4 border border-emerald-200/80 text-center space-y-1">
          <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-300 block">
            {mode === 'PRODUCT_RETURN' ? 'পরের দেওয়া হতে হবে' : 'ফেরত দেওয়া হতে হবে'}
          </span>
          <p className="text-xl font-black text-[#00875A] dark:text-emerald-400">
            {formatCurrency(numAmount, isBn, settings.currencySymbol)}
          </p>
        </div>

        {/* Save Button */}
        <button
          type="submit"
          className="w-full py-3.5 bg-[#00875A] hover:bg-[#00704a] text-white rounded-2xl font-bold text-sm shadow-md flex items-center justify-center gap-2"
        >
          <Check className="w-5 h-5" />
          <span>{t.save}</span>
        </button>
      </form>
    </div>
  );
};
