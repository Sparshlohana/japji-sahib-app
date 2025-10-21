import { useTheme } from '@/contexts/theme-context';
import japjiSahibData from '@/data/japji-sahib.json';
import { useAppStore } from '@/store/app-store';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { AudioSource, useAudioPlayer } from 'expo-audio';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function ReadPathScreen() {
    const { colors, isDarkMode, fontSize, fontSizes } = useTheme();
    const { selectedLanguage, setLanguage } = useAppStore();
    const scrollViewRef = useRef<ScrollView>(null);
    // Audio player state
    const [audioSource, setAudioSource] = useState<AudioSource | null>(null);
    const player = useAudioPlayer(audioSource);
    const [isLoading, setIsLoading] = useState(false);
    const [audioLoaded, setAudioLoaded] = useState(false);

    const gradientColors: [string, string] = isDarkMode
        ? ['#000000', '#1A1A1A']
        : ['#FFFFFF', '#FFFAF0'];

    // Load audio on mount
    useEffect(() => {
        const loadAudio = async () => {
            try {
                setIsLoading(true);
                try {
                    const source = require('@/assets/audio/japji-sahib.mp3') as AudioSource;
                    setAudioSource(source);
                    setAudioLoaded(true);
                } catch {
                    console.log('Audio file not found. Please add japji-sahib.mp3 to assets/audio/');
                    setAudioLoaded(false);
                }
            } catch (e) {
                console.error('Error loading audio:', e);
            } finally {
                setIsLoading(false);
            }
        };
        loadAudio();
    }, []);

    const playPause = () => {
        if (!audioLoaded) return;
        if (player.playing) {
            player.pause();
        } else {
            player.play();
        }
    };

    const skip = (seconds: number) => {
        if (!audioLoaded || !player.currentTime) return;
        const newTime = Math.max(
            0,
            Math.min((player.currentTime || 0) + seconds, player.duration || 0)
        );
        player.seekTo(newTime);
    };

    const onSliderValueChange = (value: number) => {
        if (audioLoaded) {
            player.seekTo(value);
        }
    };

    const formatTime = (seconds: number | null) => {
        if (!seconds) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const renderVerse = (verse: any, index: number) => {
        const replaceEkonkar = (t: string) => {
            if (!t) return t;
            let out = t;
            // Gurmukhi variants
            out = out.replace(/੧\s*ਓਅੰਕਾਰ/g, 'ੴ');
            out = out.replace(/\bਓਅੰਕਾਰ\b/g, 'ੴ');
            // Hindi/Devanagari variants
            out = out.replace(/੧\s*ओअंकार/g, 'ੴ');
            out = out.replace(/\bओअंकार\b/g, 'ੴ');
            out = out.replace(/\bओंकार\b/g, 'ੴ');
            // English transliteration variants (Ik/Ek Oankaar/Onkar)
            out = out.replace(/\b(?:ik|ek)\s+oankaar\b/gi, 'ੴ');
            out = out.replace(/\b(?:ik|ek)\s+oankar\b/gi, 'ੴ');
            out = out.replace(/\b(?:ik|ek)\s+onkar\b/gi, 'ੴ');
            out = out.replace(/\b(?:ik|ek)\s+onkaar\b/gi, 'ੴ');
            return out;
        };

        let text = '';
        if (selectedLanguage === 'gurmukhi') {
            text = replaceEkonkar(verse.gurmukhi);
        } else if (selectedLanguage === 'hindi') {
            text = replaceEkonkar(verse.hindi);
        } else {
            text = replaceEkonkar(verse.english);
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

                {/* (Removed) Auto Scroll Controls */}

                {/* Content */}
                <ScrollView
                    ref={scrollViewRef}
                    style={styles.scrollView}
                    contentContainerStyle={[styles.content, { paddingBottom: 180 }]}
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

                {/* Bottom Audio Player */}
                <View style={[styles.playerContainer, { backgroundColor: colors.card, borderTopColor: colors.border }]}>

                    <View style={styles.progressContainer}>
                        <Slider
                            style={styles.slider}
                            minimumValue={0}
                            maximumValue={player.duration || 0}
                            value={player.currentTime || 0}
                            onSlidingComplete={onSliderValueChange}
                            minimumTrackTintColor={colors.gold}
                            maximumTrackTintColor={colors.border}
                            thumbTintColor={colors.gold}
                            disabled={!audioLoaded}
                        />
                        <View style={styles.timeContainer}>
                            <Text style={[styles.timeText, { color: colors.textSecondary }]}>
                                {formatTime(player.currentTime)}
                            </Text>
                            <Text style={[styles.timeText, { color: colors.textSecondary }]}>
                                {formatTime(player.duration)}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.controls}>
                        <TouchableOpacity
                            style={[styles.controlButton, { backgroundColor: colors.card }]}
                            onPress={() => skip(-10)}
                            disabled={!audioLoaded}
                        >
                            <Ionicons name="play-back" size={28} color={colors.gold} />
                            <Text style={[styles.controlText, { color: colors.text }]}>-10s</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.playButton, { backgroundColor: colors.gold }]}
                            onPress={playPause}
                            disabled={isLoading || !audioLoaded}
                        >
                            {isLoading ? (
                                <ActivityIndicator color="#fff" size="small" />
                            ) : (
                                <Ionicons name={player.playing ? 'pause' : 'play'} size={32} color="#fff" />
                            )}
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.controlButton, { backgroundColor: colors.card }]}
                            onPress={() => skip(10)}
                            disabled={!audioLoaded}
                        >
                            <Ionicons name="play-forward" size={28} color={colors.gold} />
                            <Text style={[styles.controlText, { color: colors.text }]}>+10s</Text>
                        </TouchableOpacity>
                    </View>

                    {!audioLoaded && (
                        <Text style={[styles.infoInline, { color: colors.textSecondary }]}>
                            Audio file not found. Please add japji-sahib.mp3 to assets/audio/ folder.
                        </Text>
                    )}
                </View>
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
    // Bottom audio player styles
    playerContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        paddingTop: 12,
        paddingHorizontal: 16,
        paddingBottom: 16,
        borderTopWidth: 1,
    },
    playerHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 8,
    },
    playerTitle: {
        fontSize: 14,
        fontWeight: '600',
    },
    progressContainer: {
        width: '100%',
    },
    slider: {
        width: '100%',
        height: 32,
    },
    timeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 4,
        marginTop: -6,
        marginBottom: 6,
    },
    timeText: {
        fontSize: 11,
    },
    controls: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
        marginTop: 6,
    },
    controlButton: {
        width: 64,
        height: 64,
        borderRadius: 32,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
    },
    controlText: {
        fontSize: 10,
        marginTop: 2,
    },
    playButton: {
        width: 80,
        height: 80,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    infoInline: {
        fontSize: 12,
        textAlign: 'center',
        marginTop: 8,
    },
});
