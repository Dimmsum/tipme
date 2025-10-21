// src/components/StatCard.tsx
import React from 'react';
import { ArrowUpRight, ArrowDownRight,  } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  change: string;
  trend: 'up' | 'down';
  icon: LucideIcon;
  color: string;
}

export default function StatCard({ label, value, change, trend, icon: Icon, color }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className={`flex items-center space-x-1 text-sm font-semibold ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
          {trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
          <span>{change}</span>
        </div>
      </div>
      <p className="text-gray-600 text-sm mb-1">{label}</p>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  );
}
