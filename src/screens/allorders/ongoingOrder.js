import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  StyleSheet,
  FlatList,
  RefreshControl,
} from 'react-native';
import Card from '../../components/card';
import TextBox from '../../components/TextBox';
import {
  colors,
  scales,
  spacing,
  fontSize,
  deviceDimensions,
} from '../../res/appStyles';
import moment from 'moment';
import {SIGN} from '../../res/ConstVariable';
import TouchableRipple from '../../components/TouchableRipple';
import OrderSteps from '../../components/stepIndicator/orderSteps';
import {Loader} from '../../components/loader';
import {getAllOrders, cancelOrder} from '../../redux/actions/order.action';
import BottomBtm from '../../components/bottomButton/BottomSimpleBtn';
import {connect} from 'react-redux';
import messaging from '@react-native-firebase/messaging';
import PopView from '../../components/popView';
import * as Yup from 'yup';
const schema = Yup.object().shape({
  reason: Yup.string()
    .required('Please enter cancelling reason')
    .test('len', 'Please Enter Valid Reason', val => val != ''),
});

class OngoingOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      OrderId: 0,
      reason: '',
      totelPages: 0,
      currentPage: 1,
      loadingPage: false,
      errorStatus: false,
    };
    this.onWillFocus();
  }

  renderActionBtn = (title, item, onPress) => {
    return (
      <TouchableRipple
        onPress={() => this.openDetail(item, title)}
        style={styles.outlineBtn}>
        <TextBox
          type="body2"
          style={{color: colors.darkGrey, fontWeight: 'normal'}}>
          {title}
        </TextBox>
      </TouchableRipple>
    );
  };
  openDetail = (item, title) => {
    const {LngCode} = this.props;
    if (title === LngCode.VIEW_ORDER_LABEL)
      this.props.navigation.navigate('OrderDetail', {OrderId: item.id});
    else this.setState({visible: true, OrderId: item.id});
  };
  onGetOngoingRecords = (first = false, pageSize = 10) => {
    const {currentPage} = this.state;

    const data = {
      type: 'ongoing',
      currentPage,
      pageSize,
      first,
    };
    this.props.getAllOrders(data);
  };

  componentDidMount() {
    const {navigation} = this.props;
    navigation.addListener('willFocus', async () => {
      this.onWillFocus();
    });
    const removeNotificationListener = messaging().onMessage(notification => {
      this.onWillFocus();
    });
  }

  componentWillReceiveProps(nextProps) {
    const self = this;
    const {success2, cancelFails, LngCode} = nextProps;

    if (success2 != this.props.success2) {
      this.setState({visible: false, currentPage: 0, reason: ''}, () => {
        if (success2.status) {
          //self.onGetOngoingRecords() ;
          global.Toaster(success2.msg);
        }
      });
    }
    if (cancelFails != this.props.cancelFails) {
      this.setState({visible: false, currentPage: 0, reason: ''});
      global.Toaster(LngCode.ALERT_WRONG);
    }
  }

  renderItem = ({item}) => {
    const {LngCode} = this.props;
    var driverName = '';
    const {driver = {}} = item;
    if (driver) driverName = `${driver.first_name} ${driver.last_name}`;
    if (!item.id) return null;
    return (
      <Card type="list" style={styles.orderCard}>
        <View style={styles.orderTitle}>
          <TextBox type="body2">
            {LngCode.LABEL_ORDER_ID} : #{item.id}
          </TextBox>

          <TextBox type="body2">
            {' '}
            {moment(item.order_placed_time).format('DD MMM, YYYY hh:mm A')}
          </TextBox>
          {/* {item.total_price > 1 ? (
            <TextBox type="body3">
              {SIGN}
              {item.total_price}
            </TextBox>
          ) : null} */}
        </View>

        <View style={[styles.confirmTxt, {flexDirection: 'row'}]}>
          <TextBox type="body3" style={{color: colors.tint}}>
            {item.status_title}
          </TextBox>
          {driver && driver.first_name ? (
            <TextBox
              type="body3"
              color={colors.grey}
              style={{flex: 1, textAlign: 'right'}}>
              {driverName}
            </TextBox>
          ) : null}
        </View>
        <View style={styles.orderSteps}>
          <OrderSteps curPosition={item.status} />
        </View>
        <View style={styles.actionBtns}>
          {item.status <= 0 && item.status != 1 ? (
            this.renderActionBtn(LngCode.ORDER_CANCEL_LABEL, item)
          ) : (
            <View />
          )}
          {this.renderActionBtn(LngCode.VIEW_ORDER_LABEL, item)}
        </View>
      </Card>
    );
  };

  onCencalOrder = () => {
    const {OrderId = 0, reason} = this.state;

    if (!reason) {
      schema
        .validate({reason})
        .then(res => {
          this.setState(!this.props.orderCancelloading, {errorStatus: true});
        })
        .catch(res => {
          global.Toaster('Please enter cancelling reason');
        });
    } else {
      this.props.cancelOrder({order_id: OrderId, reason});
      this.setState({visible: false}, () => global.Toaster('please wait ..'));
    }
  };

  onWillFocus = () => {
    this.setState({currentPage: 1}, () => this.onGetOngoingRecords(true, 10));
  };
  handleLoadMore = () => {
    const {OnGoing = false, ongoingTotalPage, loading} = this.props;
    if (OnGoing && OnGoing.length < ongoingTotalPage && !loading) {
      this.setState({currentPage: this.state.currentPage + 1}, () =>
        this.onGetOngoingRecords(false, 10),
      );
    }
  };
  render() {
    const {
      OnGoing = [],
      loading,
      orderCancelloading = false,
      LngCode,
    } = this.props;
    const {errorStatus, reason} = this.state;
    if (loading && OnGoing.length >= 0) return <Loader />;
    console.log(OnGoing, 'OnGoinggggggg');
    return (
      <SafeAreaView style={{flex: 1}}>
        <PopView
          onRequestClose={() => this.setState({visible: false})}
          visible={this.state.visible}>
          <View
            style={{
              width: '100%',
              height: scales(200),
              elevation: 2,
              backgroundColor: '#fff',
            }}>
            <TextInput
              value={this.state.reason}
              onChangeText={reason =>
                this.setState({reason, errorStatus: false})
              }
              style={{margin: spacing(20), fontSize: fontSize(15)}}
              placeholder={LngCode.MSG_ORDER_CANCEL}
              multiline={true}
              numberOfLines={5}
            />
            {errorStatus && !reason ? (
              <TextBox color={colors.red} style={{marginHorizontal: 10}}>
                {LngCode.MSG_ORDER_CANCEL}
              </TextBox>
            ) : (
              <TextBox />
            )}
            <BottomBtm
              loading={orderCancelloading}
              title={LngCode.ORDER_CANCEL_LABEL}
              onPress={() => this.onCencalOrder()}
            />
          </View>
        </PopView>
        <FlatList
          data={OnGoing}
          keyExtractor={i => {}}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={this.onWillFocus} />
          }
          renderItem={this.renderItem}
          ListEmptyComponent={() => this.listEmptyComponent()}
          onEndReached={this.handleLoadMore}
        />
      </SafeAreaView>
    );
  }
  listEmptyComponent = () => {
    const {LngCode} = this.props;
    return (
      <Loader
        loader={false}
        title={LngCode.MSG_ORDER_LIST_EMPTY}
        style={{
          height: deviceDimensions.height / 2.5,
          justifyContent: 'flex-end',
          color: colors.grey,
        }}
      />
    );
  };
}

const styles = StyleSheet.create({
  orderCard: {
    margin: spacing(10),
    padding: 0,
  },

  orderTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing(5),
    padding: spacing(10),
    paddingBottom: 0,
  },

  confirmTxt: {
    paddingHorizontal: spacing(10),
    paddingBottom: spacing(10),
    borderBottomColor: colors.borderGrey,
    borderBottomWidth: 0.5,
  },

  orderSteps: {
    borderBottomColor: colors.borderGrey,
    borderBottomWidth: 0.5,
  },

  actionBtns: {
    paddingHorizontal: spacing(20),
    paddingVertical: spacing(15),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  outlineBtn: {
    paddingVertical: spacing(5),
    paddingHorizontal: spacing(15),
    borderColor: colors.darkGrey,
    borderWidth: 1,
    borderRadius: spacing(5),
  },
});
const mapStateToProps = ({OrderData, LngCode}) => {
  const {
    OnGoing = [],
    ongoingTotalPage,
    loading,
    success2,
    orderCancelloading,
    fail,
    cancelFails,
  } = OrderData;
  return {
    loading,
    OnGoing,
    success2,
    orderCancelloading,
    ongoingTotalPage,
    fail,
    cancelFails,
    LngCode,
  };
};
export default connect(mapStateToProps, {
  getAllOrders,
  cancelOrder,
})(OngoingOrders);
