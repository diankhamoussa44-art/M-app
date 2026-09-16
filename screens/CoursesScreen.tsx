import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { courses, categories } from '../data/courses';
import CourseCard from '../components/CourseCard';

export default function CoursesScreen({ navigation, route }: any) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    route.params?.selectedCategory || null
  );
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCourses = useMemo(() => {
    let result = courses;
    if (selectedCategory) {
      const catName = categories.find(c => c.id === selectedCategory)?.name;
      result = result.filter(c => c.category === catName);
    }
    if (searchQuery) {
      result = result.filter(
        c =>
          c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return result;
  }, [selectedCategory, searchQuery]);

  const categoryName = selectedCategory
    ? categories.find(c => c.id === selectedCategory)?.name
    : null;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          {selectedCategory ? (
            <View style={styles.headerWithBack}>
              <TouchableOpacity onPress={() => setSelectedCategory(null)} style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color="#1F2937" />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>{categoryName}</Text>
              <View style={styles.backButton} />
            </View>
          ) : (
            <Text style={styles.headerTitle}>Tous les Cours</Text>
          )}
        </View>

        {/* Category Filter Pills */}
        {!selectedCategory && (
          <View style={styles.filterContainer}>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={[{ id: 'all', name: 'Tous' }, ...categories]}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.filterScroll}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.filterPill,
                    (selectedCategory === null && item.id === 'all') || selectedCategory === item.id
                      ? styles.filterPillActive
                      : null,
                  ]}
                  onPress={() => setSelectedCategory(item.id === 'all' ? null : item.id)}
                >
                  <Text
                    style={[
                      styles.filterPillText,
                      (selectedCategory === null && item.id === 'all') || selectedCategory === item.id
                        ? styles.filterPillTextActive
                        : null,
                    ]}
                  >
                    {item.name}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        )}

        {/* Course List */}
        <FlatList
          data={filteredCourses}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={() => (
            <View style={styles.emptyState}>
              <Ionicons name="search-outline" size={48} color="#D1D5DB" />
              <Text style={styles.emptyTitle}>Aucun cours trouvé</Text>
              <Text style={styles.emptySubtitle}>Essayez une autre catégorie ou recherche</Text>
            </View>
          )}
          renderItem={({ item }) => (
            <CourseCard
              course={item}
              onPress={() => navigation.navigate('CourseDetail', { courseId: item.id })}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
  },
  headerWithBack: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1F2937',
  },
  filterContainer: {
    marginTop: 4,
  },
  filterScroll: {
    paddingHorizontal: 20,
    paddingBottom: 8,
  },
  filterPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  filterPillActive: {
    backgroundColor: '#6366F1',
    borderColor: '#6366F1',
  },
  filterPillText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6B7280',
  },
  filterPillTextActive: {
    color: '#FFFFFF',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 32,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#6B7280',
    marginTop: 16,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#9CA3AF',
    marginTop: 4,
    textAlign: 'center',
  },
});
