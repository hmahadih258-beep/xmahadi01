export type TransactionType =
  | 'DUE_SALE'          // বাকীতে বিক্রি
  | 'CASH_SALE'         // নগদ বিক্রি
  | 'RECEIVE_DUE'       // বাকি পরিশোধ
  | 'ADVANCE_DEPOSIT'   // অগ্রিম জমা
  | 'PRODUCT_RETURN'    // পণ্য ফেরত দেয়া হয়েছে
  | 'RETURN_MONEY';     // দোকান থেকে টাকা ফেরত প্রদান

export interface Customer {
  id: string;
  name: string;
  phone: string;
  address?: string;
  avatarColor?: string;
  createdAt: string;
  notes?: string;
}

export interface Transaction {
  id: string;
  customerId: string;
  type: TransactionType;
  amount: number;
  date: string; // ISO string or YYYY-MM-DD
  time: string; // HH:mm AM/PM
  note?: string;
  createdAt: string;
}

export interface AppSettings {
  language: 'bn' | 'en';
  darkMode: boolean;
  pinLockEnabled: boolean;
  pinCode?: string;
  currencySymbol: string;
  shopName: string;
  shopAddress: string;
  shopPhone: string;
}

export interface CustomerBalance {
  totalDue: number;       // Total outstanding credit owed by customer
  totalAdvance: number;   // Total advance paid by customer
  totalPaid: number;      // Total payments received from customer
  netBalance: number;     // Positive = Customer owes us (Due), Negative = We owe customer (Advance)
}

export type ActiveTab = 'dashboard' | 'customers' | 'add_tx' | 'history' | 'reports' | 'settings' | 'customer_profile' | 'tx_details';

export type ScreenMode = 'mobile' | 'gallery';
