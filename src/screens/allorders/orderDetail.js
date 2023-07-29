import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  FlatList,
  Linking,
} from 'react-native';
import Card from '../../components/card';
import TextBox from '../../components/TextBox';
import {colors, spacing} from '../../res/appStyles';
import {SIGN, STORAGES} from '../../res/ConstVariable';
import {getOrderDetail} from '../../redux/actions/order.action';
import {isEmpty, onChangeDateFormate} from '../../utils/funcations';
import Btn from '../../components/roundBtn';
import {connect} from 'react-redux';
import {Loader} from '../../components/loader';
import CircleImage from '../../components/card/Circle';
import messaging from '@react-native-firebase/messaging';
import {DriverCallingCard} from './conponents/drivercallcard';
import {OrderCard} from './conponents/ordercard';
import {ColumnCard} from './conponents/columndetail';
import {outstyle} from '../styles';
import moment from 'moment';
import {PriceDetailCard} from '../home/components/PriceInfoCard';
import {color} from 'react-native-reanimated';
import {getAsyncStorage} from '../../utils/asyncStorage';
// import {FetchTxnStatus} from './conponents/fetchTxnStatus';
import {FetchTxnStatus} from './conponents/fetchTxnStatus';
import Transection from './conponents/Transaction';
class OrderDetail extends Component {
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
    const orderId = props.navigation.getParam('OrderId', 7);
    this.state = {
      orderId,
      tprice: 0,
      itemTax: 0,
    };
    this.setHeaderTitle();
  }
  setHeaderTitle = () => {
    const {LngCode} = this.props;
    this.props.navigation.setParams({
      headerTitle: LngCode.LABEL_OEDERS_DETAILS,
    });
  };

  componentDidMount() {
    const {orderId} = this.state;
    this.props.getOrderDetail({order_id: orderId});
    this.removeNotificationListener = messaging().onMessage(notification => {
      if (orderId) this.props.getOrderDetail({order_id: orderId});
    });
    this.getItemTax();
  }
  //  d = new Date();
  // ms = d.valueOf();
  renderItem = props => {
    const {
      product,
      price,
      quantity,
      model_type,
      total_amount,
      item,
      price_type,
      service = {},
    } = props.item;
    console.log('item', props.item);
    const data = model_type === 'Product' ? product : item;
    return (
      <View
        style={{
          paddingHorizontal: spacing(10),
          paddingBottom: spacing(10),
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={{flex: 0.9}}>
          <TextBox type="caption2">{data && data.name}</TextBox>
          {service && service.name ? (
            <TextBox type="caption" color="lightGrey2">
              {service.name}
            </TextBox>
          ) : null}
        </View>
        <TextBox type="caption2">
          {SIGN}
          {price} {''} {price_type} * {quantity} = {SIGN}
          {total_amount}
        </TextBox>
      </View>
    );
  };
  getItemTax = () => {
    getAsyncStorage(STORAGES.USER)
      .then(res => {
        this.setState({itemTax: JSON.parse(res).tax});
      })
      .catch(e => {});
  };
  // getServicesList = () => {
  //   const result = JSON.parse({service_name})
  //   .then(res => {
  //       result
  //     })
  //     .catch(e => { console.log(result,'>>>>>>>>>>')})
    
  // }
  render() {
    // console.log(
    // promotion.min_cart_amount,
    //   'OrderDetials12345678899.................................>???????????????',
    // );
    // this.getServicesList
   
    const {activeTab, itemTax} = this.state;
    var promocode = 0;
    const {
      OrderDetials,
      OrderDetialsLoader,
      Items,
      Products,
      LngCode,
    } = this.props;

    if (OrderDetialsLoader) return <Loader loader={true} />;
    if (OrderDetials && isEmpty(OrderDetials))
      return <Loader loader={false} title={LngCode.MSG_NO_ITEMS} />;
    const {
      id = '',
      updated_at = '',
      pickup_date,
      pickup_time,
      delivery_date,
      delivery_time,
      total_price = 0,
      price = 0,
      estimated_clothes = '',
      service_name = '',
      status_title,
      user_id,
      driver = {},
      promotion = {},
      tax_price = '',
      promotion_value,
      discount_value,
      pickup_address = {},
      payment_type_title,
      tax_percentage,
      status,
      min_cart_amount,
      payment_status,
      lname,
    } = OrderDetials;
    if (price) promocode = price - total_price - tax_price;

    return (
      <SafeAreaView style={outstyle.body1}>
        <ScrollView>
          <OrderCard
            LngCode={LngCode}
            id={id}
            total_price={total_price}
            status_title={status_title}
            estimated_clothes={estimated_clothes}
            lname={lname}
            payment_status={payment_type_title}
            status={status}
            Image={require('../../../assets/images/download.png')}>
           
            <TextBox type="body2" style={{fontSize: 13,}}>
              Service Name 
            </TextBox>
             {
             service_name ? JSON.parse(service_name).map((item) => {
              return (
                <TextBox type="caption" style={{color: colors.grey}}>
                  {item.name} 
                </TextBox>
              )
            }): null}
          </OrderCard>
          {driver ? (
            <DriverCallingCard
              LngCode={LngCode}
              style={outstyle.orderCard}
              driver={driver}
            />
          ) : null}
          <Card
            type="list"
            style={[outstyle.orderCard, {padding: spacing(10)}]}>
            <ColumnCard
              title={LngCode.LABEL_PICKUP_ADDRESS_CAP}
              body={`${pickup_address.first_name} `}
              // ${pickup_address.last_name}
              style={{marginBottom: spacing(8)}}>
              <TextBox type="caption2" style={{fontSize: 13}}>
                {pickup_address.landmark} - {pickup_address.address1},{' '}
                {pickup_address.address2},
                {pickup_address.city ? pickup_address.city : ''}
                {pickup_address.zipcode}
              </TextBox>
            </ColumnCard>
            <ColumnCard
              title={LngCode.LABEL_PICKUP_DATE_TIME_CAP}
              body={`${onChangeDateFormate(pickup_date)} at ${pickup_time}`}
              style={{marginBottom: spacing(8)}}
            />
            <ColumnCard
              title={LngCode.LABEL_DELIVER_DATE_TIME_CAP}
              body={`${onChangeDateFormate(
                delivery_date,
              )} at  ${delivery_time}`}
              style={{marginBottom: spacing(10)}}
            />
          </Card>
          {Items && Items.length ? (
            <Card
              type="list"
              style={[outstyle.orderCard, {padding: spacing(10)}]}>
              <TextBox type="body3" style={{fontWeight: '500'}}>
                {LngCode.LABEL_OEDERS_DETAILS_CAP} :
              </TextBox>
              {Items && Items.length ? (
                <TextBox type="body3" style={{marginVertical: spacing(5)}}>
                  {LngCode.LEBAL_ITEMS} :
                </TextBox>
              ) : null}
                <FlatList data={Items} scrollEnabled={false} renderItem={this.renderItem} />  
              {/* {Items && Items.map(this.renderItem)} */}
              {Products && Products.length ? (
                <TextBox type="body3" style={{marginVertical: spacing(5)}}>
                  {LngCode.LABEL_PRODUCT} :
                </TextBox>
              ) : null}
             {/* <FlatList data={Products}  renderItem={this.renderItem} />  */}
              {Products && Products.map(this.renderItem)}
            </Card>
          ) : null}
          { promotion && promotion.min_cart_amount > price ? 
            <Card type="list"
              style={[outstyle.orderCard, { padding: spacing(10) }]}>
              <View style={{ flexDirection: 'row' }}>
           
                <TextBox type="caption3" style={{ flex: 1, color: colors.tint }}> {
                  promotion?.promocode
                } </TextBox>
          
              </View>
       
              <View>
                <TextBox type="caption0" style={{ flex: 1, color: colors.tint }}>
                  {promotion?.description}
                </TextBox>
                {promotion ?
                  <TextBox type="caption0" style={{ flex: 1, color: colors.red }}>
                    Promo code is not applicable due to minimum card amount
                  </TextBox> :null}
              </View>
            </Card>:null}

          {Items && Items.length ? (
            <PriceDetailCard
              style={outstyle.orderCard}
              LngCode={LngCode}
              discount_value={promotion?.min_cart_amount < price?
                (price.toFixed(2) * promotion.discount_value) / 100:null
              }
              description={promotion?.min_cart_amount < price? promotion?.description:null }
              tax_price={(price * tax_percentage) / 100}
              DiscountLessPrice={total_price}
              PromoCode={promotion?.min_cart_amount < price? promotion:null}
              tax_percentage={(price.toFixed(2) * tax_percentage) / 100}
              price={total_price}
              Tprice={price}
            />
          ) : null}
          {promotion && promotion.promocode ? (
            <Card
              style={{
                borderRadius: 0,
                marginBottom: spacing(5),
                elevation: 1,
                padding: 0,
              }}>
              {/* <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingTop: spacing(5),
                  paddingHorizontal: spacing(10),
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <TextBox type="caption2">PromoCode Applied</TextBox>

                  <TextBox
                    type="body2"
                    style={{
                      color: colors.tint,
                      paddingHorizontal: spacing(10),
                    }}>
                    {promotion.promocode}
                  </TextBox>
                </View>
                {Items && Items.length ? (
                  <TextBox
                    type="caption2"
                    style={{paddingHorizontal: spacing(10)}}>
                    {SIGN} {''}
                    {(price.toFixed(2) * promotion.discount_value) / 100}
                  </TextBox>
                ) : null}
              </View>
              <TextBox
                type="caption"
                style={{  
                  paddingHorizontal: spacing(10),
                }}>
                {promotion.description}
              </TextBox> */}
              {/* {Items && Items.length ? (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingVertical: spacing(10),
                    paddingHorizontal: spacing(10),
                  }}> */}
                  {/* <TextBox type="body2" style={{}}>
                    Grand Total
                  </TextBox> */}
                  {/* <TextBox type="caption2">
                    {SIGN}
                   {price.toFixed(2) - (price * promotion.discount_value)/ 100}
                  </TextBox> */}
                  
                {/* </View>
              ) : null} */}
            </Card>
          ) : null}
           {/* <TextBox type="caption2" >{status}</TextBox>  */}
           {status!==0 &&status!==7&& price && payment_status !== "sucess"? 
            <Transection id={`${id}${Math.floor(Date.now() / 1000)}`} order_id={id} user_id={user_id}
              price={total_price}
              // price={price - (price * promotion?.discount_value / 100) + (price * tax_percentage / 100)}
            /> 
           : null} 
             
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = ({OrderData, LngCode}) => {
  const {OrderDetials, OrderDetialsLoader, Products, Items} = OrderData;
  return {
    OrderDetials,
    OrderDetialsLoader,
    Products,
    Items,
    LngCode,
  };
};
export default connect(mapStateToProps, {
  getOrderDetail,
})(OrderDetail);
