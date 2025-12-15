import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import notifee from '@notifee/react-native';

// 🔹 Create Notification Channel (Android)
export async function createNotificationChannel() {
  await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
    importance: notifee.AndroidImportance.HIGH,
  });
}

// Ask Permission (Android 13+)
export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  return enabled;
}

// Get FCM Token
export async function getFcmToken() {
  let token = await AsyncStorage.getItem('fcmToken');

  if (!token) {
    try {
      const newToken = await messaging().getToken();
      if (newToken) {
        await AsyncStorage.setItem('fcmToken', newToken);
        return newToken;
      }
    } catch (error) {
      console.log('FCM TOKEN ERROR:', error);
      return null;
    }
  } else {
    return token;
  }
}

// Foreground Notification Listener
export const notificationListener = () => {
  messaging().onMessage(async remoteMessage => {
    console.log('Foreground message: ', remoteMessage);

    await notifee.displayNotification({
      title: remoteMessage?.notification?.title ?? 'Notification',
      body: remoteMessage?.notification?.body ?? '',
      android: {
        channelId: 'default',
        pressAction: { id: 'default' },
      },
    });
  });
};
