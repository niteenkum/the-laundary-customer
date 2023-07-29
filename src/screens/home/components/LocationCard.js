import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  Platform,
  Modal,
  StyleSheet,
} from 'react-native';
import {
  check,
  PERMISSIONS,
  RESULTS,
  request,
  openSettings,
} from 'react-native-permissions';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import Geolocation from '@react-native-community/geolocation';

import {API, API_KEY} from '../../../config/googleApi';
import Card from '../../../components/card';
import Loader from '../../../components/loader';
import PopView from '../../../components/popView';
import {spacing, colors, fonts, fontSizes, isIos} from '../../../res/appStyles';
import {STORAGES} from '../../../res/ConstVariable';
import {setAsyncStorage, getAsyncStorage} from '../../../utils/asyncStorage';

const LocationCard = props => {
  const [location, setLocation] = useState({});
  const [address, setAddress] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [visible, setVisible] = useState(true);
  const [locationPermission, setLocationPermission] = useState(false);
  const [deniedPermissionModal, setDeniedPermissionModal] = useState(false);
  const [requestTime, setRequestTime] = useState('');

  useEffect(() => {
  
     getLatLong();
    //  getCurrentLocation();
    //  requestPermission(),
    getStoredData();
  }, []);
  const getLatLong = async () => {
    await getAsyncStorage(STORAGES.LATLONG).then(res => {
      if (res) {
       
        console.log(res, 'letlong.......>>>>>>>>>>>>>>>>>>???????');
        
      } else {
        getCurrentLocation();
        getCurrentLocation();
        console.log(res, 'letlong......abccccccccccccccc.....');}
    }).catch(error => {
      console.log('latng erore??????????', error);
    })
    console.log('qbccc.....>>>>>....................................................kkkkkkkk.....................')
  };




  const getStoredData = async () => {
    await getAsyncStorage(STORAGES.ADDDRESS).then(res => {
      if (res) {
        console.log(res, '<address');
        setAddress(JSON.parse(res));
      }
    });
  };

  const checkPermission = () => {
    setVisible(true);
    check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then(res => {
      console.log(res, 'clickedd3');
      if (res === RESULTS.UNAVAILABLE || res === RESULTS.DENIED) {
        setDeniedPermissionModal(true);
        setVisible(false);
        onError(false);
      } else {
        requestPermission();
        setVisible(false);
      }
    });
  };

  const requestPermission = async update => {
    console.log('updateupdate', update);
    update ? setUpdate(update.forceUpdate) : null;
    await requestAll()
      .then(result => {
        setLocationPermission(result);
        switch (result) {
          case RESULTS.UNAVAILABLE:
            console.log(
              'This feature is not available (on this device / in this context)',
            );
            break;
          case RESULTS.DENIED:
            onError(RESULTS.DENIED);
            console.log('The permission is DENIED');
            getCurrentLocation();
            break;
          case RESULTS.GRANTED:
           getCurrentLocation();
            // requestLocationService();
            console.log('The permission is granted');
            break;
          case RESULTS.BLOCKED:
            console.log('The permission is blocked');
            onError(RESULTS.BLOCKED);
            requestPermission();
            break;
        }
      })
      .catch(error => {
        console.log(error, 'errorrr');
        onError();
        Alert.alert(
          'Whoops!',
          `There was a problem getting your location permission. Please enable it from settings.`,
          [{text: 'Cancel', onPress: () => console.log('OK Pressed')}],
        );
      });
  };

  const requestAll = async () => {
    const permissionRequest = await request(
      Platform.select({
        android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      }),
    );
    return permissionRequest;
  };

  const getCurrentLocation = () => {
    console.log(
      'getCurrentLocation.............................1234456678900--',
    );
    const isAndroid = Platform.OS !== 'android';
    Geolocation.getCurrentPosition(
      onGetLocation,
      error => {
        console.log('getCurrentLocation error', {error});
        if (isAndroid) {
          requestLocationService();
        } else {
        showRetryAlert();
        } 
      },
      {
        // enableHighAccuracy: Platform.OS == 'android',
        // timeout: 5000,
      },
    );
  };

  const showRetryAlert = () => {
    Alert.alert(
      '',
      'Allow to access your location',
      [
        {
          text: 'Retry',
          onPress: () => (setShowAlert(true), () => getCurrentLocation()),
        },
      ],
      {cancelable: false},
    );
  };

  const onError = err => {
    if (props.onError) props.onError(err);
    console.log(err, '<= Error');
  };

  const getAddressApi = async location => {
    const endpoint = `latlng=${location.latitude},${location.longitude}&key=${API_KEY.GOOGLE_MAP_API}`;

    await getAsyncStorage(STORAGES.LOCATION_TIME).then(res => {
      // if (res) {
      setRequestTime(res);

      var diff = !res ? 0 : new Date().valueOf() - new Date(res).valueOf();
      let diffInHours = diff / 1000 / 60 / 60;
      console.log([diffInHours, res], '<<<<<');
      (diffInHours && diffInHours > 2) || !res
        ? fetch(`${API.GOOGLE_MAP_API}?${endpoint}`)
            .then(response => response.json())
            .then(async responseJson => {
              console.log('getAddress getAddressApi', responseJson);
              setAddress(responseJson);
              const address1 = getAddress();
              await setAsyncStorage(
                STORAGES.ADDDRESS,
                JSON.stringify(responseJson),
              );
              await setAsyncStorage(
                STORAGES.LOCATION_TIME,
                new Date().toString(),
              );
              setVisible(false);
            })
            .catch(error => {
              console.log('CurrentLocation getAddressApi error', error);
            })
        : setVisible(false);

      // }
    });
  };

  const requestLocationService = () => {
    !isIos? RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
      interval: 10000,
      fastInterval: 5000,
    })
      .then(res => {
        console.log('getCurrentLocation requestLocationService success', res);
        getCurrentLocation();
      })
      .catch(err => {
        console.log('getCurrentLocation requestLocationService catch', err);
        // showRetryAlert();
      }): global.Toaster("Please enable location from settings");;
  };

  const onGetLocation = position => {
    console.log(
      // 'onGetLocation........................................1234567890333333333333333333333333333333333333',
      position?.coords?.latitude,
    );
  
    setAsyncStorage(STORAGES.LATLONG,
      JSON.stringify( position?.coords),
     
      console.log( position?.coords,' set position.coords.latitud/////?????????????????')
    
    )
     getAsyncStorage(STORAGES.LATLONG) .then(res => {
      position?.coords
      
      console.log( position?.coords,' get>>>>>>>>>>>>>>>')
    })
    props.handleUpdateUserposition(position.coords)
   setLocation(position.coords)
  };

  // const getAddress = () => {
  //   const {results} = address;
  //   console.log('getAddress', address, results);
  //   if (results && results.length) {
  //     results.map(res => {
  //       if (
  //         res.types.includes('postal_code') ||
  //         res.types.includes('street_address')
  //       ) {
  //         console.log('getAddress postal_code', res);
  //         address.fullAddress = res.formatted_address;
  //         res.address_components.map(add => {
  //           console.log(add);
  //           if (
  //             add.types.indexOf('locality') !== -1 ||
  //             add.types.indexOf('neighborhood') !== -1
  //           ) {
  //             address.city = add.long_name;
  //           }
  //           if (add.types.indexOf('administrative_area_level_1') !== -1) {
  //             address.state = add.long_name;
  //           }
  //           if (add.types.indexOf('country') !== -1) {
  //             address.country = add.long_name;
  //           }
  //           if (add.types.indexOf('postal_code') !== -1) {
  //             address.zipcode = add.long_name;
  //           }
  //         });
  //       }
  //       console.log(address, 'address<<>');
  //     });
  //     if (!address.fullAddress) {
  //       address.fullAddress = results[0].formatted_address;
  //     }
  //   } else address.fullAddress = 'No location found';

  //   address.lat = location.latitude;
  //   address.lng = location.longitude;

  //   return address;
  // };

  const ShowPermissionRequestModal = () => {
    return (
      <PopView
        onRequestClose={() => setVisible(false)}
        // style={{borderRadius: spacing(10), height: spacing(150)}}
        visible={deniedPermissionModal}>
        <View
        // style={styles.modalContainer}
        >
          <View>
            <Text
              style={{
                padding: spacing(10),
                color: colors.black,
                fontFamily: fonts.semibold,
                marginTop: spacing(10),
              }}>
              {`Your Location permission is ${locationPermission} please enable it from settings.`}
            </Text>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: spacing(30),
              }}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setDeniedPermissionModal(false)}>
                <Text style={{color: colors.tint, fontFamily: fonts.semibold}}>
                  Cancel
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.enableButton}
                onPress={() => openSetting()}>
                <Text
                  styles={{color: colors.white, fontFamily: fonts.semibold}}>
                  Enable
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </PopView>
    );
  };

  const openSetting = () => {
    openSettings().then(res => {
      console.log('back to app from settings', res);
      checkPermission();
    });
    this.setState({permissionVisible: false});
  };

  return (
    <View style={{width: '100%', backgroundColor: colors.primary2}}>
      {getCurrentLocation}
      {/* <PopView visible={visible} onRequestClose={() => setVisible(false)}>
        <Card type="list" style={{width: '100%', paddingVertical: spacing(20)}}>
          <Loader />
          <Text
            style={{
              fontFamily: fonts.semibold,
              fontSize: spacing(14),
              alignSelf: 'center',
              marginTop: spacing(20),
              color: colors.lightBlack,
            }}>
            Getting your location please wait
          </Text>
        </Card>
      </PopView> */}
      {/* <ShowPermissionRequestModal /> */}
      <TouchableOpacity
        onPress={() => requestPermission()}
        style={
          {
            // width: '100%',
            // height: spacing(40),
            // // justifyContent: 'space-between',
            // paddingHorizontal: spacing(20),
            // flexDirection: 'row',
            // alignItems: 'center',
          }
        }>
        {/* <Image
          source={require('@assets/images/address_home.png')}
          style={{
            width: spacing(20),
            height: spacing(25),
            marginRight: spacing(10),
          }}
        /> */}
        {/* <Text
          style={{
            width: '90%',
            color: colors.white,
            // fontSize: fontSizes.FONT_12,
          }}>
          {address && address.results
            ? address.results[0].formatted_address
            : null}
        </Text> */}
      </TouchableOpacity>
      {/* {!props.zipcode ? (
        <Text
          style={{
            alignSelf: 'center',
            marginVertical: spacing(20),
            color: colors.white,
          }}>
          {LngCode.MSG_NO_SERVICE}
        </Text>
      ) : null} */}
    </View>
  );
};

export default LocationCard;

const styles = StyleSheet.create({
  modalContainer: {
    width: '100%',
    elevation: 2,
    paddingHorizontal: spacing(20),
    backgroundColor: colors.white,
    borderRadius: spacing(10),
    flex: 1,
  },
  modalCloseContainer: {
    alignSelf: 'flex-end',
    backgroundColor: colors.darkGrey,
    padding: spacing(3),
    borderRadius: spacing(30),
  },
  modalCloseText: {
    color: colors.white,
    height: 15,
    width: 15,
    textAlign: 'center',
    fontSize: spacing(10),
  },
  cancelButton: {
    borderColor: colors.tint,
    borderWidth: 1,
    padding: spacing(5),
    paddingHorizontal: spacing(25),
    borderRadius: spacing(20),
  },
  enableButton: {
    borderColor: colors.tint,
    backgroundColor: colors.tint,
    borderWidth: 1,
    padding: spacing(5),
    paddingHorizontal: spacing(25),
    borderRadius: spacing(20),
  },
});
