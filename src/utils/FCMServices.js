import messaging from '@react-native-firebase/messaging';
import firebase from '@react-native-firebase/app';
import { isIos } from '../res/appStyles';

class FCMService {
  register = (onRegister, OnNotification, onOpenNotification) => {
    this.checkPermission(onRegister);
    this.createNotificationListeners(
      onRegister,
      OnNotification,
      onOpenNotification,
    );
  };

  registerAppWithFCM = async () => {
    try {
      if (isIos) {
        await messaging().registerDeviceForRemoteMessages();
        await messaging().setAutoInitEnabled(true);
      }
    } catch (error) {console.log(error);}
  };

  checkPermission = (onRegister) => {
    messaging()
      .hasPermission()
      .then((enabled) => {
        if (enabled) {
          //user has permission
          this.getToken(onRegister);
        } else {
          //User do not have permission
          this.requestPermission(onRegister);
        }
      })
      .catch((error) => {
        // console.log('[FCMService] Permission rejected ', error);
      });
  };

  getToken = async (onRegister) => {
    await firebase.messaging().registerDeviceForRemoteMessages();
    await firebase.messaging()
      .getToken()
      .then((fcmToken) => {
        if (fcmToken) {
          onRegister(fcmToken);
        } else {
          // console.log('[FCMServices] User does not have a device token');
        }
      });
  };

  requestPermission = (onRegister) => {
    messaging()
      .requestPermission()
      .then(() => {
        this.getToken(onRegister);
      })
      .catch((error) => {
        // console.log('[FCMServices] Request Permission rejected', error);
      });
  };

  deleteToken = () => {
    // console.log('[FCMService] deleteToken');
    messaging()
      .deleteToken()
      .catch((error) => {
        // console.log('[FCMServices] Delete token error', error);
      });
  };

  createNotificationListeners = (
    onRegister,
    onNotification,
    onOpenNotification,
  ) => {
    //When the application is running, but in the background
    messaging().onNotificationOpenedApp((remoteMessage) => {
      // console.log(
      //   '[FCMServices] onNotifcationOpenedApp Notificaion caused app to open from background state:',
      //   remoteMessage,
      // );
      if (remoteMessage) {
        const notification = remoteMessage.notification;
        onOpenNotification(notification);
      }
    });

    //When the application is opned from a quit state
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        // console.log(
        //   '[FCMServices] getInitialNotification Notificaion caused app to open from quit state:',
        //   remoteMessage,
        // );
        if (remoteMessage) {
          const notification = remoteMessage.notification;
          onOpenNotification(notification);
        }
      });

    //Foreground state messages
    this.messageListener = messaging().onMessage(async (remoteMessage) => {
      // console.log('[FCMServices] A new FCM message arrived!', remoteMessage);
      if (remoteMessage) {
        let notification = null;
        if (isIos) {
          notification = {
            notification: remoteMessage.data.notification,
            data: remoteMessage.data,
          };
        } else {
          notification = {
            notification: remoteMessage.notification,
            data: remoteMessage.data,
          };
        }

        onNotification(notification);
      }
    });

    //Triggered when have new token
    messaging().onTokenRefresh((fcmToken) => {
      // console.log('[FCMService] New token refresh: ', fcmToken);
      onRegister(fcmToken);
    });
  };

  unRegister = () => {
    this.messageListener();
  };
}

export const fcmService = new FCMService();
