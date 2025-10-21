import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';


interface OnboardingScreenProps {
  navigation: any;
}

const onboardingSlides = [
  {
    id: 1,
    title: 'Get Your QR Code',
    description: 'Create your personalized QR code instantly and display it at your workplace.',
    icon: 'qr-code-outline',
    color: colors.primary[500],
  },
  {
    id: 2,
    title: 'Customers Scan & Tip',
    description: 'Customers simply scan your QR code with their phone camera and tip securely.',
    icon: 'scan-outline',
    color: colors.indigo[500],
  },
  {
    id: 3,
    title: 'Receive Instant Payments',
    description: 'Get paid instantly to your digital wallet. Track earnings and cash out anytime.',
    icon: 'wallet-outline',
    color: colors.primary[600],
  },
];

export default function OnboardingScreen({ navigation }: OnboardingScreenProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    if (currentSlide < onboardingSlides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      navigation.replace('Login');
    }
  };

  const skipOnboarding = () => {
    navigation.replace('Login');
  };

  const currentSlideData = onboardingSlides[currentSlide];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.background, colors.neutral[50]]}
        style={styles.gradient}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={skipOnboarding} style={styles.skipButton}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        </View>

        {/* Content */}
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            {/* Icon */}
            <View style={[styles.iconContainer, { backgroundColor: currentSlideData.color + '20' }]}>
              <Ionicons 
                name={currentSlideData.icon as any} 
                size={80} 
                color={currentSlideData.color} 
              />
            </View>

            {/* Title */}
            <Text style={styles.title}>{currentSlideData.title}</Text>
            
            {/* Description */}
            <Text style={styles.description}>{currentSlideData.description}</Text>
          </View>
        </ScrollView>

        {/* Bottom section */}
        <View style={styles.bottomSection}>
          {/* Dots indicator */}
          <View style={styles.dotsContainer}>
            {onboardingSlides.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  index === currentSlide && styles.activeDot,
                ]}
              />
            ))}
          </View>

          {/* Next button */}
          <TouchableOpacity style={styles.nextButton} onPress={nextSlide}>
            <LinearGradient
              colors={colors.gradients.primary}
              style={styles.nextButtonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.nextButtonText}>
                {currentSlide === onboardingSlides.length - 1 ? 'Get Started' : 'Next'}
              </Text>
              <Ionicons name="arrow-forward" size={20} color={colors.text.inverse} />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  skipButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  skipText: {
    fontSize: 16,
    color: colors.text.secondary,
    fontWeight: '500',
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  iconContainer: {
    width: 160,
    height: 160,
    borderRadius: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 4,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontSize: 18,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: 26,
    maxWidth: 300,
  },
  bottomSection: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    paddingTop: 20,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 32,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.neutral[300],
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: colors.primary[500],
    width: 24,
  },
  nextButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  nextButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 32,
  },
  nextButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.inverse,
    marginRight: 8,
  },
});
