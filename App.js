import React, {useEffect, useRef} from 'react';
import RootNavigation from './src/navigation';
import {StatusBar, TextInput, Text} from 'react-native';
import {colors, isAndroid} from './src/res/appStyles';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import SplashScreen from 'react-native-splash-screen';
import CustomToast from './src/components/customToast';
import {NotificationController} from './src/utils/notificationController';
import {fcmService} from './src/utils/FCMServices';
import {localNotificationService} from './src/utils/LocalNotificationService';
import { createContext, useState } from 'react';

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false; // stop allowFontScaling
TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false; // stop allowFontScaling
console.disableYellowBox = true;


export const ServiceHourContext = createContext({
  totalHours: 0,
  setTotalHours: () => {}
});

const App = () => {
  const [totalHours, setTotalHours] = useState(0);
  const toastRef = useRef(null);
  global.servicesname = 'dry clranning';
  useEffect(() => {
    SplashScreen.hide();
    global.Toaster = Msg => toastRef.current.ShowToastFunction(Msg);

    fcmService.registerAppWithFCM();
    fcmService.register(onRegister, onNotification, onOpenNotification);
    localNotificationService.configure(onOpenNotification);

    function onRegister(token) {
      console.log('[APP] onRegister: token', token);
      // Clipboard.setString(token)
    }

    function onNotification(notifi) {
      console.log('[APP] onNotification', notifi);
      let {data, notification} = notifi;

      let notificationdata = {
        id: data.order_id,
        status: data.status,
        type: data.type,
      };

      if (isAndroid) {
        notificationdata = {
          ...notificationdata,
          channelId: notification.android.channelId,
        };
      }

      let notify = {title: notification.title, body: notification.body};
      // console.log('[APP] onNotification: ', [notify, notificationdata]);

      const options = {
        soundName: 'default',
        playSound: true,
      };

      localNotificationService.showNotification(
        0,
        notify.title,
        notify.body,
        notificationdata,
        options,
      );
    }

    function onOpenNotification(notify) {
      // console.log('[APP] onOpenNotification: ', notify);
    }

    return () => {
      console.log('[APP] unRegister');
      fcmService.unRegister();
      localNotificationService.unregister();
    };
  }, []);



  return [
    <Provider store={store}>
          <ServiceHourContext.Provider
            value={
             { totalHours,
              setTotalHours}
            }
          >
      <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
      <RootNavigation />
      <NotificationController />
      <CustomToast ref={ref => (toastRef.current = ref)} position="bottom" />
      </ServiceHourContext.Provider>
    </Provider>,
  ];
};

export default App;
