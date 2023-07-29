import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {isIos} from '../res/appStyles';

class LocalNotificationService {
  configure = onOpenNotifcation => {
    PushNotification.configure({
      onRegister: function (token) {
        // console.log('[LocalNotificationService] onRegister: ', token);
      },
      onNotification: function (notification) {
        // console.log('[LocalNotificationService] onNotification:', notification);
        if (!notification?.data) {
          return;
        }
        notification.userInteraction = true;
        onOpenNotifcation(isIos ? notification.data.item : notification.data);

        //Only call callback if not from foreground
        if (isIos) {
          //(required) Called when a remote is received or opened, or local notification is opned
          notification.finish(PushNotificationIOS.FetchResult.NoData);
        }
      },

      //IOS ONLY (optional) : default: all - Permissions to register
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      //Should the initial notifcation be popped automatically
      //default: true
      popInitialNotification: true,

      requestPermissions: true,
    });
  };

  unregister = () => {
    PushNotification.unregister();
  };

  showNotification = (id, title, message, data = {}, options = {}) => {
    PushNotification.localNotification({
      //android only
      ...this.buildAndroidNotification(id, title, message, data, options),
      //IOS and Android properties
      ...this.buildIOSNotification(id, title, message, data, options),
      //IOS and Android properties
      title: title || '',
      message: message || '',
      playSound: options.playSound || true,
      soundName: options.soundName || 'default',
      userInteraction: false, // BOOLEAN: If the notification was opened by the user from the notification
    });
  };

  buildAndroidNotification = (id, title, message, data = {}, options = {}) => {
    return {
      id: id,
      autoCancel: true,
      largeIcon: options.largeIcon || 'ic_launcher',
      smallIcon: options.smallIcon || '@drawable/logo',
      bigText: message || '', // (optional) default: "message" prop
      subText: title || '',
      vibrate: options.vibrate || true, // (optional) default: true
      vibration: options.vibration || 300,
      priority: options.priority || 'high',
      importance: options.importance || 'high',
      data: data,
      channelId: 'channel-id-1',
    };
  };

  buildIOSNotification = (id, title, message, data = {}, options = {}) => {
    return {
      alertAction: options.alertAction || 'view',
      category: options.category || '',
      userInfo: {
        id: id,
        item: data,
      },
    };
  };

  cancelAllLocalNotifications = () => {
    if (isIos) {
      PushNotificationIOS.removeAllDeliveredNotifications();
    } else {
      PushNotification.cancelAllLocalNotifications();
    }
  };

  removeAllDeliveredNotificationByID = notificationId => {
    console.log(
      '[LocalNotificationService] removeAllDeliveredNotificationByID: ',
      notificationId,
    );
    PushNotification.cancelAllLocalNotifications({id: `${notificationId}`});
  };
}

export const localNotificationService = new LocalNotificationService();
