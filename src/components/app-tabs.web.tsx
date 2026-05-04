// src/components/app-tabs.web.tsx
//
// Chargé UNIQUEMENT sur le navigateur web (convention Expo : suffixe .web.tsx).
// Sur iOS/Android natif, c'est app-tabs.tsx qui est utilisé — on n'y touche pas.
//
// Ce composant s'affiche PAR-DESSUS le contenu des pages.
// Il ne gère pas la navigation lui-même — c'est le _layout.tsx qui le fait.
// Il affiche juste l'interface de navigation (burger, drawer, topnav).
//
// En PHP : c'est le header.php et sidebar.php inclus dans chaque page,
// mais qui ne gèrent pas le routing eux-mêmes.

import { useRouter, usePathname } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
    Animated,
    Pressable,
    StyleSheet,
    Text,
    useWindowDimensions,
    View,
} from 'react-native';

// ─── Design tokens ─────────────────────────────────────────────────────────
const NEON_PINK    = '#E91E8C';
const NEON_GOLD    = '#C9A84C';
const BG_DARK      = 'rgba(10,10,15,0.97)';
const BG_DRAWER    = 'rgba(12, 12, 20, 0.99)';
const TEXT_DIM     = 'rgba(255,255,255,0.40)';
const TEXT_ACTIVE  = '#FFFFFF';
const DRAWER_WIDTH = 280;
const TOPBAR_H     = 56;
// Largeur à partir de laquelle on passe en mode desktop
const DESKTOP_BP   = 768;

// ─── Données des onglets ────────────────────────────────────────────────────
// En PHP : $tabs = [['name'=>'index','href'=>'/','icon'=>'⌂','label'=>'Accueil'],...]
const TABS = [
    { name: 'index',   href: '/',        icon: '⌂',  label: 'Accueil'  },
    { name: 'projets', href: '/projets', icon: '◈',  label: 'Projets'  },
    { name: 'about',   href: '/about',   icon: '◉',  label: 'À propos' },
    { name: 'contact', href: '/contact', icon: '✉',  label: 'Contact'  },
    { name: 'scanner', href: '/scanner', icon: '⬡',  label: 'Vue AR'   },
];

// ─── Contexte partagé ───────────────────────────────────────────────────────
// Variable globale accessible par tous les composants enfants.
// En PHP : $_SESSION['drawer'] = ['isOpen' => false]
const DrawerContext = React.createContext<{
    isOpen: boolean;
    toggle: () => void;
    close:  () => void;
}>({ isOpen: false, toggle: () => {}, close: () => {} });


// ═══════════════════════════════════════════════════════════════════════════
// COMPOSANT : BurgerButton
// Les 3 barres animées en haut à gauche (mobile uniquement)
// ═══════════════════════════════════════════════════════════════════════════
function BurgerButton() {
    const { isOpen, toggle } = React.useContext(DrawerContext);

    // 3 valeurs animées pour les 3 barres du burger
    // useRef = variable statique qui ne redessine pas le composant
    const bar1 = useRef(new Animated.Value(0)).current;
    const bar2 = useRef(new Animated.Value(0)).current;
    const bar3 = useRef(new Animated.Value(0)).current;

    // useEffect = "quand isOpen change, lance les animations"
    useEffect(() => {
        Animated.parallel([
            Animated.timing(bar1, { toValue: isOpen ? 1 : 0, duration: 250, useNativeDriver: true }),
            Animated.timing(bar2, { toValue: isOpen ? 1 : 0, duration: 200, useNativeDriver: true }),
            Animated.timing(bar3, { toValue: isOpen ? 1 : 0, duration: 250, useNativeDriver: true }),
        ]).start();
    }, [isOpen]);

    return (
        <Pressable onPress={toggle} style={styles.burgerBtn} hitSlop={8}>
            {/* Barre 1 : descend 7px + tourne 45° → forme le \ du X */}
            <Animated.View style={[styles.burgerBar, {
                transform: [
                    { translateY: bar1.interpolate({ inputRange: [0,1], outputRange: [0, 7] }) },
                    { rotate:    bar1.interpolate({ inputRange: [0,1], outputRange: ['0deg','45deg'] }) },
                ],
            }]} />

            {/* Barre 2 : disparaît */}
            <Animated.View style={[styles.burgerBar, {
                opacity: bar2.interpolate({ inputRange: [0,1], outputRange: [1, 0] }),
            }]} />

            {/* Barre 3 : monte 7px + tourne -45° → forme le / du X */}
            <Animated.View style={[styles.burgerBar, {
                transform: [
                    { translateY: bar3.interpolate({ inputRange: [0,1], outputRange: [0, -7] }) },
                    { rotate:    bar3.interpolate({ inputRange: [0,1], outputRange: ['0deg','-45deg'] }) },
                ],
            }]} />
        </Pressable>
    );
}


// ═══════════════════════════════════════════════════════════════════════════
// COMPOSANT : Drawer (panneau latéral mobile)
// S'affiche uniquement sur mobile, slide depuis la gauche
// ═══════════════════════════════════════════════════════════════════════════
function Drawer() {
    const { isOpen, close } = React.useContext(DrawerContext);

    // useRouter = le système de navigation d'Expo Router
    // En PHP : header('Location: /projets');
    const router   = useRouter();

    // usePathname = la page actuellement affichée
    // En PHP : $_SERVER['REQUEST_URI']
    const pathname = usePathname();

    // translateX : position du panneau
    // -280 = hors écran à gauche (caché)
    //   0  = visible
    const translateX     = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
    const overlayOpacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.spring(translateX, {
                toValue: isOpen ? 0 : -DRAWER_WIDTH,
                useNativeDriver: true,
                tension: 65,
                friction: 11,
            }),
            Animated.timing(overlayOpacity, {
                toValue: isOpen ? 1 : 0,
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start();
    }, [isOpen]);

    // Navigue vers une page et ferme le drawer
    // En PHP : function goTo($url) { header("Location: $url"); }
    const goTo = (href: string) => {
        close();
        router.push(href as any);
    };

    return (
        <>
            {/* Fond sombre — clic dessus = ferme le drawer */}
            <Animated.View
                style={[styles.overlay, { opacity: overlayOpacity }]}
                pointerEvents={isOpen ? 'auto' : 'none'}
            >
                <Pressable style={StyleSheet.absoluteFill} onPress={close} />
            </Animated.View>

            {/* Le panneau */}
            <Animated.View style={[styles.drawer, { transform: [{ translateX }] }]}>

                {/* Logo en haut du drawer */}
                <View style={styles.drawerHeader}>
                    <Text style={styles.drawerLogoAR}>AR</Text>
                    <Text style={styles.drawerLogoName}>BISKAR</Text>
                </View>

                {/* Ligne décorative néon */}
                <View style={styles.drawerDivider} />

                {/* Liste des liens */}
                {/* TABS.map() = foreach($tabs as $tab) en PHP */}
                <View style={styles.drawerNav}>
                    {TABS.map(tab => {
                        // Est-ce que ce lien correspond à la page actuelle ?
                        // En PHP : $actif = ($tab['href'] === $_SERVER['REQUEST_URI'])
                        const isActive = pathname === tab.href ||
                            (tab.href !== '/' && pathname.startsWith(tab.href));

                        return (
                            <DrawerLink
                                key={tab.name}
                                tab={tab}
                                isActive={isActive}
                                onPress={() => goTo(tab.href)}
                            />
                        );
                    })}
                </View>

                <View style={styles.drawerFooter}>
                    <Text style={styles.drawerFooterText}>— Portfolio AR v1.0</Text>
                </View>
            </Animated.View>
        </>
    );
}


// ═══════════════════════════════════════════════════════════════════════════
// COMPOSANT : DrawerLink — un lien dans le drawer
// ═══════════════════════════════════════════════════════════════════════════
function DrawerLink({ tab, isActive, onPress }: {
    tab: typeof TABS[0];
    isActive: boolean;
    onPress: () => void;
}) {
    // Décalage horizontal : le lien actif glisse légèrement vers la droite
    const translateX = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.spring(translateX, {
            toValue: isActive ? 8 : 0,
            useNativeDriver: true,
            tension: 200,
            friction: 15,
        }).start();
    }, [isActive]);

    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
        >
            <Animated.View style={[
                styles.navLink,
                isActive && styles.navLinkActive,
                { transform: [{ translateX }] },
            ]}>
                {/* Barre verticale rose à gauche quand actif */}
                {isActive && <View style={styles.navLinkBar} />}

                <Text style={[styles.navLinkIcon, isActive && styles.navLinkIconActive]}>
                    {tab.icon}
                </Text>
                <Text style={[styles.navLinkLabel, isActive && styles.navLinkLabelActive]}>
                    {tab.label}
                </Text>
                {isActive && <Text style={styles.navLinkArrow}>›</Text>}
            </Animated.View>
        </Pressable>
    );
}


// ═══════════════════════════════════════════════════════════════════════════
// COMPOSANT : TopNav — barre horizontale desktop
// Visible uniquement quand la largeur > 768px
// ═══════════════════════════════════════════════════════════════════════════
function TopNav() {
    const router   = useRouter();
    const pathname = usePathname();

    return (
        <View style={styles.topNav}>
            {/* Logo */}
            <View style={styles.topNavBrand}>
                <Text style={styles.topNavAR}>AR</Text>
                <Text style={styles.topNavName}>PORTFOLIO</Text>
            </View>

            {/* Liens horizontaux */}
            <View style={styles.topNavLinks}>
                {TABS.map(tab => {
                    const isActive = pathname === tab.href ||
                        (tab.href !== '/' && pathname.startsWith(tab.href));

                    return (
                        <Pressable
                            key={tab.name}
                            onPress={() => router.push(tab.href as any)}
                            style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
                        >
                            <View style={styles.topNavLinkWrapper}>
                                <Text style={[
                                    styles.topNavLink,
                                    isActive && styles.topNavLinkActive,
                                ]}>
                                    {tab.label}
                                </Text>
                                {/* Underline néon sous le lien actif */}
                                {isActive && <View style={styles.topNavUnderline} />}
                            </View>
                        </Pressable>
                    );
                })}
            </View>
        </View>
    );
}


// ═══════════════════════════════════════════════════════════════════════════
// COMPOSANT : TopBar — barre mobile avec burger + logo
// ═══════════════════════════════════════════════════════════════════════════
function TopBar() {
    return (
        <View style={styles.topBar}>
            <BurgerButton />
            <View style={styles.topBarBrand}>
                <Text style={styles.topBarAR}>AR</Text>
                <Text style={styles.topBarName}>PORTFOLIO</Text>
            </View>
            {/* View vide à droite pour centrer le logo (astuce flexbox) */}
            <View style={{ width: 40 }} />
        </View>
    );
}


// ═══════════════════════════════════════════════════════════════════════════
// COMPOSANT RACINE : AppTabs
// Détecte si on est sur mobile ou desktop et affiche la bonne nav
// ═══════════════════════════════════════════════════════════════════════════
export default function AppTabs() {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(prev => !prev);
    const close  = () => setIsOpen(false);

    // useWindowDimensions = largeur/hauteur de l'écran en temps réel
    // Si tu redimensionnes la fenêtre, ce composant se redessine
    // En PHP : il n'y a pas d'équivalent — le serveur ne connaît pas la taille
    const { width } = useWindowDimensions();
    const isDesktop = width >= DESKTOP_BP;

    return (
        <DrawerContext.Provider value={{ isOpen, toggle, close }}>

            {/* Affichage conditionnel selon la taille d'écran */}
            {/* En PHP : if ($isDesktop) { include 'topnav.php'; } else { include 'burger.php'; } */}
            {isDesktop ? (
                // ── MODE DESKTOP : navbar horizontale en haut ──
                <TopNav />
            ) : (
                // ── MODE MOBILE : burger + drawer latéral ──
                <>
                    <TopBar />
                    <Drawer />
                </>
            )}

        </DrawerContext.Provider>
    );
}


// ═══════════════════════════════════════════════════════════════════════════
// STYLES
// ═══════════════════════════════════════════════════════════════════════════
const styles = StyleSheet.create({

    // ── TopBar mobile ────────────────────────────────────────────
    topBar: {
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: TOPBAR_H,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        backgroundColor: BG_DARK,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(233,30,140,0.2)',
        zIndex: 10,
    },
    topBarBrand: {
        flexDirection: 'row',
        alignItems: 'baseline',
        gap: 6,
    },
    topBarAR: {
        fontFamily: 'monospace',
        fontSize: 14,
        fontWeight: '700',
        color: NEON_GOLD,
        letterSpacing: 2,
    },
    topBarName: {
        fontFamily: 'monospace',
        fontSize: 11,
        color: TEXT_DIM,
        letterSpacing: 3,
    },

    // ── Burger ───────────────────────────────────────────────────
    burgerBtn: {
        width: 40, height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
    },
    burgerBar: {
        width: 22, height: 2,
        backgroundColor: TEXT_ACTIVE,
        borderRadius: 2,
    },

    // ── Overlay fond sombre ──────────────────────────────────────
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.6)',
        zIndex: 20,
    },

    // ── Drawer ───────────────────────────────────────────────────
    drawer: {
        position: 'absolute',
        top: 0, left: 0, bottom: 0,
        width: DRAWER_WIDTH,
        backgroundColor: BG_DRAWER,
        zIndex: 30,
        shadowColor: NEON_PINK,
        shadowOffset: { width: 4, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
    },
    drawerHeader: {
        flexDirection: 'row',
        alignItems: 'baseline',
        gap: 8,
        paddingTop: 70,
        paddingHorizontal: 24,
        paddingBottom: 20,
    },
    drawerLogoAR: {
        fontFamily: 'monospace',
        fontSize: 22,
        fontWeight: '700',
        color: NEON_GOLD,
        letterSpacing: 2,
    },
    drawerLogoName: {
        fontFamily: 'monospace',
        fontSize: 13,
        color: TEXT_DIM,
        letterSpacing: 4,
    },
    drawerDivider: {
        height: 1,
        marginHorizontal: 24,
        marginBottom: 12,
        backgroundColor: NEON_PINK,
        opacity: 0.3,
    },
    drawerNav: {
        paddingTop: 8,
        gap: 2,
    },
    drawerFooter: {
        position: 'absolute',
        bottom: 32,
        left: 24,
    },
    drawerFooterText: {
        fontFamily: 'monospace',
        fontSize: 10,
        color: TEXT_DIM,
        letterSpacing: 1,
    },

    // ── Liens du drawer ──────────────────────────────────────────
    navLink: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 24,
        gap: 14,
        position: 'relative',
    },
    navLinkActive: {
        backgroundColor: 'rgba(233,30,140,0.08)',
    },
    navLinkBar: {
        position: 'absolute',
        left: 0,
        top: 12, bottom: 12,
        width: 3,
        borderRadius: 2,
        backgroundColor: NEON_PINK,
        shadowColor: NEON_PINK,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 6,
    },
    navLinkIcon: {
        fontSize: 20,
        color: TEXT_DIM,
        width: 24,
        textAlign: 'center',
    },
    navLinkIconActive: { color: NEON_PINK },
    navLinkLabel: {
        fontFamily: 'monospace',
        fontSize: 12,
        color: TEXT_DIM,
        letterSpacing: 2,
        textTransform: 'uppercase',
        flex: 1,
    },
    navLinkLabelActive: { color: TEXT_ACTIVE },
    navLinkArrow: {
        fontSize: 20,
        color: NEON_PINK,
        lineHeight: 22,
    },

    // ── TopNav desktop ───────────────────────────────────────────
    topNav: {
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: TOPBAR_H,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 40,
        backgroundColor: BG_DARK,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(233,30,140,0.15)',
        zIndex: 10,
    },
    topNavBrand: {
        flexDirection: 'row',
        alignItems: 'baseline',
        gap: 8,
    },
    topNavAR: {
        fontFamily: 'monospace',
        fontSize: 16,
        fontWeight: '700',
        color: NEON_GOLD,
        letterSpacing: 2,
    },
    topNavName: {
        fontFamily: 'monospace',
        fontSize: 12,
        color: TEXT_DIM,
        letterSpacing: 4,
    },
    topNavLinks: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 32,
    },
    topNavLinkWrapper: {
        alignItems: 'center',
        gap: 4,
    },
    topNavLink: {
        fontFamily: 'monospace',
        fontSize: 12,
        color: TEXT_DIM,
        letterSpacing: 2,
        textTransform: 'uppercase',
    },
    topNavLinkActive: {
        color: TEXT_ACTIVE,
    },
    topNavUnderline: {
        height: 2,
        width: '100%',
        backgroundColor: NEON_GOLD,
        borderRadius: 1,
        shadowColor: NEON_GOLD,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 4,
    },
});