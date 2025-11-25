import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { auth } from '../firebase/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

export default function Perfil() {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [profile, setProfile] = useState(null);

	useEffect(() => {
		const u = auth.currentUser;
		setUser(u);
		if (u) cargarPerfil(u.uid);
		else setLoading(false);
	}, []);

	async function cargarPerfil(uid) {
		setLoading(true);
		try {
			const ref = doc(db, 'users', uid);
			const snap = await getDoc(ref);
			setProfile(snap.exists() ? snap.data() : null);
		} catch (e) {
			setProfile(null);
		} finally {
			setLoading(false);
		}
	}

	if (loading) return <ActivityIndicator style={{ flex: 1 }} />;

	if (!user) return (
		<View style={styles.container}>
			<Text>No hay usuario autenticado.</Text>
		</View>
	);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Perfil</Text>
			<Text style={styles.label}>Nombre: <Text style={styles.value}>{user.displayName || profile?.displayName || '—'}</Text></Text>
			<Text style={styles.label}>Email: <Text style={styles.value}>{user.email}</Text></Text>
			<Text style={styles.label}>UID: <Text style={styles.value}>{user.uid}</Text></Text>
			<View style={{ height: 12 }} />
			<Button title="Actualizar perfil" onPress={() => cargarPerfil(user.uid)} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, padding: 16 },
	title: { fontSize: 22, fontWeight: '700', marginBottom: 12 },
	label: { marginTop: 6 },
	value: { fontWeight: '600' },
});


