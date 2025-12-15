/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React, { useEffect, useState } from 'react';
import Navigation from './src/Navigation/Navigation.js';
import Toast from 'react-native-toast-message';
import './src/firebaseConfig';
import { LogBox } from 'react-native';
import { AuthProvider } from './src/context/AuthContext';
import {
  requestUserPermission,
  getFcmToken,
  notificationListener,
  createNotificationChannel,
} from './src/firebaseConfig';
import RNBootSplash from 'react-native-bootsplash';

function App() {
  useEffect(() => {
    RNBootSplash.hide({ fade: true });
  }, []);

  useEffect(() => {
    createNotificationChannel();
    requestUserPermission();
    getFcmToken();
    notificationListener();
  }, []);

  // Ignore log notification by message
  LogBox.ignoreLogs(['Warning: ...']);

  // Ignore all log notifications
  LogBox.ignoreAllLogs();
  console.disableYellowBox = true;
  // const getFileExtension = fileUrl => {
  //   return /[.]/.exec(fileUrl) ? /[^.]+$/.exec(fileUrl) : undefined;
  // };

  return (
    <>
      <AuthProvider>
        <Navigation />
      </AuthProvider>
      <Toast />
    </>
  );
}

export default App;
