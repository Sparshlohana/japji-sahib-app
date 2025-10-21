import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { ThemeProvider } from '@/contexts/theme-context';
import { useAppStore } from '@/store/app-store';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const loadPreferences = useAppStore((state) => state.loadPreferences);

  useEffect(() => {
    loadPreferences();
  }, [loadPreferences]);

  return (
    <ThemeProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="read-path" options={{ title: 'Read Path' }} />
        <Stack.Screen name="hukamnama" options={{ title: 'Daily Hukamnama' }} />
        <Stack.Screen name="settings" options={{ title: 'Settings' }} />
        <Stack.Screen name="about" options={{ title: 'About' }} />
        <Stack.Screen name="mala-counter" options={{ title: 'Mala Counter', presentation: 'modal' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
