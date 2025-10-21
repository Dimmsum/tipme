// src/pages/QRCodePage.tsx
import React, { useState } from 'react';
import { Download, Share2, Copy, Check } from 'lucide-react';
import Layout from '../components/Layout';
import { useUser } from '../hooks/useUser';
import PaymentModal from '../components/PaymentModal';

export default function QRCodePage() {
  const { user } = useUser();
  const [copied, setCopied] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://${user.profileUrl}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleScanQR = () => {
    setShowPayment(true);
  };

  if (showPayment) {
    return <PaymentModal user={user} onClose={() => setShowPayment(false)} />;
  }

  const howItWorksSteps = [
    "Display your QR code where customers can see it",
    "Customers scan with their phone camera",
    "They choose an amount and send the tip instantly",
    "Money appears in your balance immediately"
  ];

  return (
    <Layout
      title="My QR Code"
      subtitle="Share your QR code to receive tips"
      user={user}
    >
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* QR Code Card */}
          <div className="bg-white rounded-xl border border-gray-200 p-8">
            <div className="text-center">
              <h2 className="text-xl font-bold text-gray-900 mb-2">Your Personal QR Code</h2>
              <p className="text-sm text-gray-600 mb-6">Customers can scan this to tip you instantly</p>
              
              <div className="bg-gradient-to-br from-blue-700 to-blue-500 p-8 rounded-2xl mb-6">
                <div className="bg-white p-6 rounded-xl">
                  <div className="w-full aspect-square bg-white border-4 border-gray-900 rounded-lg p-4 cursor-pointer hover:scale-105 transition-transform" onClick={handleScanQR}>
                    <svg viewBox="0 0 100 100" className="w-full h-full">
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

          {/* Info Cards */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-700 to-blue-500 rounded-xl p-6 text-white">
              <h3 className="text-lg font-bold mb-2">How It Works</h3>
              <div className="space-y-3">
                {howItWorksSteps.map((text, i) => (
                  <div key={i} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold">{i + 1}</span>
                    </div>
                    <p className="text-sm text-blue-50">{text}</p>
                  </div>
                ))}
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
    </Layout>
  );
}

