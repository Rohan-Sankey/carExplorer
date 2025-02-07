import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  FlatList,
  SafeAreaView,
} from 'react-native';
import carData from '../data/homeScreenCars'; 

const CarGenreMenu = ({ navigation }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [filteredCars, setFilteredCars] = useState(carData);

  // Debouncing 
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchText);
    }, 300);

    return () => clearTimeout(handler); 
  }, [searchText]);

 
  useEffect(() => {
    setFilteredCars(
      carData.filter((car) =>
        car.model.toLowerCase().includes(debouncedSearch.toLowerCase())
      )
    );
  }, [debouncedSearch]);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleGenreSelect = (genre) => {
    navigation.navigate('CarModels', { genre });
    setIsMenuOpen(false);
  };

  return (
    <SafeAreaView style={styles.container}>
  
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search Model"
          value={searchText}
          onChangeText={setSearchText}
        />
        <TouchableOpacity style={styles.menuButton} onPress={handleMenuToggle}>
          <Image
            source={require('../assets/icons/burger-bar.png')}
            style={styles.menuImage}
          />
        </TouchableOpacity>
      </View>

    
      {isMenuOpen && (
        <View style={styles.menu}>
          {['Modern', 'Sports', 'Classic', 'Electric'].map((genre) => (
            <TouchableOpacity
              key={genre}
              style={styles.menuItem}
              onPress={() => handleGenreSelect(genre.toLowerCase())}
            >
              <Text style={styles.menuText}>{genre}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.collapseButton} onPress={handleMenuToggle}>
            <Text style={styles.menuText}>Collapse</Text>
          </TouchableOpacity>
        </View>
      )}

      
      <FlatList
        data={filteredCars}
        renderItem={({ item }) => (
          <View style={styles.carCard}>
            <Image source={{ uri: item.imageUrl }} style={styles.carImage} />
            <Text style={styles.carName}>{item.model}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={styles.noResultsText}>No matching cars found.</Text>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9' },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    height: 60,
    elevation: 2,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  searchBar: {
    height: 40,
    flex: 1,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  menuButton: { paddingLeft: 10 },
  menuImage: { width: 24, height: 30, resizeMode: 'contain' },
  menu: {
    position: 'absolute',
    top: 60,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 10,
    zIndex: 2,
    elevation: 3,
  },
  menuItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  collapseButton: { padding: 10 },
  menuText: { fontSize: 16, color: '#333' },
  listContent: {
    paddingTop: 80,
    paddingBottom: 20,
    paddingHorizontal: 10,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  carCard: {
    flex: 1,
    margin: 8,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  carImage: {
    width: 120,
    height: 140,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  carName: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  noResultsText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default CarGenreMenu;
