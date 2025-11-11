import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  SafeAreaView,
  Appearance,
  Keyboard,
  StatusBar,
  LogBox,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Jahernoticelog from '../../Imeges/Jahernotice_logo.png';
import Jahernoticelogw from '../../../src/Imeges/JN_logo_White.png';
import { Button, ActivityIndicator } from 'react-native-paper';
import uuid from 'react-native-uuid';
import Swiper from 'react-native-swiper';
import LinearGradient from 'react-native-linear-gradient';
import messaging from '@react-native-firebase/messaging';
import Toast from 'react-native-toast-message';
import { OrientationLocker, PORTRAIT } from 'react-native-orientation-locker';

const Login = ({ navigation }) => {
  const [showDonationSuccessPopup, setShowDonationSuccessPopup] =
    useState(false);
  const [showDonationErrPopup401, setShowDonationErrPopup401] = useState(false);
  const [showDonationErrPopup404, setShowDonationErrPopup404] = useState(false);
  const [showDonationErrPopup412, setShowDonationErrPopup412] = useState(false);
  const [showDonationErrPopup500, setShowDonationErrPopup500] = useState(false);
  const [showDonationErrPopupnet, setShowDonationErrPopupnet] = useState(false);

  const [text, setText] = useState('+91');
  const [Mobile, setMobileNo] = useState('');
  const [Device, setDeviceID] = useState('');
  const [UserID, setUserID] = useState('');
  const [Tokena, settoken] = useState(false);
  const [DeviceaID, setDeviceaID] = useState('');
  const [buttonl, setButtonL] = useState(false);
  const [theme, setTheme] = useState('');

  console.log(Number);

  // Ignore warnings
  LogBox.ignoreAllLogs();

  useEffect(() => {
    const testUUID = uuid.v4();
    setDeviceID(testUUID);
  }, []);

  // Detect system theme
  useEffect(() => {
    const getColorScheme = () => {
      const colorScheme = Appearance.getColorScheme();
      if (colorScheme === 'dark') setTheme('DARK');
      else setTheme('LIGHT');
    };
    getColorScheme();
    const listener = Appearance.addChangeListener(getColorScheme);
    return () => listener.remove();
  }, []);

  const statusBarBackgroundColor =
    theme === 'LIGHT' ? 'transparent' : '#343a40';

  const onSubmit = async () => {
    setButtonL(true);
    // let Tokena = await AsyncStorage.getItem('fcmToken');
    // let Tokena = 'dummy_fcm_token_12345';
    let Tokena = 'c3fPXd7NNUP4kMsqBbqDMK:APA91bFEsh_iLCC8lb_MyQOE8YoC9TaTerpavml-oOBFqFVlq_V_Z3M7DsENtWGn9n7IXe5_G4NxxeUspTlFdFyoj7V5V2CZ-okpK8M1eL0pRcKxT3_lQR8';

    if (!Tokena) {
      try {
        Tokena = await messaging().getToken();
        await AsyncStorage.setItem('fcmToken', Tokena);
      } catch (error) {
        console.log('error in FCM Token', error);
      }
    }

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify({
      MobileNo: Mobile,
      DeviceID: Device,
      Token: Tokena,
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };
    //added to test login-otp redirection
    // try {
    //   setTimeout(() => {
    //     console.log('✅ Mock login success');
    //     setButtonL(false);
    //     Toast.show({
    //       type: 'success',
    //       text1: 'OTP has been sent to your mobile!',
    //       position: 'bottom',
    //       visibilityTime: 4000,
    //     });
    //     navigation.navigate('Otp', {
    //       mobileno: Mobile,
    //       Userid: 12345,
    //       OTPLogid: 99999,
    //       Diveid: Device,
    //       Tokwne: 'dummy_token',
    //     });
    //   }, 1500);
    // } catch (error) {
    //   console.log('erroraaa', error);
    //   setButtonL(false);
    // }

    fetch('https://qaapi.jahernotice.com/api/login/Verify', requestOptions)
      .then(response => response.json())
      .then(data => {
        if (data.status == 200) {
          setButtonL(false);
          AsyncStorage.setItem('DeviceID', Device);
          AsyncStorage.setItem('Token', Tokena);
          AsyncStorage.setItem('MobileNo', String(Mobile));

          // if (Mobile === '9712896080') {
            // Toast.show({
            //   type: 'success',
            //   text1: `'Verification Successfully'`,
            //   position: 'bottom',
            //   visibilityTime: 4000,
            //   autoHide: true,
            //   bottomOffset: 50,
            // });

            // AsyncStorage.setItem('UserID', '521240');
            // AsyncStorage.setItem('FirstName', 'Jay');
            // AsyncStorage.setItem('LastName', 'Patel');
            // AsyncStorage.setItem('UserIDa', '521240');

            // setTimeout(() => {
            //   navigation.navigate('Dashbord');
            // }, 500);
          // } else {
            Toast.show({
              type: 'success',
              text1: `${data.message} ${Mobile}`,
              position: 'bottom',
              visibilityTime: 4000,
              autoHide: true,
              bottomOffset: 50,
            });
            navigation.navigate('Otp', {
              mobileno: Mobile,
              Userid: data.data.UserID,
              OTPLogid: data.data.OTPLogID,
              Diveid: Device,
              Tokwne: Tokena,
            });
          }
        // }

        if (data.status === 401 || data.status.message === '401 UNAUTHORIZED') {
          setButtonL(false);
          return Toast.show({
            type: 'error',
            text1: data.error,
            position: 'bottom',
            visibilityTime: 4000,
            bottomOffset: 50,
          });
        }

        if (data.status === 404 || data.status.message === '404 Not Found') {
          setButtonL(false);
          return Toast.show({
            type: 'error',
            text1: data.error,
            position: 'bottom',
            visibilityTime: 4000,
            bottomOffset: 50,
          });
        }

        if (
          data.status === 412 ||
          data.status.message === '412 Unauthorized User'
        ) {
          setButtonL(false);
          return Toast.show({
            type: 'error',
            text1: data.error,
            position: 'bottom',
            visibilityTime: 4000,
            bottomOffset: 50,
          });
        }

        if (
          data.status === 500 ||
          data.status.message === '500 Network Error'
        ) {
          setButtonL(false);
          return Toast.show({
            type: 'error',
            text1: data.error,
            position: 'bottom',
            visibilityTime: 4000,
            bottomOffset: 50,
          });
        }

        setButtonL(false);
      })
      .catch(error => {
        console.log('erroraaa', error);
        setButtonL(false);
      });
  };

  return (
    <>
      <StatusBar animated backgroundColor={statusBarBackgroundColor} />
      <SafeAreaView style={styles.containerna}>
        <ScrollView
          style={{
            flex: 1,
            backgroundColor: theme === 'LIGHT' ? '#ffffff' : '#20272b',
          }}
        >
          <OrientationLocker orientation={PORTRAIT} />

          <View style={styles.containernb}>
            <View
              style={{
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 26,
                marginTop: 10,
              }}
            >
              <Image
                source={theme === 'LIGHT' ? Jahernoticelog : Jahernoticelogw}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                resizeMode="contain"
              />

              <Text
                style={{
                  fontSize: 18,
                  textAlign: 'center',
                  marginTop: 30,
                  width: '95%',
                  fontWeight: '500',
                  color: theme === 'LIGHT' ? '#000' : '#ffffff',
                }}
              >
                Please enter your Registered Mobile number to Log In to your
                Jahernotice account
              </Text>

              <View style={styles.inputnc}>
                <TextInput
                  placeholder={text}
                  placeholderTextColor={theme === 'LIGHT' ? '#000' : '#ffffff'}
                  editable={false}
                  style={{
                    ...styles.textInputnd,
                    borderColor: theme === 'LIGHT' ? '#000' : '#ffffff',
                    color: theme === 'LIGHT' ? '#000' : '#ffffff',
                  }}
                />
                <TextInput
                  placeholder="Enter your Mobile number"
                  placeholderTextColor={theme === 'LIGHT' ? '#000' : '#ffffff'}
                  style={{
                    ...styles.textInputne,
                    borderColor: theme === 'LIGHT' ? '#000' : '#ffffff',
                    color: theme === 'LIGHT' ? '#000' : '#ffffff',
                  }}
                  keyboardType="numeric"
                  maxLength={10}
                  value={String(Mobile)}
                  onChangeText={value => {
                    setMobileNo(value);
                    if (value.length === 10) Keyboard.dismiss();
                  }}
                />
              </View>

              <TouchableOpacity>
                {buttonl ? (
                  <View style={styles.buttonl}>
                    <Text style={styles.textL}>Loading...</Text>
                    <ActivityIndicator size="small" color="#ffffff" />
                  </View>
                ) : (
                  <Button
                    style={
                      Mobile && String(Mobile).length === 10
                        ? styles.button
                        : styles.buttond
                    }
                    mode="contained"
                    onPress={onSubmit}
                    disabled={!Mobile || String(Mobile).length !== 10}
                  >
                    Log In
                  </Button>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate('LernmoreDashbord')}
              >
                <View style={{ marginTop: '9%', marginBottom: '66.3%' }}>
                  <Text
                    style={{
                      fontSize: 18,
                      color:
                        theme === 'LIGHT' ? 'rgb(52, 120, 246)' : '#ffffff',
                    }}
                  >
                    Learn more
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <LinearGradient
            style={styles.linearGradient}
            colors={['rgb(180, 57, 38)', 'rgb(143, 0, 38)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Swiper
              autoplay
              activeDot={
                <View
                  style={{
                    backgroundColor: '#FFF',
                    width: 15,
                    height: 15,
                    borderRadius: 10,
                    marginHorizontal: 3,
                    marginTop: 3,
                  }}
                />
              }
            >
              <View style={[styles.slideContainer]}>
                <Text style={styles.text}>
                  Never Miss a Notice! Property Protection now in your Pocket.
                </Text>
              </View>
              <View style={[styles.slideContainer]}>
                <Text style={styles.text}>
                  Government Certified Land Records is now just a call away!
                </Text>
              </View>
              <View style={[styles.slideContainer]}>
                <Text style={styles.text}>
                  Make Profitable investments with Auction Alert, Area Alert and
                  TP Alerts
                </Text>
              </View>
              <View style={[styles.slideContainer]}>
                <Text style={styles.text}>
                  Prevents Frauds on your Property Subscribe to EPP Alerts
                </Text>
              </View>
              <View style={[styles.slideContainer]}>
                <Text style={styles.text}>
                  iPVR instantly helps you verify ownership, Property, Liens and
                  Encumbrances
                </Text>
              </View>
            </Swiper>
          </LinearGradient>
        </ScrollView>
      </SafeAreaView>
      <Toast />
    </>
  );
};

const styles = StyleSheet.create({
  containerna: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  containernb: {
    width: '100%',
    height: '100%',
  },
  inputnc: {
    width: '93%',
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    marginTop: '15%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  textInputnd: {
    height: 40,
    borderBottomWidth: 2,
    textAlign: 'center',
    width: '15%',
  },
  textInputne: {
    height: 40,
    borderBottomWidth: 2,
    width: '80%',
  },
  button: {
    backgroundColor: '#ff4500',
    height: 50,
    justifyContent: 'center',
    marginTop: 28,
    width: 100,
    borderRadius: 10,
  },
  buttonl: {
    backgroundColor: '#ff4500',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 28,
    width: '45%',
    borderRadius: 10,
    flexDirection: 'row',
  },
  buttond: {
    backgroundColor: '#bfbdbd',
    height: 50,
    justifyContent: 'center',
    marginTop: 28,
    width: 100,
    borderRadius: 10,
  },
  linearGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '20%',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  slideContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '90%',
    marginTop: -30,
  },
  text: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    marginHorizontal: 10,
  },
  textL: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    marginHorizontal: 10,
  },
});

export default Login;
