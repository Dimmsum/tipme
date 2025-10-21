import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';
import { tipmeApi } from '../api/tipmeApi';

interface SignupScreenProps {
  navigation: any;
}

export default function SignupScreen({ navigation }: SignupScreenProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const roles = [
    'Restaurant Server',
    'Barista',
    'Delivery Driver',
    'Bartender',
    'Hotel Staff',
    'Other',
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSignup = async () => {
    const { name, email, password, confirmPassword, role } = formData;

    if (!name || !email || !password || !confirmPassword || !role) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);
    try {
      const { user } = await tipmeApi.signup({ name, email, password, role });
      console.log('Signup successful:', user);
      navigation.replace('Main');
    } catch {
      Alert.alert('Signup Failed', 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <LinearGradient
                colors={colors.gradients.primary}
                style={styles.logo}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Ionicons name="cash" size={32} color={colors.text.inverse} />
              </LinearGradient>
            </View>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Join thousands of service workers earning more</Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            {/* Name Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Full Name</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="person-outline" size={20} color={colors.text.tertiary} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your full name"
                  placeholderTextColor={colors.text.tertiary}
                  value={formData.name}
                  onChangeText={(value) => handleInputChange('name', value)}
                  autoCapitalize="words"
                  autoCorrect={false}
                />
              </View>
            </View>

            {/* Email Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Email</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="mail-outline" size={20} color={colors.text.tertiary} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your email"
                  placeholderTextColor={colors.text.tertiary}
                  value={formData.email}
                  onChangeText={(value) => handleInputChange('email', value)}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
            </View>

            {/* Role Selection */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Your Role</Text>
              <View style={styles.roleContainer}>
                {roles.map((role) => (
                  <TouchableOpacity
                    key={role}
                    style={[
                      styles.roleButton,
                      formData.role === role && styles.roleButtonSelected,
                    ]}
                    onPress={() => handleInputChange('role', role)}
                  >
                    <Text
                      style={[
                        styles.roleButtonText,
                        formData.role === role && styles.roleButtonTextSelected,
                      ]}
                    >
                      {role}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Password Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Password</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="lock-closed-outline" size={20} color={colors.text.tertiary} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Create a password"
                  placeholderTextColor={colors.text.tertiary}
                  value={formData.password}
                  onChangeText={(value) => handleInputChange('password', value)}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeIcon}
                >
                  <Ionicons 
                    name={showPassword ? "eye-outline" : "eye-off-outline"} 
                    size={20} 
                    color={colors.text.tertiary} 
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Confirm Password Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Confirm Password</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="lock-closed-outline" size={20} color={colors.text.tertiary} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Confirm your password"
                  placeholderTextColor={colors.text.tertiary}
                  value={formData.confirmPassword}
                  onChangeText={(value) => handleInputChange('confirmPassword', value)}
                  secureTextEntry={!showConfirmPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <TouchableOpacity
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={styles.eyeIcon}
                >
                  <Ionicons 
                    name={showConfirmPassword ? "eye-outline" : "eye-off-outline"} 
                    size={20} 
                    color={colors.text.tertiary} 
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Signup Button */}
            <TouchableOpacity 
              style={[styles.signupButton, isLoading && styles.signupButtonDisabled]} 
              onPress={handleSignup}
              disabled={isLoading}
            >
              <LinearGradient
                colors={colors.gradients.primary}
                style={styles.signupButtonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.signupButtonText}>
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* Terms */}
            <Text style={styles.termsText}>
              By creating an account, you agree to our Terms of Service and Privacy Policy
            </Text>
          </View>

          {/* Sign In Link */}
          <View style={styles.signinContainer}>
            <Text style={styles.signinText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.signinLink}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logoContainer: {
    marginBottom: 20,
  },
  logo: {
    width: 70,
    height: 70,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  form: {
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: colors.text.primary,
  },
  eyeIcon: {
    padding: 4,
  },
  roleContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  roleButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: colors.neutral[100],
    borderWidth: 1,
    borderColor: colors.border,
  },
  roleButtonSelected: {
    backgroundColor: colors.primary[50],
    borderColor: colors.primary[500],
  },
  roleButtonText: {
    fontSize: 14,
    color: colors.text.secondary,
    fontWeight: '500',
  },
  roleButtonTextSelected: {
    color: colors.primary[700],
    fontWeight: '600',
  },
  signupButton: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
  },
  signupButtonDisabled: {
    opacity: 0.6,
  },
  signupButtonGradient: {
    paddingVertical: 18,
    alignItems: 'center',
  },
  signupButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.inverse,
  },
  termsText: {
    fontSize: 12,
    color: colors.text.tertiary,
    textAlign: 'center',
    lineHeight: 16,
  },
  signinContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 40,
  },
  signinText: {
    fontSize: 16,
    color: colors.text.secondary,
  },
  signinLink: {
    fontSize: 16,
    color: colors.primary[600],
    fontWeight: '600',
  },
});
