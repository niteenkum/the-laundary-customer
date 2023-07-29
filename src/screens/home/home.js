import React, {Component, useRef} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  Text,
  FlatList,
  Animated,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {
  deviceDimensions,
  colors,
  scales,
  spacing,
  fontSize,
  fonts,
} from '../../res/appStyles';
import TextBox from '../../components/TextBox';
import Swiper from '../../components/Swiper';
import {MenuIcon} from '../../components/icons/menuIcon';
import {connect} from 'react-redux';
import {NavigationEvents} from 'react-navigation';
import {getservice} from '../../redux/actions/product.action';
import {
  getPromoCode,
  getBanner,
  getTestimonial,
} from '../../redux/actions/schedule.action';
import Background from '../../components/background';
import {OFFER_BACK_IMAGE} from '../../res/svgs/images.json';
import {ServiceCard} from './components/ServiceCard';
import {Loader} from '../../components/loader';
import ZipcodeCard from './components/ZipcodeCard';
import {CartCounter} from './components/Cartcounter';
import ProductIcon from '../../res/svgs/productIcom';
import LocationCard from '../../screens/home/components/LocationCard';
const {width, height} = deviceDimensions;
const logo = require('../../../assets/images/logo.png');
import BottomButton from '../../components/bottomButton';
import {StartRating} from '../../components/StarRatting';
import Card from '../../components/card';
import {color} from 'react-native-reanimated';
import {FlatListSlider} from 'react-native-flatlist-slider';
import Hilightview from '../../components/hilighteView';
import AsyncStorage from '@react-native-community/async-storage';
import {STORAGES} from '../../res/ConstVariable';
import { setAsyncStorage, getAsyncStorage } from '../../utils/asyncStorage';
import crashlytics from '@react-native-firebase/crashlytics';
const rattingList = [
  {
    name: `Aatreya`,
    ratting: `4`,
    review: `Generally have good service the app is easy to use,convenient pik-up`,
  },
  {
    name: `Aakesh`,
    ratting: `4.5`,
    review: `Great laundary service you will appriciate the services and the services is qaite reasonable`,
  },
  {
    name: `Aayansh`,
    ratting: `4.3`,
    review: `it is the one of best laundary services,`,
  },
];
export function RenderItem({item, index}) {
  return (
    <Card
      type="list"
      style={{
        width: width,
        height: 175,
        padding: 10,
        // marginHorizontal: 10,
        alignSelf: 'center',
        // marginHorizontal: spacing(15),
        right: 4,
        backgroundColor: '#f5f5f5',
      }}>
      <Text
        style={{
          fontSize: fontSize(20),
          fontFamily: fonts.semibold,
          color: colors.darkGrey,
          padding: 5,
        }}>
        Customer Testimonial
      </Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: '25%',

            alignItems: 'center',
          }}>
          <View
            style={{
              height: 52,
              width: 52,
              borderRadius: 25,
              borderWidth: 0.5,
              borderColor: colors.grey,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              resizeMode="cover"
              source={{uri: item.image}}
              style={{
                padding: 20,
                borderRadius: 50 / 2,
                width: 50,
                height: 50,
                borderWidth: 1,
                borderColor: colors.white,
              }}
            />
          </View>
        </View>
        <View
          style={{
            width: '70%',
            alignItems: 'flex-start',
            justifyContent: 'center',
          }}>
          <Text
            style={[
              {
                fontFamily: fonts.semibold,
                fontSize: 18,
                color: colors.grey,
              },
            ]}>
            {item.name}
          </Text>
          <StartRating count={item.review} />
        </View>
      </View>
      <View
        style={{
          marginHorizontal: 10,
          // alignItems: 'center',
          paddingVertical: 14,
          // height: 50,
        }}>
        <Text
          numberOfLines={3}
          style={{
            textAlign: 'left',
            fontFamily: fonts.semibold,
            fontSize: spacing(14),
            color: colors.grey,
          }}>
          {item.text}
        </Text>
      </View>
    </Card>
  );
}
const flatList = useRef < FlatList > null;
class Home extends Component {
  static navigationOptions = ({navigation, navigationOptions}) => {
    let citens = 0;
    const {params = {}} = navigation.state;
    if (params.CartItems) citens = params.CartItems;
    if (params.headerTitle) headerTitle = params.headerTitle;

    // const headerRight = () => (
    //   <CartCounter
    //     count={citens}
    //     onPress={params.myCart ? params.myCart : () => {}}
    //   />
    // );

    return {
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <MenuIcon />
        </TouchableOpacity>
      ),
      headerTitle: 'The Laundry Machine',

      // headerRight,
    };
  };

  constructor(props) {
    // this.getUserToken().then(res => this.setState({userToken: res}));
    super(props);
    this.state = {
      menuVisible: false,
      count: -1,
      service_area: '',
      location: '',
      visible: false,
      error: '',
      cateId: 0,
      selectId: [],
      userToken: false,
      selectedService: [],
      region: {},
      page: 1,
    };
    // props.getCard();
    props.getPromoCode();
    props.getBanner();
    props.getTestimonial();

    // this.props.getservice({lat: 26.8524442, lng: 75.8057748});
  }

  handleUpdateUserposition = async () => {
    await getAsyncStorage(STORAGES.LATLONG)
      .then(res => {
        if (res) {
          this.props.getservice({
            lat: JSON.parse(res).latitude,
            lng: JSON.parse(res).longitude,
          });
          console.log(
            JSON.parse(res).latitude,
            'vvvvvvvvvvvvvvvvvvvvvvvv////////',
            {
              // xyz: res.latitude,
              // lat: region?.latitude,
              // lng: region?.longitude,
            },
          );

          console.log(
            res,
            '11111111111111111111111111111111111111=========00000000000000000',
          );
        } else {
          console.log(res, '.....');
        }
      })
      .catch(error => {
        console.log('latng erore?', error);
      });
    console.log('.....................kkkkkkkk.....................');
  };
  getUserToken = async () => {
    const userToken = await AsyncStorage.getItem(STORAGES.USER);
    const User = JSON.parse(userToken);
    console.log('getUserTokennnnnnnnnnnnnnnnnnnnnn', userToken);
    if (User && User.token) {
      return true;
    } else {
      return false;
      // this.setState({userToken: false});
    }
  };
  componentDidMount() {
    this.getUserToken().then(res => this.setState({userToken: res}));
    this.handleUpdateUserposition();
  }

  componentWillReceiveProps(nextProps) {
    const {CartData, fail, loading2} = nextProps;
    const {count = -1, error} = this.state;
    if (CartData && CartData.status) {
      const {items = [], products = []} = nextProps.CartData;
      let CartItems = 0;
      if (items.length) CartItems = CartItems + items.length;
      if (products.length) CartItems = CartItems + products.length;
      if (CartItems != count) {
        this.setState({count: CartItems}, () =>
          this.props.navigation.setParams({CartItems}),
        );
      }
    }

    if (fail != this.state.fail) {
      if (fail && fail.response && count >= 1) {
        this.setState({count: -1}, () =>
          this.props.navigation.setParams({CartItems: 0}),
        );
      }
    }
  }

  selectedItem = (id, name) => {
    const {selectId, selectedService} = this.state;

    if (selectId.includes(id)) {
      const newid = selectId.filter(listItem => listItem !== id);

      const selectedItems = selectedService.filter(
        listItem => listItem.id !== id,
      );

      return this.setState({selectId: newid, selectedService: selectedItems});
    }
    selectId.push(id);
    selectedService.push({id, name});
    this.setState({selectId, selectedService});
  };

  onChnageCate = (item, index = 0) => {
    this.setState({cateindex: index, cateId: item.id}, () =>
      this.onGetItems(item.id),
    );
  };
  // onWillFocus = () => {
  //   const {region} = this.state;
  //   this.setState({page: 1}, () =>
  //     this.props.getservice({
  //       page: 1,
  //       lat: 65.2323,
  //       lng: 75.12311,
  //     }),
  //   );
  // };

  emptyListComponent = () => {
    return (
      <View style={{flex: 1, alignSelf: 'center', marginVertical: height / 4}}>
        <Text style={{fontSize: 15, color: colors.grey}}>
          No services found nearby your location
        </Text>
      </View>
    );
  };

  render() {
    const {
      Promocodes = [],
      loading,
      loading2,
      Sevices = [],
      fail2,
      banners = [],
      LngCode,
      service_area,
      otpdata,
      // service_area,
      testimonial = [],
      User,
    } = this.props;
    global.location_id = service_area.id;
    const {visible, error} = this.state;
    console.log(
      otpdata.data,
      '...................>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',
    );
    return (
      <Background bodyStyle={{backgroundColor: colors.white}}>
        <LocationCard
          onError={err => console.log(err, 'errorr')}
          handleUpdateUserposition={this.handleUpdateUserposition}
          // onGetAddress={region => {

          // }}
        />
        {/* //   onError={abc => console.log(abc, 'errorrrr')}
        //   onGetAddress={address => console.log(address, 'address<<')}
        // /> */}

        <ScrollView>
          <NavigationEvents onWillFocus={this.onWillFocus} />

          {Sevices.service_area ? (
            <View style={{position: 'relative'}}>
              <Image
                source={require('../../../assets/images/round_shap.jpg')}
                style={{width: width, height: spacing(50)}}
              />
            </View>
          ) : null}

          {/* {service_area && service_area.id ? ( */}
         
          <View style={styles.services}>
            <Loader
              loader={loading2}
              // title={errMsg}
              textStyle={{
                textAlign: 'center',
                fontSize: fontSize(20),
                marginTop: !Sevices.length ? '20%' : 0,
                fontFamily: fonts.bold,
              }}
            />
            {service_area && service_area.id && banners.length > 0 ? (
              <FlatListSlider
                data={banners}
                height={220}
                timer={5000}
                // onPress={item => alert(JSON.stringify(item))}
                contentContainerStyle={{paddingHorizontal: 16}}
                indicatorContainerStyle={{position: 'absolute', bottom: 20}}
                indicatorActiveColor={'#074279'}
                indicatorInActiveColor={'#ffffff'}
                // indicatorActiveWidth={30}
                animation
              />
            ) : null}
  {/* <TouchableOpacity style={{backgroundColor:"red",height:30}} onPress={() => crashlytics().crash()}></TouchableOpacity> */}
            <View style={{ alignItems: 'center' }}></View>
            
            {service_area && service_area.id ? (
              <View style={{padding: spacing(10), paddingLeft: spacing(15)}}>
                <Text
                  style={{
                    fontSize: fontSize(20),
                    fontFamily: fonts.bold,
                    color: colors.darkGrey,
                    marginLeft: spacing(-7),
                    bottom: -5,
                  }}>
                  Select Services
                </Text>
              </View>
            ) : null}
            <FlatList
              data={Sevices}
              contentContainerStyle={{
                height: spacing(140),
                alignItems: 'center',
                // width: '100%',
                // backgroundColor: 'red',
                justifyContent: 'center',
                // marginHorizontal: spacing(25),
                alignSelf: 'center',
              }}
              horizontal
              renderItem={({item, index}) => (
                <TouchableOpacity
                  style={styles.onSelect(
                    this.state.selectId.indexOf(index) >= 0,
                  )}
                  onPress={() => this.selectedItem(index, item.name)}>
                  <ServiceCard
                    index={index}
                    //onSelectIm={onSelectIm}
                    cardstyle={styles.onSelectIm(
                      this.state.selectId.indexOf(index) >= 0,
                    )}
                    title={item.name}
                    style={styles.Texstyle(
                      this.state.selectId.indexOf(index) >= 0,
                    )}
                    image={item.image ? {uri: item.image} : logo}
                  />
                </TouchableOpacity>
              )}
              ListEmptyComponent={() => this.emptyListComponent()}
            />
            <View style={{alignItems: 'center', marginTop: 70}}>
              <BottomButton
                disabled={this.state.selectId.length == 0}
                style={{
                  backgroundColor:
                    this.state.selectId.length > 0
                      ? colors.tint
                      : colors.borderGrey2,
                  // padding:20,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() =>
                  this.state.userToken
                    ? this.props.navigation.navigate('ServiceDetails', {
                        ServiceId: this.state.selectedService,
                      })
                    : this.props.navigation.navigate('Otp')
                }>
                <Text
                  style={{
                    fontSize: fontSize(20),
                    fontFamily: fonts.semibold,
                    color: colors.white,

                    alignSelf: 'center',
                  }}>
                  {LngCode.PROCEED_LABEL}
                </Text>
              </BottomButton>
            </View>
          </View>

          <View
            style={
              {
                // marginTop: spacing(30),
              }
            }>
            {service_area &&
            service_area.id &&
            testimonial &&
            testimonial.length > 0 ? (
              <FlatListSlider
                data={testimonial}
                timer={5000}
                component={<RenderItem />}
                // onPress={item => alert(JSON.stringify(item))}

                contentContainerStyle={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  // backgroundColor: 'red',
                  bottom: -10,
                  alignSelf: 'flex-end',
                }}
                indicatorContainerStyle={{position: 'absolute', bottom: 20}}
                indicatorActiveColor={'#074279'}
                indicatorInActiveColor={'#ffffff'}
                // indicatorActiveWidth={30}
                animation
              />
            ) : null}
           
          </View>
        </ScrollView>
      </Background>
    );
  }
}

const styles = StyleSheet.create({
  slider: {
    height: scales(230),
    backgroundColor: 'grey',
  },
  offer: {
    padding: spacing(10),
    paddingVertical: spacing(10),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.transBlack,
  },
  offerImg: {
    height: scales(230),
    width: '100%',
    resizeMode: 'contain',
    justifyContent: 'flex-end',
    paddingBottom: spacing(40),
  },
  services: {
    padding: spacing(10),
    marginTop: -spacing(80),
  },
  serviceCard: {
    marginTop: spacing(10),

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  Texstyle: select => {
    if (select) {
      return {
        top: 5,
        textAlign: 'center',
        fontSize: spacing(12),

        color: colors.white,
      };
    } else {
      return {
        top: 5,
        textAlign: 'center',
        fontSize: spacing(12),

        color: colors.lightBlack,
      };
    }
  },
  hours: {
    backgroundColor: colors.darkGrey,
    width: scales(100),
    padding: scales(6),
    borderRadius: 50,
    alignItems: 'center',
  },
  hoursTxt: {
    color: colors.white,
  },

  onSelect: select => {
    if (select) {
      return {
        margin: 0.5,
        alignSelf: 'center',
        backgroundColor: colors.tint,
        borderWidth: 0.5,
        borderColor: colors.white,
        width: width / 4,
      };
    } else {
      return {
        backgroundColor: colors.white,
        borderWidth: 0.5,
        borderColor: colors.grey,
        alignSelf: 'center',
        width: width / 4.2,
      };
    }
  },
  onSelectIm: select => {
    if (select) {
      return {
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 105,
        marginHorizontal: spacing(1),
        backgroundColor: colors.primary,
      };
    } else {
      return {
        justifyContent: 'space-around',
        marginHorizontal: spacing(1),
        alignItems: 'center',

        height: 105,

        backgroundColor: colors.white,
      };
    }
  },
});

const mapStateToProps = ({UserData, ScheduleData, ProductData, LngCode}) => {
  const {Promocodes, banners, loading, testimonial} = ScheduleData;
  const {Sevices, loading2, CartData, fail2, service_area, fail} = ProductData;
  console.log(
    'mapStateToProps.......................................................',

    banners,
  );
  const {User, otpdata} = UserData;
  return {
    Promocodes,
    banners,
    testimonial,
    loading,
    fail2,
    service_area,
    fail,
    User,
    otpdata,
    LngCode,
    Sevices,
    loading2,
    CartData,
  };
};

export default connect(mapStateToProps, {
  getservice,
  getPromoCode,
  getBanner,
  getTestimonial,
})(Home);
