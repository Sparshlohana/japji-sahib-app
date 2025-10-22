import { useTheme } from '@/contexts/theme-context';
import { useAppStore } from '@/store/app-store';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack } from 'expo-router';
import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    useWindowDimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function MalaCounterScreen() {
    const { colors, isDarkMode } = useTheme();
    const { malaCount, incrementMala, resetMala } = useAppStore();
    const { width } = useWindowDimensions();
    const insets = useSafeAreaInsets();

    const gradientColors: [string, string] = isDarkMode
        ? ['#000000', '#1A1A1A']
        : ['#FFFFFF', '#FFFAF0'];

    const isSmallScreen = width < 360;
    const horizontalPadding = Math.max(16, Math.min(width * 0.05, 24));

    const renderMalaBeads = () => {
        const beads = [];
        const totalBeads = 108;
        const containerWidth = width - (horizontalPadding * 2); // Account for padding
        const radius = Math.min(containerWidth * 0.35, 150); // Cap radius for larger devices
        const centerX = containerWidth / 2;
        const centerY = Math.min(containerWidth * 0.5, 200) + 50; // Adaptive center

        for (let i = 0; i < totalBeads; i++) {
            const angle = (i / totalBeads) * 2 * Math.PI - Math.PI / 2;
            const x = centerX + radius * Math.cos(angle) - 4;
            const y = centerY + radius * Math.sin(angle) - 4;

            const isCompleted = i < (malaCount % totalBeads);

            beads.push(
                <View
                    key={i}
                    style={[
                        styles.bead,
                        {
                            left: x,
                            top: y,
                            backgroundColor: isCompleted ? colors.gold : colors.border,
                        },
                    ]}
                />
            );
        }

        return beads;
    };

    const completedRounds = Math.floor(malaCount / 108);
    const currentBead = malaCount % 108;

    return (
        <>
            <Stack.Screen
                options={{
                    headerShown: true,
                    title: 'Mala Counter',
                    headerStyle: { backgroundColor: colors.primary },
                    headerTintColor: '#fff',
                    presentation: 'modal',
                }}
            />
            <LinearGradient colors={gradientColors} style={styles.container}>
                <ScrollView contentContainerStyle={[styles.content, { paddingHorizontal: horizontalPadding, paddingBottom: insets.bottom + 20 }]}>
                    {/* Title */}
                    <Text style={[styles.title, { color: colors.gold, fontSize: isSmallScreen ? 20 : 24 }]}>
                        Japji Sahib Mala
                    </Text>

                    {/* Mala Visual */}
                    <View style={[styles.malaContainer, { height: Math.min(width - (horizontalPadding * 2), 400) + 100 }]}>
                        {renderMalaBeads()}

                        {/* Center Counter */}
                        <View style={[styles.centerCounter, { backgroundColor: colors.card }]}>
                            <Text style={[styles.countLabel, { color: colors.textSecondary }]}>
                                Current
                            </Text>
                            <Text style={[styles.countNumber, { color: colors.gold }]}>
                                {currentBead}
                            </Text>
                            <Text style={[styles.countTotal, { color: colors.textSecondary }]}>
                                / 108
                            </Text>
                        </View>
                    </View>

                    {/* Statistics */}
                    <View style={[styles.statsContainer, { backgroundColor: colors.card }]}>
                        <View style={styles.statItem}>
                            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                                Total Count
                            </Text>
                            <Text style={[styles.statValue, { color: colors.text }]}>
                                {malaCount}
                            </Text>
                        </View>

                        <View style={[styles.divider, { backgroundColor: colors.border }]} />

                        <View style={styles.statItem}>
                            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                                Completed Rounds
                            </Text>
                            <Text style={[styles.statValue, { color: colors.text }]}>
                                {completedRounds}
                            </Text>
                        </View>
                    </View>

                    {/* Controls */}
                    <View style={styles.controls}>
                        <TouchableOpacity
                            style={[styles.mainButton, { backgroundColor: colors.gold }]}
                            onPress={incrementMala}
                        >
                            <Ionicons name="add" size={32} color="#fff" />
                            <Text style={styles.buttonText}>Count</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                styles.secondaryButton,
                                {
                                    backgroundColor: colors.card,
                                    borderColor: colors.border,
                                },
                            ]}
                            onPress={resetMala}
                        >
                            <Ionicons name="refresh" size={24} color={colors.text} />
                            <Text style={[styles.secondaryButtonText, { color: colors.text }]}>
                                Reset
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* Info */}
                    <Text style={[styles.infoText, { color: colors.textSecondary, fontSize: isSmallScreen ? 13 : 14 }]}>
                        {'Tap "'}
                        {'Count'}
                        {'" after each Japji Sahib recitation.'}
                        {'\n'}
                        {'Your progress is saved automatically.'}
                    </Text>

                    {/* Footer */}
                    <View style={styles.footer}>
                        <Text style={[styles.footerText, { color: colors.gold, fontSize: isSmallScreen ? 13 : 14 }]}>
                            ਵਾਹਿਗੁਰੂ ਜੀ ਕਾ ਖਾਲਸਾ ਵਾਹਿਗੁਰੂ ਜੀ ਕੀ ਫਤਿਹ
                        </Text>
                    </View>
                </ScrollView>
            </LinearGradient>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flexGrow: 1,
        paddingTop: 20,
        alignItems: 'center',
    },
    title: {
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 20,
    },
    malaContainer: {
        width: '100%',
        position: 'relative',
        marginBottom: 20,
    },
    bead: {
        width: 8,
        height: 8,
        borderRadius: 4,
        position: 'absolute',
    },
    centerCounter: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -75 }, { translateY: -75 }],
        width: 150,
        height: 150,
        borderRadius: 75,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    countLabel: {
        fontSize: 12,
        marginBottom: 4,
    },
    countNumber: {
        fontSize: 48,
        fontWeight: 'bold',
    },
    countTotal: {
        fontSize: 16,
        marginTop: 4,
    },
    statsContainer: {
        flexDirection: 'row',
        padding: 20,
        borderRadius: 12,
        marginBottom: 30,
        width: '100%',
        maxWidth: 400,
    },
    statItem: {
        flex: 1,
        alignItems: 'center',
    },
    divider: {
        width: 1,
        marginHorizontal: 20,
    },
    statLabel: {
        fontSize: 14,
        marginBottom: 8,
        textAlign: 'center',
    },
    statValue: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    controls: {
        width: '100%',
        maxWidth: 400,
        gap: 12,
        marginBottom: 20,
    },
    mainButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        borderRadius: 16,
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
        color: '#fff',
    },
    secondaryButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        borderRadius: 12,
        gap: 8,
        borderWidth: 1,
        minHeight: 56,
    },
    secondaryButtonText: {
        fontSize: 16,
        fontWeight: '500',
    },
    infoText: {
        textAlign: 'center',
        lineHeight: 20,
        marginBottom: 20,
        paddingHorizontal: 20,
    },
    footer: {
        alignItems: 'center',
        marginTop: 'auto',
        paddingBottom: 20,
        paddingTop: 10,
    },
    footerText: {
        fontWeight: '600',
        textAlign: 'center',
    },
});
