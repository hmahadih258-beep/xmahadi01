import React from 'react';
import { useApp } from '../context/AppContext';
import { Smartphone, LayoutGrid, Sparkles } from 'lucide-react';

export const ScreenSwitcher: React.FC = () => {
  const { screenMode, setScreenMode } = useApp();

  return (
    <div className="bg-slate-900 text-white px-4 py-2 border-b border-slate-800 flex items-center justify-between text-xs font-medium sticky top-0 z-40 shadow-sm">
      <div className="flex items-center gap-2 text-emerald-400 font-semibold">
        <Sparkles className="w-4 h-4" />
        <span>আমার খাতা (Amar Khata) - Offline Ledger</span>
      </div>

      <div className="flex items-center gap-1.5 bg-slate-800 p-1 rounded-xl border border-slate-700">
        <button
          onClick={() => setScreenMode('mobile')}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
            screenMode === 'mobile'
              ? 'bg-[#00875A] text-white shadow'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>মোবাইল ভিউ (Mobile)</span>
        </button>

        <button
          onClick={() => setScreenMode('gallery')}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
            screenMode === 'gallery'
              ? 'bg-[#00875A] text-white shadow'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <LayoutGrid className="w-3.5 h-3.5" />
          <span>১০টি স্ক্রিন গ্যালারি (All 10 Screens)</span>
        </button>
      </div>
    </div>
  );
};
