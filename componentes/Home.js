import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native';

export default function Home() {
	const [films, setFilms] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetch('https://ghibliapi.vercel.app/films')
			.then((res) => res.json())
			.then((data) => setFilms(data))
			.catch((err) => console.error(err))
			.finally(() => setLoading(false));
	}, []);

	const renderItem = ({ item }) => (
		<View style={styles.card}>
			{item.movie_banner ? (
				<Image source={{ uri: item.movie_banner }} style={styles.image} resizeMode="cover" />
			) : null}
			<View style={styles.cardBody}>
				<Text style={styles.title}>{item.title} ({item.release_date})</Text>
				<Text numberOfLines={3} style={styles.description}>{item.description}</Text>
			</View>
		</View>
	);

	if (loading) return (
		<View style={styles.center}><ActivityIndicator size="large" /></View>
	);

	return (
		<View style={styles.container}>
			<Text style={styles.header}>Películas - Studio Ghibli API</Text>
			<FlatList
				data={films}
				keyExtractor={(item) => item.id}
				renderItem={renderItem}
				contentContainerStyle={{ paddingBottom: 24 }}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, padding: 12, backgroundColor: '#fff' },
	header: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
	card: { marginBottom: 12, borderRadius: 8, overflow: 'hidden', backgroundColor: '#f7f7f7' },
	image: { width: '100%', height: 160 },
	cardBody: { padding: 10 },
	title: { fontSize: 16, fontWeight: '600', marginBottom: 6 },
	description: { fontSize: 13, color: '#444' },
	center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

