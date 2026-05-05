// src/app/(tabs)/scanner.tsx
import { StyleSheet, View } from 'react-native';
import { Colors } from '@/constants/theme';

export default function ScannerScreen() {
    return <View style={styles.container} />;
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.background },
});
