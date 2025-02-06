import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/authSlice';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch(); // ✅ Use Redux dispatch

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Enter email and password!');
      return;
    }

    try {
      const response = await axios.get('https://67a0a40b5bcfff4fabe00d99.mockapi.io/users');
      const user = response.data.find(u => u.email === email && u.password === password);

      if (!user) {
        Alert.alert('Error', 'Invalid credentials!');
        return;
      }

      Alert.alert('Success', 'Login successful!');
      dispatch(setUser(user)); // ✅ Store user in Redux
    } catch (error) {
      Alert.alert('Error', 'Login failed!');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.replace('SignUp')}>
        <Text style={styles.footerText}>Don't have an account? <Text style={styles.footerLink}>Sign Up</Text></Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#f5f5f5' },
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 30, color: '#333' },
  input: { width: '100%', height: 50, borderColor: '#ccc', borderWidth: 1, borderRadius: 10, marginBottom: 15, paddingHorizontal: 15, backgroundColor: '#fff', fontSize: 16 },
  button: { width: '100%', height: 50, backgroundColor: '#4CAF50', borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginTop: 20 },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  footerText: { fontSize: 14, marginTop: 20, color: '#333' },
  footerLink: { color: '#4CAF50', fontWeight: 'bold' },
});

export default LoginScreen;
