import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  ScrollView,
  TextInput,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {SearchIcon} from '../../../components/icons/searchIcon';
import {
  colors,
  dimensions,
  deviceDimensions,
  spacing,
  scales,
} from '../../../res/appStyles';
import BottomSimpleBtn from '../../../components/bottomButton/BottomSimpleBtn';
import RoundBtn from '../../../components/roundBtn';
import {InputBox} from '../../../components/inputBox';
import apiService from '../../../redux/services';
import {getAsyncStorage} from '../../../utils/asyncStorage';
import {STORAGES} from '../../../res/ConstVariable';
import Card from '.././../../components/card';
import {connect} from 'react-redux';
import {
  addLocation,
  updateLocation,
  checkZipcode,
} from '../../../redux/actions/auth.action';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import * as Yup from 'yup';
import {API, API_KEY} from '../../../config/googleApi';
import AuthBackground from '../../../components/background/Authbackground';
const {bottomButtonHeight} = dimensions;

const schema = Yup.object().shape({
  zipcode: Yup.string().required('Please enter your postal code'),
  email: Yup.string().email('insert a valid email, thanks'),

  landmark: Yup.string()
    .required('Enter your reference point')
    .matches(/^[A-Za-z0-9 ]+$/, 'Must be contain only letters, numbers'),
  city: Yup.string()
    .required('Enter the city name')
    .matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed for this field '),
  phone: Yup.string().test(
    'len',
    'phone number must contain exactly 10 digit',
    val => val.length >= 10,
  ),
  address2: Yup.string()
    .required('Enter the address line 2')
    .matches(/^[^*|\":<>[\]{}`\\()';@&$]+$/),
  address1: Yup.string()
    .required('Enter address line 1')
    .matches(/^[^*|\":<>[\]{}`\\()';@&$]+$/),
  first_name: Yup.string()
    .required('Name is required')
    .matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed for this field '),
  // addressState: Yup.string().required('Enter the State'),
});

class ScheduleLocation extends Component {
  static navigationOptions = ({navigation}) => {
    let headerTitle = ' ';
    const {params = {}} = navigation.state;
    if (params.headerTitle) headerTitle = params.headerTitle;
    return {
      headerTitle,
      headerBackTitle: null,
      headerRight: <View />,
    };
  };

  constructor(props) {
    super(props);
    const Update = props.navigation?.state?.params?.id;
    console.log(Update, 'update>');
    this.state = {
      KeyHeigth: 0,
      Update,
      token: apiService.getAuthorizationToken().replace('Bearer ', ''),
      id: Update,
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      address1: '',
      address2: '',
      landmark: '',
      zipcode: '',
      city: '',
      // addressState: '',
      loader: false,
      apiLoading: false,
      searchLoader: false,
      searchTitile: '',
      errorTo: '',
      errorMge: '',
      region: {
        latitude: 1.78825,
        longitude: -122.4324,
        latitudeDelta: 0.009,
        longitudeDelta: 0.0105,
      },
      address: {},
      marker: false,
    };
    this.onFatchProfile();
    this.setHeaderTitle();
  }
  setHeaderTitle = () => {
    const {LngCode} = this.props;
    this.props.navigation.setParams({
      headerTitle: LngCode.LABEL_ADD_NEW_ADDRESS,
    });
  };

  onFatchProfile = (update = false) => {
    var email = '';
    var phone = '';
    var first_name = '';
    // var last_name = 'bbb';
    getAsyncStorage(STORAGES.USER)
      .then(res => {
        let user = JSON.parse(res);
        console.log('user', user);
        if (!update) {
          if (user.first_name) first_name = user.first_name;
          // if (user.first_name) last_name = user.last_name;
          // if (user.email) email = user.email;
          if (user.phone) phone = user.phone;
          this.setState({phone, first_name});
        }
      })
      .catch(err => {
        console.log('err ', err);
        this.watchPosition(true);
      });
  };

  componentWillReceiveProps(nextProps) {
    const {MyAddress, fail, CheckZipcode} = nextProps;

    const {
      id,
      first_name = '',
      // last_name,
      // email = '',
      address1,
      address2,
      landmark = ' ',
      zipcode,
      city,
      phone = '',
      Update,
      region,
      loader,
    } = this.state;
    if (MyAddress != this.props.MyAddress && loader) {
      this.setState({loader: false}, () => this.props.navigation.goBack());
    }
    if (fail != this.props.fail) {
      // this.setState({loader: false, errorTo: 'email', email: '', password: ''});
    }
    if (CheckZipcode != this.props.CheckZipcode) {
      const data = {
        // email,
        phone,
        city,
        address1,
        address2,
        landmark,
        zipcode,
        first_name,
        // last_name,
        lat: region.latitude,
        lng: region.longitude,
      };
      // if (CheckZipcode.status) {
      //   if (!Update) this.props.addLocation(data);
      //   else this.props.updateLocation({id, ...data});
      // } else if (CheckZipcode.msg) {
      //   this.setState({loader: false}, () => global.Toaster(CheckZipcode.msg));
      // } else this.setState({loader: false});
    }
  }

  onSaveLocation = () => {
    const {
      id,
      first_name = '',
      // last_name,
      // email = '',
      address1,
      address2,
      // addressState,
      landmark = ' ',
      zipcode,
      city,
      phone = '',
      Update,
      region,
    } = this.state;
    schema
      .validate({
        phone,
        city,
        address1,
        address2,
        // addressState: '',
        landmark,
        zipcode,
        first_name,
        // last_name,
        lat: region.latitude,
        lng: region.longitude,
      })
      .then(res => {
        const data = {
          phone,
          city,
          address1,
          address2,
          landmark,
          zipcode: 'Other',
          first_name,
          // last_name,
          // addressState: '',
          lat: region.latitude,
          lng: region.longitude,
        };
        // this.onCheckZipCode(zipcode);
        // console.log(
        //   data,
        //   'dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        // );
        if (!id) this.props.addLocation(data);
        else this.props.updateLocation({id, ...data});
      })
      .catch(res => {
        this.setState({
          loader: false,
          errorTo: res.path,
          errorMge: res.message,
        });
        global.Toaster(res.message);
      });
  };

  onFetchAddress = () => {
    const {region, searchLoader, searchTitile} = this.state;
    let endPoint = searchLoader
      ? `address=${searchTitile}AU`
      : `latlng=${region.latitude},${region.longitude}`;
    fetch(`${API.GOOGLE_MAP_API}?key=${API_KEY.GOOGLE_MAP_API}&${endPoint}`)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({apiLoading: false, searchLoader: false}, () => {
          console.log('responseJson>', JSON.stringify(responseJson));
          this.getAddress(responseJson);
        });
      })
      .catch(error => {
        console.log('CurrentLocation getAddressApi error', error);
      });
  };

  watchPosition = async (type = false) => {
    // console.log('watchPosition', watchPosition);
    await Geolocation.getCurrentPosition(
      position => {
        var region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.009,
          longitudeDelta: 0.0105,
        };
        {
          type
            ? this.setState({region, marker: true, apiLoading: true}, () => {
                this.onFetchAddress();
              })
            : this.setState({region, marker: true}, () =>
                this.onFetchAddress(),
              );
        }
      },
      error => this.locationError(error),
      {enableHighAccuracy: false, timeout: 5000},
    );
  };

  locationError = error => {
    console.log('error', error);
    const {LngCode} = this.props;
    if (error && error.code == 1) global.Toaster(LngCode.DENY_MESSAGE);
    if (error && error.code == 2) global.Toaster(LngCode.GPS_MESSAGE);
  };

  getAddress = responseJson => {
    const {results} = responseJson;
    var region = this.state.region || {};

    let address = {};
    let address1 = '';
    let street = '';

    if (results && results.length) {
      results.map(res => {
        if (!address.fullAddress) address.fullAddress = res.formatted_address;
        res.address_components.map(add => {
          if (add.types.indexOf('premise') !== -1) {
            address.home = add.long_name;
          } else {
            if (add.types.indexOf('street_number') !== -1) {
              address.streetNumber = `${add.long_name}`;
            }
            if (add.types.indexOf('route') !== -1) {
              address.route = `${add.long_name}`;
            }
            if (add.types.indexOf('locality') !== -1) {
              address.locality = `${add.long_name}`;
            }
          }
          if (add.types.indexOf('sublocality_level_3') !== -1) {
            address.area = add.long_name;
          }
          if (add.types.indexOf('sublocality_level_2') !== -1) {
            address.secter = add.long_name;
          }
          if (add.types.indexOf('sublocality_level_1') !== -1) {
            address.colony = add.long_name;
          }
          if (add.types.indexOf('locality') !== -1) {
            address.city = add.long_name;
          }
          if (add.types.indexOf('administrative_area_level_1') !== -1) {
            address.state = add.long_name;
          }
          if (add.types.indexOf('administrative_area_level_2') !== -1) {
            address.suburb = add.long_name;
          }
          if (add.types.indexOf('country') !== -1) {
            address.country = add.long_name;
          }
          if (add.types.indexOf('postal_code') !== -1) {
            address.zipcode = add.long_name;
          }
        });
        //}
      });
      if (!address.fullAddress) {
        address.fullAddress = results[0].formatted_address;
      }
      const {geometry = {}} = results[0];
      address = {...address, ...geometry.location};
    } else address.fullAddress = 'No location found';

    if (address.lat) {
      region = {
        latitude: address.lat,
        longitude: address.lng,
        latitudeDelta: 0.009,
        longitudeDelta: 0.0105,
      };
      // region.latitude=parseFloat(address.lat)
      // region.longitude=parseFloat(address.lng)
    } else {
      address.lat = region.latitude;
      address.lng = region.longitude;
    }
    if (address.home) address1 = `${address.home}`;
    if (address.area) address1 = `${address.area}`;
    if (address.secter) address1 = `${address1}, ${address.secter}`;
    if (address.colony) address1 = `${address1}, ${address.colony}`;
    if (address.streetNumber) street = `${address.streetNumber}`;
    if (address.route)
      street = `${street ? street + ', ' : ''} ${address.route}`;
    if (address.locality) street = `${street ? street : ''}`;
    //address2 =`${address.city}, ${address.state}, ${address.country}`
    console.log(address.suburb, 'addressaddress');
    console.log(street, 'addressaddress');
    this.setState({
      address1: street,
      address2: `${address.city}, ${address.state}, ${address.country}`,
    });
    this.setState({
      zipcode: address.zipcode,
      city: address.city,
      region,
      ...region,
    });
  };

  componentDidMount() {
    this.watchPosition();
  }

  onCheckZipCode = zipcode => {
    this.props.checkZipcode({zipcode});
  };
  handleRegionChange = (mapData, {isGesture}) => {
    if (isGesture) {
      this.setState(
        {
          region: {
            latitude: mapData.latitude,
            longitude: mapData.longitude,
            latitudeDelta: 0.009,
            longitudeDelta: 0.0105,
          },
        },
        () => this.onFetchAddress(),
      );
    }
  };

  render() {
    const {
      KeyHeigth,
      address1,
      address2,
      landmark,
      email,
      first_name,
      zipcode,
      errorTo,
      loader,
      marker,
      phone,
      city,
      apiLoading = false,
      searchTitile,
      region,
      errorMge,
      searchLoader = false,
    } = this.state;
    const {LngCode} = this.props;
    return (
      <AuthBackground footerStyle={{backgroundColor: colors.tint}}>
        <ScrollView style={{marginBottom: bottomButtonHeight}}>
          <View style={{marginBottom: spacing(20)}}>
            {region ? (
              <>
                <MapView
                  provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                  style={styles.map}
                  showsUserLocation
                  onRegionChangeComplete={this.handleRegionChange}
                  region={this.state.region}>
                  {/* {marker ? ( */}
                  {/* <Marker
                  coordinate={this.state.region}
                  // title={marker.title}
                  // description={marker.description}
                /> */}
                  {/* ) : null} */}
                </MapView>
                <View style={{position: 'absolute', top: '37%', left: '30%'}}>
                  <Image
                    resizeMode="contain"
                    source={require('../../../../assets/images/map-pin.png')}
                    style={{width: spacing(160), height: spacing(40)}}
                  />
                  <Text style={styles.locationPin}>
                    Your Order will be picked and delivered here
                  </Text>
                </View>
              </>
            ) : null}

            <Card style={styles.search} type="list">
              <TextInput
                value={searchTitile}
                style={{color: 'black', flex: 1}}
                onChangeText={t => this.setState({searchTitile: t})}
                placeholder={LngCode.SERCH_LEBAL}
              />
              <RoundBtn
                onPress={() =>
                  searchTitile
                    ? this.setState({searchLoader: true}, () =>
                        this.onFetchAddress(),
                      )
                    : global.Toaster(LngCode.LACATION_MESSAGE)
                }
                loading={searchLoader}
                style={styles.locationIcon2}>
                <SearchIcon desable={true} color={colors.tint} />
              </RoundBtn>
            </Card>
            <RoundBtn
              onPress={() => this.watchPosition(true)}
              loading={apiLoading}
              style={styles.locationIcon}>
              <Image
                source={require('../../../../assets/images/gps.png')}
                style={{width: 40, height: 40}}
              />
            </RoundBtn>
          </View>

          <View style={{marginHorizontal: spacing(20)}}>
            <InputBox
              numberOfLines={1}
              errorMge={errorMge}
              value={address1}
              error={errorTo === 'address1'}
              keyboardType="email-address"
              placeholder={LngCode.ADDRESS_LABEL}
              inputStyle={styles.inputBox}
              onChange={t => this.setState({address1: t})}
            />

            <InputBox
              numberOfLines={1}
              value={address2}
              errorMge={errorMge}
              error={errorTo === 'address2'}
              keyboardType="email-address"
              placeholder={LngCode.ADDRESS_TWO_LABEL}
              inputStyle={styles.inputBox}
              onChange={t => this.setState({address2: t})}
            />
            <View
              style={{
                flexDirection: 'row',
                flex: 1,
                justifyContent: 'space-between',
              }}>
              <InputBox
                numberOfLines={1}
                value={phone}
                // errorMge={''}
                maxLength={10}
                error={errorTo === 'phone'}
                keyboardType="numeric"
                placeholder={LngCode.PHONE_PLASE_LABEL}
                errorMge={errorMge}
                inputStyle={{...styles.inputBox, flex: 0.49}}
                onChange={t => this.setState({phone: t})}
              />
              <InputBox
                numberOfLines={1}
                value={city}
                errorMge={errorMge}
                error={errorTo === 'city'}
                keyboardType="email-address"
                placeholder={LngCode.CITY_LABEL}
                inputStyle={{...styles.inputBox, flex: 0.49}}
                onChange={t => this.setState({city: t})}
              />
            </View>
            <InputBox
              value={landmark}
              errorMge={errorMge}
              error={errorTo === 'landmark'}
              keyboardType="email-address"
              placeholder={LngCode.LANDMARK_LABEL}
              inputStyle={styles.inputBox}
              onChange={t => this.setState({landmark: t})}
            />
            <InputBox
              value={zipcode}
              errorMge={errorMge}
              error={errorTo === 'zipcode'}
              keyboardType="numeric"
              placeholder="Zipcode*"
              inputStyle={styles.inputBox}
              onChange={t => this.setState({zipcode: t})}
            />
            <View
              style={{
                flexDirection: 'row',
                flex: 1,
                justifyContent: 'space-between',
              }}>
              <InputBox
                numberOfLines={1}
                // autoCapitalize="sentences"
                errorMge={errorMge}
                error={errorTo === 'first_name'}
                placeholder={LngCode.NAME}
                keyboardType="email-address"
                onChange={t => this.setState({first_name: t})}
                value={first_name}
                inputStyle={{...styles.inputBox, flex: 0.49}}
              />
              <InputBox
                numberOfLines={1}
                value={email}
                // errorMge={errorMge}
                // error={errorTo === 'email'}
                keyboardType="email-address"
                placeholder={LngCode.EMAIL_LABEL}
                inputStyle={{...styles.inputBox, flex: 0.49}}
                onChange={t => this.setState({email: t})}
              />
            </View>
          </View>
        </ScrollView>
        {/* </KeyboardAvoidingView> */}

        <BottomSimpleBtn
          loading={loader}
          title={LngCode.LABEL_SAVE}
          onPress={() =>
            this.setState({loader: true}, () => this.onSaveLocation())
          }
        />
      </AuthBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  locationIcon: {
    position: 'absolute',
    bottom: spacing(30),
    right: spacing(30),
    width: spacing(20),
    height: spacing(20),
    justifyContent: 'center',
    backgroundColor: '#00000000',
    alignItems: 'center',
  },
  locationIcon2: {
    width: scales(55),
    height: scales(55),

    backgroundColor: '#00000000',
  },
  map: {
    backgroundColor: 'grey',
    width: deviceDimensions.width,
    height: spacing(300),
  },
  locationPin: {
    position: 'absolute',
    color: colors.white,
    fontSize: scales(9),
    padding: scales(3),
    textAlign: 'center',
    alignSelf: 'center',
  },
  search: {
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing(20),
    paddingVertical: 0,
    height: spacing(55),
    flexDirection: 'row',
    position: 'absolute',
    top: spacing(20),
    alignSelf: 'center',
    width: deviceDimensions.width - spacing(50),
  },
  wrapper: {
    flex: 1,
    paddingHorizontal: 8,
    paddingTop: 20,
  },
  currentLocation: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },

  inputBox: {
    borderBottomColor: colors.addressInputBorder,
    marginBottom: spacing(1),
  },
});
const mapStateToProps = ({UserData, LngCode}) => {
  const {MyAddress, loading, fail, CheckZipcode} = UserData;
  console.log('[Location]', UserData);
  return {
    MyAddress,
    loading,
    fail,
    LngCode,
    CheckZipcode,
  };
};

export default connect(mapStateToProps, {
  addLocation,
  updateLocation,
  checkZipcode,
})(ScheduleLocation);
