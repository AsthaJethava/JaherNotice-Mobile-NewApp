/**
 * Jaher Notice React Native App (Updated for RN 0.75+)
 **/

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Linking,
  LogBox,
  Appearance,
  StatusBar,
} from 'react-native';
import { Card } from 'react-native-paper';
import { OrientationLocker, PORTRAIT } from 'react-native-orientation-locker';
import LinearGradient from 'react-native-linear-gradient';

// 🔹 Images
import Jahernoticelog from '../../Imeges/Jahernotice_logo.png';
import Jahernoticelogw from '../../../src/Imeges/JN_logo_White.png';
import PropertyProtection from '../../Imeges/Icon_property_protection_l.png';
import Titlesearch from '../../Imeges/Icon_title_search_l.png';
import LandRecords from '../../Imeges/Icon_land_records_l.png';
import Areaalert from '../../Imeges/Icon_area_alert_l.png';
import Ipvr from '../../Imeges/Icon_ipvr_l.png';
import RegisteredSearch from '../../Imeges/Icon_registered_search_l.png';
import Aajnijn from '../../Imeges/Icon_aajani_jaher_notice_l.png';
import TPAlerts from '../../Imeges/Icon_tp_alerts_l.png';
import AuctionAlert from '../../Imeges/Icon_auction_alerts_l.png';

const App = ({ route, navigation }) => {
  // Ignore all warnings and logs
  LogBox.ignoreAllLogs();

  const [theme, setTheme] = useState('LIGHT');

  useEffect(() => {
    const updateTheme = () => {
      const colorScheme = Appearance.getColorScheme();
      setTheme(colorScheme === 'dark' ? 'DARK' : 'LIGHT');
    };
    updateTheme();
    const listener = Appearance.addChangeListener(updateTheme);
    return () => {
      if (listener && typeof listener.remove === 'function') listener.remove();
    };
  }, []);

  const statusBarBackgroundColor =
    theme === 'LIGHT' ? 'transparent' : '#343a40';

  return (
    <SafeAreaView
      style={{
        backgroundColor: theme === 'LIGHT' ? '#ffffff' : '#20272b',
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
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

      {/* Header */}
      <Card
        style={{
          ...styles.card,
          backgroundColor: theme === 'LIGHT' ? '#ffffff' : '#20272b',
        }}
      >
        <View style={{ width: '100%', flexDirection: 'row' }}>
          <Image
            source={theme === 'LIGHT' ? Jahernoticelog : Jahernoticelogw}
            style={styles.logoImg}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            style={styles.loginButton}
          >
            <Text
              style={styles.loginText}
              onPress={() => navigation.navigate('Login')}
            >
              LOG IN
            </Text>
          </TouchableOpacity>
        </View>
      </Card>

      {/* Top Section */}
      <View
        style={{
          ...styles.containerS,
          backgroundColor: theme === 'LIGHT' ? '#ffffff' : '#20272b',
        }}
      >
        <View style={styles.containerSV}>
          <Card
            style={{
              ...styles.cardA,
              backgroundColor: theme === 'LIGHT' ? '#ffffff' : '#343a40',
              borderColor: theme === 'LIGHT' ? '#ffffff' : '#ffffff',
            }}
          >
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Text
                style={{
                  ...styles.textstyle,
                  color: theme === 'LIGHT' ? '#000' : '#ffffff',
                }}
              >
                Please log in to receive your Alerts
              </Text>
              <Text
                style={{
                  ...styles.textstyle,
                  color: theme === 'LIGHT' ? '#000' : '#ffffff',
                }}
              >
                Trouble Logging in ?
              </Text>
              <Text
                style={{
                  ...styles.textstyle,
                  color: theme === 'LIGHT' ? '#000' : '#ffffff',
                }}
              >
                Call us on{' '}
                <Text
                  style={styles.linkText}
                  onPress={() => Linking.openURL('tel:8000336677')}
                >
                  +91 8000336677
                </Text>
              </Text>
              <Text
                style={{
                  ...styles.textstyle,
                  color: theme === 'LIGHT' ? '#000' : '#ffffff',
                }}
              >
                or email us on{' '}
                <Text
                  style={styles.linkText}
                  onPress={() => Linking.openURL('mailto:info@jahernotice.com')}
                >
                  info@jahernotice.com
                </Text>
              </Text>
              <Text
                style={{
                  ...styles.textstyle,
                  color: theme === 'LIGHT' ? '#000' : '#ffffff',
                }}
              >
                Visit our Website:{' '}
                <Text
                  style={styles.linkText}
                  onPress={() =>
                    Linking.openURL('https://www.jahernotice.com/land-records')
                  }
                >
                  jahernotice.com
                </Text>
              </Text>
            </View>
          </Card>
        </View>
      </View>

      {/* Gradient Divider */}
      <LinearGradient
        style={styles.linearGradient}
        colors={['rgb(216, 216, 216)', 'rgb(204, 204, 204)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        locations={[0.18, 1, 1]}
      >
        <Text></Text>
      </LinearGradient>

      {/* Services Section */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          backgroundColor: theme === 'LIGHT' ? '#ffffff' : '#20272b',
        }}
      >
        <Text
          style={{
            textAlign: 'center',
            fontSize: 20,
            marginTop: 25,
            fontWeight: 'bold',
            color: theme === 'LIGHT' ? '#000' : '#ffffff',
          }}
        >
          Services
        </Text>

        <View style={styles.serviceGrid}>
          {[
            {
              img: PropertyProtection,
              text: 'Property Protection',
              route: 'PropertyProtectiontext',
            },
            {
              img: Titlesearch,
              text: 'Title Search',
              route: 'TiteleSearchtext',
            },
            {
              img: LandRecords,
              text: 'Land Records',
              route: 'LandRecordstext',
            },
            { img: Areaalert, text: 'Area Alert', route: 'AreaAlerttext' },
            { img: Ipvr, text: 'iPVR', route: 'Ipvrtext' },
            {
              img: RegisteredSearch,
              text: 'Registered Search',
              route: 'RegisterdSearchtext',
            },
            { img: Aajnijn, text: 'Aajni Jaher Notice', route: 'AajniJNtext' },
            { img: TPAlerts, text: 'TP Alerts', route: 'TpAlerts' },
            { img: AuctionAlert, text: 'Auction Alert', route: 'AuctionAlert' },
          ].map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.scarda}
              onPress={() => navigation.navigate(item.route)}
            >
              <Card
                style={{
                  ...styles.caradimg,
                  backgroundColor: theme === 'LIGHT' ? '#ffffff' : '#343a40',
                }}
              >
                <Image style={styles.iconimaga} source={item.img} />
              </Card>
              <Text
                style={{
                  ...styles.textss,
                  color: theme === 'LIGHT' ? '#000' : '#ffffff',
                }}
              >
                {item.text}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// -------------------- Styles --------------------
const styles = StyleSheet.create({
  card: {
    borderRadius: 1,
    borderColor: 'rgb(167, 129, 6)',
    borderBottomWidth: 4,
    width: '100%',
    height: 55,
  },
  logoImg: {
    width: '28%',
    height: 40,
    marginLeft: 4,
    resizeMode: 'contain',
    marginTop: 6,
  },
  loginButton: {
    marginLeft: 'auto',
    width: '22%',
    height: '65%',
    marginTop: 10,
    marginRight: 6,
    backgroundColor: 'rgb(242, 217, 105)',
    borderRadius: 20,
  },
  loginText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#000',
    marginTop: 6,
  },
  containerS: {
    width: '100%',
    height: '27%',
  },
  containerSV: {
    width: '100%',
    height: '70%',
    backgroundColor: 'rgb(242, 217, 105)',
    borderBottomRightRadius: 100,
    borderBottomLeftRadius: 100,
  },
  cardA: {
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 16,
    padding: 10,
    elevation: 3,
  },
  linearGradient: {
    height: 10,
  },
  textstyle: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 2,
    fontSize: 16,
  },
  linkText: {
    color: 'rgb(52, 120, 246)',
    textDecorationLine: 'underline',
  },
  serviceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  scarda: {
    height: 100,
    width: '28%',
    margin: 10,
    alignItems: 'center',
  },
  caradimg: {
    width: 70,
    height: 70,
    elevation: 4,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  iconimaga: {
    height: 50,
    width: 50,
  },
  textss: {
    textAlign: 'center',
    marginTop: 6,
    fontWeight: 'bold',
    width: 90,
  },
});

export default App;
