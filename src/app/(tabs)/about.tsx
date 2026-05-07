import { useRef, useState } from 'react';
import {
    Dimensions,
    Image,
    NativeScrollEvent,
    NativeSyntheticEvent,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    Linking,
    useWindowDimensions,
    View,
} from 'react-native';

import { Colors, Spacing, BorderRadius } from '@/constants/theme';

const TOPBAR_H   = 56;
const DESKTOP_BP = 768;

const SLIDES = [
    {
        id: 1,
        tag: 'Qui je suis',
        title: 'Ange Wu\nDéveloppeur\nWeb',
        body: 'Étudiant en développement web et amoureux des étoiles, je perfectionne mes compétences pour les atteindre.',
        accent: Colors.neonPink,
        number: '01',
        visual: 'avatar',
    },
    {
        id: 2,
        tag: 'Compétences',
        title: 'Stack technique\net expertise',
        body: 'Du front-end à une expérience full-stack en passant par plusieurs technos, je conçois d\'apprendre plus et créer ce qui m\'intéresse',
        accent: Colors.neonGold,
        number: '02',
        visual: 'skills',
    },
    {
        id: 3,
        tag: 'Parcours',
        title: 'Mon chemin\njusqu\'ici',
        body: 'Un parcours atypique à découvrir le monde et moi-même',
        accent: Colors.neonBlue,
        number: '03',
        visual: 'timeline',
    },
    {
        id: 4,
        tag: 'CV',
        title: 'Curriculum\nVitae',
        body: 'Retrouvez l\'ensemble de mon expérience, mon parcours, mes formations et mes compétences dans mon CV complet.',
        accent: Colors.neonPink,
        number: '04',
        visual: 'cv',
    },
];

const SKILLS = [
    { label: 'HTML/CSS',  level: 60 },
    { label: 'PHP', level: 50 },
    { label: 'Java',  level: 45 },
    { label: 'JavaScript',  level: 40 },
    { label: 'React Native',  level: 40 },
    { label: 'React.js',  level: 40 },
    { label: 'SQL',  level: 40 },
    { label: 'UI/UX Design',  level: 35 },
    { label: 'A-Frame & AR.js',  level: 30 },
    { label: 'Laravel',    level: 20 },
    { label: 'Tailwind CSS',      level: 20 },
];

const TIMELINE = [
    { year: '2025', role: 'Développeur Web',              desc: 'Étudiant développeur web à la Need For School à Rouen' },
    { year: '2022', role: 'Développeur Application',      desc: 'Étudiant en license en informatique et génie logiciel à Montréal' },
    { year: '2018', role: 'Étudiant',      desc: 'Étudiant au Liceo Franco-Mexicano à Mexico' },
    { year: '2016', role: 'Étudiant',      desc: 'Étudiant au J.F.K High School à Fremont en Californie' },
    { year: '2010', role: 'Étudiant', desc: 'Étudiant au Lycée Français de Barcelone' },
];

function VisualAvatar({ accent }: { accent: string }) {
    return (
        <View style={visStyles.avatarWrapper}>
            <View style={[visStyles.avatarFrame, { borderColor: accent }]}>
                <View style={[visStyles.avatarInner, { backgroundColor: `${accent}15` }]}>
                        <Image
                            source={require("@/assets/images/pfp.jpeg")}
                            style={visStyles.avatar}
                        />
                </View>
            </View>
            <View style={[visStyles.badge, { backgroundColor: `${accent}20`, borderColor: `${accent}50` }]}>
                <Text style={[visStyles.badgeText, { color: accent }]}>Développeur</Text>
            </View>
        </View>
    );
}

function VisualSkills({ accent }: { accent: string }) {
    return (
        <View style={visStyles.skillsWrapper}>
            {SKILLS.map((skill, i) => (
                <View key={i} style={visStyles.skillRow}>
                    <Text style={visStyles.skillLabel}>{skill.label}</Text>
                    <View style={visStyles.skillBarBg}>
                        <View style={[
                            visStyles.skillBarFill,
                            { width: `${skill.level}%` as any, backgroundColor: accent },
                        ]} />
                    </View>
                    <Text style={[visStyles.skillPct, { color: accent }]}>{skill.level}%</Text>
                </View>
            ))}
        </View>
    );
}

function VisualTimeline({ accent }: { accent: string }) {
    return (
        <View style={visStyles.timelineWrapper}>
            {TIMELINE.map((item, i) => (
                <View key={i} style={visStyles.timelineItem}>
                    <View style={visStyles.timelineLine}>
                        <View style={[visStyles.timelineDot, { backgroundColor: accent }]} />
                        {i < TIMELINE.length - 1 && (
                            <View style={[visStyles.timelineConnector, { backgroundColor: `${accent}30` }]} />
                        )}
                    </View>
                    <View style={visStyles.timelineContent}>
                        <Text style={[visStyles.timelineYear, { color: accent }]}>{item.year}</Text>
                        <Text style={visStyles.timelineRole}>{item.role}</Text>
                        <Text style={visStyles.timelineDesc}>{item.desc}</Text>
                    </View>
                </View>
            ))}
        </View>
    );
}

function VisualCV({ accent }: { accent: string }) {
    const downloadCV = () => {
        Linking.openURL('https://qtadi6o-nashie_artz-8081.exp.direct/cv-ange-wu.pdf');
    };

    return (
        <View style={visStyles.cvWrapper}>
            <View style={[visStyles.cvDoc, { borderColor: `${accent}30` }]}>
                <View style={[visStyles.cvHeader, { backgroundColor: `${accent}15` }]}>
                    <Text style={[visStyles.cvName, { color: accent }]}>Ange Wu</Text>
                    <Text style={visStyles.cvJob}>Développeur Web</Text>
                </View>
                {[1,2,3].map(i => (
                    <View key={i} style={visStyles.cvLine}>
                        <View style={[visStyles.cvLineBar, { width: `${85 - i * 15}%` as any, backgroundColor: `${accent}25` }]} />
                    </View>
                ))}
            </View>
            <Pressable style={[visStyles.downloadBtn, { borderColor: accent }]} onPress={downloadCV}>
                <Text style={[visStyles.downloadText, { color: accent }]}>↓  TÉLÉCHARGER LE CV</Text>
            </Pressable>
        </View>
    );
}

function SlideVisual({ type, accent }: { type: string; accent: string }) {
    switch (type) {
        case 'skills':   return <VisualSkills   accent={accent} />;
        case 'timeline': return <VisualTimeline accent={accent} />;
        case 'cv':       return <VisualCV       accent={accent} />;
        default:         return <VisualAvatar   accent={accent} />;
    }
}

function Slide({ slide, width }: { slide: typeof SLIDES[0]; width: number }) {
    const isDesktop = width >= DESKTOP_BP;

    return (
        <View style={[styles.slide, { width }]}>
            <Text style={[styles.slideNumber, { color: `${slide.accent}15` }]}>
                {slide.number}
            </Text>

            <View style={[styles.slideInner, isDesktop && styles.slideInnerDesktop]}>
                <View style={styles.slideLeft}>
                    <View style={[styles.tag, { borderColor: `${slide.accent}50`, backgroundColor: `${slide.accent}10` }]}>
                        <Text style={[styles.tagText, { color: slide.accent }]}>{slide.tag}</Text>
                    </View>

                    <Text style={styles.slideTitle}>{slide.title}</Text>
                    <Text style={styles.slideBody}>{slide.body}</Text>

                    <View style={[styles.accentLine, { backgroundColor: slide.accent }]} />
                </View>

                <View style={styles.slideRight}>
                    <SlideVisual type={slide.visual} accent={slide.accent} />
                </View>
            </View>
        </View>
    );
}

export default function AboutScreen() {
    const { width }  = useWindowDimensions();
    const isDesktop  = width >= DESKTOP_BP;
    const [current, setCurrent] = useState(0);

    const scrollRef = useRef<ScrollView>(null);

    const goTo = (index: number) => {
        const clamped = Math.max(0, Math.min(index, SLIDES.length - 1));
        setCurrent(clamped);
        scrollRef.current?.scrollTo({ x: clamped * width, animated: true });
    };

    const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
        const index = Math.round(e.nativeEvent.contentOffset.x / width);
        setCurrent(index);
    };

    return (
        <View style={[styles.container, { paddingTop: TOPBAR_H }]}>
            <ScrollView
                ref={scrollRef}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={(e) => {
                    const index = Math.round(e.nativeEvent.contentOffset.x / width);
                    if (index !== current) setCurrent(index);
                }}
                scrollEventThrottle={16}
                style={{ flex: 1 }}
            >
                {SLIDES.map(slide => (
                    <Slide key={slide.id} slide={slide} width={width} />
                ))}
            </ScrollView>

            <View style={styles.footer}>
                {isDesktop && (
                    <Pressable
                        onPress={() => goTo(current - 1)}
                        style={[styles.navBtn, current === 0 && styles.navBtnDisabled]}
                        disabled={current === 0}
                    >
                        <Text style={styles.navBtnText}>‹</Text>
                    </Pressable>
                )}

                <View style={styles.dots}>
                    {SLIDES.map((slide, i) => (
                        <Pressable key={i} onPress={() => goTo(i)}>
                            <View style={[
                                styles.dot,
                                i === current && styles.dotActive,
                                i === current && { backgroundColor: SLIDES[current].accent },
                            ]} />
                        </Pressable>
                    ))}
                </View>

                {!isDesktop && (
                    <Text style={styles.swipeHint}>Faites glisser pour naviguer</Text>
                )}

                {isDesktop && (
                    <Pressable
                        onPress={() => goTo(current + 1)}
                        style={[styles.navBtn, current === SLIDES.length - 1 && styles.navBtnDisabled]}
                        disabled={current === SLIDES.length - 1}
                    >
                        <Text style={styles.navBtnText}>›</Text>
                    </Pressable>
                )}
            </View>

            {isDesktop && (
                <>
                    <Pressable
                        style={[styles.floatBtn, styles.floatBtnLeft, current === 0 && styles.floatBtnDisabled]}
                        onPress={() => goTo(current - 1)}
                        disabled={current === 0}
                    >
                        <Text style={styles.floatBtnText}>‹</Text>
                    </Pressable>
                    <Pressable
                        style={[styles.floatBtn, styles.floatBtnRight, current === SLIDES.length - 1 && styles.floatBtnDisabled]}
                        onPress={() => goTo(current + 1)}
                        disabled={current === SLIDES.length - 1}
                    >
                        <Text style={styles.floatBtnText}>›</Text>
                    </Pressable>
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.xl,
        position: 'relative',
        overflow: 'hidden',
    },
    slideNumber: {
        position: 'absolute',
        right: 20,
        top: 20,
        fontSize: 120,
        fontWeight: '900',
        fontFamily: 'monospace',
        lineHeight: 120,
    },
    slideInner: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        gap: Spacing.xl,
    },
    slideInnerDesktop: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Spacing.xxl,
    },
    slideLeft: {
        flex: 1,
        gap: Spacing.md,
        maxWidth: 500,
    },
    tag: {
        alignSelf: 'flex-start',
        borderWidth: 1,
        borderRadius: BorderRadius.full,
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.xs,
    },
    tagText: {
        fontFamily: 'monospace',
        fontSize: 11,
        letterSpacing: 3,
        textTransform: 'uppercase',
    },
    slideTitle: {
        fontSize: 36,
        fontWeight: '800',
        color: Colors.text,
        lineHeight: 44,
    },
    slideBody: {
        fontSize: 15,
        color: Colors.textDim,
        lineHeight: 26,
        maxWidth: 420,
    },
    accentLine: {
        height: 3,
        width: 40,
        borderRadius: 2,
        marginTop: Spacing.sm,
    },
    slideRight: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Spacing.lg,
        gap: Spacing.md,
    },
    dots: {
        flexDirection: 'row',
        gap: Spacing.sm,
        alignItems: 'center',
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: Colors.textDisabled,
    },
    dotActive: {
        width: 24,
        borderRadius: 4,
    },
    swipeHint: {
        position: 'absolute',
        bottom: -2,
        fontFamily: 'monospace',
        fontSize: 11,
        color: Colors.textDisabled,
        letterSpacing: 1,
    },
    navBtn: {
        width: 36, height: 36,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: Colors.textDim,
        alignItems: 'center',
        justifyContent: 'center',
    },
    navBtnDisabled: { opacity: 0.2 },
    navBtnText: {
        color: Colors.text,
        fontSize: 20,
        lineHeight: 22,
    },
    floatBtn: {
        position: 'absolute',
        top: '50%' as any,
        width: 52,
        height: 52,
        borderRadius: BorderRadius.md,
        backgroundColor: Colors.neonGold,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
        shadowColor: Colors.neonGold,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 12,
    },
    floatBtnLeft: { left: 12 },
    floatBtnRight: { right: 12 },
    floatBtnDisabled: { opacity: 0.3 },
    floatBtnText: {
        color: Colors.background,
        fontSize: 26,
        fontWeight: '700',
        lineHeight: 28,
    },
});

const visStyles = StyleSheet.create({
    avatarWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        paddingBottom: 30,
    },
    avatarFrame: {
        width: 200, height: 200,
        borderRadius: 100,
        borderWidth: 2,
        padding: 8,
    },
    avatarInner: {
        flex: 1,
        borderRadius: 92,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatar: {
        width: 190,
        height: 190,
        borderRadius: 100,
        borderWidth: 2,
        padding: 8,
    },
    badge: {
        position: 'absolute',
        bottom: -10,
        borderWidth: 1,
        borderRadius: BorderRadius.full,
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.xs,
    },
    badgeText: {
        fontFamily: 'monospace',
        fontSize: 12,
        letterSpacing: 2,
    },
    skillsWrapper: {
        width: '100%',
        maxWidth: 380,
        gap: Spacing.md,
    },
    skillRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.sm,
    },
    skillLabel: {
        fontFamily: 'monospace',
        fontSize: 12,
        color: Colors.textDim,
        width: 110,
    },
    skillBarBg: {
        flex: 1,
        height: 4,
        backgroundColor: 'rgba(255,255,255,0.08)',
        borderRadius: 2,
        overflow: 'hidden',
    },
    skillBarFill: {
        height: 4,
        borderRadius: 2,
    },
    skillPct: {
        fontFamily: 'monospace',
        fontSize: 11,
        width: 36,
        textAlign: 'right',
    },
    timelineWrapper: {
        width: '100%',
        maxWidth: 380,
        gap: 0,
    },
    timelineItem: {
        flexDirection: 'row',
        gap: Spacing.md,
    },
    timelineLine: {
        alignItems: 'center',
        width: 20,
    },
    timelineDot: {
        width: 10, height: 10,
        borderRadius: 5,
        marginTop: 4,
    },
    timelineConnector: {
        width: 2,
        flex: 1,
        marginVertical: 4,
        minHeight: 30,
    },
    timelineContent: {
        flex: 1,
        paddingBottom: Spacing.lg,
        gap: 2,
    },
    timelineYear: {
        fontFamily: 'monospace',
        fontSize: 11,
        letterSpacing: 2,
        fontWeight: '700',
    },
    timelineRole: {
        fontSize: 14,
        fontWeight: '700',
        color: Colors.text,
    },
    timelineDesc: {
        fontSize: 12,
        color: Colors.textDim,
        lineHeight: 18,
    },
    cvWrapper: {
        alignItems: 'center',
        gap: Spacing.lg,
        maxWidth: 320,
        width: '100%',
    },
    cvDoc: {
        width: '100%',
        borderWidth: 1,
        borderRadius: BorderRadius.md,
        overflow: 'hidden',
        backgroundColor: 'rgba(255,255,255,0.03)',
    },
    cvHeader: {
        padding: Spacing.md,
        gap: 4,
        marginBottom: Spacing.sm,
    },
    cvName: {
        fontFamily: 'monospace',
        fontSize: 16,
        fontWeight: '700',
        letterSpacing: 3,
    },
    cvJob: {
        fontSize: 12,
        color: Colors.textDim,
        letterSpacing: 1,
    },
    cvLine: {
        paddingHorizontal: Spacing.md,
        paddingBottom: Spacing.sm,
    },
    cvLineBar: {
        height: 8,
        borderRadius: 4,
    },
    downloadBtn: {
        borderWidth: 1.5,
        borderRadius: BorderRadius.full,
        paddingHorizontal: Spacing.xl,
        paddingVertical: Spacing.md,
        backgroundColor: 'transparent',
    },
    downloadText: {
        fontFamily: 'monospace',
        fontSize: 12,
        fontWeight: '700',
        letterSpacing: 2,
    },
});