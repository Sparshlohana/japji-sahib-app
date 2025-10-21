import { useTheme } from '@/contexts/theme-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
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

    const fetchHukamnama = useCallback(async () => {
        try {
            // Note: Replace with actual API endpoint
            // Example: https://api.gurbaninow.com/v2/hukamnama/today

            // For now, using sample data
            const sampleData: HukamnamaData = {
                gurmukhi:
                    '\u0a38\u0a32\u0a4b\u0a15\u0a41 \u0965\\n\u0a28\u0a3e\u0a28\u0a15 \u0a28\u0a3e\u0a2e\u0a41 \u0a28 \u0a1a\u0a47\u0a24\u0a38\u0a40 \u0a1c\u0a2e\u0a41 \u0a06\u0a35\u0a38\u0a40 \u0a24\u0a47 \u0a2e\u0a41\u0a39\u0a24\u0a3f \u0965\\n\u0a24\u0a3e \u0a2e\u0a41\u0a16\u0a41 \u0a2b\u0a3f\u0a15\u0a3e \u0a2a\u0a1b\u0a41\u0a24\u0a3e\u0a39\u0a3f \u0a1c\u0a3e \u0a1c\u0a2e \u0a2a\u0a15\u0a5c\u0a3f \u0a1a\u0a32\u0a3e\u0a07\u0a06 \u0965\u0a67\u0965',
                hindi:
                    '\u0936\u094d\u0932\u094b\u0915 \u0965\\n\u0928\u093e\u0928\u0915 \u0928\u093e\u092e\u0941 \u0928 \u091a\u0947\u0924\u0938\u0940 \u091c\u092e\u0941 \u0906\u0935\u0938\u0940 \u0924\u0947 \u092e\u0941\u0939\u0924\u093f \u0965\\n\u0924\u093e \u092e\u0941\u0916\u0941 \u092b\u093f\u0915\u093e \u092a\u091b\u0941\u0924\u093e\u0939\u093f \u091c\u093e \u091c\u092e \u092a\u0915\u0921\u093c\u093f \u091a\u0932\u093e\u0907\u0906 \u0965\u0967\u0965',
                english:
                    'Salok:\nNanak, those who do not remember the Naam, the Name of the Lord, at that time, the Messenger of Death comes.\nThen, their faces turn pale, and they regret, when the Messenger of Death seizes them and leads them away. ||1||',
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
    }, []);

    const loadHukamnama = useCallback(async () => {
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
    }, [fetchHukamnama]);

    useEffect(() => {
        loadHukamnama();
    }, [loadHukamnama]);

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
                        <Text style={[styles.loadingText, { color: colors.text }]}>Loading Hukamnama...</Text>
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
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.gold} />
                    }
                >
                    {hukamnama && (
                        <>
                            <Text style={[styles.title, { color: colors.gold }]}>Daily Hukamnama</Text>
                            <Text style={[styles.date, { color: colors.textSecondary }]}>{hukamnama.date}</Text>

                            <View style={[styles.section, { backgroundColor: colors.card }]}>
                                <Text style={[styles.sectionTitle, { color: colors.gold }]}>ਗੁਰਮੁਖੀ</Text>
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

                            <View style={[styles.section, { backgroundColor: colors.card }]}>
                                <Text style={[styles.sectionTitle, { color: colors.gold }]}>हिंदी</Text>
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

                            <View style={[styles.section, { backgroundColor: colors.card }]}>
                                <Text style={[styles.sectionTitle, { color: colors.gold }]}>English Translation</Text>
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
                                <Text style={[styles.footerText, { color: colors.gold }]}>ਵਾਹਿਗੁਰੂ ਜੀ ਕਾ ਖਾਲਸਾ</Text>
                                <Text style={[styles.footerText, { color: colors.gold }]}>ਵਾਹਿਗੁਰੂ ਜੀ ਕੀ ਫਤਿਹ</Text>
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
