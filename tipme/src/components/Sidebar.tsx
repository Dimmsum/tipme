// src/components/Sidebar.tsx
import { TrendingUp, QrCode, Settings, LogOut } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import type { User } from '../types';

interface NavItem {
  path: string;
  icon: LucideIcon;
  label: string;
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
}

export default function Sidebar({ isOpen, onClose, user }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems: NavItem[] = [
    { path: '/dashboard', icon: TrendingUp, label: 'Dashboard' },
    { path: '/qr-code', icon: QrCode, label: 'My QR Code' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="h-full flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent">
              Tip Me
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-700 to-blue-500 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* User Profile */}
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
  );
}