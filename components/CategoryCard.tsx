import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface CategoryCardProps {
  name: string;
  icon: string;
  color: string;
  courseCount: number;
  onPress: () => void;
}

export default function CategoryCard({ name, icon, color, courseCount, onPress }: CategoryCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <View style={[styles.iconContainer, { backgroundColor: color + '18' }]}>
        <Ionicons name={icon as any} size={24} color={color} />
      </View>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.count}>{courseCount} cours</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginRight: 12,
    width: 130,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  iconContainer: {
    width: 52,
    height: 52,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 4,
  },
  count: {
    fontSize: 12,
    color: '#9CA3AF',
  },
});
