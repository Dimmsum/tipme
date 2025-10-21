import React, { useState } from 'react';
import { DollarSign, QrCode, TrendingUp, Download, Menu, X, LogOut, Settings, Copy, Share2, Check, ArrowLeft, CreditCard, Wallet } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
export default function () {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentView, setCurrentView] = useState('qr'); // 'qr' or 'payment'
  const [copied, setCopied] = useState(false);
  const [tipAmount, setTipAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [showSuccess, setShowSuccess] = useState(false);

  const user = {
    name: "Maria Santos",
    role: "Restaurant Server",
    email: "maria.santos@email.com",
    avatar: "bg-blue-200",
    profileUrl: "tipme.app/maria-santos"
  };

  const navigate = useNavigate();

  const presetAmounts = [5, 10, 15, 20, 25, 50];

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://${user.profileUrl}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleScanQR = () => {
    setCurrentView('payment');
    setShowSuccess(false);
    setTipAmount('');
    setCustomAmount('');
  };

  const handlePayment = () => {
    setShowSuccess(true);
    setTimeout(() => {
      setCurrentView('qr');
      setShowSuccess(false);
      setTipAmount('');
      setCustomAmount('');
    }, 3000);
  };

  const selectedAmount = customAmount || tipAmount;

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
            <button
      onClick={() => navigate("/dashboard")}
      className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition"
    >
              <TrendingUp className="w-5 h-5" />
              <span>Dashboard</span>
            </button>
            <button 
              onClick={() => setCurrentView('qr')}
              className="w-full flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-blue-700 to-blue-500 text-white rounded-lg font-medium"
            >
              <QrCode className="w-5 h-5" />
              <span>My QR Code</span>
            </button>
            <a href="#" className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition">
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </a>
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

      {/* Main Content */}
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
                  <h1 className="text-2xl font-bold text-gray-900">
                    {currentView === 'qr' ? 'My QR Code' : 'Send a Tip'}
                  </h1>
                  <p className="text-sm text-gray-600">
                    {currentView === 'qr' 
                      ? 'Share your QR code to receive tips' 
                      : `Tipping ${user.name}`}
                  </p>
                </div>
              </div>
              
              {currentView === 'payment' && (
                <button 
                  onClick={() => setCurrentView('qr')}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition flex items-center space-x-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Back</span>
                </button>
              )}
            </div>
          </div>
        </header>

        <main className="p-6">
          {currentView === 'qr' ? (
            /* QR Code View */
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                {/* QR Code Card */}
                <div className="bg-white rounded-xl border border-gray-200 p-8">
                  <div className="text-center">
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Your Personal QR Code</h2>
                    <p className="text-sm text-gray-600 mb-6">Customers can scan this to tip you instantly</p>
                    
                    <div className="bg-gradient-to-br from-blue-700 to-blue-500 p-8 rounded-2xl mb-6">
                      <div className="bg-white p-6 rounded-xl">
                        {/* QR Code Placeholder */}
                        <div className="w-full aspect-square bg-white border-4 border-gray-900 rounded-lg p-4 cursor-pointer hover:scale-105 transition-transform" onClick={handleScanQR}>
                          <svg viewBox="0 0 100 100" className="w-full h-full">
                            {/* Simple QR-like pattern */}
                            <rect x="0" y="0" width="20" height="20" fill="black"/>
                            <rect x="25" y="0" width="5" height="5" fill="black"/>
                            <rect x="35" y="0" width="5" height="5" fill="black"/>
                            <rect x="45" y="0" width="10" height="10" fill="black"/>
                            <rect x="80" y="0" width="20" height="20" fill="black"/>
                            
                            <rect x="5" y="5" width="10" height="10" fill="white"/>
                            <rect x="85" y="5" width="10" height="10" fill="white"/>
                            
                            <rect x="0" y="25" width="5" height="5" fill="black"/>
                            <rect x="10" y="25" width="5" height="15" fill="black"/>
                            <rect x="20" y="30" width="10" height="10" fill="black"/>
                            <rect x="35" y="25" width="15" height="5" fill="black"/>
                            <rect x="55" y="25" width="5" height="10" fill="black"/>
                            <rect x="65" y="30" width="10" height="5" fill="black"/>
                            <rect x="80" y="25" width="5" height="15" fill="black"/>
                            <rect x="90" y="25" width="10" height="5" fill="black"/>
                            
                            <rect x="0" y="45" width="10" height="10" fill="black"/>
                            <rect x="15" y="50" width="15" height="5" fill="black"/>
                            <rect x="35" y="45" width="5" height="10" fill="black"/>
                            <rect x="45" y="45" width="10" height="10" fill="black"/>
                            <rect x="60" y="50" width="10" height="5" fill="black"/>
                            <rect x="75" y="45" width="15" height="10" fill="black"/>
                            <rect x="95" y="45" width="5" height="5" fill="black"/>
                            
                            <rect x="0" y="80" width="20" height="20" fill="black"/>
                            <rect x="5" y="85" width="10" height="10" fill="white"/>
                            <rect x="25" y="85" width="10" height="5" fill="black"/>
                            <rect x="40" y="80" width="5" height="15" fill="black"/>
                            <rect x="50" y="85" width="15" height="10" fill="black"/>
                            <rect x="70" y="80" width="10" height="5" fill="black"/>
                            <rect x="85" y="85" width="5" height="10" fill="black"/>
                            <rect x="95" y="80" width="5" height="15" fill="black"/>
                            
                            <rect x="25" y="60" width="5" height="15" fill="black"/>
                            <rect x="35" y="65" width="10" height="5" fill="black"/>
                            <rect x="50" y="60" width="5" height="10" fill="black"/>
                            <rect x="60" y="65" width="15" height="10" fill="black"/>
                            <rect x="80" y="60" width="10" height="5" fill="black"/>
                          </svg>
                        </div>
                        <p className="text-xs text-gray-500 mt-4">Click to simulate scan</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button className="flex-1 bg-gradient-to-r from-blue-700 to-blue-500 text-white px-4 py-3 rounded-lg font-semibold hover:opacity-90 transition flex items-center justify-center space-x-2">
                        <Download className="w-4 h-4" />
                        <span>Download QR</span>
                      </button>
                      <button className="flex-1 bg-gray-100 text-gray-700 px-4 py-3 rounded-lg font-semibold hover:bg-gray-200 transition flex items-center justify-center space-x-2">
                        <Share2 className="w-4 h-4" />
                        <span>Share</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Info & Link Card */}
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-blue-700 to-blue-500 rounded-xl p-6 text-white">
                    <h3 className="text-lg font-bold mb-2">How It Works</h3>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-bold">1</span>
                        </div>
                        <p className="text-sm text-blue-50">Display your QR code where customers can see it</p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-bold">2</span>
                        </div>
                        <p className="text-sm text-blue-50">Customers scan with their phone camera</p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-bold">3</span>
                        </div>
                        <p className="text-sm text-blue-50">They choose an amount and send the tip instantly</p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-bold">4</span>
                        </div>
                        <p className="text-sm text-blue-50">Money appears in your balance immediately</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Share Your Link</h3>
                    <p className="text-sm text-gray-600 mb-4">You can also share your personal tip link</p>
                    
                    <div className="flex items-center space-x-2 mb-4">
                      <div className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3">
                        <p className="text-sm font-mono text-gray-700">{user.profileUrl}</p>
                      </div>
                      <button 
                        onClick={handleCopyLink}
                        className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                      >
                        {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                      </button>
                    </div>

                    {copied && (
                      <p className="text-sm text-green-600 font-medium">Link copied to clipboard!</p>
                    )}
                  </div>

                  <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Stats</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">QR Scans Today</p>
                        <p className="text-2xl font-bold text-gray-900">24</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Tips Received</p>
                        <p className="text-2xl font-bold text-gray-900">18</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Payment Confirmation View */
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
          )}
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