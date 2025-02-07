import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { removeFavorite } from '../redux/favoritesSlice';

import starIcon from '../assets/icons/star.png';
import favoriteIcon from '../assets/icons/favorite.png';

const FavoriteScreen = ({ navigation }) => {
  const favorites = useSelector((state) => state.favorites.favorites);
  const dispatch = useDispatch();

  const handleRemoveFavorite = (car) => {
    dispatch(removeFavorite(car));
  };

  const renderCarItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('CarDetails', { car: item })}
      style={styles.itemContainer}
    >
      <View style={styles.imageContainer}>
        <Image source={item.image} style={styles.image} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.modelText}>{item.model}</Text>
        <Text style={styles.makeText}>{item.make}</Text>
        <Text style={styles.specText}>{item.power}</Text>
        <Text style={styles.specText}>{item.price}</Text>
      </View>

      
      <TouchableOpacity
        onPress={() => handleRemoveFavorite(item)}
        style={styles.favoriteIcon}
      >
        <Image 
          source={favoriteIcon} 
          style={styles.icon} 
          key={`fav-${item.model}`}  
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {favorites.length > 0 ? (
        <FlatList
          data={favorites}
          renderItem={renderCarItem}
          keyExtractor={(item) => `${item.make}-${item.model}`}
        />
      ) : (
        <Text style={styles.noFavoritesText}>No favorite cars yet.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f8f9fa',
  },
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#f1f3f5',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    flex: 1,
    marginLeft: 15,
  },
  modelText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212529',
  },
  makeText: {
    fontSize: 14,
    color: '#495057',
  },
  specText: {
    fontSize: 12,
    color: '#868e96',
    fontWeight: '500',
  },
  favoriteIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  icon: {
    width: 28,
    height: 28,
    tintColor: '#FFD700', 
  },
  noFavoritesText: {
    fontSize: 18,
    color: '#6c757d',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default FavoriteScreen;
