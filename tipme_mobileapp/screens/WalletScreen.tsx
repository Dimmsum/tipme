import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  Alert,
  RefreshControl,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';
import { tipmeApi, Wallet, User } from '../api/tipmeApi';

interface WalletScreenProps {
  navigation: any;
}

export default function WalletScreen({ navigation }: WalletScreenProps) {
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadData = async () => {
    try {
      const [walletData, userData] = await Promise.all([
        tipmeApi.getWallet(),
        tipmeApi.getCurrentUser(),
      ]);
      setWallet(walletData);
      setUser(userData);
    } catch (error) {
      console.error('Error loading data:', error);
      Alert.alert('Error', 'Failed to load wallet data');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    loadData();
  };

  const handleCashOut = () => {
    Alert.alert(
      'Cash Out',
      `Are you sure you want to cash out $${wallet?.balance.toFixed(2)}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Confirm', 
          onPress: () => {
            // In a real app, you'd navigate to a cashout screen
            Alert.alert('Success', 'Cashout request submitted!');
          }
        },
      ]
    );
  };

  const handleViewQR = () => {
    navigation.navigate('MyQR');
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
      }
    >
      {/* Welcome Section */}
      <View style={styles.welcomeSection}>
        <Text style={styles.welcomeText}>Welcome back,</Text>
        <Text style={styles.userName}>{user?.name}</Text>
        <Text style={styles.userRole}>{user?.role}</Text>
      </View>

      {/* Balance Card */}
      <View style={styles.balanceCard}>
        <LinearGradient
          colors={colors.gradients.primary}
          style={styles.balanceGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.balanceHeader}>
            <View style={styles.balanceIconContainer}>
              <Ionicons name="wallet" size={24} color={colors.text.inverse} />
            </View>
            <TouchableOpacity onPress={handleViewQR}>
              <Ionicons name="qr-code" size={24} color={colors.text.inverse} />
            </TouchableOpacity>
          </View>

          <Text style={styles.balanceLabel}>Available Balance</Text>
          <Text style={styles.balanceAmount}>${wallet?.balance.toFixed(2)}</Text>

          <View style={styles.balanceStats}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>This Week</Text>
              <Text style={styles.statValue}>$487.50</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Pending</Text>
              <Text style={styles.statValue}>${wallet?.pendingAmount.toFixed(2)}</Text>
            </View>
          </View>
        </LinearGradient>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.cashOutButton} onPress={handleCashOut}>
          <LinearGradient
            colors={colors.gradients.primary}
            style={styles.cashOutButtonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Ionicons name="arrow-up" size={20} color={colors.text.inverse} />
            <Text style={styles.cashOutButtonText}>Cash Out</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity style={styles.qrButton} onPress={handleViewQR}>
          <View style={styles.qrButtonContent}>
            <Ionicons name="qr-code" size={20} color={colors.primary[600]} />
            <Text style={styles.qrButtonText}>My QR Code</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Quick Stats */}
      <View style={styles.statsSection}>
        <Text style={styles.sectionTitle}>Quick Stats</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: colors.success[50] }]}>
              <Ionicons name="trending-up" size={24} color={colors.success[600]} />
            </View>
            <Text style={styles.statCardValue}>${wallet?.totalEarned.toFixed(2)}</Text>
            <Text style={styles.statCardLabel}>Total Earned</Text>
          </View>

          <View style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: colors.primary[50] }]}>
              <Ionicons name="time" size={24} color={colors.primary[600]} />
            </View>
            <Text style={styles.statCardValue}>1,247</Text>
            <Text style={styles.statCardLabel}>Total Tips</Text>
          </View>

          <View style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: colors.indigo[50] }]}>
              <Ionicons name="card" size={24} color={colors.indigo[600]} />
            </View>
            <Text style={styles.statCardValue}>$8.45</Text>
            <Text style={styles.statCardLabel}>Avg Tip</Text>
          </View>

          <View style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: colors.warning[50] }]}>
              <Ionicons name="eye" size={24} color={colors.warning[600]} />
            </View>
            <Text style={styles.statCardValue}>342</Text>
            <Text style={styles.statCardLabel}>Profile Views</Text>
          </View>
        </View>
      </View>

      {/* Recent Activity */}
      <View style={styles.recentSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <TouchableOpacity onPress={() => navigation.navigate('History')}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.activityList}>
          <View style={styles.activityItem}>
            <View style={[styles.activityIcon, { backgroundColor: colors.success[50] }]}>
              <Ionicons name="add" size={16} color={colors.success[600]} />
            </View>
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>Tip Received</Text>
              <Text style={styles.activitySubtitle}>From Anonymous • 2:34 PM</Text>
            </View>
            <Text style={styles.activityAmount}>+$15.00</Text>
          </View>

          <View style={styles.activityItem}>
            <View style={[styles.activityIcon, { backgroundColor: colors.success[50] }]}>
              <Ionicons name="add" size={16} color={colors.success[600]} />
            </View>
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>Tip Received</Text>
              <Text style={styles.activitySubtitle}>From John D. • 1:15 PM</Text>
            </View>
            <Text style={styles.activityAmount}>+$8.50</Text>
          </View>

          <View style={styles.activityItem}>
            <View style={[styles.activityIcon, { backgroundColor: colors.primary[50] }]}>
              <Ionicons name="arrow-up" size={16} color={colors.primary[600]} />
            </View>
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>Cash Out</Text>
              <Text style={styles.activitySubtitle}>Bank Transfer • 9:00 AM</Text>
            </View>
            <Text style={styles.activityAmount}>-$150.00</Text>
          </View>
        </View>
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
  welcomeSection: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 16,
  },
  welcomeText: {
    fontSize: 16,
    color: colors.text.secondary,
    marginBottom: 4,
  },
  userName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 4,
  },
  userRole: {
    fontSize: 16,
    color: colors.text.secondary,
  },
  balanceCard: {
    marginHorizontal: 24,
    marginBottom: 24,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  balanceGradient: {
    padding: 24,
  },
  balanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  balanceIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  balanceLabel: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: 48,
    fontWeight: 'bold',
    color: colors.text.inverse,
    marginBottom: 24,
  },
  balanceStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    flex: 1,
  },
  statLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text.inverse,
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginBottom: 32,
    gap: 12,
  },
  cashOutButton: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  cashOutButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  cashOutButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.inverse,
  },
  qrButton: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  qrButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  qrButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary[600],
  },
  statsSection: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statCardValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 4,
  },
  statCardLabel: {
    fontSize: 12,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  recentSection: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  viewAllText: {
    fontSize: 14,
    color: colors.primary[600],
    fontWeight: '500',
  },
  activityList: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  activityIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 2,
  },
  activitySubtitle: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  activityAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.success[600],
  },
});
