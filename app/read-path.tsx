import { useTheme } from '@/contexts/theme-context';
import japjiSahibData from '@/data/japji-sahib.json';
import { useAppStore } from '@/store/app-store';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function ReadPathScreen() {
    const { colors, isDarkMode, fontSize, fontSizes } = useTheme();
    const { selectedLanguage, setLanguage, autoScrollEnabled, setAutoScroll } = useAppStore();
    const [showControls, setShowControls] = useState(true);
    const scrollViewRef = useRef<ScrollView>(null);
    const scrollY = useRef(0);
    const autoScrollInterval = useRef<NodeJS.Timeout | null>(null);

    const gradientColors: [string, string] = isDarkMode
        ? ['#000000', '#1A1A1A']
        : ['#FFFFFF', '#FFFAF0'];

    useEffect(() => {
        if (autoScrollEnabled) {
            autoScrollInterval.current = setInterval(() => {
                scrollViewRef.current?.scrollTo({
                    y: scrollY.current + 1,
                    animated: true,
                });
            }, 50);
        } else {
            if (autoScrollInterval.current) {
                clearInterval(autoScrollInterval.current);
            }
        }

        return () => {
            if (autoScrollInterval.current) {
                clearInterval(autoScrollInterval.current);
            }
        };
    }, [autoScrollEnabled]);

    const handleScroll = (event: any) => {
        scrollY.current = event.nativeEvent.contentOffset.y;
    };

    const renderVerse = (verse: any, index: number) => {
        let text = '';
        if (selectedLanguage === 'gurmukhi') {
            text = verse.gurmukhi;
        } else if (selectedLanguage === 'hindi') {
            text = verse.hindi;
        } else {
            text = verse.english;
        }

        return (
            <View key={verse.id} style={[styles.verseContainer, { borderColor: colors.border }]}>
                <Text style={[styles.verseNumber, { color: colors.gold }]}>
                    {verse.type === 'mool_mantar' ? 'Mool Mantar' : `Pauri ${verse.number}`}
                </Text>
                <Text
                    style={[
                        styles.verseText,
                        {
                            color: colors.text,
                            fontSize: fontSizes[fontSize],
                            lineHeight: fontSizes[fontSize] * 1.6,
                        },
                    ]}
                >
                    {text}
                </Text>
            </View>
        );
    };

    return (
        <>
            <Stack.Screen
                options={{
                    headerShown: true,
                    title: 'Read Path',
                    headerStyle: { backgroundColor: colors.primary },
                    headerTintColor: '#fff',
                }}
            />
            <LinearGradient colors={gradientColors} style={styles.container}>
                {/* Language Tabs */}
                <View style={[styles.tabContainer, { backgroundColor: colors.card }]}>
                    <TouchableOpacity
                        style={[
                            styles.tab,
                            selectedLanguage === 'gurmukhi' && {
                                backgroundColor: colors.gold,
                            },
                        ]}
                        onPress={() => setLanguage('gurmukhi')}
                    >
                        <Text
                            style={[
                                styles.tabText,
                                {
                                    color:
                                        selectedLanguage === 'gurmukhi' ? '#fff' : colors.text,
                                },
                            ]}
                        >
                            ਗੁਰਮੁਖੀ
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.tab,
                            selectedLanguage === 'hindi' && {
                                backgroundColor: colors.gold,
                            },
                        ]}
                        onPress={() => setLanguage('hindi')}
                    >
                        <Text
                            style={[
                                styles.tabText,
                                {
                                    color: selectedLanguage === 'hindi' ? '#fff' : colors.text,
                                },
                            ]}
                        >
                            हिंदी
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.tab,
                            selectedLanguage === 'english' && {
                                backgroundColor: colors.gold,
                            },
                        ]}
                        onPress={() => setLanguage('english')}
                    >
                        <Text
                            style={[
                                styles.tabText,
                                {
                                    color:
                                        selectedLanguage === 'english' ? '#fff' : colors.text,
                                },
                            ]}
                        >
                            English
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Controls */}
                {showControls && (
                    <View style={[styles.controlsContainer, { backgroundColor: colors.card }]}>
                        <View style={styles.controlRow}>
                            <Text style={[styles.controlLabel, { color: colors.text }]}>
                                Auto Scroll
                            </Text>
                            <Switch
                                value={autoScrollEnabled}
                                onValueChange={setAutoScroll}
                                trackColor={{ false: colors.border, true: colors.gold }}
                                thumbColor={autoScrollEnabled ? '#fff' : '#f4f3f4'}
                            />
                        </View>
                    </View>
                )}

                {/* Content */}
                <ScrollView
                    ref={scrollViewRef}
                    style={styles.scrollView}
                    contentContainerStyle={styles.content}
                    onScroll={handleScroll}
                    scrollEventThrottle={16}
                >
                    <Text style={[styles.title, { color: colors.gold }]}>
                        {japjiSahibData.title}
                    </Text>

                    {japjiSahibData.verses.map((verse, index) =>
                        renderVerse(verse, index)
                    )}

                    {/* Footer */}
                    <View style={styles.footer}>
                        <Text style={[styles.footerText, { color: colors.gold }]}>
                            ਵਾਹਿਗੁਰੂ ਜੀ ਕਾ ਖਾਲਸਾ
                        </Text>
                        <Text style={[styles.footerText, { color: colors.gold }]}>
                            ਵਾਹਿਗੁਰੂ ਜੀ ਕੀ ਫਤਿਹ
                        </Text>
                    </View>
                </ScrollView>

                {/* Toggle Controls Button */}
                <TouchableOpacity
                    style={[styles.toggleButton, { backgroundColor: colors.gold }]}
                    onPress={() => setShowControls(!showControls)}
                >
                    <Ionicons
                        name={showControls ? 'chevron-up' : 'chevron-down'}
                        size={24}
                        color="#fff"
                    />
                </TouchableOpacity>
            </LinearGradient>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tabContainer: {
        flexDirection: 'row',
        padding: 8,
        gap: 8,
    },
    tab: {
        flex: 1,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    tabText: {
        fontSize: 16,
        fontWeight: '600',
    },
    controlsContainer: {
        padding: 16,
        borderBottomWidth: 1,
    },
    controlRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    controlLabel: {
        fontSize: 16,
        fontWeight: '500',
    },
    scrollView: {
        flex: 1,
    },
    content: {
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 30,
    },
    verseContainer: {
        marginBottom: 24,
        paddingBottom: 16,
        borderBottomWidth: 1,
    },
    verseNumber: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 8,
    },
    verseText: {
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
    toggleButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: 50,
        height: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
});
