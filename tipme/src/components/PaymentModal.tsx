// src/components/PaymentModal.tsx
import React, { useState } from 'react';
import { DollarSign, CreditCard, Wallet, Check, ArrowLeft, Menu, X, TrendingUp, QrCode, Settings, LogOut } from 'lucide-react';
import type { User } from '../types';

interface PaymentModalProps {
  user: User;
  onClose: () => void;
}

export default function PaymentModal({ user, onClose }: PaymentModalProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [tipAmount, setTipAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'wallet'>('card');
  const [showSuccess, setShowSuccess] = useState(false);

  const presetAmounts = [5, 10, 15, 20, 25, 50];
  const selectedAmount = customAmount || tipAmount;

  const handlePayment = () => {
    setShowSuccess(true);
    setTimeout(() => {
      onClose();
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-full flex flex-col">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-700 to-blue-500 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent">
                Tip Me
              </span>
            </div>
          </div>

          <nav className="flex-1 p-4 space-y-2">
            <button className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition">
              <TrendingUp className="w-5 h-5" />
              <span>Dashboard</span>
            </button>
            <button className="w-full flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-blue-700 to-blue-500 text-white rounded-lg font-medium">
              <QrCode className="w-5 h-5" />
              <span>My QR Code</span>
            </button>
            <button className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition">
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </button>
          </nav>

          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-3 mb-4">
              <div className={`w-10 h-10 ${user.avatar} rounded-full flex items-center justify-center font-semibold text-blue-700`}>
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

      <div className="lg:pl-64">
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
                  <h1 className="text-2xl font-bold text-gray-900">Send a Tip</h1>
                  <p className="text-sm text-gray-600">Tipping {user.name}</p>
                </div>
              </div>
              
              <button 
                onClick={onClose}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Back</span>
              </button>
            </div>
          </div>
        </header>

        <main className="p-6">
          <div className="max-w-lg mx-auto">
            {!showSuccess ? (
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                {/* Profile Header */}
                <div className="bg-gradient-to-br from-blue-700 to-blue-500 p-8 text-white text-center">
                  <div className={`w-20 h-20 ${user.avatar} rounded-full flex items-center justify-center text-3xl font-bold text-blue-700 mx-auto mb-4`}>
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <h2 className="text-2xl font-bold mb-1">{user.name}</h2>
                  <p className="text-blue-100">{user.role}</p>
                </div>

                <div className="p-6 space-y-6">
                  {/* Amount Selection */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">Select Tip Amount</label>
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      {presetAmounts.map((amount) => (
                        <button
                          key={amount}
                          onClick={() => {
                            setTipAmount(amount.toString());
                            setCustomAmount('');
                          }}
                          className={`py-3 px-4 rounded-lg font-semibold transition ${
                            tipAmount === amount.toString() && !customAmount
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          ${amount}
                        </button>
                      ))}
                    </div>

                    <div className="relative">
                      <DollarSign className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="number"
                        placeholder="Custom amount"
                        value={customAmount}
                        onChange={(e) => {
                          setCustomAmount(e.target.value);
                          setTipAmount('');
                        }}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">Payment Method</label>
                    <div className="space-y-2">
                      <button
                        onClick={() => setPaymentMethod('card')}
                        className={`w-full flex items-center justify-between p-4 rounded-lg border-2 transition ${
                          paymentMethod === 'card'
                            ? 'border-blue-600 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <CreditCard className="w-5 h-5 text-gray-700" />
                          <div className="text-left">
                            <p className="font-semibold text-gray-900">Credit/Debit Card</p>
                            <p className="text-xs text-gray-500">Visa, Mastercard, Amex</p>
                          </div>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          paymentMethod === 'card' ? 'border-blue-600' : 'border-gray-300'
                        }`}>
                          {paymentMethod === 'card' && (
                            <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                          )}
                        </div>
                      </button>

                      <button
                        onClick={() => setPaymentMethod('wallet')}
                        className={`w-full flex items-center justify-between p-4 rounded-lg border-2 transition ${
                          paymentMethod === 'wallet'
                            ? 'border-blue-600 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <Wallet className="w-5 h-5 text-gray-700" />
                          <div className="text-left">
                            <p className="font-semibold text-gray-900">Digital Wallet</p>
                            <p className="text-xs text-gray-500">Apple Pay, Google Pay</p>
                          </div>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          paymentMethod === 'wallet' ? 'border-blue-600' : 'border-gray-300'
                        }`}>
                          {paymentMethod === 'wallet' && (
                            <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                          )}
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Summary */}
                  {selectedAmount && (
                    <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Tip Amount</span>
                        <span className="font-semibold text-gray-900">${parseFloat(selectedAmount).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Processing Fee</span>
                        <span className="font-semibold text-gray-900">$0.00</span>
                      </div>
                      <div className="border-t border-gray-200 pt-2 flex justify-between">
                        <span className="font-bold text-gray-900">Total</span>
                        <span className="font-bold text-blue-600 text-lg">${parseFloat(selectedAmount).toFixed(2)}</span>
                      </div>
                    </div>
                  )}

                  {/* Send Button */}
                  <button
                    onClick={handlePayment}
                    disabled={!selectedAmount}
                    className={`w-full py-4 rounded-lg font-bold text-white transition flex items-center justify-center space-x-2 ${
                      selectedAmount
                        ? 'bg-gradient-to-r from-blue-700 to-blue-500 hover:opacity-90'
                        : 'bg-gray-300 cursor-not-allowed'
                    }`}
                  >
                    <DollarSign className="w-5 h-5" />
                    <span>Send Tip {selectedAmount ? `${parseFloat(selectedAmount).toFixed(2)}` : ''}</span>
                  </button>

                  <p className="text-xs text-center text-gray-500">
                    Your payment is secure and encrypted. {user.name} will receive 100% of your tip.
                  </p>
                </div>
              </div>
            ) : (
              /* Success State */
              <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="w-10 h-10 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Tip Sent Successfully!</h2>
                <p className="text-gray-600 mb-6">
                  ${parseFloat(selectedAmount).toFixed(2)} has been sent to {user.name}
                </p>
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <p className="text-sm text-gray-600 mb-4">Thank you for your generosity!</p>
                  <div className="flex items-center justify-center space-x-2 text-2xl font-bold text-blue-600">
                    <DollarSign className="w-8 h-8" />
                    <span>${parseFloat(selectedAmount).toFixed(2)}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-500">
                  Redirecting you back...
                </p>
              </div>
            )}
          </div>
        </main>
      </div>

      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
