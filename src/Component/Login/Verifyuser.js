// /**
//  * Jaher Notice React Native App
//  **/

import React, { useState, useEffect } from 'react';
import { View, Text, LogBox, Appearance, StatusBar } from 'react-native';
import {
  Divider,
  HelperText,
  Button,
  TextInput,
  Modal,
  Portal,
  Provider,
} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Orientation,
  OrientationLocker,
  PORTRAIT,
  LANDSCAPE,
} from 'react-native-orientation-locker';
import Toast from 'react-native-toast-message';

function Verifyuser({ route, navigation }) {
  const [data, setData] = useState('');
  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [mobileno, setmobileno] = useState('');
  const [UserID, setUserID] = useState('');
  const [UserIDa, setUserIDa] = useState('');

  // Log Verify User Data
  const Getitem = async () => {
    const { FirstName, LastName, mobileno, UserID, otherParam } = route.params;
    // First Name
    setFirstName(FirstName);
    // Last Name
    setLastName(LastName);
    // mobileno
    setmobileno(mobileno);
    // mobileno
    setUserID(UserID);
    let UserIDa = await AsyncStorage.getItem('UserIDa');
    setUserIDa(UserIDa);
  };

  const [count, setCount] = useState(0);
  const [countInTimeout, setCountInTimeout] = useState(0);

  // SetTime Out Navigate DashBord

  // Ignore log notification by message
  LogBox.ignoreLogs(['Warning: ...']);

  //Ignore all log notifications
  LogBox.ignoreAllLogs();
  console.disableYellowBox = true;
  useEffect(() => {
    Getitem();
    if (UserID !== UserID) {
      setTimeout(() => {
        AsyncStorage.setItem('UserIDa', UserID);
        setCountInTimeout(count);
        setCount();
        navigation.navigate('Dashbord');
      }, 50);
    } else {
      setTimeout(() => {
        AsyncStorage.setItem('UserIDa', UserID);
        setCountInTimeout(count);
        setCount();
        navigation.navigate('Dashbord');
      }, 50);
    }
  });
  const [theme, setTheme] = useState('');

  useEffect(() => {
    const getColorScheme = () => {
      const colorScheme = Appearance.getColorScheme();
      if (colorScheme === 'dark') {
        setTheme('DARK');
      } else {
        setTheme('LIGHT');
      }
    };
    getColorScheme(); // Call the function immediately
    const listener = Appearance.addChangeListener(getColorScheme);
    return () => {
      listener.remove(); // Remove the change listener on component unmount
    };
  }, []);
  const statusBarBackgroundColor =
    theme === 'LIGHT' ? 'transparent' : '#343a40';

  function capitalizeFirstWord(str) {
    if (typeof str !== 'string') {
      return str;
    }
    const words = str.trim().split(' ');
    if (words.length === 0) {
      return str;
    }
    const capitalizedWords = words.map(word => {
      if (word.length === 0) {
        return word;
      }
      const capitalized = word.charAt(0).toUpperCase() + word.slice(1);
      return capitalized;
    });
    return capitalizedWords.join(' ');
  }

  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: theme === 'LIGHT' ? '#ffffff' : '#20272b',
        }}
      >
        <StatusBar animated={true} backgroundColor={statusBarBackgroundColor} />
        <OrientationLocker
          orientation={PORTRAIT}
          onChange={orientation => console.log('onChange', orientation)}
          onDeviceChange={orientation =>
            console.log('onDeviceChange', orientation)
          }
        />
        <View
          style={{
            textAlign: 'center',
            justifyItem: 'center',
            alignItems: 'center',
            marginTop: 'auto',
            marginBottom: 'auto',
            marginRight: 'auto',
            marginLeft: 'auto',
          }}
        >
          <Text
            style={{
              fontSize: 18,
              textAlign: 'center',
              color: theme === 'LIGHT' ? '#000' : '#ffffff',
            }}
          >
            User : {capitalizeFirstWord(FirstName)}{' '}
            {capitalizeFirstWord(LastName)}
          </Text>
          <Text
            style={{
              fontSize: 18,
              color: 'green',
              textAlign: 'center',
              marginTop: 15,
              color: theme === 'LIGHT' ? '#000' : '#ffffff',
            }}
          >
            Number Verified : {mobileno}
          </Text>
          <Button
            onPress={() => navigation.navigate('Dashbord')}
            mode="outlined"
            style={{
              textAlign: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: 'auto',
              marginRight: 'auto',
              marginTop: 20,
            }}
          >
            Go To Dashabord
          </Button>
        </View>
      </View>
    </>
  );
}

export default Verifyuser;
