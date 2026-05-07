import React, { useState } from 'react';
import {
    Image,
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

const PROJECTS = [
    {
        id: 1,
        title: 'CRM',
        description: 'Application de gestion de la relation client full-stack avec tableau de bord, suivi des contacts et pipeline de ventes.',
        image: require('@/../public/projects/proj_crm_1.png'),
        github: 'https://github.com/NashieArtz/crm',
        tech: ['React.js', 'Laravel', 'PostgreSQL', 'Tailwind'],
        accent: NEON_PINK,
    },
    {
        id: 2,
        title: 'Web4Heroes',
        description: 'Application web héroïque construite en architecture MVC avec PHP vanilla et JavaScript.',
        image: require('@/../public/projects/proj_crm_1.png'),
        github: 'https://github.com/NashieArtz/web4heroes',
        tech: ['MVC', 'PHP', 'JavaScript', 'MySQL'],
        accent: NEON_GOLD,
    },
    {
        id: 3,
        title: 'MUSTcle',
        description: 'Application fitness personnalisée pour la gestion de programmes d\'entraînement.',
        image: require('@/../public/projects/proj_mustcle_1.png'),
        github: '#',
        tech: ['WordPress'],
        accent: NEON_PURPLE,
    },
    {
        id: 4,
        title: 'Hydro UQAM',
        description: 'Projet de gestion hydraulique développé en assembleur dans le cadre d\'un cours à l\'UQAM.',
        image: require('@/../public/projects/proj_hydrouqam.png'),
        github: 'https://github.com/NashieArtz/hydrouqam',
        tech: ['Assembleur'],
        accent: NEON_PINK,
    },
    {
        id: 5,
        title: 'Tower Defense',
        description: 'Jeu de stratégie en temps réel développé en Java avec gestion de vagues d\'ennemis et placement de tours.',
        image: require('@/../public/projects/proj_tower_2.png'),
        github: 'https://github.com/NashieArtz/tours-de-defense',
        tech: ['Java'],
        accent: NEON_GOLD,
    },
];

const ALL_TECHS = ['Tous', ...Array.from(new Set(PROJECTS.flatMap(p => p.tech)))];

export default function ProjetsScreen() {
    const { width }  = useWindowDimensions();
    const isDesktop  = width >= DESKTOP_BP;
    const [filter, setFilter] = useState('Tous');

    const filtered = filter === 'Tous'
        ? PROJECTS
        : PROJECTS.filter(p => p.tech.includes(filter));

    const numCols = width >= 1100 ? 3 : isDesktop ? 2 : 1;
    const cardWidth = (width - (isDesktop ? 120 : 48) - (numCols - 1) * 20) / numCols;

    return (
        <ScrollView
            style={styles.root}
            contentContainerStyle={[
                styles.scroll,
                { paddingTop: TOPBAR_H + 32 },
                isDesktop && styles.scrollDesktop,
            ]}
            showsVerticalScrollIndicator={false}
        >
            <Text style={styles.eyebrow}>◈ PROJETS</Text>
            <Text style={styles.heading}>Mes réalisations</Text>
            <Text style={styles.sub}>
                {PROJECTS.length} projets · du web au bas niveau
            </Text>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.filters}
                style={styles.filtersScroll}
            >
                {ALL_TECHS.map(tech => {
                    const active = filter === tech;
                    return (
                        <Pressable
                            key={tech}
                            onPress={() => setFilter(tech)}
                            style={({ pressed }) => [
                                styles.filterChip,
                                active && styles.filterChipActive,
                                pressed && { opacity: 0.75 },
                            ]}
                        >
                            <Text style={[
                                styles.filterChipText,
                                active && styles.filterChipTextActive,
                            ]}>
                                {tech}
                            </Text>
                        </Pressable>
                    );
                })}
            </ScrollView>

            {filtered.length === 0 && (
                <View style={styles.empty}>
                    <Text style={styles.emptyText}>Aucun projet pour ce filtre.</Text>
                </View>
            )}

            <View style={[styles.grid, isDesktop && { flexDirection: 'row', flexWrap: 'wrap', gap: 20 }]}>
                {filtered.map(project => (
                    <View
                        key={project.id}
                        style={[
                            styles.card,
                            { borderColor: `${project.accent}35` },
                            isDesktop && { width: cardWidth },
                        ]}
                    >
                        <Image
                            source={project.image}
                            style={styles.cardImage}
                            resizeMode="cover"
                        />

                        <View style={styles.cardBody}>
                            <View style={styles.cardHeader}>
                                <Text style={[styles.cardTitle, { color: project.accent }]}>
                                    {project.title}
                                </Text>
                                <View style={[styles.accentDot, { backgroundColor: project.accent }]} />
                            </View>

                            <Text style={styles.cardDesc}>{project.description}</Text>

                            <View style={styles.techRow}>
                                {project.tech.map(t => (
                                    <View key={t} style={[styles.techTag, { borderColor: `${project.accent}40`, backgroundColor: `${project.accent}10` }]}>
                                        <Text style={[styles.techTagText, { color: project.accent }]}>{t}</Text>
                                    </View>
                                ))}
                            </View>

                            <Pressable
                                onPress={() => project.github !== '#' && Linking.openURL(project.github)}
                                style={({ pressed }) => [
                                    styles.githubBtn,
                                    { borderColor: project.accent },
                                    project.github === '#' && styles.githubBtnDisabled,
                                    pressed && project.github !== '#' && { opacity: 0.75 },
                                ]}
                            >
                                <Text style={[styles.githubBtnText, { color: project.accent }]}>
                                    {project.github === '#' ? 'Privé' : '⌥ Voir sur GitHub →'}
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                ))}
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
        paddingBottom: 80,
    },
    scrollDesktop: {
        paddingHorizontal: 60,
    },
    eyebrow: {
        fontFamily: 'monospace',
        fontSize: 11,
        color: NEON_PURPLE,
        letterSpacing: 4,
        textTransform: 'uppercase',
        marginBottom: 12,
    },
    heading: {
        fontSize: 40,
        fontWeight: '800',
        color: TEXT,
        lineHeight: 48,
        letterSpacing: -0.5,
        marginBottom: 8,
    },
    sub: {
        fontFamily: 'monospace',
        fontSize: 12,
        color: TEXT_DIM,
        letterSpacing: 2,
        marginBottom: 28,
    },
    filtersScroll: {
        marginBottom: 28,
        marginHorizontal: -24,
    },
    filters: {
        flexDirection: 'row',
        gap: 8,
        paddingHorizontal: 24,
    },
    filterChip: {
        borderWidth: 1,
        borderColor: BORDER,
        borderRadius: 999,
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: 'transparent',
    },
    filterChipActive: {
        backgroundColor: NEON_PURPLE,
        borderColor: NEON_PURPLE,
    },
    filterChipText: {
        fontFamily: 'monospace',
        fontSize: 11,
        color: TEXT_DIM,
        letterSpacing: 1,
    },
    filterChipTextActive: {
        color: TEXT,
        fontWeight: '700',
    },
    empty: {
        paddingVertical: 60,
        alignItems: 'center',
    },
    emptyText: {
        fontFamily: 'monospace',
        fontSize: 13,
        color: TEXT_DIM,
        letterSpacing: 1,
    },
    grid: {
        flexDirection: 'column',
        gap: 20,
    },
    card: {
        backgroundColor: SURFACE,
        borderWidth: 1,
        borderRadius: 20,
        overflow: 'hidden',
        shadowColor: NEON_PURPLE,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.12,
        shadowRadius: 20,
    },
    cardImage: {
        width: '100%',
        height: 180,
    },
    cardBody: {
        padding: 20,
        gap: 12,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    cardTitle: {
        fontFamily: 'monospace',
        fontSize: 16,
        fontWeight: '800',
        letterSpacing: 1,
    },
    accentDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    cardDesc: {
        fontSize: 13,
        color: TEXT_DIM,
        lineHeight: 20,
    },
    techRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 6,
    },
    techTag: {
        borderWidth: 1,
        borderRadius: 999,
        paddingHorizontal: 10,
        paddingVertical: 4,
    },
    techTagText: {
        fontFamily: 'monospace',
        fontSize: 10,
        letterSpacing: 1,
    },
    githubBtn: {
        borderWidth: 1,
        borderRadius: 12,
        paddingVertical: 12,
        alignItems: 'center',
        marginTop: 4,
    },
    githubBtnDisabled: {
        opacity: 0.35,
    },
    githubBtnText: {
        fontFamily: 'monospace',
        fontSize: 12,
        fontWeight: '700',
        letterSpacing: 1,
    },
});
