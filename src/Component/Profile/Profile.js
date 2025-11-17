// /**
//  * Jaher Notice React Native App
//  **/

import React, { useState, useEffect, useContext } from 'react';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Orientation,
  OrientationLocker,
  PORTRAIT,
} from 'react-native-orientation-locker';
import { AuthContext } from '../../context/AuthContext'; // ⭐ ADDED

const LogoutConfirmationModal = ({ visible, onCancel, onLogout }) => {
  const [theme, setTheme] = useState('');

  useEffect(() => {
    const getColorScheme = () => {
      const colorScheme = Appearance.getColorScheme();
      setTheme(colorScheme === 'dark' ? 'DARK' : 'LIGHT');
    };
    getColorScheme();
    const listener = Appearance.addChangeListener(getColorScheme);
    return () => listener.remove();
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

const Profile = ({ navigation }) => {
  const { logout } = useContext(AuthContext); // ⭐ AUTH LOGOUT
  const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);
  const [UserData, setUserData] = useState();
  const [isLoding, setisLoding] = useState(false);
  const [theme, setTheme] = useState('');

  const handleLogout = () => {
    tableData();
    setLogoutModalVisible(false);
  };

  const handleCancel = () => {
    setLogoutModalVisible(false);
  };

  // THE REAL LOGOUT LOGIC (FIXED)
  const LogoutUser = async () => {
    await logout(); // ⭐ FIX → NOW NAVIGATION WORKS
  };

  const tableData = () => {
    (async () => {
      let Userid = await AsyncStorage.getItem('UserID');

      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');

      const raw = JSON.stringify({ UserID: Userid });

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
            LogoutUser(); // ⭐ THIS TRIGGERS AUTH CHANGE
          }
        })
        .catch(error => console.log('error', error));
    })();
  };

  useEffect(() => {
    UserDetails();
  }, []);

  const UserDetails = () => {
    (async () => {
      setisLoding(true);
      let Userid = await AsyncStorage.getItem('UserID');

      fetch(`https://qaapi.jahernotice.com/api/UserDetails/${Userid}`)
        .then(response => response.json())
        .then(rejectionReason => {
          setUserData(rejectionReason.data);
          setisLoding(false);
        })
        .catch(error => console.error(error));
    })();
  };

  // Ignore warnings
  LogBox.ignoreAllLogs();

  useEffect(() => {
    const getColorScheme = () => {
      const colorScheme = Appearance.getColorScheme();
      setTheme(colorScheme === 'dark' ? 'DARK' : 'LIGHT');
    };
    getColorScheme();
    const listener = Appearance.addChangeListener(getColorScheme);
    return () => listener.remove();
  }, []);

  const statusBarBackgroundColor =
    theme === 'LIGHT' ? '#b83725' : '#343a40';

  function capitalizeFirstWord(str) {
    if (typeof str !== 'string') return str;
    const words = str.trim().split(' ');
    return words
      .map(word =>
        word.length > 0
          ? word.charAt(0).toUpperCase() + word.slice(1)
          : word
      )
      .join(' ');
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

        <OrientationLocker orientation={PORTRAIT} />

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
              <ScrollView>
                {UserData?.map(item => (
                  <View key={item.UserID}>
                    <View style={styles.icona}>
                      <Image style={styles.iconuser} source={User} />
                    </View>

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
                            <Text
                              style={{
                                ...styles.text,
                                color:
                                  theme === 'LIGHT' ? '#000' : '#ffffff',
                              }}
                            >
                              {capitalizeFirstWord(item.Address1)}
                            </Text>
                          ) : null}

                          {item.Address2 !== '' && item.Address2 !== null ? (
                            <Text
                              style={{
                                ...styles.text,
                                color:
                                  theme === 'LIGHT' ? '#000' : '#ffffff',
                              }}
                            >
                              {capitalizeFirstWord(item.Address2)}
                            </Text>
                          ) : null}
                        </View>
                      </View>
                    </Card>
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
                  </View>
                ))}
              </ScrollView>
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
  iconuser: {
    width: 100,
    height: 100,
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
  textd: {
    flexDirection: 'row',
    marginLeft: 'auto',
  },
});
export default Profile;
