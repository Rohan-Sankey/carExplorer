import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux'; 
import { useSelector } from 'react-redux';
import store from './src/redux/store';
import AuthNavigator from './src/navigator/AuthNavigator';
import StackNavigator from './src/navigator/StackNavigator';

const MainApp = () => {
  const user = useSelector((state: any) => state.auth.user);  

  return (
    <NavigationContainer>
      {user ? <StackNavigator /> : <AuthNavigator setIsAuthenticated={undefined} />}
    </NavigationContainer>
  );
};

const App = () => (
  <Provider store={store}> 
    <SafeAreaProvider>
      <MainApp />
    </SafeAreaProvider>
  </Provider>
);

export default App;
