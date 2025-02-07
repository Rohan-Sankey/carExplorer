import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  FlatList, 
  Image, 
  StyleSheet, 
  ActivityIndicator 
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../redux/favoritesSlice';
import { carData } from '../data/carData';

// 🔹 Import your custom star icons
import starIcon from '../assets/icons/star.png';
import favoriteIcon from '../assets/icons/favorite.png';

const CarModelsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const { genre } = route.params || {};
  const favorites = useSelector((state) => state.favorites.favorites);

  useEffect(() => {
    console.log("Route params:", route.params);
  }, [route.params]);

  if (!genre || !carData[genre]) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No cars available for this genre.</Text>
      </View>
    );
  }

  const carsForSelectedGenre = Array.isArray(carData[genre]) ? carData[genre] : [];

  const handleCarSelect = (car) => {
    navigation.navigate('CarDetails', { car });
  };

  const handleFavoriteToggle = (car) => {
    const isFavorite = favorites.some((fav) => fav.model === car.model);
    if (isFavorite) {
      dispatch(removeFavorite(car));
    } else {
      dispatch(addFavorite(car));
    }
  };

  const getStarIconColor = (car) => {
    const isFavorite = favorites.some((fav) => fav.model === car.model);
    return isFavorite ? '#FFD700' : '#6c757d';  // Golden if favorite, grey if not
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={carsForSelectedGenre}
        keyExtractor={(item) => `${item.make}-${item.model}-${Math.random()}`}
        ListEmptyComponent={<Text>No cars available for this genre.</Text>}
        renderItem={({ item }) => {
          const isFavorite = favorites.some((fav) => fav.model === item.model);

          return (
            <TouchableOpacity
              onPress={() => handleCarSelect(item)}
              style={styles.itemContainer}
              activeOpacity={0.7}
            >
              <Image source={item.image} style={styles.image} />

              <View style={styles.textContainer}>
                <Text style={styles.modelText}>{item.model}</Text>
                <Text style={styles.makeText}>{item.make}</Text>
                <View style={styles.specContainer}>
                  <Text style={styles.specText}>{item.power}</Text>
                  <Text style={styles.specText}>{item.price}</Text>
                </View>
              </View>

              
              <TouchableOpacity
                style={styles.favoriteIcon}
                onPress={() => handleFavoriteToggle(item)}
              >
                <Image 
                  source={starIcon} 
                  style={[styles.icon, { tintColor: getStarIconColor(item) }]} 
                  key={isFavorite ? 'fav' : 'not-fav'}  
                />
              </TouchableOpacity>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f8f9fa',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  errorText: {
    fontSize: 18,
    color: '#6c757d',
    fontFamily: 'System',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: 12,
    padding: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    backgroundColor: '#f1f3f5',
  },
  textContainer: {
    flex: 1,
    marginLeft: 15,
  },
  modelText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 4,
  },
  makeText: {
    fontSize: 14,
    color: '#495057',
    marginBottom: 8,
  },
  specContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 10,
  },
  specText: {
    fontSize: 12,
    color: '#868e96',
    fontWeight: '500',
  },
  favoriteIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  icon: {
    width: 28,  // Adjust size if needed
    height: 28,
  },
});

export default CarModelsScreen;
