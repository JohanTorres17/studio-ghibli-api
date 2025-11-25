import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';

export default function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	async function handleLogin() {
		setLoading(true);
		setError(null);
		try {
			await signInWithEmailAndPassword(auth, email.trim(), password);
		} catch (e) {
			setError('Error al iniciar sesión: ' + (e.message || e.code));
		} finally {
			setLoading(false);
		}
	}

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Iniciar sesión</Text>
			<TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} keyboardType="email-address" autoCapitalize="none" />
			<TextInput placeholder="Contraseña" value={password} onChangeText={setPassword} style={styles.input} secureTextEntry />
			{error ? <Text style={styles.error}>{error}</Text> : null}
			{loading ? <ActivityIndicator /> : <Button title="Entrar" onPress={handleLogin} />}
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, padding: 16, justifyContent: 'center' },
	title: { fontSize: 20, fontWeight: '700', marginBottom: 12, textAlign: 'center' },
	input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 6, paddingHorizontal: 8, height: 44, marginBottom: 12 },
	error: { color: 'red', marginBottom: 8 },
});

