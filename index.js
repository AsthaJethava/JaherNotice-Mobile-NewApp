/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';
import NavigationService from './src/Navigation/NavigationService';
import 'react-native-gesture-handler';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Background Message:', remoteMessage);

  const imageUrl =
    remoteMessage?.data?.image ||
    remoteMessage?.notification?.android?.imageUrl;

  if (imageUrl) {
    setTimeout(() => {
      NavigationService.navigate('NotificationImage', { imageUrl });
    }, 1000);
  }
});
messaging()
  .getInitialNotification()
  .then(remoteMessage => {
    if (remoteMessage) {
      console.log('Opened from quit:', remoteMessage);

      const imageUrl =
        remoteMessage?.data?.image ||
        remoteMessage?.notification?.android?.imageUrl;

      if (imageUrl) {
        setTimeout(() => {
          NavigationService.navigate('NotificationImage', { imageUrl });
        }, 1000);
      }
    }
  });
AppRegistry.registerComponent(appName, () => App);
