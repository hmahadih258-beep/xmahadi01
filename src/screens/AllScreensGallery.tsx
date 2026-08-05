import React from 'react';
import { useApp } from '../context/AppContext';
import { DashboardScreen } from './DashboardScreen';
import { CustomerListScreen } from './CustomerListScreen';
import { NewTransactionSelectScreen } from './NewTransactionSelectScreen';
import { AddTransactionDetailsScreen } from './AddTransactionDetailsScreen';
import { CustomerProfileScreen } from './CustomerProfileScreen';
import { TransactionHistoryScreen } from './TransactionHistoryScreen';
import { SpecialFormsScreen } from './SpecialFormsScreen';
import { SettingsScreen } from './SettingsScreen';
import { ReportsScreen } from './ReportsScreen';
import { Header } from '../components/Header';
import { BottomNav } from '../components/BottomNav';

export const AllScreensGallery: React.FC = () => {
  const { setActiveTab, setScreenMode, setSelectedTxType } = useApp();

  const screens = [
    {
      id: 1,
      title: '১. ড্যাশবোর্ড (Dashboard)',
      tabKey: 'dashboard',
      component: (
        <>
          <Header title="ড্যাশবোর্ড" />
          <DashboardScreen />
          <BottomNav />
        </>
      ),
    },
    {
      id: 2,
      title: '২. কাস্টমার তালিকা (Customer List)',
      tabKey: 'customers',
      component: (
        <>
          <Header title="কাস্টমার তালিকা" />
          <CustomerListScreen />
          <BottomNav />
        </>
      ),
    },
    {
      id: 3,
      title: '৩. নতুন লেনদেন (New Transaction - Type Select)',
      tabKey: 'add_tx',
      component: (
        <>
          <Header title="নতুন লেনদেন" />
          <NewTransactionSelectScreen />
          <BottomNav />
        </>
      ),
    },
    {
      id: 4,
      title: '৪. লেনদেন যোগ (Add Transaction Details)',
      tabKey: 'tx_details',
      component: (
        <>
          <Header title="বাকীতে বিক্রি" showBack />
          <AddTransactionDetailsScreen />
          <BottomNav />
        </>
      ),
    },
    {
      id: 5,
      title: '৫. কাস্টমার প্রোফাইল (Customer Profile)',
      tabKey: 'customer_profile',
      component: (
        <>
          <Header title="প্রোফাইল" showBack />
          <CustomerProfileScreen />
          <BottomNav />
        </>
      ),
    },
    {
      id: 6,
      title: '৬. লেনদেন ইতিহাস (Transaction History)',
      tabKey: 'history',
      component: (
        <>
          <Header title="লেনদেন ইতিহাস" />
          <TransactionHistoryScreen />
          <BottomNav />
        </>
      ),
    },
    {
      id: 7,
      title: '৭. পণ্য পরে দেওয়া হবে (Customer Credit)',
      tabKey: 'special_7',
      component: (
        <>
          <Header title="পণ্য পরে দেওয়া হবে" showBack />
          <SpecialFormsScreen mode="PRODUCT_RETURN" />
          <BottomNav />
        </>
      ),
    },
    {
      id: 8,
      title: '৮. দোকান থেকে টাকা ফেরত নিরাস (Return to Customer)',
      tabKey: 'special_8',
      component: (
        <>
          <Header title="টাকা ফেরত নিরাস" showBack />
          <SpecialFormsScreen mode="RETURN_MONEY" />
          <BottomNav />
        </>
      ),
    },
    {
      id: 9,
      title: '৯. সেটিংস (Settings)',
      tabKey: 'settings',
      component: (
        <>
          <Header title="সেটিংস" />
          <SettingsScreen />
          <BottomNav />
        </>
      ),
    },
    {
      id: 10,
      title: '১০. রিপোর্ট (Reports)',
      tabKey: 'reports',
      component: (
        <>
          <Header title="রিপোর্ট" />
          <ReportsScreen />
          <BottomNav />
        </>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 p-6 overflow-x-auto text-white">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-2xl font-black text-emerald-400">
            আমার খাতা (Amar Khata) - ১০টি স্ক্রিন সম্পূর্ণ ভিউ
          </h1>
          <p className="text-xs text-slate-400">
            রেফারেন্স ইমেজের হুবহু ১০টি মোবাইল স্ক্রিন ডিজাইন একসাথে দেখুন। যেকোনো স্ক্রিনে ক্লিক করে লাইভ ইন্টারেক্টিভ মোডে যান।
          </p>
        </div>

        {/* 10 Screens Grid collage matching reference screenshot collage */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 justify-items-center">
          {screens.map((screen) => (
            <div key={screen.id} className="flex flex-col items-center space-y-2 group">
              <span className="text-xs font-bold text-slate-300 bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
                {screen.title}
              </span>

              {/* Android Mobile Frame */}
              <div
                onClick={() => {
                  if (screen.tabKey === 'special_7') {
                    setSelectedTxType('PRODUCT_RETURN');
                    setActiveTab('tx_details');
                  } else if (screen.tabKey === 'special_8') {
                    setSelectedTxType('RETURN_MONEY');
                    setActiveTab('tx_details');
                  } else {
                    setActiveTab(screen.tabKey as any);
                  }
                  setScreenMode('mobile');
                }}
                className="w-[310px] h-[640px] bg-slate-900 rounded-[38px] border-[6px] border-slate-800 shadow-2xl overflow-hidden relative group-hover:border-emerald-500 transition cursor-pointer transform group-hover:-translate-y-1"
              >
                {/* Mobile Camera Punchhole / Speaker Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-4 bg-slate-800 rounded-b-xl z-50 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-950" />
                </div>

                {/* Screen View Content */}
                <div className="h-full overflow-y-auto bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white pt-3">
                  {screen.component}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
