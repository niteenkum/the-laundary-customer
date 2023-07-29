import {useEffect} from 'react';
import {Platform} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import firebase from '@react-native-firebase/app';
import {setAsyncStorage, getAsyncStorage} from './asyncStorage';

export const FCM_TOKEN = 'fcmToken';
export const isIos = Platform.OS === 'ios';

export const NotificationController = props => {
  useEffect(() => {
    checkPermission();
  }, []);

  const checkPermission = async () => {
    const enabled = await messaging().hasPermission();
    if (enabled) {
      getToken();
    } else {
      requestPermission();
    }
  };

  const getToken = async () => {
    let fcmToken = await getAsyncStorage(FCM_TOKEN);
    console.log('fcmToken', fcmToken);
    if (!fcmToken) {
      await firebase.messaging().registerDeviceForRemoteMessages()
      fcmToken = await messaging().getToken();
      if (fcmToken) {
        setAsyncStorage(FCM_TOKEN, fcmToken);
      }
    }
  };

  const requestPermission = async () => {
    try {
      await messaging().requestPermission();
      getToken();
    } catch (error) {
      console.log('permission rejected');
    }
  };

  return false;
};
