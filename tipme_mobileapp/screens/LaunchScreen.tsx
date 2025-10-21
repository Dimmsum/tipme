import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';

const { width, height } = Dimensions.get('window');

interface LaunchScreenProps {
  navigation: any;
}

export default function LaunchScreen({ navigation }: LaunchScreenProps) {
  useEffect(() => {
    // Simulate app initialization and check for existing auth
    const timer = setTimeout(() => {
      // In a real app, you'd check AsyncStorage for existing auth token
      // For now, we'll always go to onboarding
      navigation.replace('Onboarding');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <LinearGradient
      colors={colors.gradients.primary}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.content}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <View style={styles.logoBackground}>
            <Ionicons name="cash" size={60} color={colors.text.inverse} />
          </View>
        </View>

        {/* App Name */}
        <Text style={styles.appName}>TipMe</Text>
        <Text style={styles.tagline}>Instant Digital Tips</Text>

      </View>

      {/* Decorative elements */}
      <View style={styles.decorativeCircle1} />
      <View style={styles.decorativeCircle2} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    zIndex: 2,
  },
  logoContainer: {
    marginBottom: 24,
  },
  logoBackground: {
    width: 120,
    height: 120,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  appName: {
    fontSize: 48,
    fontWeight: 'bold',
    color: colors.text.inverse,
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  tagline: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '500',
    marginBottom: 60,
  },
  decorativeCircle1: {
    position: 'absolute',
    top: height * 0.1,
    right: -width * 0.2,
    width: width * 0.6,
    height: width * 0.6,
    borderRadius: width * 0.3,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  decorativeCircle2: {
    position: 'absolute',
    bottom: height * 0.1,
    left: -width * 0.3,
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: width * 0.4,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
});
