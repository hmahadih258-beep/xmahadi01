import React, { useRef } from 'react';
import { useApp } from '../context/AppContext';
import { translations } from '../lib/i18n';
import {
  Download,
  Upload,
  FileSpreadsheet,
  FileText,
  Lock,
  Moon,
  Globe,
  DollarSign,
  Info,
  ChevronRight,
  ShieldAlert,
  Sparkles,
} from 'lucide-react';

export const SettingsScreen: React.FC = () => {
  const {
    settings,
    updateSettings,
    backupData,
    restoreDataFromJSON,
    exportExcel,
    exportPDF,
    setIsPinLocked,
  } = useApp();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const lang = settings.language;
  const isBn = lang === 'bn';
  const t = translations[lang];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        restoreDataFromJSON(content);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="pb-24 pt-3 px-4 space-y-4 animate-in fade-in duration-200">
      {/* Hidden File Input for Restore */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept=".json"
        className="hidden"
      />

      {/* Shop Info Card Banner */}
      <div className="bg-[#00875A] text-white rounded-3xl p-4 shadow-md space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold">{settings.shopName}</h2>
          <span className="bg-white/20 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">
            {isBn ? 'অফলাইন সংস্করণ' : 'Offline Mode'}
          </span>
        </div>
        <p className="text-xs text-emerald-100">{settings.shopAddress}</p>
        <p className="text-xs text-emerald-200 font-mono">{settings.shopPhone}</p>
      </div>

      {/* Settings Options List matching Screen #9 */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 divide-y divide-slate-100 dark:divide-slate-800 shadow-sm overflow-hidden">
        {/* 1. Backup Local */}
        <button
          onClick={backupData}
          className="w-full p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition text-left"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 flex items-center justify-center">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-800 dark:text-white">{t.backupLocal}</h3>
              <p className="text-[10px] text-slate-400">JSON ব্যাকআপ ফাইল ডাউনলোড করুন</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-300" />
        </button>

        {/* 2. Restore Backup */}
        <button
          onClick={() => fileInputRef.current?.click()}
          className="w-full p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition text-left"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 flex items-center justify-center">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-800 dark:text-white">{t.restoreBackup}</h3>
              <p className="text-[10px] text-slate-400">রিস্টোর করার জন্য ফাইল সিলেক্ট করুন</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-300" />
        </button>

        {/* 3. Export PDF */}
        <button
          onClick={exportPDF}
          className="w-full p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition text-left"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-rose-50 dark:bg-rose-950/50 text-rose-600 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-800 dark:text-white">{t.exportPdf}</h3>
              <p className="text-[10px] text-slate-400">কাস্টমার স্টেটমেন্ট পিডিএফ ডায়েরি</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-300" />
        </button>

        {/* 4. Export Excel */}
        <button
          onClick={exportExcel}
          className="w-full p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition text-left"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 flex items-center justify-center">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-800 dark:text-white">{t.exportExcel}</h3>
              <p className="text-[10px] text-slate-400">এক্সেল স্প্রেডশীট (.xlsx) ডাউনলোড</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-300" />
        </button>

        {/* 5. Set Security PIN Lock */}
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-800 dark:text-white">{t.pinLock}</h3>
              <p className="text-[10px] text-slate-400">৪-ডিজিট সিকিউরিটি PIN কোড (1234)</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.pinLockEnabled}
              onChange={(e) => {
                const enabled = e.target.checked;
                updateSettings({ pinLockEnabled: enabled });
                if (enabled) setIsPinLocked(true);
              }}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00875A]"></div>
          </label>
        </div>

        {/* 6. Dark Mode Switch */}
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 flex items-center justify-center">
              <Moon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-800 dark:text-white">{t.darkMode}</h3>
              <p className="text-[10px] text-slate-400">চোখের সুরক্ষায় ডার্ক থিম</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.darkMode}
              onChange={(e) => updateSettings({ darkMode: e.target.checked })}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00875A]"></div>
          </label>
        </div>

        {/* 7. Language Switcher */}
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-teal-50 dark:bg-teal-950/50 text-teal-600 flex items-center justify-center">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-800 dark:text-white">{t.language}</h3>
              <p className="text-[10px] text-slate-400">বাংলা (Bangla) / English</p>
            </div>
          </div>
          <button
            onClick={() => updateSettings({ language: settings.language === 'bn' ? 'en' : 'bn' })}
            className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-bold text-[#00875A] dark:text-emerald-400 hover:bg-slate-200 transition"
          >
            {settings.language === 'bn' ? 'বাংলা' : 'English'}
          </button>
        </div>

        {/* 8. Currency Symbol */}
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-sky-50 dark:bg-sky-950/50 text-sky-600 flex items-center justify-center">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-800 dark:text-white">{t.currency}</h3>
              <p className="text-[10px] text-slate-400">টাকা (BDT ৳)</p>
            </div>
          </div>
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{settings.currencySymbol}</span>
        </div>
      </div>

      {/* App Version Info Footer */}
      <div className="p-4 bg-slate-100 dark:bg-slate-900 rounded-2xl text-center text-slate-400 space-y-1">
        <p className="text-xs font-bold text-slate-600 dark:text-slate-300">আমার খাতা v2.4 (Amar Khata)</p>
        <p className="text-[10px]">১০০% অফলাইন অ্যান্ড পয়েন্ট কাস্টমার খাতা অ্যাপ</p>
      </div>
    </div>
  );
};
