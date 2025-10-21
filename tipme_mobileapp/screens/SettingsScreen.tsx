import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  Alert,
  Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';
import { tipmeApi, User } from '../api/tipmeApi';

interface SettingsScreenProps {
  navigation: any;
}

export default function SettingsScreen({ navigation }: SettingsScreenProps) {
  const [user, setUser] = useState<User | null>(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const loadUserData = async () => {
    try {
      const userData = await tipmeApi.getCurrentUser();
      setUser(userData);
    } catch (error) {
      console.error('Error loading user data:', error);
      Alert.alert('Error', 'Failed to load profile data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUserData();
  }, []);

  const handleLogout = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Sign Out', 
          style: 'destructive',
          onPress: async () => {
            try {
              await tipmeApi.logout();
              navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
              });
            } catch (error) {
              console.error('Logout error:', error);
            }
          }
        },
      ]
    );
  };

  const handleEditProfile = () => {
    Alert.alert('Edit Profile', 'Profile editing feature coming soon!');
  };

  // const handlePaymentMethods = () => {
  //   Alert.alert('Payment Methods', 'Payment methods management coming soon!');
  // };

  const handlePrivacy = () => {
    Alert.alert('Privacy Policy', 'Privacy policy coming soon!');
  };

  const handleTerms = () => {
    Alert.alert('Terms of Service', 'Terms of service coming soon!');
  };

  const handleSupport = () => {
    Alert.alert('Support', 'Contact support at support@tipme.app');
  };

  const handleAbout = () => {
    Alert.alert('About TipMe', 'TipMe v1.0.0\nInstant digital tips for service workers.');
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading settings...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>
              {user?.name?.split(' ').map(n => n[0]).join('') || 'U'}
            </Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{user?.name}</Text>
            <Text style={styles.profileEmail}>{user?.email}</Text>
            <Text style={styles.profileRole}>{user?.role}</Text>
          </View>
          <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
            <Ionicons name="pencil" size={20} color={colors.primary[600]} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Settings Sections */}
      <View style={styles.settingsSection}>
        <Text style={styles.sectionTitle}>Account</Text>
        
        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <View style={[styles.settingIcon, { backgroundColor: colors.primary[50] }]}>
              <Ionicons name="person-outline" size={20} color={colors.primary[600]} />
            </View>
            <Text style={styles.settingLabel}>Edit Profile</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.text.tertiary} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <View style={[styles.settingIcon, { backgroundColor: colors.indigo[50] }]}>
              <Ionicons name="card-outline" size={20} color={colors.indigo[600]} />
            </View>
            <Text style={styles.settingLabel}>Payment Methods</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.text.tertiary} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <View style={[styles.settingIcon, { backgroundColor: colors.success[50] }]}>
              <Ionicons name="wallet-outline" size={20} color={colors.success[600]} />
            </View>
            <Text style={styles.settingLabel}>Banking Details</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.text.tertiary} />
        </TouchableOpacity>
      </View>

      <View style={styles.settingsSection}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        
        <View style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <View style={[styles.settingIcon, { backgroundColor: colors.warning[50] }]}>
              <Ionicons name="notifications-outline" size={20} color={colors.warning[600]} />
            </View>
            <Text style={styles.settingLabel}>Push Notifications</Text>
          </View>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            trackColor={{ false: colors.neutral[300], true: colors.primary[200] }}
            thumbColor={notificationsEnabled ? colors.primary[600] : colors.neutral[500]}
          />
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <View style={[styles.settingIcon, { backgroundColor: colors.indigo[50] }]}>
              <Ionicons name="finger-print-outline" size={20} color={colors.indigo[600]} />
            </View>
            <Text style={styles.settingLabel}>Biometric Login</Text>
          </View>
          <Switch
            value={biometricEnabled}
            onValueChange={setBiometricEnabled}
            trackColor={{ false: colors.neutral[300], true: colors.primary[200] }}
            thumbColor={biometricEnabled ? colors.primary[600] : colors.neutral[500]}
          />
        </View>
      </View>

      <View style={styles.settingsSection}>
        <Text style={styles.sectionTitle}>Support</Text>
        
        <TouchableOpacity style={styles.settingItem} onPress={handleSupport}>
          <View style={styles.settingLeft}>
            <View style={[styles.settingIcon, { backgroundColor: colors.primary[50] }]}>
              <Ionicons name="help-circle-outline" size={20} color={colors.primary[600]} />
            </View>
            <Text style={styles.settingLabel}>Help & Support</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.text.tertiary} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <View style={[styles.settingIcon, { backgroundColor: colors.success[50] }]}>
              <Ionicons name="star-outline" size={20} color={colors.success[600]} />
            </View>
            <Text style={styles.settingLabel}>Rate App</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.text.tertiary} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem} onPress={handleAbout}>
          <View style={styles.settingLeft}>
            <View style={[styles.settingIcon, { backgroundColor: colors.neutral[50] }]}>
              <Ionicons name="information-circle-outline" size={20} color={colors.neutral[600]} />
            </View>
            <Text style={styles.settingLabel}>About</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.text.tertiary} />
        </TouchableOpacity>
      </View>

      <View style={styles.settingsSection}>
        <Text style={styles.sectionTitle}>Legal</Text>
        
        <TouchableOpacity style={styles.settingItem} onPress={handlePrivacy}>
          <View style={styles.settingLeft}>
            <View style={[styles.settingIcon, { backgroundColor: colors.indigo[50] }]}>
              <Ionicons name="shield-outline" size={20} color={colors.indigo[600]} />
            </View>
            <Text style={styles.settingLabel}>Privacy Policy</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.text.tertiary} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem} onPress={handleTerms}>
          <View style={styles.settingLeft}>
            <View style={[styles.settingIcon, { backgroundColor: colors.neutral[50] }]}>
              <Ionicons name="document-text-outline" size={20} color={colors.neutral[600]} />
            </View>
            <Text style={styles.settingLabel}>Terms of Service</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.text.tertiary} />
        </TouchableOpacity>
      </View>

      {/* Logout Button */}
      <View style={styles.logoutSection}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color={colors.error[600]} />
          <Text style={styles.logoutButtonText}>Sign Out</Text>
        </TouchableOpacity>
      </View>

      {/* App Version */}
      <View style={styles.versionSection}>
        <Text style={styles.versionText}>TipMe v1.0.0</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  loadingText: {
    fontSize: 16,
    color: colors.text.secondary,
  },
  profileSection: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 16,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary[700],
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 2,
  },
  profileRole: {
    fontSize: 14,
    color: colors.text.tertiary,
  },
  editButton: {
    padding: 8,
  },
  settingsSection: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingLabel: {
    fontSize: 16,
    color: colors.text.primary,
    fontWeight: '500',
  },
  logoutSection: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.error[50],
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.error[200],
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.error[600],
    marginLeft: 8,
  },
  versionSection: {
    alignItems: 'center',
    paddingBottom: 40,
  },
  versionText: {
    fontSize: 12,
    color: colors.text.tertiary,
  },
});
