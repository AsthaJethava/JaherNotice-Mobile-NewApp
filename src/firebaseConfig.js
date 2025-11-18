// // // src/firebaseConfig.js
// // import { initializeApp } from 'firebase/app';
// // import { getReactNativePersistence, initializeAuth } from 'firebase/auth';
// // import AsyncStorage from '@react-native-async-storage/async-storage';
// // import { getMessaging } from 'firebase/messaging';

// // // Your web config from Firebase console
// // const firebaseConfig = {
// //   apiKey: 'AIzaSyDPprmfchcocF2df_CIN1ZGrNnokg3kdsY',
// //   authDomain: 'jahernotice-1a7c0.firebaseapp.com',
// //   projectId: 'jahernotice-1a7c0',
// //   storageBucket: 'jahernotice-1a7c0.appspot.com',
// //   messagingSenderId: '743355403215',
// //   appId: '1:743355403215:android:3fb8a96fc598715a3860ba',
// // };

// // // Initialize Firebase only once
// // const app = initializeApp(firebaseConfig);

// // // (Optional, if you’re using Firebase Auth)
// // initializeAuth(app, {
// //   persistence: getReactNativePersistence(AsyncStorage),
// // });

// // export const messaging = getMessaging(app);
// // export default app;

// import messaging from '@react-native-firebase/messaging';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// // Ask for permission (Android 13+)
// export async function requestUserPermission() {
//   const authStatus = await messaging().requestPermission();
//   const enabled =
//     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//   return enabled;
// }

// // Get FCM Token
// export async function getFcmToken() {
//   let token = await AsyncStorage.getItem('fcmToken');

//   if (!token) {
//     try {
//       const newToken = await messaging().getToken();
//       if (newToken) {
//         await AsyncStorage.setItem('fcmToken', newToken);
//         return newToken;
//       }
//     } catch (error) {
//       console.log('FCM TOKEN ERROR:', error);
//       return null;
//     }
//   } else {
//     return token;
//   }
// }

// // Foreground notification listener
// export const notificationListener = async () => {
//   messaging().onMessage(async remoteMessage => {
//     console.log('Foreground notification:', remoteMessage);
//   });
// };
