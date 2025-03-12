import { useState } from 'react';
import { Pressable, Text, StyleSheet, Animated, Clipboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export function CaixaToken({ token, removerToken }) {
    const [fadeAnim] = useState(new Animated.Value(1));

    function handleRemove() {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start(() => removerToken());
    }

    function copyToClipboard() {
        Clipboard.setString(token);
    }

    return (
        <Animated.View style={[styles.caixa, { opacity: fadeAnim }]}> 
            <Pressable style={styles.tokenContainer} onLongPress={copyToClipboard}>
                <Text style={styles.text}>{token}</Text>
            </Pressable>
            <Pressable onPress={handleRemove}>
                <Ionicons name="trash" size={24} color="red" />
            </Pressable>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    caixa: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        marginVertical: 5,
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    tokenContainer: {
        flex: 1,
    },
});
