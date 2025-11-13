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
import EPPStatementCount from './src/Component/EPPStatements/EPPStatementCount';
import EPPStatement from './src/Component/EPPStatements/EPPStatements';
import Profile from './src/Component/Profile/Profile';
import LandRecordPDF from './src/Component/LandRecord/LandRecordPDF';
import NoticesDisplay from './src/Component/AreaalertCount/NoticesDisplay';
import AddAreaAlert from './src/Component/AreaalertCount/AddAreaAlert';
import VillageTalukaDistrictList from './src/Component/AreaalertCount/VillageTalukaDistrictList';
import TaitleSearchimg from './src/Component/TitleSearchComponent/TaitleSearchimg';
import EditAreaAlert from './src/Component/AreaalertCount/EditAreaAlert';
import AreaAlert from './src/Component/AreaalertComponent/Areaalert/Areaalert.js';
import AreaalertLastPublishe from './src/Component/AreaalertComponent/AreaalertLastPublishe/AreaalertLastPublidate';
import Areaalertcount from './src/Component/AreaalertComponent/Areaalertcount/Areaalertcount';
import Ariaimglert from './src/Component/AreaalertComponent/Ariaimg/Ariaimglert';
import Ajanijahernotice from './src/Component/AjanijahernoticeComponent/Ajanijahernotice/Ajanijahernotice.js';
import AjanijahernoticLastPublishe from './src/Component/AjanijahernoticeComponent/Ajanijahernoticlastpublishedate/Ajanijahernoticlastpublishedate';
import Ajaniimag from './src/Component/AjanijahernoticeComponent/Ajaniimage/Ajaniimag';
import Ajanijahernoticec from './src/Component/AjanijahernoticeComponent/Ajanijahernoticec/Ajanijahernoticec';
import AuctionAlertServicesCount from './src/Component/AuctionAlertServices/AuctionAlertServicesCount';
import AddAuctionService from './src/Component/AuctionAlertServices/AddAuctionServices.js';
import EditAuctionService from './src/Component/AuctionAlertServices/EditAuctionServices';
import AuctionServiceCount from './src/Component/AuctionAlertServices/AuctionServiceCount.js';
import TownPlanningServicesCount from './src/Component/TP-TownPlanningServices/TownPlanningServicesCount.js';
import AddTPServices from './src/Component/TP-TownPlanningServices/AddTPServices.js';
import EditTPServices from './src/Component/TP-TownPlanningServices/EditTPServices.js';
import TPServiceCount from './src/Component/TP-TownPlanningServices/TPServiceCount';
import TitleSearch from './src/Component/TitleSearchComponent/TitleSearch';
import TitleSearchCount from './src/Component/TitleSearchComponent/TitleSearchCount.js';
import LandRecord from './src/Component/LandRecord/LandRecord';
import LandRecordForm from './src/Component/LandRecord/LandRecordForm';

import Toast from 'react-native-toast-message';
import { Appearance, View } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import { TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import './src/firebaseConfig';

const Stack = createNativeStackNavigator();

function App() {
  const [theme, setTheme] = useState('');
  const [img, setImg] = useState();

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
  const getFileExtension = fileUrl => {
    return /[.]/.exec(fileUrl) ? /[^.]+$/.exec(fileUrl) : undefined;
  };
  const downloadFile = async () => {
    const fileUrl = img;
    try {
      const date = new Date();
      const file_ext = getFileExtension(fileUrl);
      const fileExtension = file_ext ? '.' + file_ext[0] : '';
      const { config, fs } = RNFetchBlob;
      const RootDir = fs.dirs.PictureDir;

      const options = {
        fileCache: true,
        addAndroidDownloads: {
          path:
            RootDir +
            '/file_' +
            Math.floor(date.getTime() + date.getSeconds() / 2) +
            fileExtension,
          description: 'Downloading Notice...',
          notification: true,
          useDownloadManager: true,
        },
      };

      const res = await config(options).fetch('GET', fileUrl);
      console.log('res -> ', JSON.stringify(res));
      Toast.show({
        type: 'success',
        text1: `Notice Downloaded Successfully.`,
        position: 'bottom',
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 50,
      });
    } catch (error) {
      console.log('Error Downloading Notice:', error.message);
    }
  };
  const myCustomShare = async () => {
    const ImageURL = img;
    try {
      const res = await RNFetchBlob.fetch('GET', ImageURL);
      const status = res.info().status;
      if (status === 200) {
        const base64Str = res.base64();
        const options = {
          url: `data:image/jpeg;base64,${base64Str}`,
        };
        try {
          const result = await Share.open(options);
          console.log(result);
        } catch (e) {
          e && console.log(e);
        }
      } else {
        // Handle other status codes
      }
    } catch (error) {
      console.log('Error Sharing Image:', error.message);
    }
  };
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
            name="EPPStatementCount"
            component={EPPStatementCount}
            options={({ route, navigation }) => ({
              headerTitle: 'GPP',
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
            name="EPPStatement"
            component={EPPStatement}
            options={({ route, navigation }) => ({
              headerTitle: 'EPP STATEMENT',
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
            name="Profile"
            component={Profile}
            options={{
              headerTitle: 'PROFILE',
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
            name="LandRecordPDF"
            component={LandRecordPDF}
            options={({ route, navigation }) => ({
              headerTitle: 'VIEW DOCUMENT',
              headerRight: () => {
                setImg(route.params.fileUrl);
                return (
                  <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('Dashbord')}
                    >
                      <View>
                        <Entypo
                          name="home"
                          style={{
                            fontSize: 20,
                            marginRight: 20,
                            color: '#FFF',
                          }}
                        />
                      </View>
                    </TouchableOpacity>
                    {img === null || img === 'None' || img === '' ? (
                      <TouchableOpacity onPress={() => downloadFileNot()}>
                        <View>
                          <MaterialCommunityIcons
                            name="download-circle-outline"
                            style={{
                              fontSize: 23,
                              marginRight: 20,
                              color: '#FFF',
                            }}
                          />
                        </View>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity onPress={() => downloadFile()}>
                        <View>
                          <MaterialCommunityIcons
                            name="download-circle-outline"
                            style={{
                              fontSize: 23,
                              marginRight: 20,
                              color: '#FFF',
                            }}
                          />
                        </View>
                      </TouchableOpacity>
                    )}
                    {img === null || img === 'None' || img === '' ? (
                      <TouchableOpacity onPress={() => downloadFileNotS()}>
                        <View>
                          <FontAwesome5
                            name="share-alt"
                            style={{
                              fontSize: 20,
                              marginRight: 20,
                              color: '#FFF',
                            }}
                          />
                        </View>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity onPress={() => sharePDF()}>
                        <View>
                          <FontAwesome5
                            name="share-alt"
                            style={{
                              fontSize: 20,
                              marginRight: 20,
                              color: '#FFF',
                            }}
                          />
                        </View>
                      </TouchableOpacity>
                    )}
                  </View>
                );
              },
              headerStyle: {
                backgroundColor: theme === 'LIGHT' ? '#b83725' : '#343a40',
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
            name="NoticesDisplay"
            component={NoticesDisplay}
            options={{
              headerTitle: 'Area Alert',
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
            name="AddAreaAlert"
            component={AddAreaAlert}
            // villagea
            options={({ route, navigation }) => ({
              title: 'Add Area Alert',
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
            name="VillageTalukaDistrictList"
            component={VillageTalukaDistrictList}
            // villagea
            options={({ route, navigation }) => ({
              title: capitalizeFirstWord(route.params.villagea),
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
            name="TaitleSearchimg"
            component={TaitleSearchimg}
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
            name="EditAreaAlert"
            component={EditAreaAlert}
            // villagea
            options={({ route, navigation }) => ({
              title: 'Edit Area Alert',
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
            name="Area Alert"
            component={AreaAlert}
            options={{
              headerTitle: 'AREA ALERTS',
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
            name="AreaalertLastPublishe"
            component={AreaalertLastPublishe}
            options={({ route, navigation }) => ({
              title: 'Area Alert LAST PUBLISHE...',
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
            name="Areaalertcount"
            component={Areaalertcount}
            options={({ route, navigation }) => ({
              title: capitalizeFirstWord(route.params.DistrictName),
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
            name="Ariaimglert"
            component={Ariaimglert}
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
            name="Ajanijahernotice"
            component={Ajanijahernotice}
            options={({ route, navigation }) => ({
              headerTitle: 'AAJNI JAHER NOTICE',
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
            name="Ajanijahernoticec"
            component={Ajanijahernoticec}
            options={({ route, navigation }) => ({
              title: capitalizeFirstWord(route.params.DistrictName),
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
            name="AjanijahernoticLastPublishe"
            component={AjanijahernoticLastPublishe}
            options={({ route, navigation }) => ({
              title: 'AAJNI JAHER NOTICE LAST PUBLISHE...',
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
            name="Ajaniimag"
            component={Ajaniimag}
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
            name="AuctionAlertServicesCount"
            component={AuctionAlertServicesCount}
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
          <Stack.Screen
            name="AddAuctionService"
            component={AddAuctionService}
            options={{
              headerTitle: 'Add Auction Alert',
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
            name="EditAuctionService"
            component={EditAuctionService}
            options={{
              headerTitle: 'Update Auction Service',
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
            name="AuctionServiceCount"
            component={AuctionServiceCount}
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
          <Stack.Screen
            name="TownPlanningServicesCount"
            component={TownPlanningServicesCount}
            options={{
              headerTitle: 'TP Alert',
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
            name="AddTPServices"
            component={AddTPServices}
            options={{
              headerTitle: 'Add TP Services',
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
            name="EditTPServices"
            component={EditTPServices}
            options={{
              headerTitle: 'Update TP Service',
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
            name="TPServiceCount"
            component={TPServiceCount}
            options={{
              headerTitle: 'TP Alert',
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
            name="TitleSearch"
            component={TitleSearch}
            options={{
              headerTitle: 'TITLE SEARCH',
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
            name="TitleSearchCount"
            component={TitleSearchCount}
            options={({ route, navigation }) => ({
              headerTitle: 'TITLE SEARCH NOTICE',
              headerStyle: {
                backgroundColor: theme === 'LIGHT' ? '#b83725' : '#343a40',
                color: '#FFF', //Set Header color
              },
              headerRight: () => (
                <View>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Dashbord')}
                  >
                    <View>
                      <Entypo
                        name={'home'}
                        style={{ fontSize: 20, marginRight: 20, color: '#FFF' }}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              ),
              headerTitleStyle: {
                color: 'white',
                fontWeight: 'bold',
              },
              headerTintColor: 'white',
              headerBackTitleVisible: false,
            })}
          />
          <Stack.Screen
            name="LandRecord"
            component={LandRecord}
            options={{
              headerTitle: 'Land Record',
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
            name="LandRecordForm"
            component={LandRecordForm}
            options={{
              headerTitle: 'Land Record',
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
      </NavigationContainer>
      <Toast />
    </>
  );
}

export default App;
