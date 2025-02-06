import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  SafeAreaView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../redux/authSlice';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const UserProfileScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const user = useSelector((state) => state.auth.user);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchUserData(user.email);
    }
  }, [user]);

  const fetchUserData = async (userEmail) => {
    try {
      const response = await axios.get(
        `https://67a0a40b5bcfff4fabe00d99.mockapi.io/users?email=${userEmail}`
      );
      if (response.data.length > 0) {
        setUserData(response.data[0]);
      } else {
        Alert.alert('Error', 'User not found!');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to load user data!');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigation.navigate('LoginScreen');
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#4CAF50" style={styles.loader} />;
  }

  if (!userData) {
    return <Text style={styles.noDataText}>No user data available.</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Profile Image */}
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/icons/alien.png')}
          style={styles.profileImage}
        />
      </View>

      {/* Username */}
      <Text style={styles.username}>{userData.name || 'Username'}</Text>

      {/* Email Section */}
      <View style={styles.emailContainer}>
        <Image
          source={require('../assets/icons/email.png')} // Local image for email icon
          style={styles.emailIcon}
        />
        <Text style={styles.email}>{userData.email || 'abc@gmail.com'}</Text>
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataText: {
    fontSize: 18,
    color: '#ff0000',
    textAlign: 'center',
  },

  // Profile Image
  imageContainer: {
    marginTop: 50,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  profileImage: {
    width: 100,
    height: 100,
  },

  // Username
  username: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
  },

  // Email Section
  emailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
  },
  emailIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  email: {
    fontSize: 16,
    color: '#666',
  },

  // Logout Button
  logoutButton: {
    marginTop: 400,
    backgroundColor: '#ff3333',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default UserProfileScreen;
