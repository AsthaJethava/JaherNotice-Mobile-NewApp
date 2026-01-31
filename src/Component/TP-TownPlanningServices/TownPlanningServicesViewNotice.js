import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { ReactNativeZoomableView } from '@openspacelabs/react-native-zoomable-view';
import Logo from '../../Imeges/jnlogo.png';
// import {bootstrapAsync} from '../../../src/Navigation/index';
// import NavigationService from '../../../src/helpers/NavigationService';

const Viewimg = ({ route }) => {
  const [imagepepara, setimagepepara] = useState();
  const [Notice_Date, setNotice_Date] = useState();
  const [notifyby, setnotifyby] = useState();
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  // useEffect(() => {
  //   const {imagepepar, Notice_Date, notifyby} = route.params;
  //   if (imagepepar.includes(' ')) {
  //     const img = imagepepar.replace(/ /g, '%20');
  //     setimagepepara(img);
  //     console.log('imagepepar', img);
  //   } else {
  //     setimagepepara(imagepepar);
  //     console.log('imagepepar', imagepepar);
  //   }
  //   setNotice_Date(Notice_Date);
  //   setnotifyby(notifyby);
  //   console.log('imagepepar', imagepepar);
  // }, []);

  useEffect(() => {
    const { imagepepar, Notice_Date, notifyby } = route.params;
    replaceSpacesInImageUrl(imagepepar);
    setNotice_Date(Notice_Date);
    setnotifyby(notifyby);
  }, []);

  const replaceSpacesInImageUrl = imageUrl => {
    if (imageUrl.includes(' ')) {
      // Use `includes` directly
      console.log('replace', imageUrl);
      const img = imageUrl.replace(/ /g, '%20');
      setimagepepara(img);
    } else {
      console.log('not replace', imageUrl);
      // return imageUrl;
      setimagepepara(imageUrl);
    }
  };
  // useEffect(() => {
  //   bootstrapAsync().then(({isUserActive}) => {
  //     if (isUserActive) {
  //       NavigationService.navigate('Dashbord');
  //     } else {
  //       NavigationService.navigate('Login');
  //     }
  //   });
  // });

  const statusBarBackgroundColor = '#b83725';

  const handleImageLoad = () => {
    console.log('Image loaded successfully');
    setImageLoading(false);
  };

  const handleImageError = () => {
    console.log('Error loading image');
    setImageLoading(false);
    setImageError(true);
  };

  return (
    <>
      <View style={styles.container}>
        <StatusBar animated={true} backgroundColor={statusBarBackgroundColor} />

        <View style={styles.TextContainer}>
          <View style={styles.date}>
            <Text
              style={{
                fontWeight: 'bold',
                marginLeft: 10,
              }}
            >
              {Notice_Date}
            </Text>
          </View>
          <View style={styles.logo}>
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
              }}
            >
              {notifyby}
            </Text>
          </View>
        </View>

        <View style={styles.imageContainer}>
          {/* {imageLoading && <ActivityIndicator style={styles.loader} />}
          {imageError && <Text style={styles.errorText}>Image not found</Text>}
          {!imageLoading && !imageError && ( */}
          <ReactNativeZoomableView
            maxZoom={30}
            contentWidth={500}
            contentHeight={450}
          >
            <Image
              style={styles.image}
              source={{ uri: imagepepara }}
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
          </ReactNativeZoomableView>
          {/* )} */}
          {/* {imageLoading && <ActivityIndicator style={styles.loader} />}
          {imageError && <Text style={styles.errorText}>Image not found</Text>}
          {!imageLoading && !imageError && (
            <ReactNativeZoomableView
              maxZoom={30}
              contentWidth={500}
              contentHeight={450}>
              <Image
                style={styles.image}
                source={{uri: imagepepara}}
                onLoad={handleImageLoad}
                onError={handleImageError}
              />
            </ReactNativeZoomableView>
          )} */}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 2,
  },
  TextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 3,
    borderBottomColor: 'grey',
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
  },
  logoImage: {
    width: 35,
    height: 35,
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
  text: {
    fontWeight: 'bold',
    marginLeft: 10,
  },
  imageContainer: {
    flexShrink: 1,
    height: 800,
    width: 370,
  },
  loader: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'center',
  },
  errorText: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -50 }, { translateY: -10 }],
    color: 'red',
    fontWeight: 'bold',
  },
});

export default Viewimg;

// // /**
// //  * Jaher Notice React Native App
// //  **/

// import React, {useState, useEffect} from 'react';
// import {
//   View,
//   Text,
//   ScrollView,
//   StyleSheet,
//   Image,
//   Animated,
//   Dimensions,
//   SafeAreaView,
//   LogBox,
//   Appearance,
//   StatusBar,
// } from 'react-native';
// import {ReactNativeZoomableView} from '@openspacelabs/react-native-zoomable-view';
// import Logo from '../../Imeges/jnlogo.png';
// import {
//   Orientation,
//   OrientationLocker,
//   PORTRAIT,
//   LANDSCAPE,
// } from 'react-native-orientation-locker';

// const Viewimg = ({route, navigation}) => {
//   const [imagepepara, setimagepepara] = useState();
//   const [Notice_Date, setNotice_Date] = useState();
//   const [notifyby, setnotifyby] = useState();
//   const [imageLoadError, setImageLoadError] = useState(false);

//   const [imageLoading, setImageLoading] = useState(true);
//   const [imageError, setImageError] = useState(false);

//   // Navigate Image Data
//   useEffect(() => {
//     const {imagepepar, Notice_Date, notifyby, otherParam} = route.params;
//     if (imagepepar.includes(' ')) {
//       const img = imagepepar.replace(/ /g, '%20');
//       setimagepepara(img);
//     } else {
//       setimagepepara(imagepepar);
//     }
//     setNotice_Date(Notice_Date);
//     setnotifyby(notifyby);
//   }, []);
//   // test
//   console.log('imagepepara', imagepepara);

//   const DownlodImage = () => {};
//   const images = [
//     {
//       url: imagepepara,
//     },
//   ];

//   // Ignore log notification by message
//   LogBox.ignoreLogs(['Warning: ...']);

//   //Ignore all log notifications
//   LogBox.ignoreAllLogs();
//   console.disableYellowBox = true;

//   const [theme, setTheme] = useState('');

//   useEffect(() => {
//     const getColorScheme = () => {
//       const colorScheme = Appearance.getColorScheme();
//       if (colorScheme === 'dark') {
//         setTheme('DARK');
//       } else {
//         setTheme('LIGHT');
//       }
//     };
//     getColorScheme(); // Call the function immediately
//     const listener = Appearance.addChangeListener(getColorScheme);
//     return () => {
//       listener.remove(); // Remove the change listener on component unmount
//     };
//   }, []);
//   const statusBarBackgroundColor = theme === 'LIGHT' ? '#b83725' : '#343a40';
//   const formatDate = dateString => {
//     const date = new Date(dateString);
//     const day = date.getDate();
//     const month = date.getMonth() + 1;
//     const year = date.getFullYear();

//     // Ensure that day and month are two digits
//     const formattedDay = day < 10 ? `0${day}` : `${day}`;
//     const formattedMonth = month < 10 ? `0${month}` : `${month}`;

//     return `${formattedDay}/${formattedMonth}/${year}`;
//   };

//   return (
//     <>
//       <View
//         style={{
//           ...styles.container,
//           backgroundColor: theme === 'LIGHT' ? '#ffffff' : '#20272b',
//         }}>
//         <StatusBar animated={true} backgroundColor={statusBarBackgroundColor} />
//         <OrientationLocker
//           orientation={PORTRAIT}
//           onChange={orientation => console.log('onChange', orientation)}
//           onDeviceChange={orientation =>
//             console.log('onDeviceChange', orientation)
//           }
//         />
//         <View
//           style={{
//             ...styles.Textcu,
//             borderBottomColor: theme === 'LIGHT' ? 'grey' : '#ffffff',
//           }}>
//           <View style={styles.date}>
//             <Text
//               style={{
//                 fontWeight: 'bold',
//                 marginLeft: 10,
//                 color: theme === 'LIGHT' ? '#000' : '#ffffff',
//               }}>
//               {Notice_Date}
//             </Text>
//           </View>
//           <View
//             style={{
//               ...styles.logo,
//               borderColor: theme === 'LIGHT' ? '#000' : '#ffffff',
//             }}>
//             <Image
//               source={Logo}
// style={{
//   fontWeight: 'bold',
//   marginLeft: 10,
//   marginRight: 5,
//   width: 35,
//   height: 35,
// }}
//             />
//           </View>

//           <View style={styles.notify}>
//             <Text
//               style={{
// fontWeight: 'bold',
// marginRight: 10,
//                 color: theme === 'LIGHT' ? '#000' : '#ffffff',
//               }}>
//               {notifyby}
//             </Text>
//           </View>
//         </View>
//         <View style={{flexShrink: 1, height: 800, width: 370}}>
//           <ReactNativeZoomableView
//             maxZoom={30}
//             contentWidth={500}
//             contentHeight={450}>
//             <Image
//               style={{width: '100%', height: '100%', resizeMode: 'center'}}
//               source={{uri: imagepepara}}
//             />
//           </ReactNativeZoomableView>
//         </View>
//       </View>
//     </>
//   );
//   s;
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 2,
//   },
//   box: {
//     width: 60,
//     height: 60,
//     marginVertical: 20,
//   },

//   Textcu: {
//     borderBottomWidth: 3,
//     borderBottomColor: 'grey',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     height: 50,
//     width: '100%',
//   },
//   date: {
// justifyContent: 'center',
// alignItems: 'center',
// marginTop: 'auto',
// marginBottom: 'auto',
// marginLeft: 'auto',
// marginRight: 'auto',
//   },

//   logo: {
//     marginLeft: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRightWidth: 2,
//     borderRightColor: 'grey',
//     marginTop: 'auto',
//     marginBottom: 'auto',
//     marginLeft: 'auto',
//     marginRight: 'auto',
//   },

//   notify: {
// fontWeight: 'bold',
// justifyContent: 'center',
// alignItems: 'center',
// marginTop: 'auto',
// marginBottom: 'auto',
// marginLeft: 'auto',
// marginRight: 'auto',
//   },
// });
// export default Viewimg;
