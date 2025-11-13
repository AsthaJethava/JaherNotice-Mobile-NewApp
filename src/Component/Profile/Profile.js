// /**
//  * Jaher Notice React Native App
//  **/

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  LogBox,
  Appearance,
  StatusBar,
} from 'react-native';
import { Card, Divider, Button, ActivityIndicator } from 'react-native-paper';
import User from '../../Imeges/Profile.png';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Orientation,
  OrientationLocker,
  PORTRAIT,
  LANDSCAPE,
} from 'react-native-orientation-locker';
import {
  requestUserPermissiona,
  notificationListenera,
  getFcmTokena,
} from '../../helpers/nptoficationServices';
import { FlatList } from 'react-native';
import TitleSearch from '../TitleSearchComponent/TitleSearch.json';
// import {bootstrapAsync} from '../../../src/Navigation/index';
// import NavigationService from '../../../src/helpers/NavigationService';
// import TitleSearch from '../../TitleSearchComponent/TitleSearch.json';

const LogoutConfirmationModal = ({ visible, onCancel, onLogout }) => {
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
    <Modal visible={visible} transparent={true} animationType="fade">
      <View style={styles.modalContainer}>
        <View
          style={{
            ...styles.modalContent,
            backgroundColor: theme === 'LIGHT' ? '#ffffff' : '#343a40',
            borderColor: theme === 'LIGHT' ? '#ffffff' : '#ffffff',
          }}
        >
          <Text
            style={{
              ...styles.modalTexta,
              color: theme === 'LIGHT' ? '#000' : '#ffffff',
            }}
          >
            Logout
          </Text>
          <Text
            style={{
              ...styles.modalTexta,
              color: theme === 'LIGHT' ? '#000' : '#ffffff',
            }}
          >
            Are you sure you want to logout?
          </Text>
          <View style={styles.textd}>
            <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
              <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const Profile = ({ route, navigation }) => {
  const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);
  const handleLogout = () => {
    tableData();
    setLogoutModalVisible(false);
  };
  const handleCancel = () => {
    setLogoutModalVisible(false);
  };

  const [UserID, setUserId] = useState();
  const [Token, setToken] = useState();
  const [DiviceID, setDiviceID] = useState();
  const [MobileNo, setMobileNo] = useState();
  const [UserData, setUserData] = useState();
  const [isLoding, setisLoding] = useState(false);

  // Log GET Data AsyncStorage
  const LogoutUser = async () => {
    let UserID = await AsyncStorage.removeItem('UserID');
    let Token = await AsyncStorage.removeItem('Token');
    let DiviceID = await AsyncStorage.removeItem('DeviceID');
    let MobileNo = await AsyncStorage.removeItem('MobileNo');
    setUserId(UserID);
    setToken(Token);
    setDiviceID(DiviceID);
    setMobileNo(MobileNo);
    if (UserID == null) {
      if (Token == null) {
        if (DiviceID == null) {
          if (MobileNo == null) {
            navigation.navigate('Login');
          }
        }
      }
    }
  };

  // Delet Acount API
  const clearAsyncStorage = async () => {
    try {
      await AsyncStorage.clear();
      console.log('AsyncStorage data cleared successfully.');
    } catch (error) {
      console.log('Error clearing AsyncStorage data:', error);
    }
  };
  const resetState = () => {
    setData(null);
    setLoggedIn(false);
    // Reset other state variables to their initial values or null
  };

  // useEffect(() => {
  //   bootstrapAsync().then(({isUserActive}) => {
  //     if (isUserActive) {
  //       NavigationService.navigate('Profile');
  //     } else {
  //       NavigationService.navigate('Login');
  //     }
  //   });
  // });
  const tableData = () => {
    (async () => {
      let Userid = await AsyncStorage.getItem('UserID');

      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      const raw = JSON.stringify({
        UserID: Userid,
      });

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };

      fetch(`https://qaapi.jahernotice.com/api/logout/device`, requestOptions)
        .then(response => response.json())
        .then(data => {
          if (data.status == 200) {
            LogoutUser();
            clearAsyncStorage(); // Clear AsyncStorage data
            resetState(); // Reset application state
            AsyncStorage.removeItem('UserID');
            AsyncStorage.removeItem('Token');
            AsyncStorage.removeItem('DeviceID');
            AsyncStorage.removeItem('MobileNo');
            AsyncStorage.clear();
            // navigation.navigate('Login');
            NavigationService.replace('Login');
            // console.log();
            setModalVisible(!modalVisible);
            setModalVisible(false);
          }
        })
        .catch(error => console.log('error', error));
    })();
  };

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    UserDetails();
  }, []);

  const UserDetails = () => {
    (async () => {
      let Tokena = await AsyncStorage.getItem('fcmToken');
      console.warn('Token', Tokena);
      setisLoding(true);
      let Userid = await AsyncStorage.getItem('UserID');
      // console.log(Userid);
      let DiviceID = await AsyncStorage.getItem('DeviceID');
      // console.log(DiviceID);
      fetch(`https://qaapi.jahernotice.com/api/UserDetails/${Userid}`)
        .then(function (response) {
          responseClone = response.clone();
          return response.json();
        })
        .then(function (rejectionReason) {
          setUserData(rejectionReason.data);
          setisLoding(false);
          setModalVisible(false);
        })
        .catch(error => console.error(error));
    })();
  };

  // Ignore log notification by message
  LogBox.ignoreLogs(['Warning: ...']);

  //Ignore all log notifications
  LogBox.ignoreAllLogs();
  console.disableYellowBox = true;

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

  const statusBarBackgroundColor = theme === 'LIGHT' ? '#b83725' : '#343a40';

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
          ...styles.container,
          backgroundColor: theme === 'LIGHT' ? '#efefef' : '#20272b',
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
        <SafeAreaView>
          <ScrollView>
            {isLoding ? (
              <View>
                <ActivityIndicator
                  size={'large'}
                  color={theme === 'LIGHT' ? '#b83725' : '#FFF'}
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignContent: 'center',
                    marginTop: 260,
                  }}
                />
              </View>
            ) : (
              <FlatList
                data={UserData}
                renderItem={({ item }) => (
                  <>
                    <View style={styles.icona}>
                      <Image style={styles.iconuser} source={User} />
                    </View>
                    <View>
                      <Card
                        style={{
                          ...styles.card,
                          backgroundColor:
                            theme === 'LIGHT' ? '#ffffff' : '#343a40',
                        }}
                      >
                        <View style={styles.textcontent}>
                          <View>
                            <Text
                              style={{
                                ...styles.texta,
                                color: theme === 'LIGHT' ? '#000' : '#ffffff',
                              }}
                            >
                              First Name
                            </Text>
                            <Text
                              style={{
                                ...styles.text,
                                color: theme === 'LIGHT' ? '#000' : '#ffffff',
                              }}
                            >
                              {capitalizeFirstWord(item.FirstName)}
                            </Text>
                          </View>
                          <Divider style={styles.Divider} />
                          <View style={styles.spesh}>
                            <Text
                              style={{
                                ...styles.texta,
                                color: theme === 'LIGHT' ? '#000' : '#ffffff',
                              }}
                            >
                              Last Name
                            </Text>
                            <Text
                              style={{
                                ...styles.text,
                                color: theme === 'LIGHT' ? '#000' : '#ffffff',
                              }}
                            >
                              {capitalizeFirstWord(item.LastName)}
                            </Text>
                          </View>
                          <Divider style={styles.Divider} />
                          <View style={styles.spesh}>
                            <Text
                              style={{
                                ...styles.texta,
                                color: theme === 'LIGHT' ? '#000' : '#ffffff',
                              }}
                            >
                              Email Address
                            </Text>
                            <Text
                              style={{
                                ...styles.text,
                                color: theme === 'LIGHT' ? '#000' : '#ffffff',
                              }}
                            >
                              {item.EmailID}
                            </Text>
                          </View>
                          <Divider style={styles.Divider} />
                          <View style={styles.spesh}>
                            <Text
                              style={{
                                ...styles.texta,
                                color: theme === 'LIGHT' ? '#000' : '#ffffff',
                              }}
                            >
                              Mobile Number
                            </Text>
                            <Text
                              style={{
                                ...styles.text,
                                color: theme === 'LIGHT' ? '#000' : '#ffffff',
                              }}
                            >
                              {item.MobileNo}
                            </Text>
                          </View>
                          <Divider style={styles.Divider} />
                          <View style={styles.spesh}>
                            <Text
                              style={{
                                ...styles.texta,
                                color: theme === 'LIGHT' ? '#000' : '#ffffff',
                              }}
                            >
                              Address
                            </Text>

                            {item.Address1 !== '' && item.Address1 !== null ? (
                              <>
                                <Text
                                  style={{
                                    ...styles.text,
                                    color:
                                      theme === 'LIGHT' ? '#000' : '#ffffff',
                                  }}
                                >
                                  {capitalizeFirstWord(item.Address1)}
                                </Text>
                              </>
                            ) : null}

                            {item.Address2 !== '' && item.Address2 !== null ? (
                              <>
                                <Text
                                  style={{
                                    ...styles.text,
                                    color:
                                      theme === 'LIGHT' ? '#000' : '#ffffff',
                                  }}
                                >
                                  {capitalizeFirstWord(item.Address2)}
                                </Text>
                              </>
                            ) : null}
                          </View>
                        </View>
                      </Card>
                    </View>
                    <Card
                      style={{
                        ...styles.carda,
                        backgroundColor:
                          theme === 'LIGHT' ? '#ffffff' : '#343a40',
                      }}
                    >
                      <View style={styles.textcontenta}>
                        <TouchableOpacity
                          onPress={() => setLogoutModalVisible(true)}
                        >
                          <Text
                            style={{
                              ...styles.text,
                              color: theme === 'LIGHT' ? '#000' : '#ffffff',
                            }}
                          >
                            Logout
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </Card>
                    <LogoutConfirmationModal
                      visible={isLogoutModalVisible}
                      onCancel={handleCancel}
                      onLogout={handleLogout}
                    />

                    {/* <View
                      style={{
                        ...styles.centeredView,
                        backgroundColor:
                          theme === 'LIGHT' ? '#ffffff' : '#343a40',
                      }}>
                      <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                          // Alert.alert('Modal has been closed.');
                          setModalVisible(!modalVisible);
                        }}>
                        <View
                          style={{
                            ...styles.modalView,
                            backgroundColor:
                              theme === 'LIGHT' ? '#ffffff' : '#343a40',
                          }}>
                          <Text
                            style={{
                              ...styles.modalText,
                              color: theme === 'LIGHT' ? '#000' : '#ffffff',
                            }}>
                            Logout
                          </Text>
                          <Text
                            style={{
                              ...styles.modalText,
                              color: theme === 'LIGHT' ? '#000' : '#ffffff',
                            }}>
                            Would you like to logout
                          </Text>
                          <View
                            style={{
                              ...styles.textd,
                              backgroundColor:
                                theme === 'LIGHT' ? '#ffffff' : '#343a40',
                            }}>
                            <Pressable
                              style={[styles.button, styles.buttonClose]}
                              onPress={() => setModalVisible(!modalVisible)}>
                              <Text
                                style={{
                                  ...styles.textStyle,
                                  // backgroundColor:
                                  //   theme === 'LIGHT' ? '#ffffff' : '#343a40',
                                }}>
                                Cancel
                              </Text>
                            </Pressable>
                            <Pressable
                              style={[styles.button, styles.buttonClose]}
                              onPress={() => tableData()}>
                              <Text
                                style={{
                                  ...styles.textStyle,
                                  // backgroundColor:
                                  //   theme === 'LIGHT' ? '#ffffff' : '#343a40',
                                }}>
                                Logout
                              </Text>
                            </Pressable>
                          </View>
                        </View>
                      </Modal>
                    </View> */}
                  </>
                )}
              />
            )}
          </ScrollView>
        </SafeAreaView>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
  },
  modalTexta: {
    fontSize: 18,
    marginBottom: 20,
  },
  cancelButton: {
    backgroundColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
    marginRight: 5,
  },
  logoutButton: {
    backgroundColor: '#b83725',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },

  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#efefef',
  },
  icona: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
    width: '100%',
    height: '20%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },

  card: {
    width: '90%',
    justifyContent: 'center',
    marginLeft: 20,
    backgroundColor: '#FFF',
    elevation: 10,
    borderRadius: 5,
  },
  textcontent: {
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 20,
    marginRight: 20,
  },
  text: {
    fontWeight: 'bold',
    marginLeft: 5,
  },
  texta: {
    marginBottom: 5,
    marginTop: 5,
    marginLeft: 5,
  },
  Divider: {
    height: 2,
  },
  carda: {
    marginTop: 20,
    marginLeft: 20,
    width: '90%',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    elevation: 10,
    borderRadius: 5,
    marginBottom: '10%',
  },
  spesh: {
    marginTop: 10,
  },
  textcontenta: {
    marginLeft: 20,
    marginTop: 16,
    marginBottom: 16,
    marginRight: 20,
  },

  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    justifyContent: 'center',
    marginTop: '70%',
  },
  button: {
    padding: 10,
    marginLeft: 20,
  },
  buttonOpen: {
    backgroundColor: '#FFFFFF',
  },
  buttonClose: {
    backgroundColor: '#FFFFFF',
  },
  textStyle: {
    color: 'red',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    marginRight: 'auto',
    fontSize: 16,
  },
  textd: {
    flexDirection: 'row',
    marginLeft: 'auto',
  },
});
export default Profile;
