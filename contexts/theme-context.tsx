import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

export type FontSize = 'small' | 'medium' | 'large' | 'xlarge';

interface ThemeContextType {
    isDarkMode: boolean;
    fontSize: FontSize;
    toggleDarkMode: () => void;
    setFontSize: (size: FontSize) => void;
    colors: {
        primary: string;
        secondary: string;
        background: string;
        text: string;
        textSecondary: string;
        card: string;
        border: string;
        gold: string;
    };
    fontSizes: {
        small: number;
        medium: number;
        large: number;
        xlarge: number;
    };
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const lightColors = {
    primary: '#D4AF37',
    secondary: '#FFF8DC',
    background: '#FFFFFF',
    text: '#1A1A1A',
    textSecondary: '#666666',
    card: '#FFFAF0',
    border: '#E5E5E5',
    gold: '#D4AF37',
};

const darkColors = {
    primary: '#D4AF37',
    secondary: '#2A2A2A',
    background: '#000000',
    text: '#D4AF37',
    textSecondary: '#B8B8B8',
    card: '#1A1A1A',
    border: '#333333',
    gold: '#FFD700',
};

const fontSizes = {
    small: 14,
    medium: 18,
    large: 22,
    xlarge: 26,
};

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [fontSize, setFontSizeState] = useState<FontSize>('medium');

    useEffect(() => {
        loadPreferences();
    }, []);

    const loadPreferences = async () => {
        try {
            const darkMode = await AsyncStorage.getItem('darkMode');
            const savedFontSize = await AsyncStorage.getItem('fontSize');

            if (darkMode !== null) {
                setIsDarkMode(darkMode === 'true');
            }
            if (savedFontSize !== null) {
                setFontSizeState(savedFontSize as FontSize);
            }
        } catch (error) {
            console.error('Error loading preferences:', error);
        }
    };

    const toggleDarkMode = async () => {
        const newValue = !isDarkMode;
        setIsDarkMode(newValue);
        try {
            await AsyncStorage.setItem('darkMode', newValue.toString());
        } catch (error) {
            console.error('Error saving dark mode preference:', error);
        }
    };

    const setFontSize = async (size: FontSize) => {
        setFontSizeState(size);
        try {
            await AsyncStorage.setItem('fontSize', size);
        } catch (error) {
            console.error('Error saving font size preference:', error);
        }
    };

    const value: ThemeContextType = {
        isDarkMode,
        fontSize,
        toggleDarkMode,
        setFontSize,
        colors: isDarkMode ? darkColors : lightColors,
        fontSizes,
    };

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
