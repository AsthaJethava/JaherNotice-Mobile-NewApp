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
import {
  Orientation,
  OrientationLocker,
  PORTRAIT,
  LANDSCAPE,
} from 'react-native-orientation-locker';
// import {bootstrapAsync} from '../../../Navigation/index';
// import NavigationService from '../../../helpers/NavigationService';

const Viewimg = ({ route, navigation }) => {
  const [imagepepara, setimagepepara] = useState();
  const [Notice_Date, setNotice_Date] = useState();
  const [notifyby, setnotifyby] = useState();
  const [imageLoadError, setImageLoadError] = useState(false);

  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  // Navigate Image Data

  useEffect(() => {
    const { imagepepar, Notice_Date, notifyby, otherParam } = route.params;
    setimagepepara(replaceSpacesInImageUrl(imagepepar));
    setNotice_Date(Notice_Date);
    setnotifyby(notifyby);
  }, []);

  // useEffect(() => {
  //   bootstrapAsync().then(({isUserActive}) => {
  //     if (isUserActive) {
  //       NavigationService.navigate('Dashbord');
  //     } else {
  //       NavigationService.navigate('Login');
  //     }
  //   });
  // });

  console.log(imagepepara);
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
  // test

  const DownlodImage = () => {};
  const images = [
    {
      url: imagepepara,
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
              {Notice_Date}
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
              {notifyby}
            </Text>
          </View>
        </View>
        <View style={{ flexShrink: 1, height: 800, width: 370 }}>
          <ReactNativeZoomableView
            maxZoom={30}
            contentWidth={500}
            contentHeight={450}
          >
            {/* <Image
              style={{width: '100%', height: '100%', resizeMode: 'center'}}
              source={{uri: imagepepara}}
            /> */}
            {imageLoadError ? (
              <Text>Image Not Found</Text>
            ) : (
              <Image
                style={{ width: '100%', height: '100%', resizeMode: 'center' }}
                source={{ uri: imagepepara }}
                onError={() => setImageLoadError(true)} // Set the error state if the image fails to load
              />
            )}
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
