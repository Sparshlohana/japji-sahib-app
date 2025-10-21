import { useTheme } from '@/contexts/theme-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

interface HukamnamaData {
    gurmukhi: string;
    hindi: string;
    english: string;
    date: string;
}

export default function HukamnamaScreen() {
    const { colors, isDarkMode, fontSize, fontSizes } = useTheme();
    const [hukamnama, setHukamnama] = useState<HukamnamaData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const gradientColors: [string, string] = isDarkMode
        ? ['#000000', '#1A1A1A']
        : ['#FFFFFF', '#FFFAF0'];

    useEffect(() => {
        loadHukamnama();
    }, []);

    const loadHukamnama = async () => {
        try {
            // Try to load cached hukamnama
            const cached = await AsyncStorage.getItem('hukamnama');
            const cacheDate = await AsyncStorage.getItem('hukamnama_date');
            const today = new Date().toDateString();

            if (cached && cacheDate === today) {
                setHukamnama(JSON.parse(cached));
                setIsLoading(false);
                return;
            }

            // Fetch new hukamnama
            await fetchHukamnama();
        } catch (error) {
            console.error('Error loading hukamnama:', error);
            setIsLoading(false);
        }
    };

    const fetchHukamnama = async () => {
        try {
            // Note: Replace with actual API endpoint
            // Example: https://api.gurbaninow.com/v2/hukamnama/today

            // For now, using sample data
            const sampleData: HukamnamaData = {
                gurmukhi: 'ਸਲੋਕੁ ॥\nਨਾਨਕ ਨਾਮੁ ਨ ਚੇਤਸੀ ਜਮੁ ਆਵਸੀ ਤੇ ਮੁਹਤਿ ॥\nਤਾ ਮੁਖੁ ਫਿਕਾ ਪਛੁਤਾਹਿ ਜਾ ਜਮ ਪਕੜਿ ਚਲਾਇਆ ॥੧॥',
                hindi: 'श्लोक ॥\nनानक नामु न चेतसी जमु आवसी ते मुहति ॥\nता मुखु फिका पछुताहि जा जम पकड़ि चलाइआ ॥१॥',
                english: 'Salok:\nNanak, those who do not remember the Naam, the Name of the Lord, at that time, the Messenger of Death comes.\nThen, their faces turn pale, and they regret, when the Messenger of Death seizes them and leads them away. ||1||',
                date: new Date().toDateString(),
            };

            setHukamnama(sampleData);

            // Cache the hukamnama
            await AsyncStorage.setItem('hukamnama', JSON.stringify(sampleData));
            await AsyncStorage.setItem('hukamnama_date', sampleData.date);

            setIsLoading(false);
            setRefreshing(false);
        } catch (error) {
            console.error('Error fetching hukamnama:', error);
            setIsLoading(false);
            setRefreshing(false);
        }
    };

    const onRefresh = () => {
        setRefreshing(true);
        fetchHukamnama();
    };

    if (isLoading) {
        return (
            <>
                <Stack.Screen
                    options={{
                        headerShown: true,
                        title: 'Daily Hukamnama',
                        headerStyle: { backgroundColor: colors.primary },
                        headerTintColor: '#fff',
                    }}
                />
                <LinearGradient colors={gradientColors} style={styles.container}>
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color={colors.gold} />
                        <Text style={[styles.loadingText, { color: colors.text }]}>
                            Loading Hukamnama...
                        </Text>
                    </View>
                </LinearGradient>
            </>
        );
    }

    return (
        <>
            <Stack.Screen
                options={{
                    headerShown: true,
                    title: 'Daily Hukamnama',
                    headerStyle: { backgroundColor: colors.primary },
                    headerTintColor: '#fff',
                }}
            />
            <LinearGradient colors={gradientColors} style={styles.container}>
                <ScrollView
                    contentContainerStyle={styles.content}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            tintColor={colors.gold}
                        />
                    }
                >
                    {hukamnama && (
                        <>
                            <Text style={[styles.title, { color: colors.gold }]}>
                                Daily Hukamnama
                            </Text>
                            <Text style={[styles.date, { color: colors.textSecondary }]}>
                                {hukamnama.date}
                            </Text>

                            <View
                                style={[styles.section, { backgroundColor: colors.card }]}
                            >
                                <Text style={[styles.sectionTitle, { color: colors.gold }]}>
                                    ਗੁਰਮੁਖੀ
                                </Text>
                                <Text
                                    style={[
                                        styles.text,
                                        {
                                            color: colors.text,
                                            fontSize: fontSizes[fontSize],
                                            lineHeight: fontSizes[fontSize] * 1.6,
                                        },
                                    ]}
                                >
                                    {hukamnama.gurmukhi}
                                </Text>
                            </View>

                            <View
                                style={[styles.section, { backgroundColor: colors.card }]}
                            >
                                <Text style={[styles.sectionTitle, { color: colors.gold }]}>
                                    हिंदी
                                </Text>
                                <Text
                                    style={[
                                        styles.text,
                                        {
                                            color: colors.text,
                                            fontSize: fontSizes[fontSize],
                                            lineHeight: fontSizes[fontSize] * 1.6,
                                        },
                                    ]}
                                >
                                    {hukamnama.hindi}
                                </Text>
                            </View>

                            <View
                                style={[styles.section, { backgroundColor: colors.card }]}
                            >
                                <Text style={[styles.sectionTitle, { color: colors.gold }]}>
                                    English Translation
                                </Text>
                                <Text
                                    style={[
                                        styles.text,
                                        {
                                            color: colors.text,
                                            fontSize: fontSizes[fontSize],
                                            lineHeight: fontSizes[fontSize] * 1.6,
                                        },
                                    ]}
                                >
                                    {hukamnama.english}
                                </Text>
                            </View>

                            <View style={styles.footer}>
                                <Text style={[styles.footerText, { color: colors.gold }]}>
                                    ਵਾਹਿਗੁਰੂ ਜੀ ਕਾ ਖਾਲਸਾ
                                </Text>
                                <Text style={[styles.footerText, { color: colors.gold }]}>
                                    ਵਾਹਿਗੁਰੂ ਜੀ ਕੀ ਫਤਿਹ
                                </Text>
                            </View>
                        </>
                    )}
                </ScrollView>
            </LinearGradient>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,
    },
    loadingText: {
        fontSize: 16,
    },
    content: {
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 8,
    },
    date: {
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 30,
    },
    section: {
        padding: 20,
        borderRadius: 12,
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 12,
    },
    text: {
        textAlign: 'left',
    },
    footer: {
        alignItems: 'center',
        paddingVertical: 30,
        marginTop: 20,
    },
    footerText: {
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 4,
    },
});
