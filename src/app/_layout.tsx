import {Slot, Stack} from 'expo-router';
import {StatusBar} from 'react-native';

export default function _layout() {
    return (
            <Stack screenOptions={{headerShown: false}}>
                <Stack.Screen name="(tabs)" options={{title: 'Home', headerShown: false}}/>
                <Stack.Screen name="ar-view" options={{title: 'ArView', headerShown: false}}/>

            </Stack>
    );
}