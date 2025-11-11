// /**
//  * Jaher Notice React Native App
//  **/

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  Animated,
  Dimensions,
  SafeAreaView,
  LogBox,
  Appearance,
  StatusBar,
} from 'react-native';
import { ReactNativeZoomableView } from '@openspacelabs/react-native-zoomable-view';
import Logo from '../../../Imeges/jnlogo.png';
import Pinchable from 'react-native-pinchable';
import { PinchGestureHandler } from 'react-native-gesture-handler';
import { event } from 'react-native-reanimated';
import ImageViewer from 'react-native-image-zoom-viewer';
import {
  Orientation,
  OrientationLocker,
  PORTRAIT,
  LANDSCAPE,
} from 'react-native-orientation-locker';
// import {bootstrapAsync} from '../../../Navigation/index';
// import NavigationService from '../../../helpers/NavigationService';

const Bppalert = ({ route, navigation }) => {
  const [imagebppa, setimagebppa] = useState();
  const [notify, setnotify] = useState();
  const [publish, setpublish] = useState();
  // useEffect(() => {
  //   bootstrapAsync().then(({isUserActive}) => {
  //     if (isUserActive) {
  //       NavigationService.navigate('Dashbord');
  //     } else {
  //       NavigationService.navigate('Login');
  //     }
  //   });
  // });
  useEffect(() => {
    const { imagebpp, publish, notify, otherParam } = route.params;
    setimagebppa(replaceSpacesInImageUrl(imagebpp));
    setpublish(publish);
    setnotify(notify);
  });

  const replaceSpacesInImageUrl = imageUrl => {
    if (imageUrl.includes(' ')) {
      // Use `includes` directly
      console.log('replace', imageUrl);
      return imageUrl.replace(/ /g, '%20');
    } else {
      console.log('not replace', imageUrl);
      return imageUrl;
    }
  };

  const images = [
    {
      url: imagebppa,
    },
  ];

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

  const formatDate = dateString => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    // Ensure that day and month are two digits
    const formattedDay = day < 10 ? `0${day}` : `${day}`;
    const formattedMonth = month < 10 ? `0${month}` : `${month}`;

    return `${formattedDay}/${formattedMonth}/${year}`;
  };

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
        <View
          style={{
            ...styles.Textcu,
            borderBottomColor: theme === 'LIGHT' ? 'grey' : '#ffffff',
          }}
        >
          <View style={styles.date}>
            <Text
              style={{
                fontWeight: 'bold',
                marginLeft: 10,
                color: theme === 'LIGHT' ? '#000' : '#ffffff',
              }}
            >
              {formatDate(publish)}
            </Text>
          </View>
          <View
            style={{
              ...styles.logo,
              borderColor: theme === 'LIGHT' ? '#000' : '#ffffff',
            }}
          >
            <Image
              source={Logo}
              style={{
                fontWeight: 'bold',
                marginLeft: 10,
                marginRight: 5,
                width: 35,
                height: 35,
              }}
            />
          </View>

          <View style={styles.notify}>
            <Text
              style={{
                fontWeight: 'bold',
                marginRight: 10,
                color: theme === 'LIGHT' ? '#000' : '#ffffff',
              }}
            >
              {notify}
            </Text>
          </View>
        </View>
        <View style={{ flexShrink: 1, height: 800, width: 370 }}>
          <ReactNativeZoomableView
            maxZoom={30}
            contentWidth={500}
            contentHeight={450}
          >
            <Image
              style={{ width: '100%', height: '100%', resizeMode: 'center' }}
              // contain
              source={{ uri: imagebppa }}
            />
          </ReactNativeZoomableView>
        </View>
      </View>
    </>
  );
  s;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 2,
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },

  Textcu: {
    borderBottomWidth: 3,
    borderBottomColor: 'grey',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 50,
    width: '100%',
  },
  date: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
  },

  logo: {
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 2,
    borderRightColor: 'grey',
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
  },

  notify: {
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});
export default Bppalert;
