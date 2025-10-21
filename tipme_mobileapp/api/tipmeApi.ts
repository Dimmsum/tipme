import axios from 'axios';

// Mock API base URL - in production this would be your actual API endpoint
const API_BASE_URL = 'https://api.tipme.app/v1';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    // In a real app, you'd get the token from AsyncStorage or SecureStore
    const token = 'mock-jwt-token';
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

// Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  joinDate: string;
  qrCode: string;
}

export interface Wallet {
  balance: number;
  pendingAmount: number;
  totalEarned: number;
  currency: string;
}

export interface Transaction {
  id: string;
  type: 'tip' | 'cashout';
  amount: number;
  customer?: string;
  description?: string;
  date: string;
  time: string;
  status: 'completed' | 'pending' | 'failed';
  qrCodeId?: string;
}

export interface CashoutRequest {
  amount: number;
  bankAccount: string;
  routingNumber: string;
}

// Mock data
const mockUser: User = {
  id: '1',
  name: 'Maria Santos',
  email: 'maria.santos@email.com',
  role: 'Restaurant Server',
  avatar: 'bg-blue-200',
  joinDate: 'January 2025',
  qrCode: 'https://tipme.app/qr/maria-santos-123',
};

const mockWallet: Wallet = {
  balance: 3280.50,
  pendingAmount: 43.50,
  totalEarned: 12450.75,
  currency: 'USD',
};

const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'tip',
    amount: 15.00,
    customer: 'Anonymous',
    description: 'Great service!',
    date: '2025-01-13',
    time: '2:34 PM',
    status: 'completed',
    qrCodeId: 'qr-123',
  },
  {
    id: '2',
    type: 'tip',
    amount: 8.50,
    customer: 'John D.',
    description: 'Excellent food',
    date: '2025-01-13',
    time: '1:15 PM',
    status: 'completed',
    qrCodeId: 'qr-123',
  },
  {
    id: '3',
    type: 'tip',
    amount: 20.00,
    customer: 'Anonymous',
    description: 'Outstanding service',
    date: '2025-01-13',
    time: '12:45 PM',
    status: 'completed',
    qrCodeId: 'qr-123',
  },
  {
    id: '4',
    type: 'tip',
    amount: 12.00,
    customer: 'Sarah M.',
    description: 'Thank you!',
    date: '2025-01-12',
    time: '8:20 PM',
    status: 'completed',
    qrCodeId: 'qr-123',
  },
  {
    id: '5',
    type: 'tip',
    amount: 25.00,
    customer: 'Mike R.',
    description: 'Amazing experience',
    date: '2025-01-12',
    time: '7:45 PM',
    status: 'completed',
    qrCodeId: 'qr-123',
  },
  {
    id: '6',
    type: 'tip',
    amount: 10.00,
    customer: 'Anonymous',
    description: 'Great job!',
    date: '2025-01-12',
    time: '6:30 PM',
    status: 'completed',
    qrCodeId: 'qr-123',
  },
  {
    id: '7',
    type: 'cashout',
    amount: -150.00,
    customer: 'Bank Transfer',
    description: 'Cashout to bank account',
    date: '2025-01-11',
    time: '9:00 AM',
    status: 'completed',
  },
  {
    id: '8',
    type: 'tip',
    amount: 18.50,
    customer: 'Emma L.',
    description: 'Perfect service',
    date: '2025-01-10',
    time: '5:15 PM',
    status: 'completed',
    qrCodeId: 'qr-123',
  },
];

// API functions
export const tipmeApi = {
  // Auth
  async login(email: string, password: string): Promise<{ user: User; token: string }> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (email === 'maria@tipme.app' && password === 'password') {
      return {
        user: mockUser,
        token: 'mock-jwt-token-12345',
      };
    }
    throw new Error('Invalid credentials');
  },

  async signup(userData: { name: string; email: string; password: string; role: string }): Promise<{ user: User; token: string }> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newUser: User = {
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email,
      role: userData.role,
      avatar: 'bg-blue-200',
      joinDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      qrCode: `https://tipme.app/qr/${userData.name.toLowerCase().replace(' ', '-')}-${Date.now()}`,
    };
    
    return {
      user: newUser,
      token: 'mock-jwt-token-12345',
    };
  },

  async logout(): Promise<void> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    // In a real app, you'd call the logout endpoint
  },

  // User
  async getCurrentUser(): Promise<User> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    return mockUser;
  },

  async updateProfile(userData: Partial<User>): Promise<User> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { ...mockUser, ...userData };
  },

  // Wallet
  async getWallet(): Promise<Wallet> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 600));
    return mockWallet;
  },

  async requestCashout(cashoutData: CashoutRequest): Promise<{ success: boolean; transactionId: string }> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    if (cashoutData.amount > mockWallet.balance) {
      throw new Error('Insufficient balance');
    }
    
    return {
      success: true,
      transactionId: `cashout-${Date.now()}`,
    };
  },

  // Transactions
  async getTransactions(limit = 50, offset = 0): Promise<Transaction[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    return mockTransactions.slice(offset, offset + limit);
  },

  async getTransactionById(id: string): Promise<Transaction | null> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockTransactions.find(t => t.id === id) || null;
  },

  // QR Code
  async generateQRCode(): Promise<{ qrCode: string; qrCodeId: string }> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      qrCode: `https://tipme.app/qr/${mockUser.id}-${Date.now()}`,
      qrCodeId: `qr-${Date.now()}`,
    };
  },

  async getQRCode(): Promise<{ qrCode: string; qrCodeId: string }> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      qrCode: mockUser.qrCode,
      qrCodeId: 'qr-123',
    };
  },
};

export default api;
