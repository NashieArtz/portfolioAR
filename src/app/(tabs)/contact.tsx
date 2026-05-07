import React from 'react';
import {
    Linking,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    useWindowDimensions,
    View,
} from 'react-native';

const NEON_PINK   = '#E91E8C';
const NEON_GOLD   = '#C9A84C';
const NEON_PURPLE = '#9C27B0';
const BG          = '#0a0a0f';
const SURFACE     = '#12001c';
const BORDER      = 'rgba(156,39,176,0.25)';
const TEXT        = '#ffffff';
const TEXT_DIM    = 'rgba(255,255,255,0.45)';
const TOPBAR_H    = 56;
const DESKTOP_BP  = 768;

const LINKS = [
    {
        label: 'Email',
        value: 'ange.wu@email.com',
        icon: '✉',
        accent: NEON_PINK,
        action: () => Linking.openURL('mailto:angel.wu@hotmail.fr'),
    },
    {
        label: 'LinkedIn',
        value: 'ange-wu',
        icon: '◈',
        accent: NEON_GOLD,
        action: () => Linking.openURL('https://www.linkedin.com/in/ange-wu-959357229/'),
    },
    {
        label: 'GitHub',
        value: 'NashieArtz',
        icon: '⌥',
        accent: NEON_PURPLE,
        action: () => Linking.openURL('https://github.com/NashieArtz'),
    },
];

export default function ContactScreen() {
    const { width } = useWindowDimensions();
    const isDesktop = width >= DESKTOP_BP;

    return (
        <ScrollView
            style={styles.root}
            contentContainerStyle={[
                styles.scroll,
                { paddingTop: TOPBAR_H + 48 },
                isDesktop && styles.scrollDesktop,
            ]}
            showsVerticalScrollIndicator={false}
        >
            <Text style={styles.eyebrow}>◈ CONTACT</Text>
            <Text style={styles.heading}>{'Travaillons\nensemble.'}</Text>
            <Text style={styles.sub}>
                Une idée, un projet, ou juste envie d'échanger ?{'\n'}
                Je réponds généralement sous 24h.
            </Text>

            <View style={styles.divider} />

            <View style={[styles.grid, isDesktop && styles.gridDesktop]}>
                {LINKS.map((link) => (
                    <Pressable
                        key={link.label}
                        onPress={link.action}
                        style={({ pressed }) => [
                            styles.card,
                            { borderColor: `${link.accent}40` },
                            pressed && { opacity: 0.75 },
                        ]}
                    >
                        <View style={[styles.cardIcon, { backgroundColor: `${link.accent}12`, borderColor: `${link.accent}40` }]}>
                            <Text style={[styles.cardIconText, { color: link.accent }]}>{link.icon}</Text>
                        </View>
                        <Text style={[styles.cardLabel, { color: TEXT_DIM }]}>{link.label}</Text>
                        <Text style={[styles.cardValue, { color: link.accent }]}>{link.value}</Text>
                        <Text style={[styles.cardArrow, { color: `${link.accent}60` }]}>›</Text>
                    </Pressable>
                ))}
            </View>

            <View style={styles.footer}>
                <Text style={styles.footerText}>— Disponible pour des missions freelance</Text>
                <View style={[styles.footerDot, { backgroundColor: NEON_PINK }]} />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: BG,
    },
    scroll: {
        paddingHorizontal: 24,
        paddingBottom: 60,
    },
    scrollDesktop: {
        paddingHorizontal: 80,
        maxWidth: 900,
        alignSelf: 'center',
        width: '100%',
    },
    eyebrow: {
        fontFamily: 'monospace',
        fontSize: 11,
        color: NEON_PURPLE,
        letterSpacing: 4,
        textTransform: 'uppercase',
        marginBottom: 16,
    },
    heading: {
        fontSize: 48,
        fontWeight: '800',
        color: TEXT,
        lineHeight: 56,
        letterSpacing: -1,
        marginBottom: 16,
    },
    sub: {
        fontSize: 15,
        color: TEXT_DIM,
        lineHeight: 26,
        maxWidth: 460,
    },
    divider: {
        height: 1,
        backgroundColor: BORDER,
        marginVertical: 36,
    },
    grid: {
        flexDirection: 'column',
        gap: 16,
    },
    gridDesktop: {
        flexDirection: 'row',
        gap: 20,
    },
    card: {
        flex: 1,
        backgroundColor: SURFACE,
        borderWidth: 1,
        borderRadius: 20,
        padding: 24,
        gap: 8,
        shadowColor: NEON_PURPLE,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 16,
    },
    cardIcon: {
        width: 48,
        height: 48,
        borderRadius: 14,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 4,
    },
    cardIconText: {
        fontSize: 22,
    },
    cardLabel: {
        fontFamily: 'monospace',
        fontSize: 10,
        letterSpacing: 3,
        textTransform: 'uppercase',
    },
    cardValue: {
        fontFamily: 'monospace',
        fontSize: 14,
        fontWeight: '700',
        flex: 1,
    },
    cardArrow: {
        fontSize: 22,
        alignSelf: 'flex-end',
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginTop: 48,
    },
    footerText: {
        fontFamily: 'monospace',
        fontSize: 12,
        color: TEXT_DIM,
        letterSpacing: 1,
    },
    footerDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
    },
});
