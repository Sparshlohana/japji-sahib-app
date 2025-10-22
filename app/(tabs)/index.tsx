import { useTheme } from '@/contexts/theme-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const router = useRouter();
  const { colors, isDarkMode } = useTheme();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  const gradientColors: [string, string, string] = isDarkMode
    ? ['#000000', '#1A1A1A', '#2A2A2A']
    : ['#FFFFFF', '#FFFAF0', '#FFF8DC'];

  // Responsive padding based on screen width
  const horizontalPadding = Math.max(20, Math.min(width * 0.05, 40));
  const isSmallScreen = width < 360;

  return (
    <LinearGradient colors={gradientColors} style={styles.container}>
      <ScrollView contentContainerStyle={[styles.scrollContent, { paddingHorizontal: horizontalPadding, paddingBottom: insets.bottom + 20 }]}>
        {/* Khanda Icon */}
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons
            name="khanda"
            size={isSmallScreen ? 60 : 80}
            color={colors.gold}
          />
        </View>

        {/* Title */}
        <Text style={[styles.title, { color: colors.text, fontSize: isSmallScreen ? 28 : 36 }]}>
          ਸ਼੍ਰੀ ਜਪੁਜੀ ਸਾਹਿਬ
        </Text>
        <Text style={[styles.subtitle, { color: colors.gold, fontSize: isSmallScreen ? 20 : 24 }]}>
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
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginTop: 20,
    marginBottom: 20,
    padding: 20,
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 40,
    fontWeight: '600',
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 400,
    gap: 16,
    marginBottom: 30,
    paddingHorizontal: 10,
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
    minHeight: 60,
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
    paddingHorizontal: 10,
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    gap: 8,
    minWidth: '45%',
    flex: 1,
    maxWidth: 180,
    minHeight: 50,
  },
  secondaryText: {
    fontSize: 14,
    fontWeight: '500',
    flexShrink: 1,
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
