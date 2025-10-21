// src/components/Layout.tsx
import React, { useState } from 'react';
import type { ReactNode } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import type { User } from '../types';
interface LayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  headerActions?: ReactNode;
  user: User;
}

export default function Layout({ children, title, subtitle, headerActions, user }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
        user={user}
      />

      <div className="lg:pl-64">
        <Header
          title={title}
          subtitle={subtitle}
          sidebarOpen={sidebarOpen}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          actions={headerActions}
        />

        <main className="p-6">
          {children}
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