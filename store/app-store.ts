import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';

export type Language = 'gurmukhi' | 'hindi' | 'english';

interface AppState {
    selectedLanguage: Language;
    autoScrollEnabled: boolean;
    autoScrollSpeed: number;
    malaCount: number;
    setLanguage: (language: Language) => void;
    setAutoScroll: (enabled: boolean) => void;
    setAutoScrollSpeed: (speed: number) => void;
    incrementMala: () => void;
    resetMala: () => void;
    loadPreferences: () => Promise<void>;
}

export const useAppStore = create<AppState>((set) => ({
    selectedLanguage: 'gurmukhi',
    autoScrollEnabled: false,
    autoScrollSpeed: 30,
    malaCount: 0,

    setLanguage: async (language) => {
        set({ selectedLanguage: language });
        await AsyncStorage.setItem('language', language);
    },

    setAutoScroll: (enabled) => {
        set({ autoScrollEnabled: enabled });
    },

    setAutoScrollSpeed: (speed) => {
        set({ autoScrollSpeed: speed });
    },

    incrementMala: async () => {
        set((state) => {
            const newCount = state.malaCount + 1;
            AsyncStorage.setItem('malaCount', newCount.toString());
            return { malaCount: newCount };
        });
    },

    resetMala: async () => {
        set({ malaCount: 0 });
        await AsyncStorage.setItem('malaCount', '0');
    },

    loadPreferences: async () => {
        try {
            const language = await AsyncStorage.getItem('language');
            const malaCount = await AsyncStorage.getItem('malaCount');

            if (language) {
                set({ selectedLanguage: language as Language });
            }
            if (malaCount) {
                set({ malaCount: parseInt(malaCount, 10) });
            }
        } catch (error) {
            console.error('Error loading preferences:', error);
        }
    },
}));
