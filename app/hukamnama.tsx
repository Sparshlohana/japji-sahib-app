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

    // Ensure date is always a human-readable string even if API returns nested objects
    const toReadableDate = (d: any): string => {
        if (!d) return new Date().toDateString();
        if (typeof d === 'string') return d;
        if (typeof d?.readable === 'string') return d.readable;
        if (typeof d?.full === 'string') return d.full;
        if (typeof d?.gregorian === 'string') return d.gregorian;
        // handle structures like {month, monthno, date, year, day}
        if (d?.day && d?.month && (d?.date || d?.dayno || d?.daynum) && d?.year) {
            const dayNum = d.date ?? d.dayno ?? d.daynum;
            return `${d.day}, ${dayNum} ${d.month} ${d.year}`;
        }
        // sometimes there's a nested gregorian object
        const g = d?.gregorian;
        if (g && typeof g === 'object') {
            const day = g.day || '';
            const dayNum = g.date ?? g.dayno ?? g.daynum ?? '';
            const month = g.month || '';
            const year = g.year || '';
            const parts = [day ? `${day},` : '', dayNum, month, year].filter(Boolean);
            const joined = parts.join(' ').trim();
            if (joined) return joined;
        }
        // final fallback
        try {
            const dt = new Date(d);
            if (!isNaN(dt.getTime())) return dt.toDateString();
        } catch { }
        return new Date().toDateString();
    };

    const fetchHukamnama = useCallback(async () => {
        try {
            // Primary source: GurbaniNow v2
            const resp = await fetch('https://api.gurbaninow.com/v2/hukamnama/today', {
                headers: { Accept: 'application/json' },
            });
            if (!resp.ok) throw new Error(`Primary API failed: ${resp.status}`);

            const data: any = await resp.json();
            console.log('Hukamnama response:', data);

            // Attempt to normalize multiple possible shapes
            // Shape A: { hukamnama: [{ line: { gurmukhi, translation: { english, hindi } }}, ...], date: { readable: '...' } }
            // Shape B: { shabads: [{ verses: [...] }], date: '...' } (fallback parsing)
            const lines: any[] = Array.isArray(data?.hukamnama)
                ? data.hukamnama
                : Array.isArray(data?.shabad)
                    ? data.shabad
                    : Array.isArray(data?.shabads)
                        ? data.shabads.flatMap((s: any) => s?.verses || s?.lines || [])
                        : Array.isArray(data?.verses)
                            ? data.verses
                            : [];

            const pickFirstString = (obj: any): string | undefined => {
                if (!obj) return undefined;
                if (typeof obj === 'string') return obj;
                for (const key of Object.keys(obj)) {
                    const val = obj[key];
                    if (typeof val === 'string' && val.trim()) return val;
                }
                return undefined;
            };

            const extractLine = (item: any) => {
                const line = item?.line || item; // sometimes the item itself is the line
                const gm =
                    line?.gurmukhi?.unicode ||
                    line?.gurmukhi?.akhar ||
                    line?.gurmukhi?.text ||
                    line?.gurmukhi ||
                    line?.unicode ||
                    line?.akhar ||
                    '';
                const tr = line?.translation || {};
                const en =
                    (typeof tr?.english === 'string' ? tr.english : pickFirstString(tr?.english)) ||
                    tr?.en ||
                    tr?.sant_singh_english ||
                    line?.transliteration?.english ||
                    '';
                const hi =
                    (typeof tr?.hindi === 'string' ? tr.hindi : pickFirstString(tr?.hindi)) ||
                    tr?.hi ||
                    '';
                return { gm, en, hi };
            };

            const parsed = lines.map(extractLine).filter((x) => x.gm || x.en || x.hi);

            if (!parsed.length) throw new Error('Primary API returned no parsable lines');

            const hukam: HukamnamaData = {
                gurmukhi: parsed.map((l) => l.gm).filter(Boolean).join('\n'),
                english: parsed.map((l) => l.en).filter(Boolean).join('\n'),
                hindi: parsed.map((l) => l.hi).filter(Boolean).join('\n'),
                date: toReadableDate(data?.date),
            };

            setHukamnama(hukam);
            await AsyncStorage.setItem('hukamnama', JSON.stringify(hukam));
            await AsyncStorage.setItem('hukamnama_cached_for', new Date().toDateString());

            setIsLoading(false);
            setRefreshing(false);
        } catch (primaryErr) {
            console.warn('Primary hukamnama API failed, trying fallback...', primaryErr);

            try {
                // Fallback source: BaniDB
                const resp2 = await fetch('https://api.banidb.com/v2/hukamnamas/today');
                if (!resp2.ok) throw new Error(`Fallback API failed: ${resp2.status}`);
                const data2: any = await resp2.json();

                // Expecting something like { hukamnama: { lines: [{ gurmukhi: { text }, translations: { en, hi } }] } }
                const lines2: any[] = data2?.hukamnama?.lines || data2?.lines || [];
                const parsed2 = lines2
                    .map((ln) => {
                        const gm = ln?.gurmukhi?.text || ln?.gurmukhi || '';
                        // Prefer Sant Singh English if present
                        const en =
                            ln?.translation?.english ||
                            ln?.translations?.english ||
                            (Array.isArray(ln?.translations)
                                ? ln.translations.find((t: any) => t?.language === 'en' || t?.english)?.text
                                : '') ||
                            '';
                        const hi =
                            ln?.translation?.hindi ||
                            ln?.translations?.hindi ||
                            (Array.isArray(ln?.translations)
                                ? ln.translations.find((t: any) => t?.language === 'hi' || t?.hindi)?.text
                                : '') ||
                            '';
                        return { gm, en, hi };
                    })
                    .filter((x) => x.gm || x.en || x.hi);

                if (!parsed2.length) throw new Error('Fallback API returned no parsable lines');

                const hukam: HukamnamaData = {
                    gurmukhi: parsed2.map((l) => l.gm).filter(Boolean).join('\n'),
                    english: parsed2.map((l) => l.en).filter(Boolean).join('\n'),
                    hindi: parsed2.map((l) => l.hi).filter(Boolean).join('\n'),
                    date: toReadableDate(data2?.date),
                };

                setHukamnama(hukam);
                await AsyncStorage.setItem('hukamnama', JSON.stringify(hukam));
                await AsyncStorage.setItem('hukamnama_cached_for', new Date().toDateString());

                setIsLoading(false);
                setRefreshing(false);
            } catch (fallbackErr) {
                console.error('Error fetching hukamnama from all sources:', fallbackErr);
                setIsLoading(false);
                setRefreshing(false);
            }
        }
    }, []);

    const loadHukamnama = useCallback(async () => {
        try {
            // Try to load cached hukamnama
            const cached = await AsyncStorage.getItem('hukamnama');
            const cacheDate = await AsyncStorage.getItem('hukamnama_cached_for');
            const today = new Date().toDateString();

            if (cached && cacheDate === today) {
                const parsed: any = JSON.parse(cached);
                // Sanitize cached date if it's an object or invalid
                if (parsed && typeof parsed.date !== 'string') {
                    parsed.date = toReadableDate(parsed.date);
                    await AsyncStorage.setItem('hukamnama', JSON.stringify(parsed));
                }
                setHukamnama(parsed);
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
                    {hukamnama ? (
                        <>
                            <Text style={[styles.title, { color: colors.gold }]}>Daily Hukamnama</Text>
                            <Text style={[styles.date, { color: colors.textSecondary }]}>{String(hukamnama.date)}</Text>

                            {hukamnama.gurmukhi?.trim() ? (
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
                            ) : null}

                            {hukamnama.hindi?.trim() ? (
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
                            ) : null}

                            {hukamnama.english?.trim() ? (
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
                            ) : null}

                            <View style={styles.footer}>
                                <Text style={[styles.footerText, { color: colors.gold }]}>ਵਾਹਿਗੁਰੂ ਜੀ ਕਾ ਖਾਲਸਾ</Text>
                                <Text style={[styles.footerText, { color: colors.gold }]}>ਵਾਹਿਗੁਰੂ ਜੀ ਕੀ ਫਤਿਹ</Text>
                            </View>
                        </>
                    ) : (
                        <View style={[styles.section, { backgroundColor: colors.card }]}>
                            <Text style={[styles.sectionTitle, { color: colors.gold }]}>Unable to load</Text>
                            <Text style={[styles.text, { color: colors.text }]}>Please check your connection and pull to refresh.</Text>
                        </View>
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
