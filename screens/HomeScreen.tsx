import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { courses, userStats, categories } from '../data/courses';
import CourseCard from '../components/CourseCard';
import CategoryCard from '../components/CategoryCard';
import StatCard from '../components/StatCard';
import ProgressRing from '../components/ProgressRing';

export default function HomeScreen({ navigation }: any) {
  const continueCourse = courses.find(c => c.progress > 0 && c.progress < 100);
  const recommended = courses.slice(0, 3);

  const handleCategoryPress = (categoryId: string) => {
    navigation.navigate('Cours', { selectedCategory: categoryId });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Bonjour, Élève !</Text>
            <Text style={styles.subGreeting}>Prêt à apprendre aujourd'hui ?</Text>
          </View>
          <View style={styles.streakBadge}>
            <Ionicons name="flame" size={18} color="#F59E0B" />
            <Text style={styles.streakText}>{userStats.streak} jours</Text>
          </View>
        </View>

        {/* Progress Overview */}
        <View style={styles.progressOverview}>
          <View style={styles.progressCard}>
            <ProgressRing progress={Math.round((userStats.completedLessons / userStats.totalLessons) * 100)} size={90} color="#6366F1" />
            <View style={styles.progressInfo}>
              <Text style={styles.progressTitle}>Progression globale</Text>
              <Text style={styles.progressDetail}>
                {userStats.completedLessons} sur {userStats.totalLessons} leçons terminées
              </Text>
              <View style={styles.statsRow}>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{userStats.coursesInProgress}</Text>
                  <Text style={styles.statLabel}>en cours</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{userStats.quizzesTaken}</Text>
                  <Text style={styles.statLabel}>quiz passés</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{userStats.averageScore}%</Text>
                  <Text style={styles.statLabel}>moyenne</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Quick Stats */}
        <View style={styles.quickStats}>
          <StatCard icon="book-outline" value={userStats.coursesInProgress.toString()} label="Cours actifs" color="#6366F1" />
          <StatCard icon="checkmark-circle-outline" value={userStats.completedLessons.toString()} label="Leçons faites" color="#10B981" />
          <StatCard icon="time-outline" value={userStats.totalTime} label="Temps total" color="#F59E0B" />
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Catégories</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesScroll}>
            {categories.map(cat => (
              <CategoryCard
                key={cat.id}
                name={cat.name}
                icon={cat.icon}
                color={cat.color}
                courseCount={courses.filter(c => c.category === cat.name).length}
                onPress={() => handleCategoryPress(cat.id)}
              />
            ))}
          </ScrollView>
        </View>

        {/* Continue Learning */}
        {continueCourse && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Continuer</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Cours')}>
                <Text style={styles.seeAll}>Voir tout</Text>
              </TouchableOpacity>
            </View>
            <CourseCard course={continueCourse} onPress={() => navigation.navigate('CourseDetail', { courseId: continueCourse.id })} />
          </View>
        )}

        {/* Recommended */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recommandés</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Cours')}>
              <Text style={styles.seeAll}>Voir tout</Text>
            </TouchableOpacity>
          </View>
          {recommended.map(course => (
            <CourseCard
              key={course.id}
              course={course}
              onPress={() => navigation.navigate('CourseDetail', { courseId: course.id })}
            />
          ))}
        </View>

        <View style={styles.bottomSpace} />
      </ScrollView>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1F2937',
  },
  subGreeting: {
    fontSize: 15,
    color: '#9CA3AF',
    marginTop: 2,
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  streakText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#D97706',
    marginLeft: 4,
  },
  progressOverview: {
    paddingHorizontal: 20,
    marginTop: 16,
  },
  progressCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  progressInfo: {
    flex: 1,
    marginLeft: 16,
  },
  progressTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1F2937',
  },
  progressDetail: {
    fontSize: 13,
    color: '#9CA3AF',
    marginTop: 2,
    marginBottom: 12,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
  },
  statLabel: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 2,
  },
  quickStats: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginTop: 16,
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: '700',
    color: '#1F2937',
  },
  seeAll: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6366F1',
  },
  categoriesScroll: {
    paddingRight: 20,
  },
  bottomSpace: {
    height: 32,
  },
});
