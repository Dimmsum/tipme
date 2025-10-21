// src/hooks/useUser.ts
import { useState } from 'react';
import type { User } from '../types';

export function useUser() {
  const [user, setUser] = useState<User>({
    name: "Maria Santos",
    role: "Restaurant Server",
    email: "maria.santos@email.com",
    avatar: "bg-blue-200",
    joinDate: "January 2025",
    totalEarnings: 12450.75,
    thisMonth: 3280.50,
    avgTip: 8.45,
    totalTips: 1247,
    profileUrl: "tipme.app/maria-santos"
  });

  return { user, setUser };
}