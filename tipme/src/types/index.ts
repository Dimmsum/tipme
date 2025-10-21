// src/types/index.ts
export interface User {
  name: string;
  role: string;
  email: string;
  avatar: string;
  joinDate: string;
  totalEarnings: number;
  thisMonth: number;
  avgTip: number;
  totalTips: number;
  profileUrl: string;
}

export interface Transaction {
  id: number;
  customer: string;
  amount: number;
  date: string;
  time: string;
  type: 'tip' | 'cashout';
  status: string;
}

export interface StatData {
  label: string;
  value: string | number;
  change: string;
  trend: 'up' | 'down';
  icon: any;
  color: string;
}












