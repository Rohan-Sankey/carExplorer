import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator } from 'react-native';

const TrendingScreen = () => {
  const [trendingCars, setTrendingCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTrendingCars = async () => {
      try {
        const response = await fetch('https://api.api-ninjas.com/v1/cars?limit=5', {
          headers: { 'X-Api-Key': 'tED9kAmK8i21p8T0iac5Eg==xRwH2ESuSnewxivc' },
        });
        const data = await response.json();
        setTrendingCars(data);
      } catch (error) {
        console.error('Error fetching car data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrendingCars();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trending Models</Text>
      <FlatList
        data={trendingCars}
        renderItem={({ item }) => (
          <View style={styles.carContainer}>
            {/* Display car image */}
            <Image source={{ uri: item.image_url }} style={styles.image} />
            <View style={styles.textContainer}>
              {/* Display car details */}
              <Text style={styles.modelText}>{item.model}</Text>
              <Text style={styles.makeText}>Make: {item.make}</Text>
              <Text style={styles.specText}>Power: {item.power}</Text>
              <Text style={styles.specText}>Price: {item.price}</Text>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.model}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  carContainer: { flexDirection: 'row', marginBottom: 15 },
  image: { width: 100, height: 100, borderRadius: 8, marginRight: 15 },
  textContainer: { justifyContent: 'center' },
  modelText: { fontSize: 18, fontWeight: 'bold' },
  makeText: { fontSize: 14, color: '#555' },
  specText: { fontSize: 12, color: '#777' },
});

export default TrendingScreen;
