import React, { useState } from 'react';
import { View, Button, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';

export default function Logout() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	async function handleLogout() {
		setLoading(true);
		setError(null);
		try {
			await signOut(auth);
		} catch (e) {
			setError('Error al cerrar sesión');
		} finally {
			setLoading(false);
		}
	}

	return (
		<View style={styles.container}>
			<Text style={styles.text}>Cerrar sesión</Text>
			{error && <Text style={styles.error}>{error}</Text>}
			{loading ? <ActivityIndicator /> : <Button title="Cerrar sesión" onPress={handleLogout} />}
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, justifyContent: 'center', padding: 16 },
	text: { fontSize: 18, marginBottom: 12, textAlign: 'center' },
	error: { color: 'red', marginBottom: 8 },
});


