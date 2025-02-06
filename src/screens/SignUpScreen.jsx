import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Invalid email format');
      return false;
    }
    setEmailError('');
    return true;
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError('Password must be at least 8 characters long and include letters, numbers, and a special character');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handleSignUp = async () => {
    if (!email || !username || !password) {
      Alert.alert('Error', 'Please fill out all fields!');
      return;
    }

    if (!validateEmail(email) || !validatePassword(password)) {
      return;
    }

    try {
      const response = await axios.get('https://67a0a40b5bcfff4fabe00d99.mockapi.io/users');
      const existingUser = response.data.find(user => user.email === email);

      if (existingUser) {
        Alert.alert('Error', 'Account already exists! Redirecting to login.');
        navigation.replace('Login');
        return;
      }

      await axios.post('https://67a0a40b5bcfff4fabe00d99.mockapi.io/users', { username, email, password });
      Alert.alert('Success', 'Account created! Please log in.');
      navigation.replace('Login');

    } catch (error) {
      Alert.alert('Error', 'Failed to create account.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          validateEmail(text);
        }}
        keyboardType="email-address"
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          validatePassword(text);
        }}
        secureTextEntry
      />
      {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.replace('Login')}>
        <Text style={styles.footerText}>
          Already have an account? <Text style={styles.footerLink}>Login</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#f5f5f5' },
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 30, color: '#333' },
  input: { width: '100%', height: 50, borderColor: '#ccc', borderWidth: 1, borderRadius: 10, marginBottom: 10, paddingHorizontal: 15, backgroundColor: '#fff', fontSize: 16 },
  errorText: { color: 'red', fontSize: 14, alignSelf: 'flex-start', marginLeft: 10, marginBottom: 10 },
  button: { width: '100%', height: 50, backgroundColor: '#4CAF50', borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginTop: 20 },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  footerText: { fontSize: 14, marginTop: 20, color: '#333' },
  footerLink: { color: '#4CAF50', fontWeight: 'bold' },
});

export default SignUpScreen;
