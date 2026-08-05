import React from 'react';
import { useApp } from '../context/AppContext';
import { translations, formatCurrency } from '../lib/i18n';
import { getCustomerBalance } from '../lib/storage';
import {
  Phone,
  MessageSquare,
  MapPin,
  Plus,
  Trash2,
  Edit,
  Wallet,
  Gift,
  CheckCircle,
  ArrowLeft,
} from 'lucide-react';

export const CustomerProfileScreen: React.FC = () => {
  const {
    customers,
    transactions,
    selectedCustomerId,
    setSelectedCustomerId,
    setActiveTab,
    settings,
    deleteCustomer,
    setEditingCustomer,
    setIsAddCustomerOpen,
  } = useApp();

  const lang = settings.language;
  const isBn = lang === 'bn';
  const t = translations[lang];

  const customer = customers.find((c) => c.id === selectedCustomerId) || customers[0];

  if (!customer) {
    return (
      <div className="p-8 text-center text-slate-400">
        <p>কাস্টমার নির্বাচন করুন</p>
      </div>
    );
  }

  const bal = getCustomerBalance(customer.id, transactions);
  const custTx = transactions.filter((t) => t.customerId === customer.id);

  const handleDelete = () => {
    if (confirm(isBn ? 'আপনি কি এই কাস্টমার মুছে ফেলতে চান?' : 'Are you sure you want to delete this customer?')) {
      deleteCustomer(customer.id);
      setActiveTab('customers');
    }
  };

  return (
    <div className="pb-28 pt-2 px-4 space-y-4 animate-in fade-in duration-200">
      {/* Top Customer Card Banner matching Screen 5 */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-100 dark:border-slate-800 text-center shadow-sm relative">
        {/* Action icons */}
        <div className="absolute top-3 right-3 flex items-center gap-1">
          <button
            onClick={() => {
              setEditingCustomer(customer);
              setIsAddCustomerOpen(true);
            }}
            className="p-2 rounded-xl text-slate-400 hover:text-emerald-600 hover:bg-slate-50 transition"
            title="Edit Customer"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={handleDelete}
            className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
            title="Delete Customer"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        {/* Circular Avatar */}
        <div
          className={`w-20 h-20 rounded-full ${
            customer.avatarColor || 'bg-emerald-500'
          } text-white font-bold text-2xl flex items-center justify-center mx-auto mb-3 shadow-md`}
        >
          {customer.name.charAt(0)}
        </div>

        <h2 className="text-lg font-bold text-slate-900 dark:text-white leading-tight mb-1">{customer.name}</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mb-2">{customer.phone}</p>
        {customer.address && (
          <p className="text-xs text-slate-400 flex items-center justify-center gap-1 mb-4">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            <span>{customer.address}</span>
          </p>
        )}

        {/* Call & SMS Quick Buttons */}
        <div className="flex justify-center gap-3">
          <a
            href={`tel:${customer.phone}`}
            className="flex items-center gap-1.5 px-4 py-2 bg-emerald-50 dark:bg-emerald-950/60 text-[#00875A] dark:text-emerald-300 rounded-xl text-xs font-bold hover:bg-emerald-100 transition"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>{isBn ? 'কল করুন' : 'Call'}</span>
          </a>
          <a
            href={`sms:${customer.phone}`}
            className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-bold hover:bg-slate-200 transition"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>{isBn ? 'মেসেজ' : 'SMS'}</span>
          </a>
        </div>
      </div>

      {/* 3 Metric Stat Badges matching Screen #5 */}
      <div className="grid grid-cols-3 gap-2">
        {/* 1. Total Due */}
        <div className="bg-rose-50 dark:bg-rose-950/40 border border-rose-100 dark:border-rose-900/50 rounded-2xl p-3 text-center">
          <span className="text-[10px] font-bold text-rose-700 dark:text-rose-300 block mb-0.5">
            {t.totalDueBadge}
          </span>
          <p className="text-xs font-bold text-rose-800 dark:text-rose-200">
            {formatCurrency(bal.totalDue, isBn, settings.currencySymbol)}
          </p>
        </div>

        {/* 2. Advance */}
        <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/50 rounded-2xl p-3 text-center">
          <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 block mb-0.5">
            {t.advanceBadge}
          </span>
          <p className="text-xs font-bold text-emerald-800 dark:text-emerald-200">
            {formatCurrency(bal.totalAdvance, isBn, settings.currencySymbol)}
          </p>
        </div>

        {/* 3. Paid */}
        <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-100 dark:border-amber-900/50 rounded-2xl p-3 text-center">
          <span className="text-[10px] font-bold text-amber-700 dark:text-amber-300 block mb-0.5">
            {t.paidBadge}
          </span>
          <p className="text-xs font-bold text-amber-800 dark:text-amber-200">
            {formatCurrency(bal.totalPaid, isBn, settings.currencySymbol)}
          </p>
        </div>
      </div>

      {/* Transaction History Section */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-4 shadow-sm space-y-3">
        <h3 className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider">
          {t.transactionHistory} ({custTx.length})
        </h3>

        {custTx.length === 0 ? (
          <p className="text-xs text-slate-400 text-center py-6">কোনো লেনদেন রেকর্ড নেই</p>
        ) : (
          <div className="space-y-2">
            {custTx.map((tx) => {
              const isDue = tx.type === 'DUE_SALE';
              return (
                <div
                  key={tx.id}
                  className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-3 flex items-center justify-between border border-slate-100 dark:border-slate-800"
                >
                  <div>
                    <span className="text-[10px] font-semibold text-slate-400 block">{tx.date}</span>
                    <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100">
                      {tx.note || (isDue ? t.dueSale : t.receiveDue)}
                    </h4>
                  </div>
                  <span
                    className={`text-xs font-bold ${
                      isDue ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400'
                    }`}
                  >
                    {isDue ? '+' : '-'} {formatCurrency(tx.amount, isBn, settings.currencySymbol)}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Bottom Floating Add Transaction Action Button matching Screen 5 */}
      <div className="fixed bottom-16 left-0 right-0 max-w-md mx-auto px-4 z-20">
        <button
          onClick={() => {
            setSelectedCustomerId(customer.id);
            setActiveTab('add_tx');
          }}
          className="w-full py-3.5 bg-[#00875A] hover:bg-[#00704a] text-white rounded-2xl font-bold text-xs shadow-lg shadow-emerald-700/30 flex items-center justify-center gap-2 transition active:scale-98"
        >
          <Plus className="w-4 h-4" />
          <span>{t.addTransactionBtn}</span>
        </button>
      </div>
    </div>
  );
};
