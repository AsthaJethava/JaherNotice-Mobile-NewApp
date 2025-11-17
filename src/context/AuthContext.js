import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    const userId = await AsyncStorage.getItem("UserID");
    setIsLoggedIn(!!userId);
  };

  const login = async (userId) => {
    await AsyncStorage.setItem("UserID", String(userId));
    setIsLoggedIn(true);
  };

  const logout = async () => {
    await AsyncStorage.removeItem("UserID");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
