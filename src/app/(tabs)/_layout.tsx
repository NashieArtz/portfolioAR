import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Tabs } from 'expo-router';
import React from 'react';
import { useColorScheme } from 'react-native';

import { AnimatedSplashOverlay } from '@/components/animated-icon';

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <AnimatedSplashOverlay />

            <Tabs
                tabBar={() => null}
                screenOptions={{ headerShown: false }}
            >
                <Tabs.Screen name="index"   options={{ title: 'Accueil' }} />
                <Tabs.Screen name="projets" options={{ title: 'Projets' }} />
                <Tabs.Screen name="about"   options={{ title: 'À propos' }} />
                <Tabs.Screen name="contact" options={{ title: 'Contact' }} />
                <Tabs.Screen name="scanner" options={{ title: 'Vue AR' }} />
            </Tabs>

        </ThemeProvider>
    );
}