import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  LogBox,
  Appearance,
} from 'react-native';
import { ReactNativeZoomableView } from '@openspacelabs/react-native-zoomable-view';
import { OrientationLocker, PORTRAIT } from 'react-native-orientation-locker';

const Bppalert = ({ route, navigation }) => {
  const [imagebppa, setimagebppa] = useState();
  const [publish, setpublish] = useState();
  const [notify, setnotify] = useState();
  const [imageLoadError, setImageLoadError] = useState(false);
  const [theme, setTheme] = useState('');

  useEffect(() => {
    const { imageUrl, publish, notify } = route.params;
    console.log('Original imageUrl:', imageUrl);

    setimagebppa(replaceSpacesInImageUrl(imageUrl));
    setpublish(publish);
    setnotify(notify);
  }, [route.params]);

  useEffect(() => {
    const getColorScheme = () => {
      const colorScheme = Appearance.getColorScheme();
      setTheme(colorScheme === 'dark' ? 'DARK' : 'LIGHT');
    };

    getColorScheme();
    const listener = Appearance.addChangeListener(getColorScheme);
    return () => {
      listener.remove();
    };
  }, []);

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

  const statusBarBackgroundColor = theme === 'LIGHT' ? '#b83725' : '#343a40';

  LogBox.ignoreAllLogs();
  console.disableYellowBox = true;

  return (
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
      <View style={{ flexShrink: 1, height: 800, width: 370 }}>
        <ReactNativeZoomableView
          maxZoom={30}
          contentWidth={500}
          contentHeight={450}
        >
          {imageLoadError ? (
            <Text>Image Not Found</Text>
          ) : (
            <Image
              style={{ width: '100%', height: '100%', resizeMode: 'center' }}
              source={{ uri: imagebppa }}
              onError={error => {
                console.log('Image load error:', error.nativeEvent.error);
                setImageLoadError(true);
              }}
            />
          )}
        </ReactNativeZoomableView>
      </View>
    </View>
  );
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
