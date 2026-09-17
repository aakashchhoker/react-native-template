import { StyleSheet } from 'react-native';
import { spacing } from '../../constants/spacing';

export const createStyles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    header: {
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.md,
      paddingBottom: spacing.sm,
    },
    scrollContent: {
      paddingHorizontal: spacing.lg,
      paddingBottom: spacing.xxxl,
    },
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      marginBottom: spacing.lg,
    },
    gridItem: {
      width: '48%',
      padding: spacing.lg,
      borderRadius: 12,
      marginBottom: spacing.md,
      alignItems: 'center',
    },
    gridIcon: {
      width: 48,
      height: 48,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: spacing.sm,
    },
    gridTitle: {
      textAlign: 'center',
      marginBottom: 2,
    },
    infoCard: {
      marginBottom: spacing.lg,
    },
    cardTitle: {
      marginBottom: spacing.md,
    },
    infoRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: spacing.sm,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: theme.border,
    },
    infoRowLast: {
      borderBottomWidth: 0,
    },
    boldText: {
      fontWeight: '600',
    },
  });
