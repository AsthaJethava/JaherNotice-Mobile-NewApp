/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/Component/Login/Login.js';
import Otp from './src/Component/Login/Otp.js';
import LernmoreDashbord from './src/Component/LernmoreDashbord/LernmoreDashbord.js';
import PropertyProtectiontext from './src/Component/LernmoreDashbord/PropertyProtectiontext.js';
import TiteleSearchtext from './src/Component/LernmoreDashbord/TiteleSearchtext.js';
import LandRecordstext from './src/Component/LernmoreDashbord/LandRecordstext.js';
import AreaAlerttext from './src/Component/LernmoreDashbord/AreaAlerttext.js';
import Ipvrtext from './src/Component/LernmoreDashbord/Ipvrtext.js';
import RegisterdSearchtext from './src/Component/LernmoreDashbord/RegisterdSearchtext.js';
import AajniJNtext from './src/Component/LernmoreDashbord/AajniJNtext.js';
import TpAlerts from './src/Component/LernmoreDashbord/TpAlerts.js';
import AuctionAlert from './src/Component/LernmoreDashbord/AuctionAlert.js';
import Dashbord from './src/Component/DashboardComponent/Dashboard/Dashboard.js';
import Protectedproperties from './src/Component/PropertyComponent/Protectedproperties/Protectedproperties.js';
import AddProperty from './src/Component/PropertyComponent/AddNewProperty/AddNewPropertyy';
import Ahmedabad from './src/Component/PropertyComponent/PropertyToDistrict/PropertyToDistrict';
import Propertie from './src/Component/DashboardComponent/Dashbordimg/Propertie';
import Titelimag from './src/Component/DashboardComponent/Dashbordimg/Titelimag';
import Landimg from './src/Component/DashboardComponent/Dashbordimg/Landimg';
import Areaimg from './src/Component/DashboardComponent/Dashbordimg/Areaimg';
import Viewa from './src/Component/PropertyComponent/VIEW/View';
import Viewimge from './src/Component/PropertyComponent/Viewimg/Viewimg';
import EditPropertyDetails from './src/Component/PropertyComponent/EditPropertyDetails/EditPropertyDetailss';
import BPPalert from './src/Component/BppComponent/Bppalert/Bppalert';
import Bppalertimg from './src/Component/BppComponent/Bppalertimg/Bppalertimg';
import Toast from 'react-native-toast-message';
import { Appearance, View } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import './src/firebaseConfig';
import { TouchableOpacity } from 'react-native';
const Stack = createNativeStackNavigator();

function App() {
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
      <NavigationContainer>
        {/* <Stack.Navigator initialRouteName="Login"> */}
        <Stack.Navigator initialRouteName="Dashbord">
          {/* <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
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
          /> */}
          {/* <Stack.Screen
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
          /> */}
          {/* <Stack.Screen
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
          /> */}
          {/* <Stack.Screen
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
          /> */}
          {/* <Stack.Screen
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
          /> */}
          <Stack.Screen
            name="Dashbord"
            component={Dashbord}
            options={{ headerShown: false, headerBackTitleVisible: false }}
          />
          <Stack.Screen
            name="14 PROTECTED PROPERTIES"
            component={Protectedproperties}
            options={{
              headerTitle: 'PROTECTED PROPERTIES',
              headerStyle: {
                backgroundColor: theme === 'LIGHT' ? '#b83725' : '#343a40',
                // Add the LinearGradient component here
                backgroundGradient: {
                  colors: ['rgb(180, 57, 38)', 'rgb(143, 0, 38)'],
                  start: { x: 0, y: 0 },
                  end: { x: 1, y: 1 },
                  locations: [0.18, 1, 1],
                },
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
            name="AddProperty"
            component={AddProperty}
            options={({ route, navigation }) => ({
              headerTitle: 'Add New Property',
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => navigation.navigate('Dashbord')}
                >
                  <View>
                    <Entypo
                      name={'home'}
                      style={{ fontSize: 25, marginRight: 20, color: '#FFF' }}
                    />
                  </View>
                </TouchableOpacity>
              ),
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
            })}
          />
          <Stack.Screen
            name="Ahmedabad"
            component={Ahmedabad}
            options={({ route, navigation }) => ({
              title: capitalizeFirstWord(route.params.Districtname),
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => navigation.navigate('Dashbord')}
                >
                  <View>
                    <Entypo
                      name={'home'}
                      style={{ fontSize: 25, marginRight: 20, color: '#FFF' }}
                    />
                  </View>
                </TouchableOpacity>
              ),
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
            })}
          />
          <Stack.Screen
            name="Propertie"
            component={Propertie}
            options={{
              headerTitle: 'ABOUT PROPERTY PROTECTION',
              headerStyle: {
                // backgroundColor: theme === 'LIGHT' ? '#b83725' : '#343a40',
                backgroundColor: theme === 'LIGHT' ? '#b83725' : '#343a40',
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
            name="Titelimag"
            component={Titelimag}
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
            name="Landimg"
            component={Landimg}
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
            name="Areaimg"
            component={Areaimg}
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
            name="Viewa"
            component={Viewa}
            options={({ route, navigation }) => ({
              headerTitle: 'PAST NOTICE',
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => navigation.navigate('Dashbord')}
                >
                  <View>
                    <Entypo
                      name={'home'}
                      style={{ fontSize: 25, marginRight: 20, color: '#FFF' }}
                    />
                  </View>
                </TouchableOpacity>
              ),
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
            })}
          />
          <Stack.Screen
            name="EditPropertyDetails"
            component={EditPropertyDetails}
            options={({ route, navigation }) => ({
              headerTitle: 'Edit Property Details',
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => navigation.navigate('Dashbord')}
                >
                  <View>
                    <Entypo
                      name={'home'}
                      style={{ fontSize: 25, marginRight: 20, color: '#FFF' }}
                    />
                  </View>
                </TouchableOpacity>
              ),
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
            })}
          />
          <Stack.Screen
            name="Viewimge"
            component={Viewimge}
            options={({ route, navigation }) => ({
              headerTitle: 'VIEWING NOTICE',
              headerRight: () => (
                setImg(route.params.fileUrl),
                (
                  <>
                    <View style={{ flexDirection: 'row' }}>
                      <TouchableOpacity
                        onPress={() => navigation.navigate('Dashbord')}
                      >
                        <View>
                          <Entypo
                            name={'home'}
                            style={{
                              fontSize: 20,
                              marginRight: 20,
                              color: '#FFF',
                            }}
                          />
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => downloadFile()}>
                        <View>
                          <MaterialCommunityIcons
                            name={'download-circle-outline'}
                            style={{
                              fontSize: 23,
                              marginRight: 20,
                              color: '#FFF',
                            }}
                          />
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => myCustomShare()}>
                        <View>
                          <FontAwesome5
                            name={'share-alt'}
                            style={{
                              fontSize: 20,
                              marginRight: 20,
                              color: '#FFF',
                            }}
                          />
                        </View>
                      </TouchableOpacity>
                    </View>
                  </>
                )
                // name={'share-alt'}
              ),
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
            })}
          />
                    <Stack.Screen
            name="BPPalert"
            component={BPPalert}
            options={{
              headerTitle: 'BPP ALERTS',
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
            name="Bppalertimg"
            component={Bppalertimg}
            options={({route, navigation}) => ({
              headerTitle: 'VIEWING NOTICE',
              headerRight: () => (
                setImg(route.params.fileUrl),
                (
                  <>
                    <View style={{flexDirection: 'row'}}>
                      <TouchableOpacity
                        onPress={() => navigation.navigate('Dashbord')}>
                        <View>
                          <Entypo
                            name={'home'}
                            style={{
                              fontSize: 20,
                              marginRight: 20,
                              color: '#FFF',
                            }}
                          />
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => downloadFile()}>
                        <View>
                          <MaterialCommunityIcons
                            name={'download-circle-outline'}
                            style={{
                              fontSize: 23,
                              marginRight: 20,
                              color: '#FFF',
                            }}
                          />
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => myCustomShare()}>
                        <View>
                          <FontAwesome5
                            name={'share-alt'}
                            style={{
                              fontSize: 20,
                              marginRight: 20,
                              color: '#FFF',
                            }}
                          />
                        </View>
                      </TouchableOpacity>
                    </View>
                  </>
                )
              ),
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
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </>
  );
}

export default App;
