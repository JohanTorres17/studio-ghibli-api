import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/firebaseConfig';

export default function Registro() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [displayName, setDisplayName] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	async function handleRegistro() {
		setLoading(true);
		setError(null);
		try {
			const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), password);
			const user = userCredential.user;
			if (displayName) {
				await updateProfile(user, { displayName });
			}
			// Guardar perfil básico en Firestore
			await setDoc(doc(db, 'users', user.uid), {
				uid: user.uid,
				email: user.email,
				displayName: displayName || null,
				createdAt: new Date().toISOString(),
			});
		} catch (e) {
			setError('Error al registrarse: ' + (e.message || e.code));
		} finally {
			setLoading(false);
		}
	}

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Registro</Text>
			<TextInput placeholder="Nombre" value={displayName} onChangeText={setDisplayName} style={styles.input} />
			<TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} keyboardType="email-address" autoCapitalize="none" />
			<TextInput placeholder="Contraseña" value={password} onChangeText={setPassword} style={styles.input} secureTextEntry />
			{error ? <Text style={styles.error}>{error}</Text> : null}
			{loading ? <ActivityIndicator /> : <Button title="Crear cuenta" onPress={handleRegistro} />}
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, padding: 16, justifyContent: 'center' },
	title: { fontSize: 20, fontWeight: '700', marginBottom: 12, textAlign: 'center' },
	input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 6, paddingHorizontal: 8, height: 44, marginBottom: 12 },
	error: { color: 'red', marginBottom: 8 },
});

