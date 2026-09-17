import React, { useState, useMemo } from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Search as SearchIcon, X } from 'lucide-react-native';
import { useTheme } from '../../hooks/useTheme';
import { AppText } from '../../components/common/AppText';
import { AppInput } from '../../components/common/AppInput';
import { AppCard } from '../../components/common/AppCard';
import { EmptyState } from '../../components/common/EmptyState';
import { AppIconButton } from '../../components/common/AppIconButton';
import { mockSearchCategories, mockSearchItems } from '../../data/mockData';
import { createStyles } from './styles';

export const SearchScreen = () => {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredItems = useMemo(() => {
    return mockSearchItems.filter(item => {
      const matchesCategory =
        selectedCategory === 'All' || item.category === selectedCategory;
      const matchesQuery =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <AppText variant="h1" style={styles.title}>
          Search
        </AppText>
        <AppInput
          placeholder="Search components, hooks, services..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          leftIcon={<SearchIcon size={20} color={theme.textMuted} />}
          rightIcon={
            searchQuery ? (
              <AppIconButton
                icon={<X size={18} color={theme.textMuted} />}
                onPress={() => setSearchQuery('')}
                size={28}
              />
            ) : null
          }
          containerStyle={styles.searchContainer}
        />
      </View>

      {/* Categories chips */}
      <View>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={mockSearchCategories}
          keyExtractor={item => item}
          contentContainerStyle={styles.categoriesList}
          renderItem={({ item }) => {
            const isActive = item === selectedCategory;
            return (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setSelectedCategory(item)}
                style={[
                  styles.categoryChip,
                  isActive && styles.categoryChipActive,
                ]}
              >
                <AppText
                  variant="bodySmall"
                  style={[
                    styles.categoryText,
                    isActive && styles.categoryTextActive,
                  ]}
                >
                  {item}
                </AppText>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      {/* Results List or Empty State */}
      <FlatList
        data={filteredItems}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.contentList}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <AppCard style={styles.resultCard} variant="surface">
            <View style={styles.resultHeader}>
              <AppText variant="h3">{item.title}</AppText>
              <View style={styles.categoryBadge}>
                <AppText variant="caption" color="secondary">
                  {item.category}
                </AppText>
              </View>
            </View>
            <AppText variant="bodySmall" color="secondary">
              {item.description}
            </AppText>
          </AppCard>
        )}
        ListEmptyComponent={
          <EmptyState
            title="No matches found"
            description={`No items match "${searchQuery}". Try searching for something else or changing categories.`}
            actionTitle="Clear Search"
            onAction={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
          />
        }
      />
    </View>
  );
};

export default SearchScreen;
