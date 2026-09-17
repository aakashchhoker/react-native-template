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
    greetingContainer: {
      flex: 1,
    },
    headerActions: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    scrollContent: {
      paddingHorizontal: spacing.lg,
      paddingBottom: spacing.xxxl,
    },
    sectionTitle: {
      marginVertical: spacing.md,
    },
    statsGrid: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: spacing.lg,
    },
    statCard: {
      flex: 1,
      marginHorizontal: spacing.xs,
      padding: spacing.md,
      alignItems: 'center',
    },
    statValue: {
      marginVertical: spacing.xs,
    },
    bannerCard: {
      backgroundColor: theme.primary,
      padding: spacing.lg,
      marginBottom: spacing.lg,
    },
    bannerContent: {
      marginBottom: spacing.md,
    },
    bannerTitle: {
      color: theme.textInverse,
      marginBottom: spacing.xs,
    },
    bannerSubtitle: {
      color: theme.primaryLight,
    },
    bannerButton: {
      backgroundColor: theme.textInverse,
      alignSelf: 'flex-start',
    },
    activityItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: spacing.md,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: theme.border,
    },
    activityIcon: {
      width: 40,
      height: 40,
      borderRadius: 10,
      backgroundColor: theme.surfaceSecondary,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: spacing.md,
    },
    activityDetails: {
      flex: 1,
    },
    activityMeta: {
      alignItems: 'flex-end',
    },
  });
