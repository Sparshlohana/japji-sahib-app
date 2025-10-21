import { useTheme } from '@/contexts/theme-context';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { AudioSource, useAudioPlayer } from 'expo-audio';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function ListenPathScreen() {
    const { colors, isDarkMode } = useTheme();
    const [audioSource, setAudioSource] = useState<AudioSource | null>(null);
    const player = useAudioPlayer(audioSource);
    const [isLoading, setIsLoading] = useState(false);
    const [audioLoaded, setAudioLoaded] = useState(false);

    const gradientColors: [string, string] = isDarkMode
        ? ['#000000', '#1A1A1A']
        : ['#FFFFFF', '#FFFAF0'];

    useEffect(() => {
        loadAudio();
    }, []);

    const loadAudio = async () => {
        try {
            setIsLoading(true);
            // Note: You need to add japji-sahib.mp3 to assets/audio/
            // For now, this will fail gracefully
            try {
                const source = require('@/assets/audio/japji-sahib.mp3') as AudioSource;
                setAudioSource(source);
                setAudioLoaded(true);
            } catch {
                console.log('Audio file not found. Please add japji-sahib.mp3 to assets/audio/');
                setAudioLoaded(false);
            }
            setIsLoading(false);
        } catch (error) {
            console.error('Error loading audio:', error);
            setIsLoading(false);
        }
    };

    const playPause = () => {
        if (!audioLoaded) {
            return;
        }

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

    return (
        <>
            <Stack.Screen
                options={{
                    headerShown: true,
                    title: 'Listen Path',
                    headerStyle: { backgroundColor: colors.primary },
                    headerTintColor: '#fff',
                }}
            />
            <LinearGradient colors={gradientColors} style={styles.container}>
                <View style={styles.content}>
                    {/* Album Art / Icon */}
                    <View style={[styles.albumArt, { backgroundColor: colors.card }]}>
                        <Ionicons name="musical-notes" size={80} color={colors.gold} />
                    </View>

                    {/* Title */}
                    <Text style={[styles.title, { color: colors.text }]}>
                        Japji Sahib Path
                    </Text>
                    <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
                        Complete Audio Recitation
                    </Text>

                    {/* Progress Bar */}
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

                    {/* Controls */}
                    <View style={styles.controls}>
                        <TouchableOpacity
                            style={[styles.controlButton, { backgroundColor: colors.card }]}
                            onPress={() => skip(-10)}
                            disabled={!audioLoaded}
                        >
                            <Ionicons name="play-back" size={32} color={colors.gold} />
                            <Text style={[styles.controlText, { color: colors.text }]}>
                                -10s
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                styles.playButton,
                                { backgroundColor: colors.gold },
                            ]}
                            onPress={playPause}
                            disabled={isLoading || !audioLoaded}
                        >
                            {isLoading ? (
                                <ActivityIndicator color="#fff" size="large" />
                            ) : (
                                <Ionicons
                                    name={player.playing ? 'pause' : 'play'}
                                    size={48}
                                    color="#fff"
                                />
                            )}
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.controlButton, { backgroundColor: colors.card }]}
                            onPress={() => skip(10)}
                            disabled={!audioLoaded}
                        >
                            <Ionicons name="play-forward" size={32} color={colors.gold} />
                            <Text style={[styles.controlText, { color: colors.text }]}>
                                +10s
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* Info */}
                    <View style={[styles.infoCard, { backgroundColor: colors.card }]}>
                        <Text style={[styles.infoText, { color: colors.textSecondary }]}>
                            {audioLoaded
                                ? 'This audio is available offline. You can listen to it anytime without an internet connection.'
                                : 'Audio file not found. Please add japji-sahib.mp3 to assets/audio/ folder.'
                            }
                        </Text>
                    </View>

                    {/* Footer */}
                    <View style={styles.footer}>
                        <Text style={[styles.footerText, { color: colors.gold }]}>
                            ਵਾਹਿਗੁਰੂ ਜੀ ਕਾ ਖਾਲਸਾ
                        </Text>
                        <Text style={[styles.footerText, { color: colors.gold }]}>
                            ਵਾਹਿਗੁਰੂ ਜੀ ਕੀ ਫਤਿਹ
                        </Text>
                    </View>
                </View>
            </LinearGradient>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    albumArt: {
        width: 200,
        height: 200,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 40,
    },
    progressContainer: {
        width: '100%',
        marginBottom: 40,
    },
    slider: {
        width: '100%',
        height: 40,
    },
    timeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 8,
    },
    timeText: {
        fontSize: 12,
    },
    controls: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
        marginBottom: 30,
    },
    controlButton: {
        width: 70,
        height: 70,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
    },
    controlText: {
        fontSize: 10,
        marginTop: 4,
    },
    playButton: {
        width: 90,
        height: 90,
        borderRadius: 45,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    infoCard: {
        padding: 16,
        borderRadius: 12,
        marginBottom: 30,
        width: '100%',
    },
    infoText: {
        fontSize: 14,
        textAlign: 'center',
        lineHeight: 20,
    },
    footer: {
        alignItems: 'center',
    },
    footerText: {
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 4,
    },
});
