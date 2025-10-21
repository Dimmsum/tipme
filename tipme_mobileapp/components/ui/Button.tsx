import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../constants/colors';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export default function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  style,
  textStyle,
}: ButtonProps) {
  const buttonStyle = [
    styles.button,
    styles[`${size}Button`],
    disabled && styles.disabledButton,
    style,
  ];

  const textStyleCombined = [
    styles.text,
    styles[`${size}Text`],
    styles[`${variant}Text`],
    disabled && styles.disabledText,
    textStyle,
  ];

  if (variant === 'primary') {
    return (
      <TouchableOpacity
        style={buttonStyle}
        onPress={onPress}
        disabled={disabled}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={colors.gradients.primary}
          style={styles.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Text style={textStyleCombined}>{title}</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={[buttonStyle, styles[`${variant}Button`]]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Text style={textStyleCombined}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  gradient: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
  // Sizes
  smallButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  mediumButton: {
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  largeButton: {
    paddingVertical: 20,
    paddingHorizontal: 32,
  },
  smallText: {
    fontSize: 14,
  },
  mediumText: {
    fontSize: 16,
  },
  largeText: {
    fontSize: 18,
  },
  // Variants
  primaryButton: {
    backgroundColor: colors.primary[600],
  },
  secondaryButton: {
    backgroundColor: colors.neutral[100],
    borderWidth: 1,
    borderColor: colors.border,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.primary[600],
  },
  primaryText: {
    color: colors.text.inverse,
  },
  secondaryText: {
    color: colors.text.primary,
  },
  outlineText: {
    color: colors.primary[600],
  },
  // States
  disabledButton: {
    opacity: 0.6,
  },
  disabledText: {
    opacity: 0.6,
  },
});
