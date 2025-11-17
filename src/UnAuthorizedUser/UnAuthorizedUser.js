import React, { useEffect, useState } from 'react';
import { LogBox } from 'react-native';
import Toast from 'react-native-toast-message';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../Component/Login/Login.js';
import Verifyuser from '../Component/Login/Verifyuser';
import Otp from '../Component/Login/Otp.js';
import LernmoreDashbord from '../Component/LernmoreDashbord/LernmoreDashbord.js';
import PropertyProtectiontext from '../Component/LernmoreDashbord/PropertyProtectiontext.js';
import TiteleSearchtext from '../Component/LernmoreDashbord/TiteleSearchtext.js';
import LandRecordstext from '../Component/LernmoreDashbord/LandRecordstext.js';
import AreaAlerttext from '../Component/LernmoreDashbord/AreaAlerttext.js';
import Ipvrtext from '../Component/LernmoreDashbord/Ipvrtext.js';
import RegisterdSearchtext from '../Component/LernmoreDashbord/RegisterdSearchtext.js';
import AajniJNtext from '../Component/LernmoreDashbord/AajniJNtext.js';
import TpAlerts from '../Component/LernmoreDashbord/TpAlerts.js';
import AuctionAlert from '../Component/LernmoreDashbord/AuctionAlert.js';
import { Appearance, View } from 'react-native';

const UnAuthorizedUser = () => {
  const Stack = createNativeStackNavigator();

  // Ignore log notification by message
  LogBox.ignoreLogs(['Warning: ...']);
  //Ignore all log notifications
  LogBox.ignoreAllLogs();
  console.disableYellowBox = true;

  // #484c54
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

  return (
    <>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Verifyuser"
          component={Verifyuser}
          options={{ headerShown: false, headerBackTitleVisible: false }}
        />
        <Stack.Screen
          name="Otp"
          component={Otp}
          // options={{headerShown: false}}
          options={{
            headerTitle: 'VERIFY ACCOUNT',
            headerStyle: {
              backgroundColor: theme === 'LIGHT' ? '#b83725' : '#343a40',
              color: '#FFF', //Set Header color
            },
            headerTitleStyle: {
              color: 'white',
              fontWeight: 'bold',
            },
            headerTintColor: 'white',
            headerBackTitleVisible: false,
          }}
        />
        <Stack.Screen
          name="LernmoreDashbord"
          component={LernmoreDashbord}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PropertyProtectiontext"
          component={PropertyProtectiontext}
          options={{
            headerTitle: 'ABOUT PROPERTY PROTEVTION',
            headerStyle: {
              backgroundColor: theme === 'LIGHT' ? '#b83725' : '#343a40',
              color: '#FFF', //Set Header color
            },
            headerTitleStyle: {
              color: 'white',
              fontWeight: 'bold',
            },
            headerTintColor: 'white',
            headerBackTitleVisible: false,
          }}
        />
        <Stack.Screen
          name="TiteleSearchtext"
          component={TiteleSearchtext}
          options={{
            headerTitle: 'ABOUT TITLE SEARCH',
            headerStyle: {
              backgroundColor: theme === 'LIGHT' ? '#b83725' : '#343a40',
              color: '#FFF', //Set Header color
            },
            headerTitleStyle: {
              color: 'white',
              fontWeight: 'bold',
            },
            headerTintColor: 'white',
            headerBackTitleVisible: false,
          }}
        />
        <Stack.Screen
          name="LandRecordstext"
          component={LandRecordstext}
          options={{
            headerTitle: 'ABOUT LAND RECORDS',
            headerStyle: {
              backgroundColor: theme === 'LIGHT' ? '#b83725' : '#343a40',
              color: '#FFF', //Set Header color
            },
            headerTitleStyle: {
              color: 'white',
              fontWeight: 'bold',
            },
            headerTintColor: 'white',
            headerBackTitleVisible: false,
          }}
        />
        <Stack.Screen
          name="AreaAlerttext"
          component={AreaAlerttext}
          options={{
            headerTitle: 'ABOUT AREA ALERTS',
            headerStyle: {
              backgroundColor: theme === 'LIGHT' ? '#b83725' : '#343a40',
              color: '#FFF', //Set Header color
            },
            headerTitleStyle: {
              color: 'white',
              fontWeight: 'bold',
            },
            headerTintColor: 'white',
            headerBackTitleVisible: false,
          }}
        />
        <Stack.Screen
          name="Ipvrtext"
          component={Ipvrtext}
          options={{
            headerTitle: 'ABOUT IPVR',
            headerStyle: {
              backgroundColor: theme === 'LIGHT' ? '#b83725' : '#343a40',
              color: '#FFF', //Set Header color
            },
            headerTitleStyle: {
              color: 'white',
              fontWeight: 'bold',
            },
            headerTintColor: 'white',
            headerBackTitleVisible: false,
          }}
        />
        <Stack.Screen
          name="RegisterdSearchtext"
          component={RegisterdSearchtext}
          options={{
            headerTitle: 'ABOUT REGISTERED SEARCH',
            headerStyle: {
              backgroundColor: theme === 'LIGHT' ? '#b83725' : '#343a40',
              color: '#FFF', //Set Header color
            },
            headerTitleStyle: {
              color: 'white',
              fontWeight: 'bold',
            },
            headerTintColor: 'white',
            headerBackTitleVisible: false,
          }}
        />
        <Stack.Screen
          name="AajniJNtext"
          component={AajniJNtext}
          options={{
            headerTitle: 'ABOUT AAJNI JAHERNOTICE',
            headerStyle: {
              backgroundColor: theme === 'LIGHT' ? '#b83725' : '#343a40',
              color: '#FFF', //Set Header color
            },
            headerTitleStyle: {
              color: 'white',
              fontWeight: 'bold',
            },
            headerTintColor: 'white',
            headerBackTitleVisible: false,
          }}
        />
        <Stack.Screen
          name="TpAlerts"
          component={TpAlerts}
          options={{
            headerTitle: 'ABOUT TP ALERTS',
            headerStyle: {
              backgroundColor: theme === 'LIGHT' ? '#b83725' : '#343a40',
              color: '#FFF', //Set Header color
            },
            headerTitleStyle: {
              color: 'white',
              fontWeight: 'bold',
            },
            headerTintColor: 'white',
            headerBackTitleVisible: false,
          }}
        />
        <Stack.Screen
          name="AuctionAlert"
          component={AuctionAlert}
          options={{
            headerTitle: 'Auction Alert',
            headerStyle: {
              backgroundColor: theme === 'LIGHT' ? '#b83725' : '#343a40',
              color: '#FFF', //Set Header color
            },
            headerTitleStyle: {
              color: 'white',
              fontWeight: 'bold',
            },
            headerTintColor: 'white',
            headerBackTitleVisible: false,
          }}
        />
      </Stack.Navigator>
      <Toast />
    </>
  );
};

export default UnAuthorizedUser;
