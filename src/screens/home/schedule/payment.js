import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
  FlatList,
} from 'react-native';
import PickupSteps from '../../../components/stepIndicator/pickupSteps';
import Card from '../../../components/card';
import TextBox from '../../../components/TextBox';
import {colors, dimensions, spacing, scales} from '../../../res/appStyles';
import BottomSimpleBtn from '../../../components/bottomButton/BottomSimpleBtn';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';

import {getFullDate, getFormatDate} from '../../../utils/funcations';
import {STORAGES, SIGN, STRIPE_HEADER} from '../../../res/ConstVariable';
import {saveOrder} from '../../../redux/actions/order.action';
import {
  removeAllService,
  getTaxValue,
} from '../../../redux/actions/product.action';
import {connect} from 'react-redux';
import Background from '../../../components/background';
import LngCode from '../../../redux/reducers/code.reducers';
import StripePayment from '../components/stripePayment';
import {PriceDetailCard} from '../components/PriceInfoCard';
import {setAsyncStorage} from '../../../utils/asyncStorage';
import CreateIcon from '../../../components/icons/creatIcons';
import ForwardArrow from '../../../components/icons/forwardArrow';
const {bottomButtonHeight} = dimensions;
const KEYS = ['pickup', 'delivery'];

class Payment extends Component {
  static navigationOptions = ({navigation}) => {
    let headerTitle = ' ';
    const {params = {}} = navigation.state;
    if (params.headerTitle) headerTitle = params.headerTitle;
    return {
      headerTitle,
    };
  };

  constructor(props) {
    super(props);
    const ScheDule = props.navigation.getParam('ScheDule', {});
    this.state = {
      orderLoading: false,
      promoCodeOn: false,
      PromoCode: {},
      promotion_value: 0,
      ScheDule,
      first_name: '',
      last_name: '',
      address1: '',
      address2: '',
      landmark: '',
      zipcode: '',
      latitude: '',
      longitude: '',
      Tprice: 100,
      payment_type: 1,
      transaction_dt: '',
      DiscountLessPrice: 0,
      OrderData: {},
      tax_percentage: 0,
      tax_price: 0,
      pastripe_payment_datament_type: {},
    };
    this.setHeaderTitle();
  }
  setHeaderTitle = () => {
    const {LngCode} = this.props;
    this.props.navigation.setParams({headerTitle: LngCode.LABEL_PAYMENT});
  };

  componentWillReceiveProps(nextProps) {
    console.log(
      'componentWillReceiveProps.............................1234',
      nextProps,
    );
    var {
      promoCodeOn,
      Tprice,
      DiscountLessPrice = 0,
      promotion_value = 0,
    } = this.state;
    const {success, fail, loading, loading2, success2} = nextProps;
    const {params} = nextProps.navigation.state;
    if (params && params.PromoCode && params.PromoCode.data && promoCodeOn) {
      const {data, promo_amount, amount} = params.PromoCode;
      console.log('DiscountLessPrice', amount, Tprice, DiscountLessPrice);
      this.setState({
        PromoCode: data,
        promoCodeOn: false,
        DiscountLessPrice: promo_amount,
        promotion_value: promo_amount,
      });
    }
    if (success != this.props.success && !loading) {
      this.props.navigation.navigate('ConfirmOrder', {success});
    }
    if (success2 != this.props.success2 && !loading2) {
      if (success2 && success2.length) {
        if (success2[0].code === 'tax_percentage') {
          const NetPrice = Tprice - promotion_value;
          console.log('NetPrice', NetPrice, DiscountLessPrice, promotion_value);
          // const tax_price = (NetPrice * success2[0].value) / 100;
          // DiscountLessPrice = NetPrice + tax_price;
          // console.log('DiscountLessPrice', tax_price, DiscountLessPrice);
          // this.setState({
          //   DiscountLessPrice,
          //   tax_price,
          //   tax_percentage: success2[0].value,
          // });
        }
      }
    }
    if (fail != this.props.fail && !loading)
      console.log('Error..........................................', fail);
  }

  // componentDidMount() {
  //   const {TotalAmount} = this.props;
  //   this.setState({Tprice: TotalAmount, DiscountLessPrice: TotalAmount});
  // }

  getAddress = () => {
    const {MyAddress = {}} = this.props;
    return `${MyAddress.first_name} \n${MyAddress.address1}, ${MyAddress.address2}, ${MyAddress.city}, ${MyAddress.landmark}`;
  };

  getTime = key => {
    let date = '';
    if (this.state.ScheDule) {
      const {
        delivery = {},
        pickup = {},
        delivery_time,
        pickup_time,
      } = this.state.ScheDule;
      if (KEYS[1] == key)
        date =
          delivery.day +
          ', ' +
          getFullDate(delivery.date) +
          ',at ' +
          delivery_time;
      if (KEYS[0] == key)
        date =
          pickup.day + ', ' + getFullDate(pickup.date) + ', at ' + pickup_time;
    }
    return date;
  };

  onSaveOrder = token => {
    const {ScheDule = {}, payment_type, PromoCode = {}} = this.state;
    const {
      delivery = {},
      pickup = {},
      delivery_time,
      pickup_time,
    } = this.state.ScheDule;
    const {MyAddress} = this.props;
    const pickup_date = pickup ? pickup.date : '';
    const delivery_date = delivery ? delivery.date : null;

    let playload = {
      pickup_date,
      pickup_time: pickup_time,
      delivery_date,
      delivery_time: delivery_time,
      payment_type,
      //promotion_id,
      delivery_days: 2,
      delivery_address_id: MyAddress.id,
      pickup_address_id: MyAddress.id,
      estimated_clothes: selectedItems.quantity,
      service_name: JSON.stringify(selectedItems.name),
      location_id: location_id,
    };
    if (PromoCode && PromoCode.id) playload.promotion_id = PromoCode.id;
    if (payment_type == 2) playload.stripeToken = token;
    this.props.saveOrder(playload);
  };
  getPromotext = (promo = {}) => {
    const {LngCode = {}} = this.props;
    if (!promo) return '';
    let promotype = '';

    if (promo.discount_type === 'percentage') promotype = '%';

    return `${promo.promocode} ( ${LngCode.LABEL_GET} ${
      promo.discount_value + promotype
    } ${LngCode.LABEL_DISOUNT_ORDER})`;
  };

  itemRenser = () => {
    for ({id} of selectedItems) {
      res.push(id);
    }

    // console.log(res, 'selectedItems......res');
  };
  render() {
    const {loading2, LngCode} = this.props;

    // console.log(location_id, 'selectedItems...................');
    var discountValue = 0;
    const {
      payment_type,
      PromoCode,
      Tprice = 0,
      DiscountLessPrice = 0,
      visible,
      promotion_value,
      tax_percentage,
      tax_price,
      errorPay,
    } = this.state;

    if (PromoCode && PromoCode.discount_value)
      discountValue = PromoCode.discount_value;
    //if (paytmLoading) return <Loader />;
    return (
      <Background footerStyle={{backgroundColor: colors.tint}}>
        <View style={styles.container}>
          <ScrollView style={{marginBottom: bottomButtonHeight}}>
            <Card
              style={{padding: 0, borderRadius: 0, marginBottom: spacing(5)}}
              type="list">
              <PickupSteps curPosition={2} />
            </Card>
            {/* <StripePayment
              errors={errorPay}
              onPayType={t => this.setState({payment_type: t})}
              onStripePayment={paydata =>
                this.setState({stripe_payment_data: paydata})  
              }
            /> */}
            <Card style={[styles.card, {padding: spacing(15)}]} type="list">
              <TouchableOpacity
                onPress={() =>
                  this.setState({promoCodeOn: true}, () =>
                    this.props.navigation.navigate('PromoCodeScreen'),
                  )
                }
                style={{
                  flex: 1,
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <TextBox
                  type="body2"
                  style={[
                    {
                      flex: 1,
                      color:
                        PromoCode && PromoCode.promocode
                          ? colors.tint
                          : colors.grey,
                    },
                  ]}>
                  {PromoCode && PromoCode.promocode
                    ? this.getPromotext(PromoCode)
                    : LngCode.PROMOCODE_APPLY_LABEL}
                </TextBox>
                {loading2 ? (
                  <ActivityIndicator size="small" />
                ) : (
                  // <IoniconsIcon
                  //   size={scales(25)}
                  //   color={'#959595'}
                  //   name="ios-arrow-forward"
                  // />
                  <ForwardArrow color={colors.tint} />
                )}
              </TouchableOpacity>
            </Card>
            <Card style={[styles.card, {padding: spacing(15)}]} type="list">
              <View
                style={{
                  marginBottom: spacing(2),
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}></View>

              <TextBox type="body4" style={styles.rowTitle}>
                {LngCode.SERVICE_NAME}
              </TextBox>

              {selectedItems && selectedItems.name.map((item) => {
                <TextBox type="caption2" style={styles.rowTitle}>
                   {item.name}
                </TextBox>
              })}
            </Card>
            <Card style={[styles.card, {padding: spacing(15)}]} type="list">
              <View
                style={{
                  marginBottom: spacing(2),
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}></View>

              <TextBox type="body4" style={styles.rowTitle}>
                {LngCode.LABEL_ESTIMATED_CLOTHES}
              </TextBox>
              <TextBox type="caption2" style={styles.rowTitle}>
                {selectedItems.quantity}
              </TextBox>
            </Card>

            <Card style={[styles.card, {padding: spacing(15)}]} type="list">
              <View
                style={{
                  marginBottom: spacing(2),
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <TextBox type="body4" style={styles.rowTitle}>
                  {LngCode.PICKUP_ADDRESS_LABEL}
                </TextBox>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.push('AddressList', {
                      Update: true,
                    })
                  }>
                  <CreateIcon color={colors.tint} />
                </TouchableOpacity>
              </View>
              <TextBox
                type="caption2"
                style={{color: colors.grey, marginHorizontal: scales(5)}}>
                {this.getAddress()}
              </TextBox>
            </Card>

            <Card style={[styles.card]} type="list">
              <View style={styles.dateTimeRow}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <TextBox type="body4" style={styles.rowTitle}>
                    {LngCode.PICK_UP_DATETIME_LABEL}
                  </TextBox>
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.push('ScheduleDateTime', {})
                    }>
                    <CreateIcon color={colors.tint} />
                  </TouchableOpacity>
                </View>
                <TextBox
                  type="caption2"
                  style={{color: colors.grey, marginHorizontal: scales(5)}}>
                  {this.getTime(KEYS[0])}
                </TextBox>
              </View>
              <View style={styles.dateTimeRow}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <TextBox type="body4" style={styles.rowTitle}>
                    {LngCode.DELIVERY_DATETIME_LABEL}
                  </TextBox>
                </View>
                <TextBox
                  type="caption2"
                  style={{color: colors.grey, marginHorizontal: scales(5)}}>
                  {this.getTime(KEYS[1])}
                </TextBox>
              </View>
            </Card>

            {/* <PriceDetailCard
              LngCode={LngCode}
              promotion_value={promotion_value}
              tax_price={tax_price}
              DiscountLessPrice={DiscountLessPrice}
              PromoCode={PromoCode}
              tax_percentage={tax_percentage}
              Tprice={Tprice}
            /> */}
          </ScrollView>
        </View>
        <BottomSimpleBtn
          loading={this.props.loading}
          title={LngCode.CONFIRM_ORDER}
          //  onPress={() => this.props.navigation.navigate('AllOrders')}
          onPress={() => this.onSaveOrder()}
        />
      </Background>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: colors.background,
  },

  card: {
    borderRadius: 0,
    marginBottom: spacing(5),
    elevation: 1,
    padding: 0,
  },

  methodRow: {
    padding: spacing(15),
    borderBottomColor: colors.borderGrey2,
    borderBottomWidth: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },

  rowTitle: {
    color: colors.grey,
    marginBottom: spacing(5),
  },

  checkBox: {
    height: spacing(20),
    width: spacing(20),
    borderColor: colors.darkGrey,
    borderWidth: 1,
    borderRadius: spacing(2),
    marginRight: spacing(15),
    justifyContent: 'center',
    alignItems: 'center',
  },

  dateTimeRow: {
    padding: spacing(15),
    borderBottomColor: colors.borderGrey2,
    borderBottomWidth: 1,
  },
});
const mapStateToProps = ({OrderData, ProductData, UserData, LngCode}) => {
  console.log('mapStateToProps', OrderData, ProductData);
  const {success, fail, loading} = OrderData;
  const {MyAddress} = UserData;
  const {ServieData, success2, loading2, TotalAmount} = ProductData;
  return {
    success,
    fail,
    loading,
    loading2,
    success2,
    ServieData,
    MyAddress,
    LngCode,
    TotalAmount,
  };
};

export default connect(mapStateToProps, {
  removeAllService,
  getTaxValue,
  saveOrder,
})(Payment);
