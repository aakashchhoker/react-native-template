import { StyleSheet } from 'react-native';
import { spacing } from '../../constants/spacing';

export const createStyles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.md,
      paddingBottom: spacing.sm,
    },
    listContent: {
      paddingHorizontal: spacing.lg,
      paddingBottom: spacing.xxxl,
    },
    notificationCard: {
      marginBottom: spacing.sm,
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
    unreadIndicator: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: theme.primary,
      marginTop: 6,
      marginRight: spacing.sm,
    },
    readIndicator: {
      width: 8,
      height: 8,
      marginRight: spacing.sm,
    },
    notificationBody: {
      flex: 1,
    },
    notificationHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: spacing.xs,
    },
    itemReadTitle: {
      fontWeight: '500',
    },
    itemUnreadTitle: {
      fontWeight: '700',
    },
  });
