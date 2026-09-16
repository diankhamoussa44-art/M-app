import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [soundEffects, setSoundEffects] = useState(true);

  const menuItems = [
    { icon: 'person-outline', label: 'Modifier le profil', color: '#6366F1' },
    { icon: 'shield-checkmark-outline', label: 'Confidentialité', color: '#10B981' },
    { icon: 'language-outline', label: 'Langue', value: 'Français', color: '#F59E0B' },
    { icon: 'help-circle-outline', label: 'Aide & Support', color: '#EF4444' },
    { icon: 'document-text-outline', label: 'Conditions d\'utilisation', color: '#6B7280' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profil</Text>
        </View>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>É</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Élève Actif</Text>
            <Text style={styles.profileEmail}>eleve@education.fr</Text>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Ionicons name="create-outline" size={20} color="#6366F1" />
          </TouchableOpacity>
        </View>

        {/* Preferences */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Préférences</Text>
          <View style={styles.preferenceCard}>
            <View style={styles.preferenceRow}>
              <View style={styles.prefLeft}>
                <View style={[styles.prefIcon, { backgroundColor: '#F5F3FF' }]}>
                  <Ionicons name="notifications-outline" size={20} color="#6366F1" />
                </View>
                <Text style={styles.prefLabel}>Notifications</Text>
              </View>
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                trackColor={{ false: '#E5E7EB', true: '#C7D2FE' }}
                thumbColor={notifications ? '#6366F1' : '#9CA3AF'}
              />
            </View>
            <View style={styles.divider} />
            <View style={styles.preferenceRow}>
              <View style={styles.prefLeft}>
                <View style={[styles.prefIcon, { backgroundColor: '#F0FDF4' }]}>
                  <Ionicons name="moon-outline" size={20} color="#10B981" />
                </View>
                <Text style={styles.prefLabel}>Mode sombre</Text>
              </View>
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                trackColor={{ false: '#E5E7EB', true: '#C7D2FE' }}
                thumbColor={darkMode ? '#6366F1' : '#9CA3AF'}
              />
            </View>
            <View style={styles.divider} />
            <View style={styles.preferenceRow}>
              <View style={styles.prefLeft}>
                <View style={[styles.prefIcon, { backgroundColor: '#FEF3C7' }]}>
                  <Ionicons name="volume-high-outline" size={20} color="#F59E0B" />
                </View>
                <Text style={styles.prefLabel}>Effets sonores</Text>
              </View>
              <Switch
                value={soundEffects}
                onValueChange={setSoundEffects}
                trackColor={{ false: '#E5E7EB', true: '#C7D2FE' }}
                thumbColor={soundEffects ? '#6366F1' : '#9CA3AF'}
              />
            </View>
          </View>
        </View>

        {/* Menu */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Paramètres</Text>
          <View style={styles.menuCard}>
            {menuItems.map((item, index) => (
              <TouchableOpacity key={index} style={styles.menuItem} activeOpacity={0.7}>
                <View style={styles.menuLeft}>
                  <View style={[styles.menuIcon, { backgroundColor: item.color + '15' }]}>
                    <Ionicons name={item.icon as any} size={20} color={item.color} />
                  </View>
                  <Text style={styles.menuLabel}>{item.label}</Text>
                </View>
                <View style={styles.menuRight}>
                  {item.value && <Text style={styles.menuValue}>{item.value}</Text>}
                  <Ionicons name="chevron-forward" size={18} color="#D1D5DB" />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Version */}
        <View style={styles.versionSection}>
          <Text style={styles.versionText}>EduApp v1.0.0</Text>
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
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginHorizontal: 20,
    marginTop: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 20,
    backgroundColor: '#6366F1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
  },
  profileEmail: {
    fontSize: 14,
    color: '#9CA3AF',
    marginTop: 2,
  },
  editButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
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
  preferenceCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  preferenceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  prefLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  prefIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  prefLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: '#374151',
    marginLeft: 12,
  },
  divider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginHorizontal: 16,
  },
  menuCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: '#374151',
    marginLeft: 12,
  },
  menuRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuValue: {
    fontSize: 14,
    color: '#9CA3AF',
    marginRight: 4,
  },
  versionSection: {
    marginTop: 32,
    alignItems: 'center',
  },
  versionText: {
    fontSize: 13,
    color: '#D1D5DB',
  },
  bottomSpace: {
    height: 32,
  },
});
