import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { translations } from '../lib/i18n';
import { ShieldCheck, Delete, Lock } from 'lucide-react';

export const PinLockModal: React.FC = () => {
  const { isPinLocked, setIsPinLocked, settings, showToast } = useApp();
  const [pin, setPin] = useState('');
  const lang = settings.language;
  const t = translations[lang];

  if (!isPinLocked) return null;

  const handleKeyPress = (num: string) => {
    if (pin.length < 4) {
      const newPin = pin + num;
      setPin(newPin);
      if (newPin.length === 4) {
        if (newPin === (settings.pinCode || '1234')) {
          setIsPinLocked(false);
          setPin('');
          showToast(lang === 'bn' ? 'আনলক করা হয়েছে' : 'Unlocked successfully!');
        } else {
          showToast(t.pinIncorrect, 'error');
          setTimeout(() => setPin(''), 500);
        }
      }
    }
  };

  const handleDelete = () => {
    setPin((prev) => prev.slice(0, -1));
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className="max-w-xs w-full bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 text-center">
        <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-[#00875A] flex items-center justify-center mx-auto mb-4">
          <Lock className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-1">{t.pinCodeTitle}</h2>
        <p className="text-xs text-slate-500 mb-6">{t.enterPin} (ডিফল্ট: 1234)</p>

        {/* PIN Indicators */}
        <div className="flex justify-center gap-4 mb-8">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`w-4 h-4 rounded-full border-2 transition-all duration-200 ${
                i < pin.length
                  ? 'bg-[#00875A] border-[#00875A] scale-110'
                  : 'border-slate-300 dark:border-slate-700 bg-transparent'
              }`}
            />
          ))}
        </div>

        {/* Keypad */}
        <div className="grid grid-cols-3 gap-3 mb-4 max-w-[220px] mx-auto">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
            <button
              key={num}
              onClick={() => handleKeyPress(num)}
              className="w-14 h-14 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white font-bold text-lg hover:bg-emerald-100 dark:hover:bg-slate-700 active:scale-95 transition flex items-center justify-center mx-auto"
            >
              {num}
            </button>
          ))}
          <div />
          <button
            onClick={() => handleKeyPress('0')}
            className="w-14 h-14 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white font-bold text-lg hover:bg-emerald-100 dark:hover:bg-slate-700 active:scale-95 transition flex items-center justify-center mx-auto"
          >
            0
          </button>
          <button
            onClick={handleDelete}
            className="w-14 h-14 rounded-full bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 font-bold hover:bg-rose-100 active:scale-95 transition flex items-center justify-center mx-auto"
            aria-label="Delete digit"
          >
            <Delete className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
