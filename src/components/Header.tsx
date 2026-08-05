import React from 'react';
import { useApp } from '../context/AppContext';
import { translations } from '../lib/i18n';
import { Bell, ArrowLeft, ShieldCheck, Moon, Sun, Layers } from 'lucide-react';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  rightAction?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ title, showBack, onBack, rightAction }) => {
  const { settings, activeTab, setActiveTab, updateSettings, screenMode, setScreenMode } = useApp();
  const lang = settings.language;
  const t = translations[lang];

  const getTitle = () => {
    if (title) return title;
    switch (activeTab) {
      case 'dashboard':
        return t.dashboard;
      case 'customers':
        return t.customerList;
      case 'add_tx':
        return t.newTransaction;
      case 'history':
        return t.transactionHistory;
      case 'reports':
        return t.reports;
      case 'settings':
        return t.settings;
      case 'customer_profile':
        return t.profile;
      case 'tx_details':
        return t.newTransaction;
      default:
        return t.appName;
    }
  };

  return (
    <header className="bg-[#00875A] text-white px-4 py-3.5 shadow-md flex items-center justify-between sticky top-0 z-30 transition-colors">
      <div className="flex items-center gap-3">
        {showBack ? (
          <button
            onClick={onBack || (() => setActiveTab('dashboard'))}
            className="p-1.5 rounded-full hover:bg-white/10 active:bg-white/20 transition"
            aria-label="Go Back"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
        ) : (
          <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center font-bold text-sm">
            খ
          </div>
        )}
        <div>
          <h1 className="text-lg font-bold tracking-tight leading-tight">{getTitle()}</h1>
          {activeTab === 'dashboard' && (
            <p className="text-[11px] text-emerald-100 opacity-90">{settings.shopName}</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        {rightAction || (
          <>
            <button
              onClick={() => updateSettings({ darkMode: !settings.darkMode })}
              className="p-2 rounded-full hover:bg-white/10 active:bg-white/20 transition"
              title="Toggle Dark Mode"
            >
              {settings.darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={() => updateSettings({ language: settings.language === 'bn' ? 'en' : 'bn' })}
              className="px-2 py-1 bg-white/15 hover:bg-white/25 rounded-lg text-xs font-semibold uppercase tracking-wider"
              title="Switch Language"
            >
              {settings.language === 'bn' ? 'EN' : 'বাং'}
            </button>
            <div className="relative">
              <button
                onClick={() => setActiveTab('settings')}
                className="p-2 rounded-full hover:bg-white/10 active:bg-white/20 transition relative"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-300 rounded-full ring-2 ring-[#00875A]" />
              </button>
            </div>
          </>
        )}
      </div>
    </header>
  );
};
