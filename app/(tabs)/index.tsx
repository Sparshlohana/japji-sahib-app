import { useTheme } from '@/contexts/theme-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();
  const { colors, isDarkMode } = useTheme();

  const gradientColors: [string, string, string] = isDarkMode
    ? ['#000000', '#1A1A1A', '#2A2A2A']
    : ['#FFFFFF', '#FFFAF0', '#FFF8DC'];

  return (
    <LinearGradient colors={gradientColors} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Khanda Icon */}
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons
            name="khanda"
            size={80}
            color={colors.gold}
          />
        </View>

        {/* Title */}
        <Text style={[styles.title, { color: colors.text }]}>
          ਸ਼੍ਰੀ ਜਪੁਜੀ ਸਾਹਿਬ
        </Text>
        <Text style={[styles.subtitle, { color: colors.gold }]}>
          Shri Japji Sahib
        </Text>

        {/* Main Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.mainButton, { backgroundColor: colors.card, borderColor: colors.gold }]}
            onPress={() => router.push('/read-path')}
          >
            <Ionicons name="book" size={32} color={colors.gold} />
            <Text style={[styles.buttonText, { color: colors.text }]}>📖 Read Path</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.mainButton, { backgroundColor: colors.card, borderColor: colors.gold }]}
            onPress={() => router.push('/listen-path')}
          >
            <Ionicons name="headset" size={32} color={colors.gold} />
            <Text style={[styles.buttonText, { color: colors.text }]}>🎧 Listen Path</Text>
          </TouchableOpacity>
        </View>

        {/* Secondary Options */}
        <View style={styles.secondaryContainer}>
          <TouchableOpacity
            style={[styles.secondaryButton, { backgroundColor: colors.card, borderColor: colors.border }]}
            onPress={() => router.push('/hukamnama')}
          >
            <MaterialCommunityIcons name="newspaper-variant" size={24} color={colors.gold} />
            <Text style={[styles.secondaryText, { color: colors.text }]}>Daily Hukamnama</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.secondaryButton, { backgroundColor: colors.card, borderColor: colors.border }]}
            onPress={() => router.push('/mala-counter')}
          >
            <MaterialCommunityIcons name="beaker" size={24} color={colors.gold} />
            <Text style={[styles.secondaryText, { color: colors.text }]}>Mala Counter</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.secondaryButton, { backgroundColor: colors.card, borderColor: colors.border }]}
            onPress={() => router.push('/settings')}
          >
            <Ionicons name="settings" size={24} color={colors.gold} />
            <Text style={[styles.secondaryText, { color: colors.text }]}>Settings</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.secondaryButton, { backgroundColor: colors.card, borderColor: colors.border }]}
            onPress={() => router.push('/about')}
          >
            <Ionicons name="information-circle" size={24} color={colors.gold} />
            <Text style={[styles.secondaryText, { color: colors.text }]}>About</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: colors.gold }]}>
            ਵਾਹਿਗੁਰੂ ਜੀ ਕਾ ਖਾਲਸਾ
          </Text>
          <Text style={[styles.footerText, { color: colors.gold }]}>
            ਵਾਹਿਗੁਰੂ ਜੀ ਕੀ ਫਤਿਹ
          </Text>
          <Text style={[styles.footerSubtext, { color: colors.textSecondary }]}>
            Waheguru Ji Ka Khalsa, Waheguru Ji Ki Fateh
          </Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginTop: 40,
    marginBottom: 20,
    padding: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 40,
    fontWeight: '600',
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 400,
    gap: 16,
    marginBottom: 30,
  },
  mainButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderRadius: 16,
    borderWidth: 2,
    gap: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '600',
  },
  secondaryContainer: {
    width: '100%',
    maxWidth: 400,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'center',
    marginBottom: 40,
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    gap: 8,
    minWidth: '45%',
  },
  secondaryText: {
    fontSize: 14,
    fontWeight: '500',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  footerText: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 4,
  },
  footerSubtext: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 8,
  },
});
