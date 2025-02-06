import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import PropTypes from 'prop-types';

const { height } = Dimensions.get('window');

const CarDetailsScreen = ({ route }) => {
  const { car } = route.params;

  return (
    <View style={styles.container}>
      {/* Image takes half of the screen */}
      <Image source={car.image} style={styles.image} resizeMode="cover" />
      <View style={styles.detailsContainer}>
        <Text style={styles.modelText}>{car.model}</Text>
        <Text style={styles.makeText}>Make: {car.make}</Text>
        <Text style={styles.specText}>Power: {car.power}</Text>
        <Text style={styles.specText}>Price: {car.price}</Text>
        <Text style={styles.specText}>Mileage: {car.mileage}</Text>
      </View>
    </View>
  );
};

CarDetailsScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      car: PropTypes.shape({
        make: PropTypes.string.isRequired,
        model: PropTypes.string.isRequired,
        image: PropTypes.any.isRequired, // local image loaded via require
        power: PropTypes.string.isRequired,
        price: PropTypes.string.isRequired,
        mileage: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: height / 2, // Image occupies half of the screen height
  },
  detailsContainer: {
    flex: 1,
    padding: 15,
    alignItems: 'center',
  },
  modelText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  makeText: {
    fontSize: 18,
    marginBottom: 5,
  },
  specText: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default CarDetailsScreen;
