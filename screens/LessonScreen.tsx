import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { courses } from '../data/courses';

export default function LessonScreen({ navigation, route }: any) {
  const { courseId, lessonId } = route.params;
  const course = courses.find(c => c.id === courseId);
  const lesson = course?.lessons.find(l => l.id === lessonId);
  const [completed, setCompleted] = useState(lesson?.completed || false);

  if (!course || !lesson) return null;

  const lessonIndex = course.lessons.findIndex(l => l.id === lessonId);
  const hasNext = lessonIndex < course.lessons.length - 1;
  const nextLesson = hasNext ? course.lessons[lessonIndex + 1] : null;

  const handleMarkComplete = () => {
    setCompleted(true);
    lesson.completed = true;
    course.completedLessons = course.lessons.filter(l => l.completed).length;
    course.progress = Math.round((course.completedLessons / course.totalLessons) * 100);
  };

  const handleNext = () => {
    if (nextLesson) {
      navigation.replace('Lesson', { courseId, lessonId: nextLesson.id });
    } else {
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#1F2937" />
        </TouchableOpacity>
        <View style={styles.headerProgress}>
          <Text style={styles.headerProgressText}>
            Leçon {lessonIndex + 1}/{course.totalLessons}
          </Text>
        </View>
        <View style={styles.backButton} />
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.lessonHeader}>
          <View style={[styles.categoryBadge, { backgroundColor: course.color + '18' }]}>
            <Text style={[styles.categoryText, { color: course.color }]}>{course.category}</Text>
          </View>
          <Text style={styles.title}>{lesson.title}</Text>
          <View style={styles.metaRow}>
            <Ionicons name="time-outline" size={14} color="#9CA3AF" />
            <Text style={styles.metaText}>{lesson.duration}</Text>
          </View>
        </View>

        <View style={styles.contentCard}>
          {lesson.content.split('\n\n').map((paragraph, idx) => (
            <View key={idx} style={styles.paragraphBlock}>
              {paragraph.startsWith('Exemple') || paragraph.startsWith('Dialogue') ? (
                <View style={styles.exampleBox}>
                  <Text style={styles.exampleLabel}>{paragraph.split(':')[0]}</Text>
                  <Text style={styles.exampleText}>{paragraph.split(':').slice(1).join(':')}</Text>
                </View>
              ) : paragraph.includes('→') || paragraph.includes('•') || /^\d+\./.test(paragraph) ? (
                <View style={styles.listBlock}>
                  {paragraph.split('\n').map((line, lIdx) => (
                    <Text key={lIdx} style={styles.listItem}>{line}</Text>
                  ))}
                </View>
              ) : (
                <Text style={styles.paragraph}>{paragraph}</Text>
              )}
            </View>
          ))}
        </View>

        <View style={styles.bottomSpace} />
      </ScrollView>

      <View style={styles.footer}>
        {!completed ? (
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: course.color }]}
            onPress={handleMarkComplete}
          >
            <Ionicons name="checkmark-circle-outline" size={22} color="#FFF" />
            <Text style={styles.actionButtonText}>Marquer comme terminé</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: course.color }]}
            onPress={handleNext}
          >
            <Text style={styles.actionButtonText}>
              {hasNext ? 'Leçon suivante' : 'Retour au cours'}
            </Text>
            <Ionicons name="arrow-forward" size={22} color="#FFF" />
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 4,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerProgress: {
    backgroundColor: '#E5E7EB',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  headerProgressText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6B7280',
  },
  container: {
    flex: 1,
  },
  lessonHeader: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 16,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 10,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1F2937',
    marginBottom: 8,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  contentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginHorizontal: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  paragraphBlock: {
    marginBottom: 16,
  },
  paragraph: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 26,
  },
  listBlock: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 14,
  },
  listItem: {
    fontSize: 15,
    color: '#374151',
    lineHeight: 24,
    marginBottom: 4,
  },
  exampleBox: {
    backgroundColor: '#F0FDF4',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#10B981',
  },
  exampleLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#059669',
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  exampleText: {
    fontSize: 15,
    color: '#374151',
    lineHeight: 24,
  },
  bottomSpace: {
    height: 100,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  actionButton: {
    borderRadius: 14,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
