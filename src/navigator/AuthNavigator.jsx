import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';  
import SignUpScreen from '../screens/SignUpScreen';  

const Stack = createStackNavigator();

const AuthNavigator = ({ setIsAuthenticated }) => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login">
        {(props) => <LoginScreen {...props} setIsAuthenticated={setIsAuthenticated} />}
      </Stack.Screen>
      <Stack.Screen name="SignUp" component={SignUpScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
