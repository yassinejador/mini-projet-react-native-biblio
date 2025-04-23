// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './utils/AuthContext';
import NavigationDrawer from './components/NavigationDrawer';

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <NavigationDrawer />
      </NavigationContainer>
    </AuthProvider>
  );
}
