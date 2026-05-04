// src/app/_layout.tsx
//
// C'est le layout RACINE — il enveloppe toute l'application.
// En PHP : c'est ton header.php/footer.php inclus sur toutes les pages.
//
// On place AppTabs ici pour qu'il soit visible sur toutes les pages,
// peu importe l'écran affiché.

import { Stack } from 'expo-router';
import React from 'react';

import AppTabs from '@/components/app-tabs';

export default function RootLayout() {
    return (
<<<<<<< Updated upstream
        <>
            {/* Le Stack gère la navigation entre les pages */}
            {/* En PHP : c'est le router qui inclut le bon fichier */}
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="ar-view" options={{ headerShown: false }} />
=======
            <Stack screenOptions={{headerShown: false}}>
                <Stack.Screen name="(tabs)" options={{title: 'Home', headerShown: false, contentStyle : {backgroundColor: 'transparent'}}}/>
                <Stack.Screen name="ar-view" options={{title: 'ArView', headerShown: false}}/>

>>>>>>> Stashed changes
            </Stack>

            {/* AppTabs s'affiche PAR-DESSUS toutes les pages */}
            {/* En PHP : include 'nav.php'; à la fin du body */}
            <AppTabs />
        </>
    );
}