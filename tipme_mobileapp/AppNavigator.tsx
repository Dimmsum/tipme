import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { colors } from './constants/colors';

// Import screens
import LaunchScreen from './screens/LaunchScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import WalletScreen from './screens/WalletScreen';
import HistoryScreen from './screens/HistoryScreen';
import MyQRScreen from './screens/MyQRScreen';
import SettingsScreen from './screens/SettingsScreen';

// Stack navigators
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Main tab navigator
function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'Wallet') {
            iconName = focused ? 'wallet' : 'wallet-outline';
          } else if (route.name === 'History') {
            iconName = focused ? 'time' : 'time-outline';
          } else if (route.name === 'MyQR') {
            iconName = focused ? 'qr-code' : 'qr-code-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          } else {
            iconName = 'help-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary[700],
        tabBarInactiveTintColor: colors.neutral[400],
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          paddingBottom: 8,
          paddingTop: 8,
          height: 88,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        headerStyle: {
          backgroundColor: colors.surface,
          borderBottomColor: colors.border,
          borderBottomWidth: 1,
        },
        headerTintColor: colors.text.primary,
        headerTitleStyle: {
          fontWeight: '600',
          fontSize: 18,
        },
      })}
    >
      <Tab.Screen 
        name="Wallet" 
        component={WalletScreen}
        options={{
          title: 'Wallet',
          headerTitle: 'My Wallet',
        }}
      />
      <Tab.Screen 
        name="History" 
        component={HistoryScreen}
        options={{
          title: 'History',
          headerTitle: 'Transaction History',
        }}
      />
      <Tab.Screen 
        name="MyQR" 
        component={MyQRScreen}
        options={{
          title: 'My QR',
          headerTitle: 'My QR Code',
        }}
      />
      <Tab.Screen 
        name="Settings" 
        component={SettingsScreen}
        options={{
          title: 'Settings',
          headerTitle: 'Settings',
        }}
      />
    </Tab.Navigator>
  );
}

// Main app navigator
export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Launch"
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.surface,
          },
          headerTintColor: colors.text.primary,
          headerTitleStyle: {
            fontWeight: '600',
            fontSize: 18,
          },
        }}
      >
        <Stack.Screen 
          name="Launch" 
          component={LaunchScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Onboarding" 
          component={OnboardingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Login" 
          component={LoginScreen}
          options={{ 
            title: 'Sign In',
            headerLeft: () => null, // Prevent back button
          }}
        />
        <Stack.Screen 
          name="Signup" 
          component={SignupScreen}
          options={{ 
            title: 'Create Account',
          }}
        />
        <Stack.Screen 
          name="Main" 
          component={MainTabNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
