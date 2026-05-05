import {Stack} from 'expo-router';
import React from 'react';

import AppTabs from '@/components/app-tabs';

export default function RootLayout() {
    return (
        <>
            <Stack screenOptions={{headerShown: false}}>
                <Stack.Screen name="(tabs)" options={{
                    title: 'Home',
                    headerShown: false,
                    contentStyle: {backgroundColor: 'transparent'}
                }}/>
                <Stack.Screen name="ar-view" options={{title: 'ArView', headerShown: false}}/>
            </Stack>
            <AppTabs/>
        </>
    );
}