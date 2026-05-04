import {View, Text, Pressable, StyleSheet} from 'react-native';
import {useRouter} from 'expo-router';

export default function Scanner() {

    const router = useRouter();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Mon CV</Text>

            <Pressable style={styles.button}
                       onPress={() => router.navigate('/ar-view')}>
                <Text style={styles.buttonText}>Voir en AR</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {

    },
    button: {

    },
    buttonText: {

    },

})