// src/app/(tabs)/_layout.tsx
//
// Déclare les écrans de la navigation par onglets.
// tabBar={() => null = on cache la barre native d'Expo,
// notre drawer custom dans app-tabs.web.tsx la remplace sur le web.

import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
    return (
        <Tabs
            tabBar={() => null}
            screenOptions={{ headerShown: false }}
        >
            {/* Chaque Tabs.Screen = une route */}
            {/* En PHP : $router->add('/accueil', AccueilController) */}
            <Tabs.Screen name="index"   options={{ title: 'Accueil' }} />
            <Tabs.Screen name="projets" options={{ title: 'Projets' }} />
            <Tabs.Screen name="about"   options={{ title: 'À propos' }} />
            <Tabs.Screen name="contact" options={{ title: 'Contact' }} />
            <Tabs.Screen name="scanner" options={{ title: 'Vue AR' }} />
        </Tabs>
    );
}
