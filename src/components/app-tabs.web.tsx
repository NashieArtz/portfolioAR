import {useRouter, usePathname} from 'expo-router';
import React, {useEffect, useRef, useState} from 'react';
import {
    Animated,
    Pressable,
    StyleSheet,
    Text,
    useWindowDimensions,
    View,
} from 'react-native';

const NEON_PINK = '#E91E8C';
const NEON_GOLD = '#C9A84C';
const BG_DARK = 'rgba(10,10,15,0.97)';
const BG_DRAWER = 'rgba(12, 12, 20, 0.99)';
const TEXT_DIM = 'rgba(255,255,255,0.40)';
const TEXT_ACTIVE = '#FFFFFF';
const DRAWER_WIDTH = 280;
const TOPBAR_H = 56;
const DESKTOP_BP = 768;

const TABS = [
    {name: 'index', href: '/', icon: '⌂', label: 'Accueil'},
    {name: 'projets', href: '/projets', icon: '◈', label: 'Projets'},
    {name: 'about', href: '/about', icon: '◉', label: 'À propos'},
    {name: 'contact', href: '/contact', icon: '✉', label: 'Contact'},
    {name: 'scanner', href: '/ar-view', icon: '⬡', label: 'Vue AR'},
];

const DrawerContext = React.createContext<{
    isOpen: boolean;
    toggle: () => void;
    close: () => void;
}>({
    isOpen: false, toggle: () => {}, close: () => {}
});

function BurgerButton() {
    const {isOpen, toggle} = React.useContext(DrawerContext);

    const bar1 = useRef(new Animated.Value(0)).current;
    const bar2 = useRef(new Animated.Value(0)).current;
    const bar3 = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(bar1, {toValue: isOpen ? 1 : 0, duration: 250, useNativeDriver: true}),
            Animated.timing(bar2, {toValue: isOpen ? 1 : 0, duration: 200, useNativeDriver: true}),
            Animated.timing(bar3, {toValue: isOpen ? 1 : 0, duration: 250, useNativeDriver: true}),
        ]).start();
    }, [isOpen]);

    return (
        <Pressable onPress={toggle} style={styles.burgerBtn} hitSlop={8}>
            <Animated.View style={[styles.burgerBar, {
                transform: [
                    {translateY: bar1.interpolate({inputRange: [0, 1], outputRange: [0, 7]})},
                    {rotate: bar1.interpolate({inputRange: [0, 1], outputRange: ['0deg', '45deg']})},
                ],
            }]}/>

            <Animated.View style={[styles.burgerBar, {
                opacity: bar2.interpolate({inputRange: [0, 1], outputRange: [1, 0]}),
            }]}/>

            <Animated.View style={[styles.burgerBar, {
                transform: [
                    {translateY: bar3.interpolate({inputRange: [0, 1], outputRange: [0, -7]})},
                    {rotate: bar3.interpolate({inputRange: [0, 1], outputRange: ['0deg', '-45deg']})},
                ],
            }]}/>
        </Pressable>
    );
}

function Drawer() {
    const {isOpen, close} = React.useContext(DrawerContext);
    const router = useRouter();
    const pathname = usePathname();
    const translateX = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
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

    const goTo = (href: string) => {
        close();
        router.push(href as any);
    };

    return (
        <>
            <Animated.View
                style={[styles.overlay, {opacity: overlayOpacity}]}
                pointerEvents={isOpen ? 'auto' : 'none'}
            >
                <Pressable style={StyleSheet.absoluteFill} onPress={close}/>
            </Animated.View>

            <Animated.View style={[styles.drawer, {transform: [{translateX}]}]}>

                <View style={styles.drawerHeader}>
                    <Text style={styles.drawerLogoAR}>AR</Text>
                    <Text style={styles.drawerLogoName}>BISKAR</Text>
                </View>

                <View style={styles.drawerDivider}/>

                <View style={styles.drawerNav}>
                    {TABS.map(tab => {
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

function DrawerLink({tab, isActive, onPress}: {
    tab: typeof TABS[0];
    isActive: boolean;
    onPress: () => void;
}) {

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
            style={({pressed}) => [{opacity: pressed ? 0.7 : 1}]}
        >
            <Animated.View style={[
                styles.navLink,
                isActive && styles.navLinkActive,
                {transform: [{translateX}]},
            ]}>
                {isActive && <View style={styles.navLinkBar}/>}

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

function TopNav() {
    const router = useRouter();
    const pathname = usePathname();

    return (
        <View style={styles.topNav}>
            <View style={styles.topNavBrand}>
                <Text style={styles.topNavAR}>AR</Text>
                <Text style={styles.topNavName}>PORTFOLIO</Text>
            </View>
            <View style={styles.topNavLinks}>
                {TABS.map(tab => {
                    const isActive = pathname === tab.href ||
                        (tab.href !== '/' && pathname.startsWith(tab.href));

                    return (
                        <Pressable
                            key={tab.name}
                            onPress={() => router.push(tab.href as any)}
                            style={({pressed}) => [{opacity: pressed ? 0.7 : 1}]}
                        >
                            <View style={styles.topNavLinkWrapper}>
                                <Text style={[
                                    styles.topNavLink,
                                    isActive && styles.topNavLinkActive,
                                ]}>
                                    {tab.label}
                                </Text>
                                {isActive && <View style={styles.topNavUnderline}/>}
                            </View>
                        </Pressable>
                    );
                })}
            </View>
        </View>
    );
}

function TopBar() {
    return (
        <View style={styles.topBar}>
            <BurgerButton/>
            <View style={styles.topBarBrand}>
                <Text style={styles.topBarAR}>AR</Text>
                <Text style={styles.topBarName}>PORTFOLIO</Text>
            </View>

            <View style={{width: 40}}/>
        </View>
    );
}


export default function AppNavigationLayout() {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(prev => !prev);
    const close = () => setIsOpen(false);

    const {width} = useWindowDimensions();
    const isDesktop = width >= DESKTOP_BP;

    return (
        <DrawerContext.Provider value={{isOpen, toggle, close}}>
            {isDesktop ? (
                <TopNav/>
            ) : (
                <>
                    <TopBar/>
                    <Drawer/>
                </>
            )}
        </DrawerContext.Provider>
    );
}

const styles = StyleSheet.create({
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
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.6)',
        zIndex: 20,
    },
    drawer: {
        position: 'absolute',
        top: 0, left: 0, bottom: 0,
        width: DRAWER_WIDTH,
        backgroundColor: BG_DRAWER,
        zIndex: 30,
        shadowColor: NEON_PINK,
        shadowOffset: {width: 4, height: 0},
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
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 1,
        shadowRadius: 6,
    },
    navLinkIcon: {
        fontSize: 20,
        color: TEXT_DIM,
        width: 24,
        textAlign: 'center',
    },
    navLinkIconActive: {color: NEON_PINK},
    navLinkLabel: {
        fontFamily: 'monospace',
        fontSize: 12,
        color: TEXT_DIM,
        letterSpacing: 2,
        textTransform: 'uppercase',
        flex: 1,
    },
    navLinkLabelActive: {color: TEXT_ACTIVE},
    navLinkArrow: {
        fontSize: 20,
        color: NEON_PINK,
        lineHeight: 22,
    },
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
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 1,
        shadowRadius: 4,
    },
});