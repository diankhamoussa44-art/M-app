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
import { courses } from '../data/courses';

export default function CourseDetailScreen({ navigation, route }: any) {
  const { courseId } = route.params;
  const course = courses.find(c => c.id === courseId);

  if (!course) return null;

  const nextLesson = course.lessons.find(l => !l.completed);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#1F2937" />
          </TouchableOpacity>
        </View>

        {/* Course Info */}
        <View style={styles.courseInfo}>
          <View style={[styles.categoryBadge, { backgroundColor: course.color + '18' }]}>
            <Text style={[styles.categoryText, { color: course.color }]}>{course.category}</Text>
          </View>
          <Text style={styles.title}>{course.title}</Text>
          <Text style={styles.description}>{course.description}</Text>

          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <Ionicons name="layers-outline" size={16} color="#9CA3AF" />
              <Text style={styles.metaText}>{course.level}</Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="book-outline" size={16} color="#9CA3AF" />
              <Text style={styles.metaText}>{course.totalLessons} leçons</Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="help-circle-outline" size={16} color="#9CA3AF" />
              <Text style={styles.metaText}>{course.quizzes.length} quiz</Text>
            </View>
          </View>
        </View>

        {/* Progress */}
        <View style={styles.progressSection}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressTitle}>Progression</Text>
            <Text style={[styles.progressPercent, { color: course.color }]}>{course.progress}%</Text>
          </View>
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBar, { width: `${course.progress}%`, backgroundColor: course.color }]} />
          </View>
          <Text style={styles.progressDetail}>
            {course.completedLessons} sur {course.totalLessons} leçons terminées
          </Text>
        </View>

        {/* Continue Button */}
        {nextLesson && (
          <TouchableOpacity
            style={[styles.continueButton, { backgroundColor: course.color }]}
            onPress={() => navigation.navigate('Lesson', { courseId: course.id, lessonId: nextLesson.id })}
          >
            <Ionicons name="play" size={20} color="#FFF" />
            <Text style={styles.continueButtonText}>Continuer la leçon</Text>
            <Text style={styles.continueButtonMeta}>{nextLesson.title}</Text>
          </TouchableOpacity>
        )}

        {/* Lessons */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Leçons</Text>
          {course.lessons.map((lesson, index) => (
            <TouchableOpacity
              key={lesson.id}
              style={styles.lessonRow}
              onPress={() => navigation.navigate('Lesson', { courseId: course.id, lessonId: lesson.id })}
              activeOpacity={0.8}
            >
              <View style={[styles.lessonNumber, lesson.completed ? { backgroundColor: course.color } : { backgroundColor: '#E5E7EB' }]}>
                {lesson.completed ? (
                  <Ionicons name="checkmark" size={16} color="#FFF" />
                ) : (
                  <Text style={styles.lessonNumberText}>{index + 1}</Text>
                )}
              </View>
              <View style={styles.lessonInfo}>
                <Text style={[styles.lessonTitle, lesson.completed && styles.lessonTitleCompleted]}>
                  {lesson.title}
                </Text>
                <Text style={styles.lessonDuration}>{lesson.duration}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#D1D5DB" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Quiz Button */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quiz</Text>
          <TouchableOpacity
            style={[styles.quizButton, { borderColor: course.color }]}
            onPress={() => navigation.navigate('Quiz', { courseId: course.id })}
          >
            <View style={[styles.quizIcon, { backgroundColor: course.color + '18' }]}>
              <Ionicons name="help-circle" size={24} color={course.color} />
            </View>
            <View style={styles.quizInfo}>
              <Text style={styles.quizTitle}>Tester vos connaissances</Text>
              <Text style={styles.quizSubtitle}>{course.quizzes.length} questions</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={course.color} />
          </TouchableOpacity>
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
    paddingTop: 8,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  courseInfo: {
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 12,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1F2937',
    marginBottom: 8,
  },
  description: {
    fontSize: 15,
    color: '#6B7280',
    lineHeight: 22,
    marginBottom: 16,
  },
  metaRow: {
    flexDirection: 'row',
    gap: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 13,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  progressSection: {
    marginHorizontal: 20,
    marginTop: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  progressTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1F2937',
  },
  progressPercent: {
    fontSize: 15,
    fontWeight: '700',
  },
  progressBarBg: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  },
  progressDetail: {
    fontSize: 13,
    color: '#9CA3AF',
    marginTop: 8,
  },
  continueButton: {
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 16,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 10,
    flex: 1,
  },
  continueButtonMeta: {
    color: '#FFFFFFAA',
    fontSize: 13,
  },
  section: {
    marginTop: 28,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 14,
  },
  lessonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  lessonNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  lessonNumberText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  lessonInfo: {
    flex: 1,
  },
  lessonTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  lessonTitleCompleted: {
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
  },
  lessonDuration: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  quizButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  quizIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  quizInfo: {
    flex: 1,
  },
  quizTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  quizSubtitle: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  bottomSpace: {
    height: 40,
  },
});
