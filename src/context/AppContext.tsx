import React, { createContext, useContext, useState, useEffect } from 'react';
import { Customer, Transaction, AppSettings, ActiveTab, TransactionType, ScreenMode } from '../types';
import {
  getStoredCustomers,
  saveCustomers,
  getStoredTransactions,
  saveTransactions,
  getStoredSettings,
  saveSettings,
  downloadBackupJSON,
  exportToExcel,
  generatePDFReport,
} from '../lib/storage';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface AppContextType {
  customers: Customer[];
  transactions: Transaction[];
  settings: AppSettings;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  selectedCustomerId: string | null;
  setSelectedCustomerId: (id: string | null) => void;
  screenMode: ScreenMode;
  setScreenMode: (mode: ScreenMode) => void;
  isPinLocked: boolean;
  setIsPinLocked: (locked: boolean) => void;
  toast: Toast | null;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  
  // Actions
  addCustomer: (customer: Omit<Customer, 'id' | 'createdAt'>) => void;
  updateCustomer: (customer: Customer) => void;
  deleteCustomer: (id: string) => void;
  addTransaction: (tx: Omit<Transaction, 'id' | 'createdAt'>) => void;
  deleteTransaction: (id: string) => void;
  updateSettings: (newSettings: Partial<AppSettings>) => void;
  
  // Modals
  isAddCustomerOpen: boolean;
  setIsAddCustomerOpen: (open: boolean) => void;
  editingCustomer: Customer | null;
  setEditingCustomer: (customer: Customer | null) => void;
  selectedTxType: TransactionType | null;
  setSelectedTxType: (type: TransactionType | null) => void;
  
  // Storage Actions
  backupData: () => void;
  restoreDataFromJSON: (jsonStr: string) => boolean;
  exportExcel: () => void;
  exportPDF: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [customers, setCustomers] = useState<Customer[]>(() => getStoredCustomers());
  const [transactions, setTransactions] = useState<Transaction[]>(() => getStoredTransactions());
  const [settings, setSettings] = useState<AppSettings>(() => getStoredSettings());
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);
  const [screenMode, setScreenMode] = useState<ScreenMode>('mobile');
  const [isPinLocked, setIsPinLocked] = useState<boolean>(() => getStoredSettings().pinLockEnabled);
  const [toast, setToast] = useState<Toast | null>(null);

  // Modals state
  const [isAddCustomerOpen, setIsAddCustomerOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [selectedTxType, setSelectedTxType] = useState<TransactionType | null>(null);

  // Sync customers
  useEffect(() => {
    saveCustomers(customers);
  }, [customers]);

  // Sync transactions
  useEffect(() => {
    saveTransactions(transactions);
  }, [transactions]);

  // Sync settings
  useEffect(() => {
    saveSettings(settings);
    if (settings.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings]);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToast({ id, message, type });
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const addCustomer = (custData: Omit<Customer, 'id' | 'createdAt'>) => {
    const colors = ['bg-emerald-500', 'bg-blue-500', 'bg-amber-500', 'bg-purple-500', 'bg-rose-500', 'bg-teal-500', 'bg-indigo-500'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const newCust: Customer = {
      ...custData,
      id: 'c_' + Date.now(),
      createdAt: new Date().toISOString().split('T')[0],
      avatarColor: custData.avatarColor || randomColor,
    };

    setCustomers((prev) => [newCust, ...prev]);
    showToast(settings.language === 'bn' ? 'নতুন কাস্টমার যোগ করা হয়েছে' : 'Customer added successfully!');
  };

  const updateCustomer = (updated: Customer) => {
    setCustomers((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
    showToast(settings.language === 'bn' ? 'কাস্টমার আপডেট করা হয়েছে' : 'Customer updated successfully!');
  };

  const deleteCustomer = (id: string) => {
    setCustomers((prev) => prev.filter((c) => c.id !== id));
    setTransactions((prev) => prev.filter((t) => t.customerId !== id));
    if (selectedCustomerId === id) setSelectedCustomerId(null);
    showToast(settings.language === 'bn' ? 'কাস্টমার মুছে ফেলা হয়েছে' : 'Customer deleted', 'info');
  };

  const addTransaction = (txData: Omit<Transaction, 'id' | 'createdAt'>) => {
    const newTx: Transaction = {
      ...txData,
      id: 't_' + Date.now(),
      createdAt: new Date().toISOString(),
    };

    setTransactions((prev) => [newTx, ...prev]);
    showToast(settings.language === 'bn' ? 'লেনদেন সফলভাবে সেভ করা হয়েছে' : 'Transaction saved!');
  };

  const deleteTransaction = (id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
    showToast(settings.language === 'bn' ? 'লেনদেন ডিলিট করা হয়েছে' : 'Transaction deleted', 'info');
  };

  const updateSettings = (newSettings: Partial<AppSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const backupData = () => {
    downloadBackupJSON(customers, transactions, settings);
    showToast(settings.language === 'bn' ? 'ব্যাকআপ ফাইল ডাউনলোড হয়েছে' : 'Backup downloaded!');
  };

  const restoreDataFromJSON = (jsonStr: string): boolean => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed.customers && Array.isArray(parsed.customers)) {
        setCustomers(parsed.customers);
      }
      if (parsed.transactions && Array.isArray(parsed.transactions)) {
        setTransactions(parsed.transactions);
      }
      if (parsed.settings) {
        setSettings((prev) => ({ ...prev, ...parsed.settings }));
      }
      showToast(settings.language === 'bn' ? 'ডাটা সফলভাবে রিস্টোর হয়েছে' : 'Data restored successfully!');
      return true;
    } catch (e) {
      showToast(settings.language === 'bn' ? 'ভুল ফাইল ফরম্যাট!' : 'Invalid backup file!', 'error');
      return false;
    }
  };

  const exportExcel = () => {
    exportToExcel(customers, transactions, settings);
    showToast(settings.language === 'bn' ? 'এক্সেল ফাইল ডাউনলোড হয়েছে' : 'Excel downloaded!');
  };

  const exportPDF = () => {
    generatePDFReport(customers, transactions, settings);
    showToast(settings.language === 'bn' ? 'পিডিএফ রিপোর্ট তৈরি হয়েছে' : 'PDF generated!');
  };

  return (
    <AppContext.Provider
      value={{
        customers,
        transactions,
        settings,
        activeTab,
        setActiveTab,
        selectedCustomerId,
        setSelectedCustomerId,
        screenMode,
        setScreenMode,
        isPinLocked,
        setIsPinLocked,
        toast,
        showToast,
        addCustomer,
        updateCustomer,
        deleteCustomer,
        addTransaction,
        deleteTransaction,
        updateSettings,
        isAddCustomerOpen,
        setIsAddCustomerOpen,
        editingCustomer,
        setEditingCustomer,
        selectedTxType,
        setSelectedTxType,
        backupData,
        restoreDataFromJSON,
        exportExcel,
        exportPDF,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
