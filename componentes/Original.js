import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextInput, Image, StyleSheet, ActivityIndicator, Alert } from 'react-native';

export default function Original() {
	const [films, setFilms] = useState([]);
	const [loading, setLoading] = useState(true);
	const [current, setCurrent] = useState(null);
	const [mode, setMode] = useState(null); // 'title' o 'year'
	const [guess, setGuess] = useState('');
	const [result, setResult] = useState(null);

	useEffect(() => {
		fetch('https://ghibliapi.vercel.app/films')
			.then((res) => res.json())
			.then((data) => setFilms(data))
			.catch((err) => console.error(err))
			.finally(() => setLoading(false));
	}, []);

	const pickRandom = () => {
		if (!films.length) return;
		const idx = Math.floor(Math.random() * films.length);
		setCurrent(films[idx]);
		setMode(null);
		setGuess('');
		setResult(null);
	};

	const startMode = (m) => {
		if (!current) pickRandom();
		setMode(m);
		setGuess('');
		setResult(null);
	};

	const submitGuess = () => {
		if (!current || !mode) return;
		if (mode === 'title') {
			const correct = current.title.trim().toLowerCase();
			const g = guess.trim().toLowerCase();
			setResult(g === correct ? '¡Correcto! Adivinaste el título.' : `Incorrecto. Era: ${current.title}`);
		} else if (mode === 'year') {
			const correct = String(current.release_date).trim();
			const g = guess.trim();
			setResult(g === correct ? '¡Correcto! Adivinaste el año.' : `Incorrecto. Era: ${current.release_date}`);
		}
	};

	if (loading) return (
		<View style={styles.center}><ActivityIndicator size="large" /></View>
	);

	return (
		<View style={styles.container}>
			<Text style={styles.header}>Juego Original (Ghibli)</Text>
			<View style={{marginBottom:10}}>
				<Button title="Nueva película" onPress={pickRandom} />
			</View>

			{current ? (
				<View style={styles.card}>
					{current.movie_banner ? <Image source={{ uri: current.movie_banner }} style={styles.image} /> : null}
					<Text style={styles.title}>{current.title}</Text>
					<Text style={styles.desc} numberOfLines={3}>{current.description}</Text>
					<Text style={styles.hint}>Pista: Director - {current.director} | Productor - {current.producer}</Text>
				</View>
			) : (
				<Text>Presiona "Nueva película" para comenzar.</Text>
			)}

			<View style={{height:10}} />
			<View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
				<Button title="Adivinar título" onPress={() => startMode('title')} />
				<Button title="Adivinar año" onPress={() => startMode('year')} />
			</View>

			{mode ? (
				<View style={{marginTop:12}}>
					<Text style={{marginBottom:6}}>Modo: {mode === 'title' ? 'Adivinar título' : 'Adivinar año'}</Text>
					<TextInput placeholder={mode === 'title' ? 'Escribe el título' : 'Escribe el año (ej. 1988)'} style={styles.input} value={guess} onChangeText={setGuess} />
					<Button title="Comprobar" onPress={submitGuess} />
				</View>
			) : null}

			{result ? (
				<View style={{marginTop:12}}>
					<Text style={styles.result}>{result}</Text>
					<View style={{height:8}} />
					<Button title="Siguiente película" onPress={pickRandom} />
				</View>
			) : null}
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, padding: 14, backgroundColor: '#fff' },
	header: { fontSize: 18, fontWeight: '700', marginBottom: 8 },
	card: { borderRadius: 8, overflow: 'hidden', backgroundColor: '#f7f7f7', padding: 8, marginBottom: 8 },
	image: { width: '100%', height: 140, marginBottom: 8 },
	title: { fontSize: 16, fontWeight: '600' },
	desc: { fontSize: 13, color: '#333', marginTop: 6 },
	hint: { marginTop: 8, fontSize: 12, color: '#666' },
	input: { borderWidth: 1, borderColor: '#ccc', padding: 8, borderRadius: 6, marginBottom: 8 },
	result: { fontSize: 15, fontWeight: '600' },
	center: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});

