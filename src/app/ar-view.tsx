import { Text, View, StyleSheet } from 'react-native';

const contentHTML =
    '<!DOCTYPE html><html lang="en"> <head> <meta charset="UTF-8"> <title>Title</title> </head><body> <a-marker type="pattern"/></body></html>';

export default function ArView() {
    return (
        <View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#25292e',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: '#fff',
    },
});

