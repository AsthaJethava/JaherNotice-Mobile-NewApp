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
  LogBox,
  SafeAreaView,
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
// import Gif from '../../../../src/Imeges/no-data-1.gif';

const Viewimg = ({ route, navigation }) => {
  const [imagepeparariaa, setimagepeparariaa] = useState();
  const [publish_date, setpublish_date] = useState();
  const [notifysource, setnotifysource] = useState();
  // useEffect(() => {
  //   bootstrapAsync().then(({isUserActive}) => {
  //     if (isUserActive) {
  //       NavigationService.navigate('Ariaimglert');
  //     } else {
  //       NavigationService.navigate('Login');
  //     }
  //   });
  // });
  useEffect(() => {
    const { imagepepararia, publish_date, notifysource, otherParam } =
      route.params;
    setimagepeparariaa(replaceSpacesInImageUrl(imagepepararia));
    setpublish_date(publish_date);
    setnotifysource(notifysource);
  }, []);

  // console.log(imagepeparariaa);
  const replaceSpacesInImageUrl = imageUrl => {
    // Check if there are spaces in the URL
    if (imageUrl && imageUrl.includes(' ')) {
      // Replace spaces with %20
      return imageUrl.replace(/ /g, '%20');
    }
    // If no spaces, return the original URL
    return imageUrl;
  };

  const images = [
    {
      url: imagepeparariaa,
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
              {publish_date}
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
              {notifysource}
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
              source={{ uri: imagepeparariaa }}
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
export default Viewimg;
