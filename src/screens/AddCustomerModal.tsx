import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { translations } from '../lib/i18n';
import { X, User, Phone, MapPin, FileText, Check } from 'lucide-react';

export const AddCustomerModal: React.FC = () => {
  const {
    isAddCustomerOpen,
    setIsAddCustomerOpen,
    editingCustomer,
    setEditingCustomer,
    addCustomer,
    updateCustomer,
    settings,
  } = useApp();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');

  const lang = settings.language;
  const isBn = lang === 'bn';
  const t = translations[lang];

  useEffect(() => {
    if (editingCustomer) {
      setName(editingCustomer.name);
      setPhone(editingCustomer.phone);
      setAddress(editingCustomer.address || '');
      setNotes(editingCustomer.notes || '');
    } else {
      setName('');
      setPhone('');
      setAddress('');
      setNotes('');
    }
  }, [editingCustomer, isAddCustomerOpen]);

  if (!isAddCustomerOpen) return null;

  const handleClose = () => {
    setIsAddCustomerOpen(false);
    setEditingCustomer(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    if (editingCustomer) {
      updateCustomer({
        ...editingCustomer,
        name: name.trim(),
        phone: phone.trim(),
        address: address.trim() || undefined,
        notes: notes.trim() || undefined,
      });
    } else {
      addCustomer({
        name: name.trim(),
        phone: phone.trim(),
        address: address.trim() || undefined,
        notes: notes.trim() || undefined,
      });
    }

    handleClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="max-w-sm w-full bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Header */}
        <div className="bg-[#00875A] text-white p-4 flex items-center justify-between">
          <h2 className="text-base font-bold">
            {editingCustomer
              ? isBn
                ? 'কাস্টমার তথ্য এডিট করুন'
                : 'Edit Customer'
              : t.addNewCustomer}
          </h2>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-full hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 space-y-3.5">
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 mb-1">
              <User className="w-3.5 h-3.5 text-[#00875A]" />
              <span>{t.customerName} *</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={isBn ? 'যেমন: রহিম আহমেদ' : 'e.g. Rahim Ahmed'}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-2 px-3 text-xs font-semibold text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00875A]"
              required
              autoFocus
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 mb-1">
              <Phone className="w-3.5 h-3.5 text-[#00875A]" />
              <span>{t.phoneNumber} *</span>
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="01712-345678"
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-2 px-3 text-xs font-semibold text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00875A]"
              required
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 mb-1">
              <MapPin className="w-3.5 h-3.5 text-[#00875A]" />
              <span>{t.address} ({isBn ? 'ঐচ্ছিক' : 'Optional'})</span>
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder={isBn ? 'যেমন: মিরপুর, ঢাকা' : 'e.g. Mirpur, Dhaka'}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-2 px-3 text-xs text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00875A]"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 mb-1">
              <FileText className="w-3.5 h-3.5 text-[#00875A]" />
              <span>{t.noteOptional}</span>
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={isBn ? 'যেমন: বিশ্বস্ত নিয়মিত গ্রাহক' : 'e.g. Regular customer'}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-2 px-3 text-xs text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00875A]"
            />
          </div>

          <div className="pt-2 flex gap-2">
            <button
              type="button"
              onClick={handleClose}
              className="w-1/2 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-bold hover:bg-slate-200 transition"
            >
              {t.cancel}
            </button>
            <button
              type="submit"
              className="w-1/2 py-2.5 bg-[#00875A] hover:bg-[#00704a] text-white rounded-xl text-xs font-bold shadow transition flex items-center justify-center gap-1"
            >
              <Check className="w-4 h-4" />
              <span>{t.save}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
