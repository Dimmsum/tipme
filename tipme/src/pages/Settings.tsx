import { useState } from "react";
import {
  User,
  Lock,
  Bell,
  CreditCard,
  Save,
  EyeOff,
  Eye,
  Trash2,
} from "lucide-react";
import Layout from "../components/Layout";
import { useUser } from "../hooks/useUser";

export default function Settings() {
  const { user } = useUser();
  const [showPassword, setShowPassword] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handleSave = () => {
    alert("Settings saved successfully!");
  };

  return (
    <Layout
      title="Settings"
      subtitle="Manage your account, security, and preferences"
      user={user}
    >
      <div className="space-y-8">
        {/* Profile Settings */}
        <section className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4">
            <User className="w-5 h-5 text-blue-600" />
            Profile Settings
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                defaultValue={user.name}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                defaultValue={user.email}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Role / Title
              </label>
              <input
                type="text"
                defaultValue={user.role}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Join Date
              </label>
              <input
                type="text"
                value={user.joinDate}
                disabled
                className="w-full border border-gray-200 bg-gray-100 rounded-lg px-3 py-2 text-sm text-gray-500"
              />
            </div>
          </div>
        </section>

        {/* Security Settings */}
        <section className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4">
            <Lock className="w-5 h-5 text-blue-600" />
            Security
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition flex items-center gap-2"
              >
                {showPassword ? (
                  <>
                    <EyeOff className="w-4 h-4" /> Hide
                  </>
                ) : (
                  <>
                    <Eye className="w-4 h-4" /> Show
                  </>
                )}
              </button>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <input
                type="password"
                placeholder="New password"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                placeholder="Confirm new password"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>
          </div>
          <button className="mt-4 text-red-600 text-sm flex items-center gap-2 hover:underline">
            <Trash2 className="w-4 h-4" /> Delete Account
          </button>
        </section>

        {/* Notification Preferences */}
        <section className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4">
            <Bell className="w-5 h-5 text-blue-600" />
            Notifications
          </h2>
          <div className="space-y-3">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-sm text-gray-700">Email Notifications</span>
              <input
                type="checkbox"
                checked={emailNotifications}
                onChange={() => setEmailNotifications(!emailNotifications)}
                className="w-5 h-5 accent-blue-600"
              />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-sm text-gray-700">SMS Notifications</span>
              <input
                type="checkbox"
                checked={smsNotifications}
                onChange={() => setSmsNotifications(!smsNotifications)}
                className="w-5 h-5 accent-blue-600"
              />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-sm text-gray-700">Dark Mode</span>
              <input
                type="checkbox"
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
                className="w-5 h-5 accent-blue-600"
              />
            </label>
          </div>
        </section>

        {/* Payment Preferences */}
        <section className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4">
            <CreditCard className="w-5 h-5 text-blue-600" />
            Payment Preferences
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Default Cash Out Method
              </label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent">
                <option>Bank Transfer</option>
                <option>PayPal</option>
                <option>CashApp</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Account Number / Email
              </label>
              <input
                type="text"
                placeholder="Enter payment details"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>
          </div>
        </section>

        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-700 to-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition"
          >
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </div>
    </Layout>
  );
}
