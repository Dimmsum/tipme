import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  RefreshControl,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';
import { tipmeApi, Transaction } from '../api/tipmeApi';

interface HistoryScreenProps {
  navigation: any;
}

export default function HistoryScreen({ navigation }: HistoryScreenProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filters = [
    { key: 'all', label: 'All' },
    { key: 'tips', label: 'Tips' },
    { key: 'cashouts', label: 'Cashouts' },
    { key: 'today', label: 'Today' },
    { key: 'week', label: 'This Week' },
  ];

  const loadTransactions = async () => {
    try {
      const data = await tipmeApi.getTransactions();
      setTransactions(data);
    } catch (error) {
      console.error('Error loading transactions:', error);
      Alert.alert('Error', 'Failed to load transaction history');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    loadTransactions();
  };

  const getFilteredTransactions = () => {
    if (selectedFilter === 'all') return transactions;
    if (selectedFilter === 'tips') return transactions.filter(t => t.type === 'tip');
    if (selectedFilter === 'cashouts') return transactions.filter(t => t.type === 'cashout');
    if (selectedFilter === 'today') {
      const today = new Date().toISOString().split('T')[0];
      return transactions.filter(t => t.date === today);
    }
    if (selectedFilter === 'week') {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return transactions.filter(t => new Date(t.date) >= weekAgo);
    }
    return transactions;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
    });
  };

  const getTransactionIcon = (type: string) => {
    if (type === 'tip') {
      return { name: 'add-circle', color: colors.success[600] };
    } else {
      return { name: 'arrow-up-circle', color: colors.primary[600] };
    }
  };

  const getTransactionStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return colors.success[600];
      case 'pending':
        return colors.warning[600];
      case 'failed':
        return colors.error[600];
      default:
        return colors.text.secondary;
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading transactions...</Text>
      </View>
    );
  }

  const filteredTransactions = getFilteredTransactions();

  return (
    <View style={styles.container}>
      {/* Filter Tabs */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.filterContainer}
        contentContainerStyle={styles.filterContent}
      >
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter.key}
            style={[
              styles.filterButton,
              selectedFilter === filter.key && styles.filterButtonActive,
            ]}
            onPress={() => setSelectedFilter(filter.key)}
          >
            <Text
              style={[
                styles.filterButtonText,
                selectedFilter === filter.key && styles.filterButtonTextActive,
              ]}
            >
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Transactions List */}
      <ScrollView
        style={styles.transactionsContainer}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
        }
      >
        {filteredTransactions.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="receipt-outline" size={64} color={colors.text.tertiary} />
            <Text style={styles.emptyTitle}>No Transactions</Text>
            <Text style={styles.emptySubtitle}>
              {selectedFilter === 'all' 
                ? 'You haven\'t received any tips yet'
                : `No ${selectedFilter} transactions found`
              }
            </Text>
          </View>
        ) : (
          <View style={styles.transactionsList}>
            {filteredTransactions.map((transaction) => {
              const icon = getTransactionIcon(transaction.type);
              const statusColor = getTransactionStatusColor(transaction.status);
              
              return (
                <TouchableOpacity
                  key={transaction.id}
                  style={styles.transactionItem}
                  onPress={() => {
                    // In a real app, you'd navigate to transaction details
                    Alert.alert('Transaction Details', `Amount: $${Math.abs(transaction.amount).toFixed(2)}\nStatus: ${transaction.status}`);
                  }}
                >
                  <View style={styles.transactionLeft}>
                    <View style={[styles.transactionIcon, { backgroundColor: icon.color + '20' }]}>
                      <Ionicons name={icon.name as any} size={20} color={icon.color} />
                    </View>
                    <View style={styles.transactionInfo}>
                      <Text style={styles.transactionTitle}>
                        {transaction.type === 'tip' ? 'Tip Received' : 'Cash Out'}
                      </Text>
                      <Text style={styles.transactionSubtitle}>
                        {transaction.customer} • {formatDate(transaction.date)} at {transaction.time}
                      </Text>
                      {transaction.description && (
                        <Text style={styles.transactionDescription}>
                          &ldquo;{transaction.description}&rdquo;
                        </Text>
                      )}
                    </View>
                  </View>
                  
                  <View style={styles.transactionRight}>
                    <Text
                      style={[
                        styles.transactionAmount,
                        { color: transaction.amount > 0 ? colors.success[600] : colors.text.primary }
                      ]}
                    >
                      {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                    </Text>
                    <View style={[styles.statusBadge, { backgroundColor: statusColor + '20' }]}>
                      <Text style={[styles.statusText, { color: statusColor }]}>
                        {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </ScrollView>

      {/* Summary */}
      {filteredTransactions.length > 0 && (
        <View style={styles.summaryContainer}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Total Tips</Text>
            <Text style={styles.summaryValue}>
              ${filteredTransactions
                .filter(t => t.type === 'tip')
                .reduce((sum, t) => sum + t.amount, 0)
                .toFixed(2)
              }
            </Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Total Cashouts</Text>
            <Text style={styles.summaryValue}>
              ${Math.abs(filteredTransactions
                .filter(t => t.type === 'cashout')
                .reduce((sum, t) => sum + t.amount, 0)
              ).toFixed(2)}
            </Text>
          </View>
        </View>
      )}
    </View>
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
  filterContainer: {
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  filterContent: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.neutral[100],
    marginRight: 8,
  },
  filterButtonActive: {
    backgroundColor: colors.primary[600],
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text.secondary,
  },
  filterButtonTextActive: {
    color: colors.text.inverse,
  },
  transactionsContainer: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 48,
    paddingVertical: 64,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  transactionsList: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  transactionLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 2,
  },
  transactionSubtitle: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 2,
  },
  transactionDescription: {
    fontSize: 12,
    color: colors.text.tertiary,
    fontStyle: 'italic',
  },
  transactionRight: {
    alignItems: 'flex-end',
  },
  transactionAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  summaryContainer: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 12,
    color: colors.text.secondary,
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  summaryDivider: {
    width: 1,
    backgroundColor: colors.border,
    marginHorizontal: 16,
  },
});
