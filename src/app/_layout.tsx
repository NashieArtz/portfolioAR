// src/app/_layout.tsx

import { Stack } from 'expo-router';
import React from 'react';
import { View, StyleSheet } from 'react-native';

import { Colors } from '@/constants/theme';
import AppTabs from '@/components/app-tabs';

export default function RootLayout() {
    return (
        <View style={styles.root}>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="(tabs)"  options={{ headerShown: false }} />
                <Stack.Screen name="ar-view" options={{ headerShown: false }} />
            </Stack>

            {/* AppTabs s'affiche PAR-DESSUS toutes les pages */}
            <AppTabs />
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: Colors.background,
    },
});