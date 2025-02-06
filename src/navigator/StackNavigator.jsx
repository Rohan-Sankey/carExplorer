import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Image, StyleSheet } from 'react-native';

import CarGenreDropdown from '../screens/CarGenreDropdown';
import CarModelsScreen from '../screens/CarModelsScreen';
import CarDetailsScreen from '../screens/CarDetailsScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import TrendingScreen from '../screens/TrendingScreen';
import UserProfileScreen from '../screens/UserProfileScreen';

// Importing PNG icons
import homeIcon from '../assets/icons/home.png';
import favoriteIcon from '../assets/icons/favorite.png';
import trendingIcon from '../assets/icons/flash.png';
import profileIcon from '../assets/icons/user.png';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Home Stack Navigator
const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="CarGenre" component={CarGenreDropdown} />
    <Stack.Screen name="CarModels" component={CarModelsScreen} />
    <Stack.Screen name="CarDetails" component={CarDetailsScreen} />
  </Stack.Navigator>
);

const StackNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconSource;

          
          if (route.name === 'Home') {
            iconSource = homeIcon;
          } else if (route.name === 'Favorites') {
            iconSource = favoriteIcon;
          } else if (route.name === 'Trending') {
            iconSource = trendingIcon;
          } else if (route.name === 'Profile') {
            iconSource = profileIcon;
          }

          return <Image source={iconSource} style={[styles.icon, focused && styles.iconFocused]} />;
        },
      //  tabBarShowLabel: false,  // Hide tab labels for a cleaner look
        tabBarStyle: styles.tabBar,  // Custom styling for the tab bar
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
      <Tab.Screen name="Trending" component={TrendingScreen} />
      <Tab.Screen name="Profile" component={UserProfileScreen} />
    </Tab.Navigator>
  );
};

// Styles
const styles = StyleSheet.create({
  icon: {
    width: 28,  // Set a fixed width for icons
    height: 28, // Set a fixed height for icons
    tintColor: 'black', // Default color
  },
  iconFocused: {
    tintColor: '#007AFF', // Highlight color when active
  },
  tabBar: {
    backgroundColor: '#fff', // White background
    height: 60,  // Increased height for better UX
    paddingBottom: 5,  // Adjust spacing
  },
});

export default StackNavigator;
