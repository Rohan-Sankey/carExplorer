import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';

const CarGenreMenu = ({ navigation }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchText, setSearchText] = useState('');

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleGenreSelect = (genre) => {
    // Navigate to CarModelsScreen with the selected genre
    navigation.navigate('CarModels', { genre });
    setIsMenuOpen(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Search Bar and Menu */}
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search Model"
          value={searchText}
          onChangeText={setSearchText}
        />
        <TouchableOpacity style={styles.menuButton} onPress={handleMenuToggle}>
          <Image
            source={require('../assets/icons/burger-bar.png')} // Local menu icon
            style={styles.menuImage}
          />
        </TouchableOpacity>
      </View>

      {/* Genre Menu */}
      {isMenuOpen && (
        <View style={styles.menu}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => handleGenreSelect('modern')}
          >
            <Text style={styles.menuText}>Modern</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => handleGenreSelect('sports')}
          >
            <Text style={styles.menuText}>Sports</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => handleGenreSelect('classic')}
          >
            <Text style={styles.menuText}>Classic</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => handleGenreSelect('electric')}
          >
            <Text style={styles.menuText}>Electric</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.collapseButton} onPress={handleMenuToggle}>
            <Text style={styles.menuText}>Collapse</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Car Grid - Currently static as no data is fetched */}
      <FlatList
        data={[1, 2, 3]}
        renderItem={({ item }) => (
          <View style={styles.carCard}>
            <Text style={styles.carName}>Car {item}</Text>
          </View>
        )}
        keyExtractor={(item) => item.toString()}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContent}
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
    paddingHorizontal: 10,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  carCard: {
    flex: 1,
    margin: 5,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    elevation: 2,
  },
  carName: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default CarGenreMenu;
