import {View, Text, Pressable, StyleSheet, Button} from 'react-native';
import {useRouter} from 'expo-router';
import {Spacing} from '@/constants/theme';

export default function Scanner() {

    const router = useRouter();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Mon CV</Text>

            <Pressable style={styles.button}
                       onPress={() => router.navigate('/ar-view')}>
                <Text style={styles.buttonText}>Voir en AR</Text>
            </Pressable>

            <Button
                    title="Voir en AR"
                    onPress={() => router.navigate('/ar-view')}>
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {},
    button: {
        marginTop: Spacing.five,
        padding: 5,
        borderStyle: 'solid',
        borderColor: 'gray',
        borderWidth: 3,
    },
    buttonText: {},

})