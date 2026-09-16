import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Course } from '../data/courses';

interface CourseCardProps {
  course: Course;
  onPress: () => void;
}

export default function CourseCard({ course, onPress }: CourseCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <View style={[styles.colorStrip, { backgroundColor: course.color }]} />
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={[styles.badge, { backgroundColor: course.color + '20' }]}>
            <Text style={[styles.badgeText, { color: course.color }]}>{course.category}</Text>
          </View>
          <Text style={styles.level}>{course.level}</Text>
        </View>
        
        <Text style={styles.title}>{course.title}</Text>
        <Text style={styles.description} numberOfLines={2}>{course.description}</Text>
        
        <View style={styles.footer}>
          <View style={styles.progressContainer}>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBar, { width: `${course.progress}%`, backgroundColor: course.color }]} />
            </View>
            <Text style={styles.progressText}>{course.progress}%</Text>
          </View>
          
          <View style={styles.meta}>
            <Ionicons name="book-outline" size={14} color="#9CA3AF" />
            <Text style={styles.metaText}>{course.completedLessons}/{course.totalLessons} leçons</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 12,
    overflow: 'hidden',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  colorStrip: {
    width: 5,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  level: {
    fontSize: 11,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 6,
  },
  description: {
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 19,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 12,
  },
  progressBarBg: {
    flex: 1,
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    overflow: 'hidden',
    marginRight: 8,
  },
  progressBar: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
    minWidth: 30,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 12,
    color: '#9CA3AF',
    marginLeft: 4,
  },
});
