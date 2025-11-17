/**
 * Jaher Notice React Native App (migrated for RN 0.76 + React 18)
 */

import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  Appearance,
  Keyboard,
  StatusBar,
  LogBox,
} from 'react-native';
import { Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { OrientationLocker, PORTRAIT } from 'react-native-orientation-locker';
import { AuthContext } from '../../context/AuthContext';   // ⭐ Added

// -------- Helper Functions --------
const formatTimerValue = timer => {
  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

// Custom hook to handle visibility changes (for timer pause/resume)
const useVisibilityChange = callback => {
  useEffect(() => {
    let isVisible = true;
    const handleVisibilityChange = () => {
      if (typeof document !== 'undefined') {
        isVisible = document.visibilityState === 'visible';
        callback(isVisible);
      }
    };
    if (typeof document !== 'undefined') {
      document.addEventListener('visibilitychange', handleVisibilityChange);
    }
    return () => {
      if (typeof document !== 'undefined') {
        document.removeEventListener('visibilitychange', handleVisibilityChange);
      }
    };
  }, [callback]);
};

// -------- OTP Component --------
const Otp = ({ route, navigation }) => {
  const { login } = useContext(AuthContext);
  const [theme, setTheme] = useState('');
  const [Otp, setOtp] = useState('');
  const [Token, setToken] = useState('');
  const [mobileno, setmobileno] = useState('');
  const [Userid, setUserid] = useState('');
  const [OTPLogid, setOTPLogid] = useState('');
  const [Diveid, setDiveid] = useState('');
  const [Tokwne, setTokwne] = useState('');
  const [buttonl, setButtonL] = useState(false);

  const [timer, setTimer] = useState(180);
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [isResendDisabled, setIsResendDisabled] = useState(true);

  // Ignore warnings
  LogBox.ignoreAllLogs();

  // Theme listener
  useEffect(() => {
    const getColorScheme = () => {
      const colorScheme = Appearance.getColorScheme();
      setTheme(colorScheme === 'dark' ? 'DARK' : 'LIGHT');
    };
    getColorScheme();
    const listener = Appearance.addChangeListener(getColorScheme);
    return () => listener.remove();
  }, []);

  // Get params from Login screen
  useEffect(() => {
    const { mobileno, Userid, OTPLogid, Diveid, Tokwne } = route.params || {};
    setmobileno(mobileno);
    setUserid(Userid);
    setOTPLogid(OTPLogid);
    setDiveid(Diveid);
    setTokwne(Tokwne);
  }, [route.params]);

  // Verify OTP API
  const onSubmit = async () => {
    setButtonL(true);
    fetch('https://qaapi.jahernotice.com/api/login/otp/Verify', {
      method: 'POST',
      body: JSON.stringify({
        SMSOTP: Otp,
        OTPLogID: OTPLogid,
        DeviceID: Diveid,
        Token: Tokwne,
        UserID: Userid,
      }),
      headers: {
        Authorization: `Bearer ${Token}`,
        'Content-type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(async data => {
        setButtonL(false);
        if (data.status == 200) {
          AsyncStorage.setItem('UserID', data.data[0].UserID);
          AsyncStorage.setItem('UserIDold', data.data[0].UserID);
          AsyncStorage.setItem('FirstName', data.data[0].FirstName);
          AsyncStorage.setItem('LastName', data.data[0].LastName);
          login(data.data[0].UserID);
          return Toast.show({
            type: 'success',
            text1: `OTP Verification Successfully`,
            position: 'bottom',
            visibilityTime: 4000,
            bottomOffset: 50,
          });
        }

        if (data.status === 401 || data.status.message === '401 UNAUTHORIZED') {
          return Toast.show({
            type: 'error',
            text1: `${data.error}`,
            position: 'bottom',
            visibilityTime: 4000,
            bottomOffset: 50,
          });
        }
        if (data.status === 404 || data.status.message === '404 Not Found') {
          return Toast.show({
            type: 'error',
            text1: `${data.error}`,
            position: 'bottom',
            visibilityTime: 4000,
            bottomOffset: 50,
          });
        }
        if (data.status === 412 || data.status.message === '412 Unauthorized User') {
          return Toast.show({
            type: 'error',
            text1: `${data.error}`,
            position: 'bottom',
            visibilityTime: 4000,
            bottomOffset: 50,
          });
        }
        if (data.status === 500 || data.status.message === '500 Network Error') {
          return Toast.show({
            type: 'error',
            text1: `${data.error}`,
            position: 'bottom',
            visibilityTime: 4000,
            bottomOffset: 50,
          });
        }
      })
      .catch(error => console.log('error', error));
  };
  console.warn('Verify-OTP-Input', Otp);

  // Re-send OTP API
  const reSendotp = async () => {
    setTimer(180);
    setIsResendDisabled(true);
    setIsTimerActive(true);

    fetch(`https://qaapi.jahernotice.com/api/single/generate/otp/${Userid}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${Token}`,
        'Content-type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        if (data.status == 200) {
          Toast.show({
            type: 'success',
            text1: `${data.message} ${mobileno}`,
            position: 'bottom',
            visibilityTime: 4000,
            bottomOffset: 50,
          });
          setOTPLogid(data.data.OTPLogID);
        } else {
          Toast.show({
            type: 'error',
            text1: `${data.error}`,
            position: 'bottom',
            visibilityTime: 4000,
            bottomOffset: 50,
          });
        }
      })
      .catch(error => console.log('error', error));
  };

  // Timer logic
  useVisibilityChange(isVisible => {
    if (isVisible && isTimerActive) {
      const intervalId = setInterval(() => {
        setTimer(prev => {
          if (prev <= 0) {
            clearInterval(intervalId);
            setIsTimerActive(false);
            setIsResendDisabled(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  });

  useEffect(() => {
    let interval;
    if (isTimerActive) {
      interval = setInterval(() => {
        setTimer(prev => {
          if (prev <= 0) {
            clearInterval(interval);
            setIsTimerActive(false);
            setIsResendDisabled(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerActive]);

  const statusBarBackgroundColor = theme === 'LIGHT' ? '#b83725' : '#343a40';

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme === 'LIGHT' ? '#ffffff' : '#20272b',
      }}>
      <StatusBar animated backgroundColor={statusBarBackgroundColor} />
      <OrientationLocker orientation={PORTRAIT} />
      <View>
        <Text
          style={{
            fontSize: 18,
            textAlign: 'center',
            marginTop: 30,
            color: theme === 'LIGHT' ? '#000' : '#ffffff',
          }}>
          Please enter the OTP received via SMS at registered mobile number: {mobileno}
        </Text>
      </View>

      <View style={[styles.input, { backgroundColor: theme === 'LIGHT' ? '#fff' : '#20272b' }]}>
        <TextInput
          style={{
            ...styles.textInput,
            borderColor: theme === 'LIGHT' ? '#000' : '#fff',
            color: theme === 'LIGHT' ? '#000' : '#fff',
          }}
          placeholder="Enter OTP"
          placeholderTextColor={theme === 'LIGHT' ? '#000' : '#fff'}
          keyboardType="numeric"
          maxLength={6}
          value={Otp}
          onChangeText={value => {
            setOtp(value);
            if (value.length === 6) Keyboard.dismiss();
          }}
        />
      </View>

      {buttonl ? (
        <View style={styles.buttonla}>
          <Text style={styles.textL}>Loading...</Text>
          <ActivityIndicator size="small" color="#fff" />
        </View>
      ) : (
        <Button
          style={Otp && Otp.length === 6 ? styles.button : styles.buttond}
          onPress={() => {
            onSubmit();
            setIsTimerActive(true);
          }}
          disabled={!Otp || Otp.length !== 6}
          mode="contained">
          Verify OTP
        </Button>
      )}

      <TouchableOpacity disabled={isResendDisabled}>
        {isTimerActive ? (
          <Text style={styles.resendText}>
            Resend OTP in <Text style={{ fontWeight: 'bold' }}>{formatTimerValue(timer)}</Text>
          </Text>
        ) : (
          <Text style={styles.resendText} onPress={reSendotp}>
            Resend OTP
          </Text>
        )}
      </TouchableOpacity>

      <Toast />
    </View>
  );
};

// -------- Styles --------
const styles = StyleSheet.create({
  textInput: {
    height: 40,
    borderBottomWidth: 1,
    width: '80%',
    textAlign: 'center',
    marginHorizontal: 'auto',
  },
  input: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: '15%',
  },
  button: {
    backgroundColor: '#ff4500',
    height: 50,
    justifyContent: 'center',
    marginTop: 30,
    borderRadius: 10,
  },
  buttond: {
    backgroundColor: '#bfbdbd',
    height: 50,
    justifyContent: 'center',
    marginTop: 30,
    borderRadius: 10,
  },
  buttonla: {
    backgroundColor: '#ff4500',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    flexDirection: 'row',
    borderRadius: 10,
  },
  textL: {
    color: '#fff',
    fontSize: 18,
    marginHorizontal: 5,
  },
  resendText: {
    marginTop: '15%',
    color: '#1a73e8',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Otp;
