import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { PinLockModal } from './components/PinLockModal';
import { Toast } from './components/Toast';
import { ScreenSwitcher } from './components/ScreenSwitcher';
import { DashboardScreen } from './screens/DashboardScreen';
import { CustomerListScreen } from './screens/CustomerListScreen';
import { NewTransactionSelectScreen } from './screens/NewTransactionSelectScreen';
import { AddTransactionDetailsScreen } from './screens/AddTransactionDetailsScreen';
import { CustomerProfileScreen } from './screens/CustomerProfileScreen';
import { TransactionHistoryScreen } from './screens/TransactionHistoryScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import { ReportsScreen } from './screens/ReportsScreen';
import { AddCustomerModal } from './screens/AddCustomerModal';
import { AllScreensGallery } from './screens/AllScreensGallery';
import { Wifi, BatteryMedium } from 'lucide-react';

const AppContent: React.FC = () => {
  const { activeTab, setActiveTab, screenMode, settings } = useApp();

  if (screenMode === 'gallery') {
    return (
      <div className="min-h-screen bg-slate-950">
        <ScreenSwitcher />
        <AllScreensGallery />
      </div>
    );
  }

  const renderActiveScreen = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardScreen />;
      case 'customers':
        return <CustomerListScreen />;
      case 'add_tx':
        return <NewTransactionSelectScreen />;
      case 'tx_details':
        return <AddTransactionDetailsScreen />;
      case 'customer_profile':
        return <CustomerProfileScreen />;
      case 'history':
        return <TransactionHistoryScreen />;
      case 'settings':
        return <SettingsScreen />;
      case 'reports':
        return <ReportsScreen />;
      default:
        return <DashboardScreen />;
    }
  };

  const showHeaderBack = activeTab === 'customer_profile' || activeTab === 'tx_details';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-900 dark:text-white flex flex-col items-center">
      <ScreenSwitcher />

      {/* Main Responsive Mobile Frame Wrapper */}
      <div className="w-full max-w-md min-h-screen bg-slate-50 dark:bg-slate-950 shadow-2xl relative flex flex-col font-sans">
        {/* Android Status Bar (matching reference image top bar) */}
        <div className="bg-[#00875A] text-white px-4 pt-2 pb-1 flex items-center justify-between text-[11px] font-medium opacity-95">
          <span>6:12 PM</span>
          <div className="flex items-center gap-1.5 text-[10px]">
            <span className="font-mono text-[9px]">174 K/s</span>
            <Wifi className="w-3 h-3" />
            <div className="flex items-center gap-0.5 border border-white/60 rounded px-1 text-[9px]">
              <BatteryMedium className="w-3 h-3" />
              <span>39</span>
            </div>
          </div>
        </div>

        {/* Dynamic App Header */}
        <Header
          showBack={showHeaderBack}
          onBack={() => {
            if (activeTab === 'tx_details') setActiveTab('add_tx');
            else if (activeTab === 'customer_profile') setActiveTab('customers');
            else setActiveTab('dashboard');
          }}
        />

        {/* Scrollable Screen Body */}
        <main className="flex-1 overflow-y-auto">
          {renderActiveScreen()}
        </main>

        {/* Bottom Navigation */}
        <BottomNav />

        {/* Modals & Overlay Toast */}
        <AddCustomerModal />
        <PinLockModal />
        <Toast />
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
