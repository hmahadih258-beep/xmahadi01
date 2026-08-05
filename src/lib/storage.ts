import { Customer, Transaction, AppSettings, CustomerBalance, TransactionType } from '../types';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

const STORAGE_KEYS = {
  CUSTOMERS: 'amar_khata_customers_v1',
  TRANSACTIONS: 'amar_khata_transactions_v1',
  SETTINGS: 'amar_khata_settings_v1',
};

// Initial realistic default customers based on screenshot
export const initialCustomers: Customer[] = [
  {
    id: 'c1',
    name: 'রহিম',
    phone: '01712-345678',
    address: 'মিরপুর, ঢাকা',
    avatarColor: 'bg-emerald-500',
    createdAt: '2025-06-01',
    notes: 'নিয়মিত গ্রাহক',
  },
  {
    id: 'c2',
    name: 'করিম',
    phone: '01790-765432',
    address: 'উত্তরা, ঢাকা',
    avatarColor: 'bg-blue-500',
    createdAt: '2025-06-02',
    notes: 'মুদি দোকানদার',
  },
  {
    id: 'c3',
    name: 'সোহেল',
    phone: '01823-456709',
    address: 'ধানমন্ডি, ঢাকা',
    avatarColor: 'bg-amber-500',
    createdAt: '2025-06-03',
  },
  {
    id: 'c4',
    name: 'তারেক',
    phone: '01711-223344',
    address: 'গুলশান, ঢাকা',
    avatarColor: 'bg-purple-500',
    createdAt: '2025-06-03',
  },
  {
    id: 'c5',
    name: 'রাকিব',
    phone: '01678-889900',
    address: 'মোহাম্মদপুর, ঢাকা',
    avatarColor: 'bg-rose-500',
    createdAt: '2025-06-04',
  },
  {
    id: 'c6',
    name: 'রফিকুল',
    phone: '01923-334455',
    address: 'যাত্রাবাড়ী, ঢাকা',
    avatarColor: 'bg-teal-500',
    createdAt: '2025-06-04',
  },
];

// Initial default transactions matching screenshots
export const initialTransactions: Transaction[] = [
  {
    id: 't1',
    customerId: 'c1',
    type: 'DUE_SALE',
    amount: 200,
    date: '2025-06-05',
    time: '10:30 AM',
    note: 'টিভি, ফ্রিজ, ফ্যান',
    createdAt: '2025-06-05T10:30:00.000Z',
  },
  {
    id: 't2',
    customerId: 'c1',
    type: 'DUE_SALE',
    amount: 150,
    date: '2025-06-05',
    time: '11:15 AM',
    note: 'বাকীতে মাল',
    createdAt: '2025-06-05T11:15:00.000Z',
  },
  {
    id: 't3',
    customerId: 'c2',
    type: 'ADVANCE_DEPOSIT',
    amount: 120,
    date: '2025-06-05',
    time: '09:45 AM',
    note: 'অগ্রিম জমা',
    createdAt: '2025-06-05T09:45:00.000Z',
  },
  {
    id: 't4',
    customerId: 'c3',
    type: 'RECEIVE_DUE',
    amount: 100,
    date: '2025-06-05',
    time: '10:00 AM',
    note: 'বাকি পরিশোধ',
    createdAt: '2025-06-05T10:00:00.000Z',
  },
  {
    id: 't5',
    customerId: 'c4',
    type: 'DUE_SALE',
    amount: 1250,
    date: '2025-06-04',
    time: '04:20 PM',
    note: 'ইলেকট্রনিক পণ্য',
    createdAt: '2025-06-04T16:20:00.000Z',
  },
  {
    id: 't6',
    customerId: 'c5',
    type: 'RECEIVE_DUE',
    amount: 300,
    date: '2025-06-05',
    time: '02:10 PM',
    note: 'নগদ জমা',
    createdAt: '2025-06-05T14:10:00.000Z',
  },
  {
    id: 't7',
    customerId: 'c6',
    type: 'DUE_SALE',
    amount: 560,
    date: '2025-06-05',
    time: '03:45 PM',
    note: 'গ্রোসারী মাল',
    createdAt: '2025-06-05T15:45:00.000Z',
  },
];

export const initialSettings: AppSettings = {
  language: 'bn',
  darkMode: false,
  pinLockEnabled: false,
  pinCode: '1234',
  currencySymbol: 'টাকা',
  shopName: 'বিসমিল্লাহ ট্রেডার্স',
  shopAddress: 'দোকান নং #১২, সেন্ট্রাল মার্কেট, ঢাকা',
  shopPhone: '01700-000000',
};

// Storage Utilities
export function getStoredCustomers(): Customer[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CUSTOMERS);
    if (!raw) {
      saveCustomers(initialCustomers);
      return initialCustomers;
    }
    return JSON.parse(raw);
  } catch (e) {
    return initialCustomers;
  }
}

export function saveCustomers(customers: Customer[]): void {
  localStorage.setItem(STORAGE_KEYS.CUSTOMERS, JSON.stringify(customers));
}

export function getStoredTransactions(): Transaction[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
    if (!raw) {
      saveTransactions(initialTransactions);
      return initialTransactions;
    }
    return JSON.parse(raw);
  } catch (e) {
    return initialTransactions;
  }
}

export function saveTransactions(transactions: Transaction[]): void {
  localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions));
}

export function getStoredSettings(): AppSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (!raw) {
      saveSettings(initialSettings);
      return initialSettings;
    }
    return { ...initialSettings, ...JSON.parse(raw) };
  } catch (e) {
    return initialSettings;
  }
}

export function saveSettings(settings: AppSettings): void {
  localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
}

// Financial Calculations
export function getCustomerBalance(customerId: string, transactions: Transaction[]): CustomerBalance {
  const custTx = transactions.filter((t) => t.customerId === customerId);

  let totalDue = 0;
  let totalAdvance = 0;
  let totalPaid = 0;

  custTx.forEach((t) => {
    switch (t.type) {
      case 'DUE_SALE':
        totalDue += t.amount;
        break;
      case 'CASH_SALE':
        totalPaid += t.amount;
        break;
      case 'RECEIVE_DUE':
        totalPaid += t.amount;
        break;
      case 'ADVANCE_DEPOSIT':
        totalAdvance += t.amount;
        break;
      case 'PRODUCT_RETURN':
        totalDue = Math.max(0, totalDue - t.amount);
        break;
      case 'RETURN_MONEY':
        totalAdvance = Math.max(0, totalAdvance - t.amount);
        break;
    }
  });

  // Net calculation
  const netDue = Math.max(0, totalDue - totalPaid);
  const netAdvance = totalAdvance;

  return {
    totalDue: netDue,
    totalAdvance: netAdvance,
    totalPaid,
    netBalance: netDue - netAdvance,
  };
}

export function getDashboardSummary(customers: Customer[], transactions: Transaction[]) {
  const todayStr = new Date().toISOString().split('T')[0];

  let todayDue = 0;
  let todayCollection = 0;
  let totalReceivable = 0;
  let totalAdvance = 0;
  let repayment = 0;

  // Calculate per customer balances
  customers.forEach((cust) => {
    const bal = getCustomerBalance(cust.id, transactions);
    totalReceivable += bal.totalDue;
    totalAdvance += bal.totalAdvance;
  });

  transactions.forEach((tx) => {
    const isToday = tx.date === todayStr || tx.createdAt.startsWith(todayStr);

    if (isToday) {
      if (tx.type === 'DUE_SALE') {
        todayDue += tx.amount;
      } else if (tx.type === 'RECEIVE_DUE' || tx.type === 'CASH_SALE') {
        todayCollection += tx.amount;
      }
    }

    if (tx.type === 'PRODUCT_RETURN' || tx.type === 'RETURN_MONEY') {
      repayment += tx.amount;
    }
  });

  return {
    todayDue,
    todayCollection,
    totalReceivable,
    totalAdvance,
    repayment,
    totalCustomers: customers.length,
  };
}

// Data Backup and Restore
export function downloadBackupJSON(customers: Customer[], transactions: Transaction[], settings: AppSettings) {
  const data = {
    version: '1.0',
    exportDate: new Date().toISOString(),
    customers,
    transactions,
    settings,
  };

  const jsonStr = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `amar_khata_backup_${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export function exportToExcel(customers: Customer[], transactions: Transaction[], settings: AppSettings) {
  const custData = customers.map((c) => {
    const bal = getCustomerBalance(c.id, transactions);
    return {
      'কাস্টমার নাম': c.name,
      'মোবাইল নম্বর': c.phone,
      'ঠিকানা': c.address || '',
      'মোট বাকী (টাকা)': bal.totalDue,
      'মোট অগ্রিম (টাকা)': bal.totalAdvance,
      'মোট পরিশোধ (টাকা)': bal.totalPaid,
    };
  });

  const txData = transactions.map((t) => {
    const cust = customers.find((c) => c.id === t.customerId);
    return {
      'আইডি': t.id,
      'তারিখ': t.date,
      'সময়': t.time,
      'কাস্টমার': cust ? cust.name : 'অজানা',
      'লেনদেনের ধরন': t.type,
      'পরিমাণ (টাকা)': t.amount,
      'নোট': t.note || '',
    };
  });

  const wb = XLSX.utils.book_new();
  const ws1 = XLSX.utils.json_to_sheet(custData);
  const ws2 = XLSX.utils.json_to_sheet(txData);

  XLSX.utils.book_append_sheet(wb, ws1, 'কাস্টমার তালিকা');
  XLSX.utils.book_append_sheet(wb, ws2, 'লেনদেন ইতিহাস');

  XLSX.writeFile(wb, `amar_khata_ledger_${new Date().toISOString().slice(0, 10)}.xlsx`);
}

export function generatePDFReport(customers: Customer[], transactions: Transaction[], settings: AppSettings) {
  const doc = new jsPDF();

  // Header Title
  doc.setFontSize(18);
  doc.text(settings.shopName || 'আমার খাতা - কাস্টমার লেজার', 14, 20);
  doc.setFontSize(10);
  doc.text(`তারিখ: ${new Date().toLocaleDateString('bn-BD')}`, 14, 28);
  doc.text(`ঠিকানা: ${settings.shopAddress || 'ঢাকা, বাংলাদেশ'}`, 14, 34);

  // Table Data
  const tableRows = customers.map((c, index) => {
    const bal = getCustomerBalance(c.id, transactions);
    return [
      (index + 1).toString(),
      c.name,
      c.phone,
      `${bal.totalDue} ৳`,
      `${bal.totalAdvance} ৳`,
      `${bal.totalPaid} ৳`,
    ];
  });

  autoTable(doc, {
    startY: 42,
    head: [['#', 'কাস্টমার', 'ফোন', 'মোট বাকী', 'অগ্রিম', 'মোট পরিশোধ']],
    body: tableRows,
    theme: 'grid',
    headStyles: { fillColor: [0, 135, 90] },
  });

  doc.save(`amar_khata_report_${new Date().toISOString().slice(0, 10)}.pdf`);
}
