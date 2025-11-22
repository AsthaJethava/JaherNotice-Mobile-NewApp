import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NavigationService from '../Navigation/NavigationService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    const userId = await AsyncStorage.getItem('UserID');
    setIsLoggedIn(!!userId);
  };

  const login = async userId => {
    await AsyncStorage.setItem('UserID', String(userId));
    setIsLoggedIn(true);
    // Make sure app switches to AuthorizedUser stack
    setTimeout(() => {
      NavigationService.navigate('AuthorizedUser');
    }, 100);
  };

  const logout = async () => {
    await AsyncStorage.removeItem('UserID');
    await AsyncStorage.removeItem('Token'); // remove OTP token too
    setIsLoggedIn(false);
    // Force navigation to UnAuthorizedUser stack
    setTimeout(() => {
      NavigationService.navigate('UnAuthorizedUser');
    }, 100);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
