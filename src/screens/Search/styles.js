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
    title: {
      marginBottom: spacing.md,
    },
    searchContainer: {
      marginBottom: spacing.xs,
    },
    categoriesList: {
      paddingHorizontal: spacing.lg,
      paddingBottom: spacing.md,
    },
    categoryChip: {
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.xs,
      borderRadius: 20,
      marginRight: spacing.sm,
      backgroundColor: theme.surfaceSecondary,
      borderWidth: 1,
      borderColor: 'transparent',
    },
    categoryChipActive: {
      backgroundColor: theme.primaryLight,
      borderColor: theme.primary,
    },
    categoryText: {
      color: theme.textSecondary,
    },
    categoryTextActive: {
      color: theme.primary,
      fontWeight: '600',
    },
    contentList: {
      paddingHorizontal: spacing.lg,
      paddingBottom: spacing.xxxl,
    },
    resultCard: {
      marginBottom: spacing.md,
    },
    resultHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: spacing.xs,
    },
    categoryBadge: {
      paddingHorizontal: spacing.xs,
      paddingVertical: 2,
      borderRadius: 4,
      backgroundColor: theme.surfaceSecondary,
    },
  });
