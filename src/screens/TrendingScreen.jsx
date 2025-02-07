import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator } from 'react-native';
import trendingCarsData from '../data/trendingCarsData'; 

const TrendingScreen = () => {
  const [trendingCars, setTrendingCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTrendingCars = () => {
      try {
        console.log('Fetching data...');  
        setTrendingCars(trendingCarsData);
        console.log('Fetched data:', trendingCarsData);  
      } catch (error) {
        console.error('Error fetching car data:', error);
      } finally {
        setIsLoading(false);
        console.log('Data fetching completed'); 
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

  console.log('Trending cars data:', trendingCars);  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trending Models</Text>
      <FlatList
        data={trendingCars}
        renderItem={({ item }) => (
          <View style={styles.carContainer}>
            <Image source={{ uri: item.imageUrl }} style={styles.image} />
            <View style={styles.textContainer}>
              <Text style={styles.modelText}>{item.model}</Text>
              <Text style={styles.makeText}>Manufacturer: {item.manufacturer}</Text>
              <Text style={styles.specText}>Price: ${item.price}</Text>
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
