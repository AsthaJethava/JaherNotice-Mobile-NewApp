import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Text, Image } from 'react-native';
import { useFocusEffect } from '@react-navigation/native'; // Import useFocusEffect
import Pdf from 'react-native-pdf';

const PDFScreen = ({ route }) => {
  const [url, setPdfUrl] = useState('');

  // useEffect to handle initial and route changes
  useEffect(() => {
    setPdfUrl([]);
  }, []);

  const URL = () => {
    const { PdfUrl } = route.params;
    setPdfUrl(PdfUrl);
    console.log('URL:', PdfUrl);
  };

  // useFocusEffect to handle focus events
  useFocusEffect(
    React.useCallback(() => {
      URL();
      // Load PDF or perform any actions on focus
      console.log('Screen is focused');
      // You may want to load a new PDF here if needed
      return () => {
        // Cleanup or perform actions when the screen loses focus
        console.log('Screen is unfocused');
      };
    }, []),
  );

  return (
    <View style={styles.container}>
      {/* <View style={{flexShrink: 1, height: 800, width: '100%'}}>
        <Pdf
          key={url} // Add a key based on the URL to force re-render
          trustAllCerts={false}
          source={{
            uri: url,
          }}
          onLoadComplete={numberOfPages => {
            console.log(`Number of pages: ${numberOfPages}`);
          }}
          onPageChanged={page => {
            console.log(`Current page: ${page}`);
          }}
          onError={error => {
            console.log(error);
          }}
          style={styles.pdf}
        />
      </View> */}
      {url === null || url === 'None' || url === '' ? (
        <>
          {/* <Text style={styles.errorMessage}>Sorry Document Not Found</Text> */}
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: 350,
            }}
          >
            <Image
              source={require('../../Imeges/no-data-1.gif')}
              style={{
                width: 100,
                height: 100,
                marginBottom: 20,
              }}
            />
            <Text
              style={{
                fontWeight: 'bold',
                marginTop: 10,
                marginBottom: 10,
              }}
            >
              Oops! Document Not Found
            </Text>
          </View>
        </>
      ) : (
        <View style={{ flexShrink: 1, height: 800, width: '100%' }}>
          <Pdf
            key={url} // Add a key based on the URL to force re-render
            trustAllCerts={false}
            source={{
              uri: url,
            }}
            onLoadComplete={numberOfPages => {
              console.log(`Number of pages: ${numberOfPages}`);
            }}
            onPageChanged={page => {
              console.log(`Current page: ${page}`);
            }}
            onError={error => {
              console.log(error);
            }}
            style={styles.pdf}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  errorMessage: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PDFScreen;

// import React, {useEffect, useState} from 'react';
// import {View, StyleSheet, Dimensions} from 'react-native';
// import Pdf from 'react-native-pdf';

// const PDFScreen = ({route, navigation}) => {
//   const [url, setPdfUrl] = useState();

//   useEffect(() => {
//     const {PdfUrl} = route.params;
//     setPdfUrl(PdfUrl);
//   }, []);

//   return (
//     <>
//       <View style={styles.container}>
//         <View style={{flexShrink: 1, height: 800, width: '100%'}}>
//           <Pdf
//             trustAllCerts={false}
//             source={{
//               uri: url,
//               cache: true,
//             }}
//             onLoadComplete={numberOfPages => {
//               console.log(`Number of pages: ${numberOfPages}`);
//             }}
//             onPageChanged={page => {
//               console.log(`Current page: ${page}`);
//             }}
//             onError={error => {
//               console.log(error);
//             }}
//             onPressLink={uri => {
//               console.log(`Link pressed: ${uri}`);
//             }}
//             style={styles.pdf}
//           />
//         </View>
//       </View>
//     </>
//   );
// };
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     // backgroundColor: 'black',
//     marginTop: 10,
//     marginBottom: 10,
//   },
//   pdf: {
//     flex: 1,
//     width: Dimensions.get('window').width,
//     height: Dimensions.get('window').height,
//     // width: '100%',
//     // resizeMode: 'contain',
//   },
// });
// export default PDFScreen;
