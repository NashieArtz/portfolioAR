import {Stack} from 'expo-router';
import {StatusBar} from 'react-native';

export default function _layout() {
    return (
            <Stack screenOptions={{headerShown: false}}>
                <Stack.Screen name="(tabs)" options={{title: 'Home'}}/>
                <Stack.Screen name="test" options={{title: 'Test'}}/>
            </Stack>
    );
}