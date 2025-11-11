import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Linking,
  LogBox,
  Appearance,
  StatusBar,
} from 'react-native';
import logo from '../../Imeges/Area-Alerts.png';
import {
  Orientation,
  OrientationLocker,
  PORTRAIT,
  LANDSCAPE,
} from 'react-native-orientation-locker';

function AajniJNtexta() {
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

  return (
    <>
      <View
        style={{
          ...styles.container,
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
        <ScrollView>
          <View style={styles.Imge}>
            <Image style={styles.Images} source={logo} />
          </View>
          <View>
            <Text
              style={{
                ...styles.texth,
                color: theme === 'LIGHT' ? '#000' : '#ffffff',
              }}
            >
              Never miss a Notice!
            </Text>

            <Text
              style={{
                ...styles.textT,
                color: theme === 'LIGHT' ? '#000' : '#ffffff',
              }}
            >
              Whether anyone is buying a property or is getting auctioned,
              whether Government is planning a project on any land or village or
              if there is an upcoming development plan, you will come to know of
              it, irrespective of in which newspaper it is being issued in.
            </Text>
            <Text
              style={{
                ...styles.textT,
                color: theme === 'LIGHT' ? '#000' : '#ffffff',
              }}
            >
              {`\u25CF`} With Aajni Jahernotice you get:
            </Text>
            <Text
              style={{
                ...styles.textT,
                color: theme === 'LIGHT' ? '#000' : '#ffffff',
              }}
            >
              {`\u25CF`} See all the real estate deals taking place today
            </Text>
            <Text
              style={{
                ...styles.textT,
                color: theme === 'LIGHT' ? '#000' : '#ffffff',
              }}
            >
              {`\u25CF`} Know if Government has any Development Plans
            </Text>
            <Text
              style={{
                ...styles.textT,
                color: theme === 'LIGHT' ? '#000' : '#ffffff',
              }}
            >
              {`\u25CF`} See which land or property is getting auctioned and
              when
            </Text>
            <Text
              style={{
                ...styles.textT,
                color: theme === 'LIGHT' ? '#000' : '#ffffff',
              }}
            >
              {`\u25CF`} Get full names of property owners and their survey
              numbers
            </Text>
            <Text
              style={{
                ...styles.textT,
                color: theme === 'LIGHT' ? '#000' : '#ffffff',
              }}
            >
              {`\u25CF`} Get access to all Land and Property Notices issued
              today
            </Text>
            <Text
              style={{
                ...styles.textT,
                color: theme === 'LIGHT' ? '#000' : '#ffffff',
              }}
            >
              {`\u25CF`} Find Land and Property notices published in any
              Newspaper
            </Text>
            <Text
              style={{
                ...styles.textm,
                color: theme === 'LIGHT' ? '#000' : '#ffffff',
              }}
            >
              See Aajni Jahernotice right now.
            </Text>
            <Text
              style={{
                ...styles.textma,
                color: theme === 'LIGHT' ? '#000' : '#ffffff',
              }}
            >
              Call us on:{' ' + ' '}
              <Text
                style={{
                  color: 'rgb(52, 120, 246)',
                  textDecorationLine: 'underline',
                }}
                onPress={() => {
                  Linking.openURL('tel:8000336677');
                }}
              >
                +91 8000336677
              </Text>
            </Text>
            <Text
              style={{
                ...styles.textee,
                color: theme === 'LIGHT' ? '#000' : '#ffffff',
              }}
            >
              or email us on:{' ' + ' '}
              <Text
                style={{
                  color: 'rgb(52, 120, 246)',
                  textDecorationLine: 'underline',
                }}
                onPress={() => Linking.openURL('mailto:info@jahernotice.com')}
              >
                info@jahernotice.com
              </Text>
            </Text>
            <Text
              style={{
                ...styles.texte,
                color: theme === 'LIGHT' ? '#000' : '#ffffff',
              }}
            >
              Visit our Website:{' ' + ' '}
              <Text
                style={{
                  color: 'rgb(52, 120, 246)',
                  textDecorationLine: 'underline',
                }}
                onPress={() => {
                  Linking.openURL(
                    'https://www.jahernotice.com/aajni-jahernotice',
                  );
                }}
              >
                jahernotice.com
              </Text>
            </Text>
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#efefef',
  },
  Imge: {
    width: '90%',
    height: '15%',
    elevation: 10,
    borderRadius: 15,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  Images: {
    width: '100%',
    height: '100%',
    elevation: 10,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  texth: {
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 6,
    color: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    fontSize: 20,
    textAlign: 'center',
    width: '85%',
  },
  textT: {
    width: '90%',
    marginLeft: 20,
    fontSize: 18,
    marginTop: 10,
    color: '#5c5757e6',
    fontWeight: 'normal',
  },

  textTa: {
    width: '90%',
    fontSize: 18,
    marginTop: 10,
    marginLeft: 30,
    color: '#5c5757e6',
    fontWeight: 'normal',
  },

  textm: {
    width: '100%',
    marginTop: 20,
    marginLeft: 20,
    fontSize: 18,
    color: '#5c5757e6',
    fontWeight: 'normal',
  },
  textma: {
    width: '90%',
    marginLeft: 20,
    fontSize: 18,
    color: '#5c5757e6',
    fontWeight: 'normal',
  },
  textee: {
    width: '100%',
    marginLeft: 20,
    fontSize: 18,
    color: '#5c5757e6',
    fontWeight: 'normal',
  },
  texte: {
    width: '90%',
    marginLeft: 20,
    fontSize: 18,
    marginBottom: '80%',
    color: '#5c5757e6',
    fontWeight: 'normal',
  },
});

export default AajniJNtexta;
