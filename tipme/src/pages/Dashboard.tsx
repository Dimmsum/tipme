import React, { useState } from 'react';
import { DollarSign, QrCode, TrendingUp, Download, CreditCard, Calendar, Filter, Search, ArrowUpRight, ArrowDownRight, Users, Eye, Settings, LogOut, Menu, X } from 'lucide-react';

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  // Mock user data
  const user = {
    name: "Maria Santos",
    role: "Restaurant Server",
    email: "maria.santos@email.com",
    avatar: "bg-purple-200",
    joinDate: "January 2025",
    totalEarnings: 12450.75,
    thisMonth: 3280.50,
    avgTip: 8.45,
    totalTips: 1247
  };

  // Mock transaction data
  const transactions = [
    { id: 1, customer: "Anonymous", amount: 15.00, date: "2025-10-13", time: "2:34 PM", type: "tip", status: "completed" },
    { id: 2, customer: "John D.", amount: 8.50, date: "2025-10-13", time: "1:15 PM", type: "tip", status: "completed" },
    { id: 3, customer: "Anonymous", amount: 20.00, date: "2025-10-13", time: "12:45 PM", type: "tip", status: "completed" },
    { id: 4, customer: "Sarah M.", amount: 12.00, date: "2025-10-12", time: "8:20 PM", type: "tip", status: "completed" },
    { id: 5, customer: "Mike R.", amount: 25.00, date: "2025-10-12", time: "7:45 PM", type: "tip", status: "completed" },
    { id: 6, customer: "Anonymous", amount: 10.00, date: "2025-10-12", time: "6:30 PM", type: "tip", status: "completed" },
    { id: 7, customer: "Bank Transfer", amount: -150.00, date: "2025-10-11", time: "9:00 AM", type: "cashout", status: "completed" },
    { id: 8, customer: "Emma L.", amount: 18.50, date: "2025-10-10", time: "5:15 PM", type: "tip", status: "completed" },
  ];

  const stats = [
    {
      label: "Current Balance",
      value: `$${user.thisMonth.toFixed(2)}`,
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      color: "from-purple-700 to-purple-400"
    },
    {
      label: "Total Tips",
      value: user.totalTips,
      change: "+23",
      trend: "up",
      icon: TrendingUp,
      color: "from-indigo-600 to-indigo-400"
    },
    {
      label: "Avg Tip Amount",
      value: `$${user.avgTip.toFixed(2)}`,
      change: "+5.2%",
      trend: "up",
      icon: CreditCard,
      color: "from-purple-500 to-pink-400"
    },
    {
      label: "Profile Views",
      value: "342",
      change: "+18",
      trend: "up",
      icon: Eye,
      color: "from-blue-500 to-cyan-400"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-700 to-purple-400 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-700 to-purple-400 bg-clip-text text-transparent">
                Tip Me
              </span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            <a href="#" className="flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-purple-700 to-purple-400 text-white rounded-lg font-medium">
              <TrendingUp className="w-5 h-5" />
              <span>Dashboard</span>
            </a>
            <a href="#" className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition">
              <QrCode className="w-5 h-5" />
              <span>My QR Code</span>
            </a>
            <a href="#" className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition">
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </a>
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-3 mb-4">
              <div className={`w-10 h-10 ${user.avatar} rounded-full flex items-center justify-center font-semibold text-purple-700`}>
                {user.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 text-sm truncate">{user.name}</p>
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
              </div>
            </div>
            <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition text-sm">
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                  <p className="text-sm text-gray-600">Welcome back, {user.name.split(' ')[0]}!</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition flex items-center space-x-2">
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">Export</span>
                </button>
                <button className="px-4 py-2 bg-gradient-to-r from-purple-700 to-purple-400 text-white rounded-lg font-semibold hover:opacity-90 transition flex items-center space-x-2">
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">Cash Out</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6 space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, idx) => {
              const IconComponent = stat.icon;
              return (
                <div key={idx} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div className={`flex items-center space-x-1 text-sm font-semibold ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                      <span>{stat.change}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              );
            })}
          </div>

          {/* Profile Overview & Quick Actions */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Profile Card */}
            <div className="lg:col-span-1 bg-white rounded-xl p-6 border border-gray-200">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Profile Overview</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className={`w-16 h-16 ${user.avatar} rounded-full flex items-center justify-center text-2xl font-bold text-purple-700`}>
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{user.name}</h3>
                    <p className="text-sm text-gray-600">{user.role}</p>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-200 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Member Since</span>
                    <span className="text-sm font-semibold text-gray-900">{user.joinDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Total Earned</span>
                    <span className="text-sm font-semibold text-gray-900">${user.totalEarnings.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Email</span>
                    <span className="text-sm font-semibold text-gray-900 truncate ml-2">{user.email}</span>
                  </div>
                </div>

                <button className="w-full mt-4 px-4 py-2 border border-purple-600 text-purple-600 rounded-lg font-medium hover:bg-purple-50 transition">
                  View Full Profile
                </button>
              </div>
            </div>

            {/* Wallet Card */}
            <div className="lg:col-span-2 bg-gradient-to-br from-purple-700 to-purple-400 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold">My Wallet</h2>
                <QrCode className="w-6 h-6" />
              </div>
              
              <div className="mb-8">
                <p className="text-purple-100 text-sm mb-2">Available Balance</p>
                <p className="text-5xl font-bold">${user.thisMonth.toFixed(2)}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <p className="text-purple-100 text-xs mb-1">This Week</p>
                  <p className="text-2xl font-bold">$487.50</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <p className="text-purple-100 text-xs mb-1">Pending</p>
                  <p className="text-2xl font-bold">$43.50</p>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 bg-white text-purple-700 px-4 py-3 rounded-lg font-semibold hover:bg-gray-100 transition flex items-center justify-center space-x-2">
                  <Download className="w-4 h-4" />
                  <span>Cash Out</span>
                </button>
                <button className="flex-1 bg-white/20 backdrop-blur-sm px-4 py-3 rounded-lg font-semibold hover:bg-white/30 transition flex items-center justify-center space-x-2">
                  <QrCode className="w-4 h-4" />
                  <span>My QR</span>
                </button>
              </div>
            </div>
          </div>

          {/* Transaction History */}
          <div className="bg-white rounded-xl border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Transaction History</h2>
                  <p className="text-sm text-gray-600">Track all your tips and cashouts</p>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search..."
                      className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    />
                  </div>
                  <button 
                    onClick={() => setFilterOpen(!filterOpen)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition flex items-center space-x-2"
                  >
                    <Filter className="w-4 h-4" />
                    <span>Filter</span>
                  </button>
                </div>
              </div>

              {filterOpen && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {['Today', 'Week', 'Month', 'Year', 'All Time'].map((period) => (
                    <button
                      key={period}
                      onClick={() => setSelectedPeriod(period.toLowerCase())}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                        selectedPeriod === period.toLowerCase()
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {period}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {transactions.map((transaction) => (
                    <tr key={transaction.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-1 text-sm">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-900 font-medium">{transaction.date}</span>
                          <span className="text-gray-500">{transaction.time}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium text-gray-900">{transaction.customer}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          transaction.type === 'tip' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {transaction.type === 'tip' ? 'Tip' : 'Cash Out'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <span className={`text-sm font-bold ${
                          transaction.amount > 0 ? 'text-green-600' : 'text-gray-900'
                        }`}>
                          {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Completed
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <p className="text-sm text-gray-600">Showing 8 of 1,247 transactions</p>
              <button className="text-sm font-medium text-purple-600 hover:text-purple-700 transition">
                View All Transactions →
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}