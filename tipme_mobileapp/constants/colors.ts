export const colors = {
  // TipMe Brand Colors
  primary: {
    50: '#EFF6FF',
    100: '#DBEAFE',
    200: '#BFDBFE',
    300: '#93C5FD',
    400: '#60A5FA',
    500: '#3B82F6', // Blue Mid
    600: '#2563EB',
    700: '#1D4ED8', // Blue Start
    800: '#1E40AF',
    900: '#1E3A8A',
  },
  indigo: {
    50: '#EEF2FF',
    100: '#E0E7FF',
    200: '#C7D2FE',
    300: '#A5B4FC',
    400: '#818CF8',
    500: '#6366F1', // Indigo End
    600: '#4F46E5',
    700: '#4338CA',
    800: '#3730A3',
    900: '#312E81',
  },
  neutral: {
    50: '#F8FAFF', // Neutral background
    100: '#F1F5F9',
    200: '#E2E8F0',
    300: '#CBD5E1',
    400: '#94A3B8',
    500: '#64748B',
    600: '#475569',
    700: '#334155',
    800: '#1E293B',
    900: '#0F172A',
  },
  success: {
    50: '#F0FDF4',
    100: '#DCFCE7',
    200: '#BBF7D0',
    300: '#86EFAC',
    400: '#4ADE80',
    500: '#22C55E',
    600: '#16A34A',
    700: '#15803D',
    800: '#166534',
    900: '#14532D',
  },
  error: {
    50: '#FEF2F2',
    100: '#FEE2E2',
    200: '#FECACA',
    300: '#FCA5A5',
    400: '#F87171',
    500: '#EF4444',
    600: '#DC2626',
    700: '#B91C1C',
    800: '#991B1B',
    900: '#7F1D1D',
  },
  warning: {
    50: '#FFFBEB',
    100: '#FEF3C7',
    200: '#FDE68A',
    300: '#FCD34D',
    400: '#FBBF24',
    500: '#F59E0B',
    600: '#D97706',
    700: '#B45309',
    800: '#92400E',
    900: '#78350F',
  },
  // Gradients
  gradients: {
    primary: ['#1D4ED8', '#3B82F6', '#6366F1'], // Blue Start -> Blue Mid -> Indigo End
    primaryLight: ['#3B82F6', '#60A5FA', '#818CF8'],
    neutral: ['#F8FAFF', '#F1F5F9'],
  },
  // Semantic colors
  background: '#F8FAFF',
  surface: '#FFFFFF',
  text: {
    primary: '#0F172A',
    secondary: '#64748B',
    tertiary: '#94A3B8',
    inverse: '#FFFFFF',
  },
  border: '#E2E8F0',
  shadow: 'rgba(0, 0, 0, 0.1)',
} as const;

export type ColorTheme = typeof colors;
