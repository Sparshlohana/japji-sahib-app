import { useTheme } from '@/contexts/theme-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack } from 'expo-router';
import React from 'react';
import {
    Linking,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function AboutScreen() {
    const { colors, isDarkMode } = useTheme();

    const gradientColors: [string, string] = isDarkMode
        ? ['#000000', '#1A1A1A']
        : ['#FFFFFF', '#FFFAF0'];

    const openLink = (url: string) => {
        Linking.openURL(url);
    };

    return (
        <>
            <Stack.Screen
                options={{
                    headerShown: true,
                    title: 'About',
                    headerStyle: { backgroundColor: colors.primary },
                    headerTintColor: '#fff',
                }}
            />
            <LinearGradient colors={gradientColors} style={styles.container}>
                <ScrollView contentContainerStyle={styles.content}>
                    {/* App Icon */}
                    <View style={styles.iconContainer}>
                        <MaterialCommunityIcons
                            name="khanda"
                            size={100}
                            color={colors.gold}
                        />
                    </View>

                    {/* App Name */}
                    <Text style={[styles.appName, { color: colors.text }]}>
                        Shri Japji Sahib
                    </Text>
                    <Text style={[styles.version, { color: colors.textSecondary }]}>
                        Version 1.0.0
                    </Text>

                    {/* Description */}
                    <View style={[styles.section, { backgroundColor: colors.card }]}>
                        <Text style={[styles.description, { color: colors.text }]}>
                            A peaceful, devotional app for reading and listening to Japji
                            Sahib Path, the morning prayer from Guru Granth Sahib Ji.
                        </Text>
                    </View>

                    {/* Features */}
                    <View style={[styles.section, { backgroundColor: colors.card }]}>
                        <Text style={[styles.sectionTitle, { color: colors.gold }]}>
                            Features
                        </Text>
                        <View style={styles.featureList}>
                            <View style={styles.featureItem}>
                                <Ionicons name="book" size={20} color={colors.gold} />
                                <Text style={[styles.featureText, { color: colors.text }]}>
                                    Read Path in Gurmukhi, Hindi & English
                                </Text>
                            </View>
                            <View style={styles.featureItem}>
                                <Ionicons name="headset" size={20} color={colors.gold} />
                                <Text style={[styles.featureText, { color: colors.text }]}>
                                    Listen to Audio Recitation
                                </Text>
                            </View>
                            <View style={styles.featureItem}>
                                <Ionicons name="download" size={20} color={colors.gold} />
                                <Text style={[styles.featureText, { color: colors.text }]}>
                                    Offline Support
                                </Text>
                            </View>
                            <View style={styles.featureItem}>
                                <Ionicons name="moon" size={20} color={colors.gold} />
                                <Text style={[styles.featureText, { color: colors.text }]}>
                                    Dark Mode
                                </Text>
                            </View>
                            <View style={styles.featureItem}>
                                <Ionicons name="text" size={20} color={colors.gold} />
                                <Text style={[styles.featureText, { color: colors.text }]}>
                                    Adjustable Font Size
                                </Text>
                            </View>
                            <View style={styles.featureItem}>
                                <MaterialCommunityIcons
                                    name="newspaper-variant"
                                    size={20}
                                    color={colors.gold}
                                />
                                <Text style={[styles.featureText, { color: colors.text }]}>
                                    Daily Hukamnama
                                </Text>
                            </View>
                        </View>
                    </View>

                    {/* Contact */}
                    <View style={[styles.section, { backgroundColor: colors.card }]}>
                        <Text style={[styles.sectionTitle, { color: colors.gold }]}>
                            Contact & Support
                        </Text>

                        <TouchableOpacity
                            style={styles.contactButton}
                            onPress={() => openLink('mailto:support@example.com')}
                        >
                            <Ionicons name="mail" size={24} color={colors.gold} />
                            <Text style={[styles.contactText, { color: colors.text }]}>
                                support@example.com
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.contactButton}
                            onPress={() => openLink('https://github.com/example/japji-sahib')}
                        >
                            <Ionicons name="logo-github" size={24} color={colors.gold} />
                            <Text style={[styles.contactText, { color: colors.text }]}>
                                GitHub Repository
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* Credits */}
                    <View style={[styles.section, { backgroundColor: colors.card }]}>
                        <Text style={[styles.credits, { color: colors.textSecondary }]}>
                            Developed with devotion and love for the Sikh community.
                        </Text>
                        <Text style={[styles.credits, { color: colors.textSecondary }]}>
                            May this app help spread the teachings of Guru Nanak Dev Ji.
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
    iconContainer: {
        alignItems: 'center',
        marginVertical: 20,
    },
    appName: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 8,
    },
    version: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 30,
    },
    section: {
        padding: 20,
        borderRadius: 12,
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
        textAlign: 'center',
    },
    featureList: {
        gap: 12,
    },
    featureItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    featureText: {
        fontSize: 16,
        flex: 1,
    },
    contactButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingVertical: 12,
    },
    contactText: {
        fontSize: 16,
    },
    credits: {
        fontSize: 14,
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: 8,
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
