import { useRouter } from 'expo-router';
import {
    Image,
    ImageBackground,
    Pressable,
    StyleSheet,
    Text,
    useWindowDimensions,
    View,
} from 'react-native';

import { Colors, Spacing } from '@/constants/theme';

const DESKTOP_BP = 768;
const TOPBAR_H   = 56;

function HeroText({ onPress, style }: { onPress: () => void, style?: any }) {
    return (
        <View style={[styles.heroText, style]}>

            <View style={styles.badge}>
                <Text style={styles.badgeText}>ANGE WU</Text>
            </View>

            <Text style={styles.title}>
                {'Portfolio\nimmersif en\n'}
                <Text style={styles.titleAccent}>réalité augmentée</Text>
            </Text>

            <Text style={styles.subtitle}>
                {"Découvrez mes projets web\nd'une nouvelle manière."}
            </Text>

            <Pressable
                onPress={onPress}
                style={({ pressed }) => [styles.ctaBtn, pressed && styles.ctaBtnPressed]}
            >
                <Text style={styles.ctaText}>LANCER L'EXPÉRIENCE</Text>
            </Pressable>

        </View>
    );
}

function PhoneMockup({ phoneSize }: { phoneSize: number }) {
    return (
        <Image
            source={require('@/assets/images/phone_mockup.png')}
            style={{ width: phoneSize, height: phoneSize * 2.05 }}
            resizeMode="contain"
        />
    );
}

export default function HomeScreen() {
    const router    = useRouter();
    const { width } = useWindowDimensions();
    const isDesktop = width >= DESKTOP_BP;
    const phoneSize = isDesktop ? 280 : width * 0.52;

    return (
        <ImageBackground
            source={require('@/assets/images/backgrounds/background_index.png')}
            resizeMode={"cover"}
            style={[styles.bg]}
        >
            <View style={styles.overlay} />

            <View style={[
                styles.content,
                { paddingTop: TOPBAR_H + Spacing.lg },
                isDesktop && styles.contentDesktop,
            ]}>
                {isDesktop ? (
                    <>
                        <HeroText style={{paddingBottom: "200"}} onPress={() => router.push('/ar-view')} />
                        <PhoneMockup phoneSize={phoneSize} />
                    </>
                ) : (
                    <>
                        <PhoneMockup phoneSize={phoneSize} />
                        <HeroText onPress={() => router.push('/ar-view')} />
                    </>
                )}
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({

    bg: {
        flex: 1,
        backgroundColor: Colors.background,
        width: '100%',
        height: '100%',
    },

    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.45)',
    },

    // Mobile: colonne
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: Spacing.lg,
        gap: Spacing.xl,
        flexDirection: 'column',
    },


    contentDesktop: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        paddingHorizontal: 60,
    },

    heroText: {
        alignItems: 'flex-start',
        gap: Spacing.md,
        maxWidth: 420,
    },
    badge: {
        borderWidth: 1,
        borderColor: 'rgba(201,168,76,0.5)',
        borderRadius: 999,
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.xs,
        backgroundColor: 'rgba(201,168,76,0.08)',
    },
    badgeText: {
        fontFamily: 'monospace',
        fontSize: 20,
        color: Colors.neonGold,
        letterSpacing: 3,
    },
    title: {
        fontSize: 38,
        fontWeight: '800',
        color: Colors.text,
        lineHeight: 46,
    },
    titleAccent: {
        color: Colors.neonPink,
    },
    subtitle: {
        fontSize: 15,
        color: Colors.textDim,
        lineHeight: 24,
    },
    ctaBtn: {
        marginTop: Spacing.sm,
        borderWidth: 1.5,
        borderColor: Colors.neonGold,
        borderRadius: 999,
        paddingHorizontal: Spacing.xl,
        paddingVertical: Spacing.md,
        backgroundColor: 'rgba(201,168,76,0.08)',
    },
    ctaBtnPressed: {
        backgroundColor: 'rgba(201,168,76,0.22)',
    },
    ctaText: {
        fontFamily: 'monospace',
        fontSize: 12,
        fontWeight: '700',
        color: Colors.text,
        letterSpacing: 3,
    },
});