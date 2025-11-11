// // src/firebaseConfig.js
// import { initializeApp } from 'firebase/app';
// import { getReactNativePersistence, initializeAuth } from 'firebase/auth';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { getMessaging } from 'firebase/messaging';

// // Your web config from Firebase console
// const firebaseConfig = {
//   apiKey: 'AIzaSyDPprmfchcocF2df_CIN1ZGrNnokg3kdsY',
//   authDomain: 'jahernotice-1a7c0.firebaseapp.com',
//   projectId: 'jahernotice-1a7c0',
//   storageBucket: 'jahernotice-1a7c0.appspot.com',
//   messagingSenderId: '743355403215',
//   appId: '1:743355403215:android:3fb8a96fc598715a3860ba',
// };

// // Initialize Firebase only once
// const app = initializeApp(firebaseConfig);

// // (Optional, if you’re using Firebase Auth)
// initializeAuth(app, {
//   persistence: getReactNativePersistence(AsyncStorage),
// });

// export const messaging = getMessaging(app);
// export default app;
