export const banglaDigits: { [key: string]: string } = {
  '0': '০',
  '1': '১',
  '2': '২',
  '3': '৩',
  '4': '৪',
  '5': '৫',
  '6': '৬',
  '7': '৭',
  '8': '৮',
  '9': '৯',
};

export function toBnDigit(strOrNum: string | number, isBn: boolean = true): string {
  if (!isBn) return String(strOrNum);
  const str = String(strOrNum);
  return str.replace(/[0-9]/g, (w) => banglaDigits[w] || w);
}

export function formatCurrency(amount: number, isBn: boolean = true, symbol: string = 'টাকা'): string {
  const formatted = amount.toLocaleString('en-US');
  const numStr = isBn ? toBnDigit(formatted, true) : formatted;
  return `${numStr} ${symbol}`;
}

export const translations = {
  bn: {
    // App & Header
    appName: 'আমার খাতা',
    appSubTitle: 'কাস্টমার লেজার ও হিসাব',
    dashboard: 'ড্যাশবোর্ড',
    customerList: 'কাস্টমার তালিকা',
    newTransaction: 'নতুন লেনদেন',
    transactionHistory: 'লেনদেন ইতিহাস',
    reports: 'রিপোর্ট',
    settings: 'সেটিংস',
    searchCustomer: 'কাস্টমার খুঁজুন...',
    addNewCustomer: '+ নতুন কাস্টমার',
    
    // Dashboard Summary
    todayDue: 'আজ বাকী',
    todayCollection: 'আজ আদায়',
    totalReceivable: 'মোট বাকী',
    totalAdvance: 'মোট অগ্রিম',
    repayment: 'পুনঃপরিশোধ',
    totalCustomers: 'মোট কাস্টমার',
    recentTransactions: 'সাম্প্রতিক লেনদেন',
    viewAll: 'সব দেখুন',
    personCount: 'জন',

    // Transaction Types
    dueSale: 'বাকীতে বিক্রি',
    cashSale: 'নগদ বিক্রি',
    receiveDue: 'বাকি পরিশোধ',
    advanceDeposit: 'অগ্রিম জমা',
    productReturn: 'ফেরত পণ্য দেওয়া হয়েছে',
    returnMoney: 'দোকান থেকে টাকা ফেরত প্রদান',

    // Customer Profile
    profile: 'কাস্টমার প্রোফাইল',
    phone: 'মোবাইল',
    address: 'ঠিকানা',
    totalDueBadge: 'মোট বাকী',
    advanceBadge: 'অগ্রিম',
    paidBadge: 'পরিশোধ',
    addTransactionBtn: 'লেনদেন যোগ করুন',
    currentStatus: 'বর্তমান অবস্থা',
    newDueAmount: 'নতুন বাকী',

    // Forms
    selectTransactionType: 'লেনদেনের ধরন নির্বাচন করুন',
    date: 'তারিখ',
    amount: 'টাকা',
    noteOptional: 'নোট (ঐচ্ছিক)',
    save: 'সেভ করুন',
    cancel: 'বাতিল',
    confirm: 'নিশ্চিত করুন',
    customerName: 'কাস্টমারের নাম',
    phoneNumber: 'মোবাইল নম্বর',

    // Reports
    dateRange: 'তারিখের পরিসীমা',
    today: 'আজ',
    thisWeek: 'এই সপ্তাহে',
    thisMonth: 'এই মাস',
    allTime: 'সব সময়',
    totalSales: 'মোট বিক্রি',
    exportPdf: 'ডাটা এক্সপোর্ট (PDF)',
    exportExcel: 'ডাটা এক্সপোর্ট (Excel)',
    print: 'প্রিন্ট করুন',
    salesAndCollectionChart: 'বিক্রি ও আদায় চার্ট',

    // Settings
    backupLocal: 'ডাটা ব্যাকআপ করুন',
    restoreBackup: 'রিস্টোর করুন',
    pinLock: 'PIN সেট করুন',
    darkMode: 'ডার্ক মোড',
    language: 'ভাষা',
    currency: 'মুদ্রা',
    aboutApp: 'অ্যাপ সম্পর্কে',
    pinCodeTitle: 'নিরাপত্তা PIN কোড দিন',
    enterPin: '৪-ডিজিট PIN দিন',
    pinIncorrect: 'ভুল PIN, আবার চেষ্টা করুন',
    backupSuccess: 'ডাটা সফলভাবে ব্যাকআপ করা হয়েছে!',
    restoreSuccess: 'ডাটা সফলভাবে রিস্টোর করা হয়েছে!',

    // Status Tags
    dueTag: 'বাকী',
    advanceTag: 'অগ্রিম',
    paidTag: 'পরিশোধ',
  },
  en: {
    // App & Header
    appName: 'Amar Khata',
    appSubTitle: 'Customer Ledger & Accounts',
    dashboard: 'Dashboard',
    customerList: 'Customer List',
    newTransaction: 'New Transaction',
    transactionHistory: 'Transaction History',
    reports: 'Reports',
    settings: 'Settings',
    searchCustomer: 'Search customer...',
    addNewCustomer: '+ Add Customer',
    
    // Dashboard Summary
    todayDue: "Today's Credit",
    todayCollection: "Today's Collection",
    totalReceivable: 'Total Due',
    totalAdvance: 'Total Advance',
    repayment: 'Repayment',
    totalCustomers: 'Total Customers',
    recentTransactions: 'Recent Transactions',
    viewAll: 'View All',
    personCount: 'cust',

    // Transaction Types
    dueSale: 'Credit Sale',
    cashSale: 'Cash Sale',
    receiveDue: 'Receive Due',
    advanceDeposit: 'Advance Deposit',
    productReturn: 'Product Returned',
    returnMoney: 'Return Money',

    // Customer Profile
    profile: 'Customer Profile',
    phone: 'Phone',
    address: 'Address',
    totalDueBadge: 'Total Due',
    advanceBadge: 'Advance',
    paidBadge: 'Paid',
    addTransactionBtn: 'Add Transaction',
    currentStatus: 'Current Balance Status',
    newDueAmount: 'New Total Due',

    // Forms
    selectTransactionType: 'Select Transaction Type',
    date: 'Date',
    amount: 'Amount',
    noteOptional: 'Note (Optional)',
    save: 'Save Transaction',
    cancel: 'Cancel',
    confirm: 'Confirm',
    customerName: 'Customer Name',
    phoneNumber: 'Phone Number',

    // Reports
    dateRange: 'Date Range',
    today: 'Today',
    thisWeek: 'This Week',
    thisMonth: 'This Month',
    allTime: 'All Time',
    totalSales: 'Total Sales',
    exportPdf: 'Export Statement (PDF)',
    exportExcel: 'Export Ledger (Excel)',
    print: 'Print Report',
    salesAndCollectionChart: 'Sales & Collections Analytics',

    // Settings
    backupLocal: 'Backup Local Data',
    restoreBackup: 'Restore Backup',
    pinLock: 'Set Security PIN',
    darkMode: 'Dark Mode',
    language: 'Language',
    currency: 'Currency',
    aboutApp: 'About App',
    pinCodeTitle: 'Enter Security PIN',
    enterPin: 'Enter 4-digit PIN',
    pinIncorrect: 'Incorrect PIN, try again',
    backupSuccess: 'Data successfully backed up!',
    restoreSuccess: 'Data successfully restored!',

    // Status Tags
    dueTag: 'Due',
    advanceTag: 'Advance',
    paidTag: 'Paid',
  },
};
