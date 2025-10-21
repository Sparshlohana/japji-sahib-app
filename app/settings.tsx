import { FontSize, useTheme } from '@/contexts/theme-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack } from 'expo-router';
import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function SettingsScreen() {
    const { colors, isDarkMode, fontSize, toggleDarkMode, setFontSize } =
        useTheme();

    const gradientColors: [string, string] = isDarkMode
        ? ['#000000', '#1A1A1A']
        : ['#FFFFFF', '#FFFAF0'];

    const fontSizeOptions: { label: string; value: FontSize }[] = [
        { label: 'Small', value: 'small' },
        { label: 'Medium', value: 'medium' },
        { label: 'Large', value: 'large' },
        { label: 'Extra Large', value: 'xlarge' },
    ];

    return (
        <>
            <Stack.Screen
                options={{
                    headerShown: true,
                    title: 'Settings',
                    headerStyle: { backgroundColor: colors.primary },
                    headerTintColor: '#fff',
                }}
            />
            <LinearGradient colors={gradientColors} style={styles.container}>
                <ScrollView contentContainerStyle={styles.content}>
                    {/* Display Settings */}
                    <View style={[styles.section, { backgroundColor: colors.card }]}>
                        <Text style={[styles.sectionTitle, { color: colors.gold }]}>
                            Display Settings
                        </Text>

                        <View style={styles.settingRow}>
                            <View style={styles.settingInfo}>
                                <Ionicons name="moon" size={24} color={colors.text} />
                                <Text style={[styles.settingLabel, { color: colors.text }]}>
                                    Dark Mode
                                </Text>
                            </View>
                            <Switch
                                value={isDarkMode}
                                onValueChange={toggleDarkMode}
                                trackColor={{ false: colors.border, true: colors.gold }}
                                thumbColor={isDarkMode ? '#fff' : '#f4f3f4'}
                            />
                        </View>

                        <View style={[styles.divider, { backgroundColor: colors.border }]} />

                        <View style={styles.settingColumn}>
                            <View style={styles.settingInfo}>
                                <Ionicons name="text" size={24} color={colors.text} />
                                <Text style={[styles.settingLabel, { color: colors.text }]}>
                                    Font Size
                                </Text>
                            </View>

                            <View style={styles.fontSizeOptions}>
                                {fontSizeOptions.map((option) => (
                                    <TouchableOpacity
                                        key={option.value}
                                        style={[
                                            styles.fontSizeButton,
                                            {
                                                backgroundColor:
                                                    fontSize === option.value
                                                        ? colors.gold
                                                        : colors.background,
                                                borderColor: colors.border,
                                            },
                                        ]}
                                        onPress={() => setFontSize(option.value)}
                                    >
                                        <Text
                                            style={[
                                                styles.fontSizeText,
                                                {
                                                    color:
                                                        fontSize === option.value ? '#fff' : colors.text,
                                                },
                                            ]}
                                        >
                                            {option.label}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    </View>

                    {/* About Section */}
                    <View style={[styles.section, { backgroundColor: colors.card }]}>
                        <Text style={[styles.sectionTitle, { color: colors.gold }]}>
                            About
                        </Text>

                        <View style={styles.infoRow}>
                            <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>
                                App Version
                            </Text>
                            <Text style={[styles.infoValue, { color: colors.text }]}>
                                1.0.0
                            </Text>
                        </View>

                        <View style={[styles.divider, { backgroundColor: colors.border }]} />

                        <View style={styles.infoRow}>
                            <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>
                                Developer
                            </Text>
                            <Text style={[styles.infoValue, { color: colors.text }]}>
                                Sparsh Lohana
                            </Text>
                        </View>
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
        padding: 20,
    },
    section: {
        padding: 20,
        borderRadius: 12,
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    settingRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
    },
    settingColumn: {
        paddingVertical: 8,
    },
    settingInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    settingLabel: {
        fontSize: 16,
        fontWeight: '500',
    },
    divider: {
        height: 1,
        marginVertical: 16,
    },
    fontSizeOptions: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginTop: 12,
    },
    fontSizeButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        borderWidth: 1,
    },
    fontSizeText: {
        fontSize: 14,
        fontWeight: '500',
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
    },
    infoLabel: {
        fontSize: 16,
    },
    infoValue: {
        fontSize: 16,
        fontWeight: '500',
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
