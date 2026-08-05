import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { translations, formatCurrency } from '../lib/i18n';
import { getCustomerBalance } from '../lib/storage';
import { Calendar, Tag, FileText, Check, ArrowLeft } from 'lucide-react';

export const AddTransactionDetailsScreen: React.FC = () => {
  const {
    customers,
    transactions,
    selectedCustomerId,
    selectedTxType,
    addTransaction,
    setActiveTab,
    settings,
    showToast,
  } = useApp();

  const lang = settings.language;
  const isBn = lang === 'bn';
  const t = translations[lang];

  const activeCustomer = customers.find((c) => c.id === selectedCustomerId) || customers[0];
  const txType = selectedTxType || 'DUE_SALE';

  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [note, setNote] = useState('');

  // Get current balance
  const currentBal = activeCustomer ? getCustomerBalance(activeCustomer.id, transactions) : { totalDue: 0, totalAdvance: 0, totalPaid: 0, netBalance: 0 };
  const numAmount = parseFloat(amount) || 0;

  // Calculate new projected balance based on transaction type
  let newProjectedDue = currentBal.totalDue;
  let newProjectedAdvance = currentBal.totalAdvance;

  if (txType === 'DUE_SALE') {
    newProjectedDue += numAmount;
  } else if (txType === 'RECEIVE_DUE') {
    newProjectedDue = Math.max(0, currentBal.totalDue - numAmount);
  } else if (txType === 'ADVANCE_DEPOSIT') {
    newProjectedAdvance += numAmount;
  } else if (txType === 'PRODUCT_RETURN') {
    newProjectedDue = Math.max(0, currentBal.totalDue - numAmount);
  } else if (txType === 'RETURN_MONEY') {
    newProjectedAdvance = Math.max(0, currentBal.totalAdvance - numAmount);
  }

  const getTxTitle = () => {
    switch (txType) {
      case 'DUE_SALE':
        return t.dueSale;
      case 'CASH_SALE':
        return t.cashSale;
      case 'RECEIVE_DUE':
        return t.receiveDue;
      case 'ADVANCE_DEPOSIT':
        return t.advanceDeposit;
      case 'PRODUCT_RETURN':
        return t.productReturn;
      case 'RETURN_MONEY':
        return t.returnMoney;
      default:
        return t.newTransaction;
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!numAmount || numAmount <= 0) {
      showToast(isBn ? 'অনুগ্রহ করে সঠিক টাকার পরিমাণ দিন' : 'Please enter a valid amount', 'error');
      return;
    }

    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    addTransaction({
      customerId: activeCustomer.id,
      type: txType,
      amount: numAmount,
      date,
      time: timeStr,
      note: note.trim() || undefined,
    });

    setActiveTab('customer_profile');
  };

  return (
    <div className="pb-24 pt-3 px-4 space-y-4 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="bg-[#00875A] text-white rounded-2xl p-4 shadow-sm flex items-center justify-between">
        <div>
          <span className="text-[10px] font-semibold text-emerald-200 uppercase tracking-wider block">
            {isBn ? 'লেনদেনের ধরন' : 'Transaction Type'}
          </span>
          <h2 className="text-lg font-bold">{getTxTitle()}</h2>
        </div>
        <button
          onClick={() => setActiveTab('add_tx')}
          className="bg-white/15 p-2 rounded-xl text-xs font-semibold hover:bg-white/25 transition"
        >
          {isBn ? 'পরিবর্তন' : 'Change'}
        </button>
      </div>

      {/* Customer Info Card Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-3.5 border border-slate-200 dark:border-slate-800 flex items-center justify-between shadow-sm">
        <div>
          <span className="text-[10px] text-slate-400 font-semibold uppercase">{isBn ? 'কাস্টমার' : 'Customer'}</span>
          <h3 className="text-sm font-bold text-slate-800 dark:text-white">{activeCustomer?.name}</h3>
          <p className="text-xs text-slate-500 font-mono">{activeCustomer?.phone}</p>
        </div>
        <div
          className={`w-10 h-10 rounded-full ${
            activeCustomer?.avatarColor || 'bg-emerald-500'
          } text-white font-bold text-sm flex items-center justify-center shadow-sm`}
        >
          {activeCustomer?.name.charAt(0)}
        </div>
      </div>

      {/* Form */}
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
            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-2 px-3 text-xs font-semibold text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00875A]"
          />
        </div>

        {/* Amount Field */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-3.5 border border-slate-200 dark:border-slate-800 shadow-sm">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 mb-1.5">
            <Tag className="w-4 h-4 text-[#00875A]" />
            <span>{t.amount} ({settings.currencySymbol})</span>
          </label>
          <div className="relative">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-3 px-3 text-lg font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00875A]"
              required
              autoFocus
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
              {settings.currencySymbol}
            </span>
          </div>
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
            placeholder={isBn ? 'যেমন: টিভি, ফ্রিজ, রাইস কুকার...' : 'e.g. TV, Fridge, Grocery...'}
            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-2 px-3 text-xs text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00875A]"
          />
        </div>

        {/* Current Balance Status Card matching Screen 4 */}
        <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-700/80 space-y-2">
          <h4 className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
            {t.currentStatus}
          </h4>
          <div className="flex justify-between text-xs py-1 border-b border-slate-200 dark:border-slate-700">
            <span className="text-slate-500">{t.totalDueBadge}:</span>
            <span className="font-bold text-rose-600">
              {formatCurrency(currentBal.totalDue, isBn, settings.currencySymbol)}
            </span>
          </div>
          <div className="flex justify-between text-xs py-1 border-b border-slate-200 dark:border-slate-700">
            <span className="text-slate-500">{t.advanceBadge}:</span>
            <span className="font-bold text-emerald-600">
              {formatCurrency(currentBal.totalAdvance, isBn, settings.currencySymbol)}
            </span>
          </div>
          <div className="flex justify-between text-sm py-1 font-extrabold">
            <span className="text-slate-800 dark:text-white">{t.newDueAmount}:</span>
            <span className="text-[#00875A] dark:text-emerald-400">
              {formatCurrency(newProjectedDue, isBn, settings.currencySymbol)}
            </span>
          </div>
        </div>

        {/* Save Action Button */}
        <button
          type="submit"
          className="w-full py-3.5 bg-[#00875A] hover:bg-[#00704a] text-white rounded-2xl font-bold text-sm shadow-md shadow-emerald-700/20 active:scale-98 transition flex items-center justify-center gap-2"
        >
          <Check className="w-5 h-5" />
          <span>{t.save}</span>
        </button>
      </form>
    </div>
  );
};
