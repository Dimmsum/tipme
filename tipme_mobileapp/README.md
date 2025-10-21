# TipMe Mobile App

A complete Expo React Native mobile app for service workers to receive instant digital tips. This is the mobile version of the TipMe web application.

## Features

- **QR Code Generation**: Generate and display personalized QR codes for customers to scan
- **Wallet Management**: View balance, track earnings, and cash out tips
- **Transaction History**: Complete history of all tips and cashouts with filtering
- **User Profile**: Manage profile information and settings
- **Modern UI**: Beautiful gradient design with Tailwind-like styling using NativeWind

## Tech Stack

- **Expo React Native** - Cross-platform mobile development
- **React Navigation** - Stack and bottom tab navigation
- **Axios** - HTTP client for API requests
- **AsyncStorage & SecureStore** - Local data storage
- **StyleSheet** - React Native's built-in styling system
- **react-native-qrcode-svg** - QR code generation
- **expo-linear-gradient** - Gradient backgrounds
- **@expo/vector-icons** - Icon library

## Project Structure

```
├── screens/            # App screens (React Navigation)
│   ├── LaunchScreen.tsx
│   ├── OnboardingScreen.tsx
│   ├── LoginScreen.tsx
│   ├── SignupScreen.tsx
│   ├── WalletScreen.tsx
│   ├── HistoryScreen.tsx
│   ├── MyQRScreen.tsx
│   └── SettingsScreen.tsx
├── api/                # API layer and mock data
│   └── tipmeApi.ts     # Mock API with realistic data
├── assets/             # Static assets (images, fonts, etc.)
├── components/         # Reusable UI components
├── constants/          # App constants and theme
│   ├── colors.ts       # Color palette and gradients
│   └── theme.ts        # Theme configuration
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── AppNavigator.tsx    # Navigation configuration
└── App.tsx             # Main app entry point
```

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator (for iOS development)
- Android Studio (for Android development)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd tipme_mobileapp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Run on device/simulator**
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app on your phone

### Demo Credentials

For testing the app, use these demo credentials:
- **Email**: maria@tipme.app
- **Password**: password

## App Flow

1. **Launch Screen** - App initialization with TipMe branding
2. **Onboarding** - 3-slide introduction to app features
3. **Authentication** - Login/Signup screens
4. **Main App** - Bottom tab navigation with:
   - **Wallet** - Balance, quick stats, recent activity
   - **History** - Transaction history with filtering
   - **My QR** - QR code display and sharing
   - **Settings** - Profile management and app settings

## Key Features

### Wallet Screen
- Real-time balance display
- Quick stats (total earned, tips count, average tip)
- Recent activity feed
- Cash out functionality
- Quick access to QR code

### History Screen
- Complete transaction history
- Filter by type (tips, cashouts) and time period
- Transaction details with customer info
- Summary statistics

### My QR Screen
- Personalized QR code generation
- User profile display
- Share and download functionality
- Performance tips and statistics

### Settings Screen
- Profile management
- Notification preferences
- Security settings
- Support and legal information

## Design System

The app uses a consistent design system with:

- **Primary Colors**: Blue gradient (#1D4ED8 → #3B82F6 → #6366F1)
- **Typography**: System fonts with consistent sizing
- **Spacing**: 8px grid system
- **Components**: Reusable UI components with consistent styling
- **Gradients**: Used for buttons, cards, and backgrounds

## API Integration

The app includes a mock API (`src/api/tipmeApi.ts`) with realistic data for:
- User authentication
- Wallet balance and transactions
- QR code generation
- Profile management

In production, replace the mock API with actual backend endpoints.

## Development

### Available Scripts

- `npm start` - Start Expo development server
- `npm run android` - Run on Android emulator
- `npm run ios` - Run on iOS simulator
- `npm run web` - Run on web browser
- `npm run lint` - Run ESLint

### Code Structure

- **Screens**: Located in `screens/` folder, each screen is a self-contained component
- **Navigation**: `AppNavigator.tsx` contains centralized navigation configuration
- **API**: Mock API with TypeScript interfaces in `api/` folder
- **Theme**: Centralized color and styling system in `constants/` folder
- **Components**: Reusable UI components in `components/` folder
- **Assets**: Static images and resources in `assets/` folder

### Styling

The app uses React Native's built-in StyleSheet for consistent and performant styling:

```tsx
import { View, Text, StyleSheet } from 'react-native';

export default function MyComponent() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Hello TipMe!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFF',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1D4ED8',
  },
});
```

**Note**: All styling is done with StyleSheet for optimal performance and consistency across platforms.

## Building for Production

1. **Configure app.json** with your app details
2. **Build for iOS**:
   ```bash
   expo build:ios
   ```
3. **Build for Android**:
   ```bash
   expo build:android
   ```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, email support@tipme.app or create an issue in the repository.

---

**TipMe Mobile** - Making tipping instant and effortless for service workers everywhere.