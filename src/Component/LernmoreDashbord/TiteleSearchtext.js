import React, { useState, useEffect } from 'react';
import {
  LogBox,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Linking,
  Appearance,
  StatusBar,
} from 'react-native';
import logo from '../../Imeges/Instant-Title-Search.png';
import {
  Orientation,
  OrientationLocker,
  PORTRAIT,
  LANDSCAPE,
} from 'react-native-orientation-locker';

function TiteleSearchtexta() {
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
              Get Instant Clarity about the Ownership
            </Text>
            <Text
              style={{
                ...styles.textT,
                color: theme === 'LIGHT' ? '#000' : '#ffffff',
              }}
            >
              Before buying any land, home, flat or commercial space, it is
              important to know the ownerships. Now get this instantly even
              before going to a property lawyer for detailed searches.
            </Text>
            <Text
              style={{
                ...styles.textT,
                color: theme === 'LIGHT' ? '#000' : '#ffffff',
              }}
            >
              Every Title Notice Search instantly gives you:
            </Text>
            <Text
              style={{
                ...styles.textTa,
                color: theme === 'LIGHT' ? '#000' : '#ffffff',
              }}
            >
              <Text>{`\u25CF`}</Text> Current and past ownership details or
              claims with full name
            </Text>
            <Text
              style={{
                ...styles.textTa,
                color: theme === 'LIGHT' ? '#000' : '#ffffff',
              }}
            >
              <Text>{`\u25CF`}</Text> Details of the engaged Lawyer
            </Text>
            <Text
              style={{
                ...styles.textTa,
                color: theme === 'LIGHT' ? '#000' : '#ffffff',
              }}
            >
              <Text>{`\u25CF`}</Text> Mortgage, Auction or Government notices
              issued
            </Text>
            <Text
              style={{
                ...styles.textTa,
                color: theme === 'LIGHT' ? '#000' : '#ffffff',
              }}
            >
              <Text>{`\u25CF`}</Text> Ability to conduct Title Notice Search by
              name
            </Text>
            <Text
              style={{
                ...styles.textTa,
                color: theme === 'LIGHT' ? '#000' : '#ffffff',
              }}
            >
              <Text>{`\u25CF`}</Text>Whether there is a caveat against the title
            </Text>
            <Text
              style={{
                ...styles.textT,
                color: theme === 'LIGHT' ? '#000' : '#ffffff',
              }}
            >
              Do the TITLE SEARCH right Now and Know the Names behind it!
            </Text>
            <Text
              style={{
                ...styles.textm,
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
                ...styles.textma,
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
                  Linking.openURL('https://www.jahernotice.com/title-search');
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
    height: '18%',
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
    backgroundColor: '#FFF',
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
  textma: {
    width: '90%',
    marginLeft: 20,
    fontSize: 18,
    color: '#5c5757e6',
    fontWeight: 'normal',
  },
  textm: {
    width: '90%',
    marginTop: 20,
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

export default TiteleSearchtexta;
