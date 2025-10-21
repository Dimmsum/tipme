import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  Alert,
  Share,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import QRCode from 'react-native-qrcode-svg';
import { colors } from '../constants/colors';
import { tipmeApi, User } from '../api/tipmeApi';

const { width } = Dimensions.get('window');

interface MyQRScreenProps {
  navigation: any;
}

export default function MyQRScreen({ navigation }: MyQRScreenProps) {
  const [user, setUser] = useState<User | null>(null);
  const [qrCode, setQrCode] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  const loadUserData = async () => {
    try {
      const [userData, qrData] = await Promise.all([
        tipmeApi.getCurrentUser(),
        tipmeApi.getQRCode(),
      ]);
      setUser(userData);
      setQrCode(qrData.qrCode);
    } catch (error) {
      console.error('Error loading user data:', error);
      Alert.alert('Error', 'Failed to load QR code');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUserData();
  }, []);

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Tip me using TipMe! Scan this QR code or visit: ${qrCode}`,
        url: qrCode,
        title: 'TipMe QR Code',
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleDownload = () => {
    // In a real app, you'd implement QR code download functionality
    Alert.alert('Download', 'QR code saved to your photos!');
  };

  const handleRefresh = () => {
    setIsLoading(true);
    loadUserData();
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading QR code...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Your QR Code</Text>
        <Text style={styles.subtitle}>Display this code for customers to scan and tip you</Text>
      </View>

      {/* QR Code Card */}
      <View style={styles.qrCard}>
        <LinearGradient
          colors={colors.gradients.primary}
          style={styles.qrCardGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          {/* User Info */}
          <View style={styles.userInfo}>
            <View style={styles.avatarContainer}>
              <Text style={styles.avatarText}>
                {user?.name?.split(' ').map(n => n[0]).join('') || 'U'}
              </Text>
            </View>
            <View style={styles.userDetails}>
              <Text style={styles.userName}>{user?.name}</Text>
              <Text style={styles.userRole}>{user?.role}</Text>
            </View>
          </View>

          {/* QR Code */}
          <View style={styles.qrContainer}>
            <View style={styles.qrBackground}>
              <QRCode
                value={qrCode}
                size={width * 0.6}
                color={colors.text.primary}
                backgroundColor={colors.text.inverse}
                logoSize={30}
                logoMargin={2}
                logoBackgroundColor="transparent"
              />
            </View>
          </View>

          {/* QR Code Info */}
          <View style={styles.qrInfo}>
            <Text style={styles.qrInfoTitle}>Scan to Tip</Text>
            <Text style={styles.qrInfoSubtitle}>
              Customers can scan this code with their phone camera
            </Text>
          </View>
        </LinearGradient>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
          <LinearGradient
            colors={colors.gradients.primary}
            style={styles.shareButtonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Ionicons name="share-outline" size={20} color={colors.text.inverse} />
            <Text style={styles.shareButtonText}>Share QR Code</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity style={styles.downloadButton} onPress={handleDownload}>
          <View style={styles.downloadButtonContent}>
            <Ionicons name="download-outline" size={20} color={colors.primary[600]} />
            <Text style={styles.downloadButtonText}>Download</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Tips Section */}
      <View style={styles.tipsSection}>
        <Text style={styles.tipsTitle}>Tips for Getting More Tips</Text>
        
        <View style={styles.tipItem}>
          <View style={styles.tipIcon}>
            <Ionicons name="location" size={20} color={colors.primary[600]} />
          </View>
          <View style={styles.tipContent}>
            <Text style={styles.tipTitle}>Display Prominently</Text>
            <Text style={styles.tipDescription}>
              Place your QR code where customers can easily see and scan it
            </Text>
          </View>
        </View>

        <View style={styles.tipItem}>
          <View style={styles.tipIcon}>
            <Ionicons name="chatbubble" size={20} color={colors.primary[600]} />
          </View>
          <View style={styles.tipContent}>
            <Text style={styles.tipTitle}>Mention It</Text>
            <Text style={styles.tipDescription}>
              Let customers know they can tip digitally by scanning your code
            </Text>
          </View>
        </View>

        <View style={styles.tipItem}>
          <View style={styles.tipIcon}>
            <Ionicons name="refresh" size={20} color={colors.primary[600]} />
          </View>
          <View style={styles.tipContent}>
            <Text style={styles.tipTitle}>Keep It Fresh</Text>
            <Text style={styles.tipDescription}>
              Refresh your QR code regularly to maintain security
            </Text>
          </View>
        </View>
      </View>

      {/* Stats Section */}
      <View style={styles.statsSection}>
        <Text style={styles.statsTitle}>Your Performance</Text>
        
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>1,247</Text>
            <Text style={styles.statLabel}>Total Scans</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>342</Text>
            <Text style={styles.statLabel}>This Month</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>$8.45</Text>
            <Text style={styles.statLabel}>Avg Tip</Text>
          </View>
        </View>
      </View>

      {/* Refresh Button */}
      <TouchableOpacity style={styles.refreshButton} onPress={handleRefresh}>
        <Ionicons name="refresh" size={20} color={colors.primary[600]} />
        <Text style={styles.refreshButtonText}>Refresh QR Code</Text>
      </TouchableOpacity>
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
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 16,
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
    lineHeight: 22,
  },
  qrCard: {
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
  qrCardGradient: {
    padding: 24,
    alignItems: 'center',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text.inverse,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text.inverse,
    marginBottom: 4,
  },
  userRole: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  qrContainer: {
    marginBottom: 24,
  },
  qrBackground: {
    backgroundColor: colors.text.inverse,
    padding: 20,
    borderRadius: 16,
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  qrInfo: {
    alignItems: 'center',
  },
  qrInfoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text.inverse,
    marginBottom: 4,
  },
  qrInfoSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginBottom: 32,
    gap: 12,
  },
  shareButton: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  shareButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  shareButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.inverse,
  },
  downloadButton: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  downloadButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  downloadButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary[600],
  },
  tipsSection: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  tipsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 16,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tipIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary[50],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 4,
  },
  tipDescription: {
    fontSize: 14,
    color: colors.text.secondary,
    lineHeight: 20,
  },
  statsSection: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  statsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  statItem: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  refreshButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    marginHorizontal: 24,
    marginBottom: 40,
    backgroundColor: colors.neutral[100],
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  refreshButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.primary[600],
    marginLeft: 8,
  },
});
