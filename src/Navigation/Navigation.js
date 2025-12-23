import React, { useEffect, useState, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ActivityIndicator, View, LogBox } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AuthorizedUser from '../AuthorizedUser/AuthorizedUser';
import UnAuthorizedUser from '../UnAuthorizedUser/UnAuthorizedUser';
import NavigationService from './NavigationService';
import { AuthContext } from '../context/AuthContext';

const Navigation = () => {
  const Stack = createNativeStackNavigator();

  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  // Check storage once when app starts
  const checkLoginStatus = async () => {
    try {
      const UserID = await AsyncStorage.getItem('UserID');
      const Token = await AsyncStorage.getItem('Token');

      if (UserID && Token) {
        setIsLoggedIn(true); // User is logged in
      } else {
        setIsLoggedIn(false); // User is logged out
      }
    } catch (err) {
      console.log('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  LogBox.ignoreAllLogs();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer ref={NavigationService.navigationRef}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {isLoggedIn ? (
            // USER IS LOGGED IN → SHOW AUTHORIZED STACK
            <Stack.Screen name="AuthorizedUser" component={AuthorizedUser} />
          ) : (
            // USER IS NOT LOGGED IN → SHOW UNAUTHORIZED STACK
            <Stack.Screen
              name="UnAuthorizedUser"
              component={UnAuthorizedUser}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default Navigation;
