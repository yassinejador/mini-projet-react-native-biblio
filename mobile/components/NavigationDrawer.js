// components/NavigationDrawer.js
import React, { useContext } from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import BooksScreen from '../screens/BooksScreen';
import LoanScreen from '../screens/LoanScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import { AuthContext } from '../utils/AuthContext';
import { StyleSheet, View } from 'react-native';
import { Avatar, Caption, Title } from 'react-native-paper';
import GuestOnlyRoute from '../components/GuestOnlyRoute';


const Drawer = createDrawerNavigator();

export default function NavigationDrawer() {
  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawerContent {...props} isAuthenticated={isAuthenticated} logout={logout} />}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Books" component={BooksScreen} />
      <Drawer.Screen name="Loans" component={LoanScreen} />

      {!isAuthenticated && (
        <>
          <Drawer.Screen name="Login">
          {(props) => (
            <GuestOnlyRoute navigation={props.navigation}>
              <LoginScreen {...props} />
            </GuestOnlyRoute>
          )}
        </Drawer.Screen>

        <Drawer.Screen name="Register">
          {(props) => (
            <GuestOnlyRoute navigation={props.navigation}>
              <RegisterScreen {...props} />
            </GuestOnlyRoute>
          )}
        </Drawer.Screen>
        </>
      )}
    </Drawer.Navigator>
  );
}

function CustomDrawerContent(props) {
  const { isAuthenticated, logout } = props;

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.userInfoSection}>
          <Avatar.Image 
            source={require('../assets/profile-placeholder.png')}
            size={50}
          />
          <Title style={styles.title}>
            {isAuthenticated ? 'John Doe' : 'Welcome Guest'}
          </Title>
          <Caption style={styles.caption}>
            {isAuthenticated ? '@johndoe' : 'Please log in'}
          </Caption>
        </View>

        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      {/* 👇 Logout button pinned at bottom */}
      {isAuthenticated && (
        <View style={styles.bottomDrawerSection}>
          <DrawerItem
            label="Logout"
            onPress={logout}
            icon={({ color, size }) => (
              <Avatar.Icon icon="logout" size={size} color={color} style={{ backgroundColor: 'transparent' }} />
            )}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  userInfoSection: {
    paddingLeft: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  title: {
    marginTop: 20,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
    paddingTop: 10,
  },
});
