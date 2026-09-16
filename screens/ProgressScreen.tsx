import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { courses, userStats } from '../data/courses';
import ProgressRing from '../components/ProgressRing';
import StatCard from '../components/StatCard';

export default function ProgressScreen({ navigation }: any) {
  const weeklyData = [
    { day: 'Lun', hours: 1.5, active: true },
    { day: 'Mar', hours: 2.0, active: true },
    { day: 'Mer', hours: 0.5, active: true },
    { day: 'Jeu', hours: 1.0, active: true },
    { day: 'Ven', hours: 2.5, active: true },
    { day: 'Sam', hours: 3.0, active: true },
    { day: 'Dim', hours: 0, active: false },
  ];

  const maxHours = Math.max(...weeklyData.map(d => d.hours));

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Progression</Text>
          <Text style={styles.headerSubtitle}>Suivez votre parcours d'apprentissage</Text>
        </View>

        {/* Weekly Activity */}
        <View style={styles.weeklyCard}>
          <View style={styles.weeklyHeader}>
            <Text style={styles.weeklyTitle}>Cette semaine</Text>
            <View style={styles.streakBadge}>
              <Ionicons name="flame" size={16} color="#F59E0B" />
              <Text style={styles.streakText}>{userStats.streak} jours</Text>
            </View>
          </View>
          <View style={styles.barChart}>
            {weeklyData.map((d, idx) => (
              <View key={idx} style={styles.barColumn}>
                <View style={styles.barWrapper}>
                  <View
                    style={[
                      styles.bar,
                      {
                        height: d.hours > 0 ? (d.hours / maxHours) * 100 : 4,
                        backgroundColor: d.active ? '#6366F1' : '#E5E7EB',
                        opacity: d.hours > 0 ? 1 : 0.3,
                      },
                    ]}
                  />
                </View>
                <Text style={[styles.barLabel, d.active && styles.barLabelActive]}>{d.day}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsRow}>
          <StatCard icon="book-outline" value={userStats.coursesInProgress.toString()} label="Cours actifs" color="#6366F1" />
          <StatCard icon="checkmark-circle-outline" value={userStats.completedLessons.toString()} label="Leçons" color="#10B981" />
          <StatCard icon="trophy-outline" value={`${userStats.averageScore}%`} label="Moyenne" color="#F59E0B" />
        </View>

        {/* Course Progress */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Progression par cours</Text>
          {courses.map(course => (
            <TouchableOpacity
              key={course.id}
              style={styles.courseProgressCard}
              onPress={() => navigation.navigate('CourseDetail', { courseId: course.id })}
              activeOpacity={0.85}
            >
              <View style={[styles.courseDot, { backgroundColor: course.color }]} />
              <View style={styles.courseInfo}>
                <Text style={styles.courseTitle}>{course.title}</Text>
                <Text style={styles.courseMeta}>
                  {course.completedLessons}/{course.totalLessons} leçons
                </Text>
              </View>
              <View style={styles.ringWrapper}>
                <ProgressRing progress={course.progress} size={50} strokeWidth={5} color={course.color} />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Achievements */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Badges</Text>
          <View style={styles.badgesRow}>
            <View style={styles.badgeItem}>
              <View style={[styles.badgeCircle, { backgroundColor: '#FEF3C7' }]}>
                <Ionicons name="flame" size={24} color="#F59E0B" />
              </View>
              <Text style={styles.badgeName}>Série 5j</Text>
            </View>
            <View style={styles.badgeItem}>
              <View style={[styles.badgeCircle, { backgroundColor: '#F5F3FF' }]}>
                <Ionicons name="book" size={24} color="#6366F1" />
              </View>
              <Text style={styles.badgeName}>7 leçons</Text>
            </View>
            <View style={styles.badgeItem}>
              <View style={[styles.badgeCircle, { backgroundColor: '#ECFDF5' }]}>
                <Ionicons name="checkmark" size={24} color="#10B981" />
              </View>
              <Text style={styles.badgeName}>12 quiz</Text>
            </View>
            <View style={styles.badgeItem}>
              <View style={[styles.badgeCircle, { backgroundColor: '#F3F4F6' }]}>
                <Ionicons name="time" size={24} color="#9CA3AF" />
              </View>
              <Text style={[styles.badgeName, { color: '#9CA3AF' }]}>14h+</Text>
            </View>
          </View>
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
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1F2937',
  },
  headerSubtitle: {
    fontSize: 15,
    color: '#9CA3AF',
    marginTop: 2,
  },
  weeklyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginHorizontal: 20,
    marginTop: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  weeklyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  weeklyTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1F2937',
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  streakText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#D97706',
    marginLeft: 4,
  },
  barChart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 120,
  },
  barColumn: {
    alignItems: 'center',
    flex: 1,
  },
  barWrapper: {
    height: 100,
    justifyContent: 'flex-end',
    width: '100%',
    alignItems: 'center',
  },
  bar: {
    width: 14,
    borderRadius: 7,
  },
  barLabel: {
    fontSize: 11,
    color: '#D1D5DB',
    marginTop: 8,
  },
  barLabelActive: {
    color: '#6366F1',
    fontWeight: '600',
  },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginTop: 16,
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 14,
  },
  courseProgressCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  courseDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 14,
  },
  courseInfo: {
    flex: 1,
  },
  courseTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  courseMeta: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  ringWrapper: {
    marginLeft: 12,
  },
  badgesRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  badgeItem: {
    alignItems: 'center',
  },
  badgeCircle: {
    width: 56,
    height: 56,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  badgeName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
  },
  bottomSpace: {
    height: 32,
  },
});
