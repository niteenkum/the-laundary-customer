import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  TextInput,
  FlatList,
  ScrollView,
  RefreshControl,
} from 'react-native';
import Card from '../../components/card';
import TextBox from '../../components/TextBox';
import {colors, spacing, scales, deviceDimensions} from '../../res/appStyles';
import TouchableRipple from '../../components/TouchableRipple';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import messaging from '@react-native-firebase/messaging';
import {connect} from 'react-redux';
import Stars from '../../components/StarRatting';
import {Loader} from '../../components/loader';
import moment from 'moment';
import BottomBtm from '../../components/bottomButton/BottomSimpleBtn';
import {getAllOrders, giveOrderRatting} from '../../redux/actions/order.action';
import PopView from '../../components/popView';
import {SIGN} from '../../res/ConstVariable';
class PastOrders extends Component {
  state = {
    currentPage: 0,
    visible: false,
    rating: 1,
    order_id: 0,
    review: '',
    pageSize: 20,
    review_to: 0,
    review_by_type: 'customer',
  };
  renderActionBtn = (title, t) => (
    <TouchableRipple
      onPress={() => this.openDetail(title, t)}
      style={styles.outlineBtn}>
      <TextBox
        type="body2"
        style={{color: colors.darkGrey, fontWeight: 'normal'}}>
        {title}
      </TextBox>
    </TouchableRipple>
  );

  onSubmitReview = () => {
    var {rating = 1, review, order_id, review_to} = this.state;
    if (!review) review = '';

    const payload = {
      order_id,
      rating,
      review,
      review_to,
      review_by_type: 'driver',
    };
    this.props.giveOrderRatting(payload);
  };
  componentWillReceiveProps(nextProps) {
    const {rattingLoader, Ratting, fail} = nextProps;
    if (Ratting != this.props.Ratting) {
      global.Toaster(Ratting.msg);
      this.setState({rating: 0, visible: false});
      this.onGetOngoingRecords(true);
    }
  }
  openDetail = (title, item) => {
    const {LngCode} = this.props;
    const {id, driver_id} = item;
    if (title === LngCode.LABEL_REVIEW) {
      if (!driver_id) global.Toaster('Driver not Assigned');
      else this.setState({visible: true, review_to: driver_id, order_id: id});
    } else this.props.navigation.navigate('OrderDetail', {OrderId: item.id});
  };

  componentDidMount() {
    this.onGetOngoingRecords(true);
    const {navigation} = this.props;
    navigation.addListener('willFocus', async () => {
      this.onWillFocus();
    });
    const removeNotificationListener = messaging().onMessage(notification => {
      this.onWillFocus();
    });
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
        }}
      />
    );
  };
  onWillFocus = () => {
    this.setState({currentPage: 1}, () => this.onGetOngoingRecords(true, 10));
  };
  handleLoadMore = () => {
    const {Past = false, pastTotalPages, loading2} = this.props;
    if (Past && Past.length < pastTotalPages && !loading2) {
      this.setState({currentPage: this.state.currentPage + 1}, () =>
        this.onGetOngoingRecords(false, 7),
      );
    }
  };
  onGetOngoingRecords = (first = false, pageSize = 10) => {
    const {currentPage} = this.state;

    const data = {
      type: 'past',
      currentPage,
      pageSize,
      first,
    };
    this.props.getAllOrders(data);
  };

  render() {
    const {
      Past = false,
      loading2,
      fail,
      rattingLoader = false,
      LngCode = {},
    } = this.props;
     const { visible, review, rating } = this.state;
    if (loading2 && Past.length >= 0) return <Loader />;
    return (
      <View>
        <PopView
          onRequestClose={() => this.setState({visible: false})}
          visible={this.state.visible}>
          <View
            style={{
              width: '100%',
              paddingTop: 20,
              flex: 1,
              elevation: 2,
              backgroundColor: '#fff',
              alignItems: 'center',
            }}>
            {/* <RoundBtn>
              <TextBox>X</TextBox>
            </RoundBtn> */}
            <ScrollView>
              <View style={{alignItems: 'center'}}>
                <TextBox type="title1" color={colors.tint}>
                  {LngCode.LABEL_YOUR_RATTING}
                </TextBox>
                <Stars
                  size={scales(80)}
                  rate={rating}
                  setRate={rating => this.setState({rating})}
                />
                <TextInput
                  value={review}
                  onChangeText={review => this.setState({review})}
                  multiline={true}
                  style={{color:colors.grey,  minWidth: 200, textAlign: 'left' }}
                  placeholder={LngCode.MSG_WRITE_REVIEW}
                  maxLength={100}
                />
              </View>
            </ScrollView>

            <BottomBtm
              loading={rattingLoader}
              title={LngCode.LABEL_SUBMIT}
              onPress={() => this.onSubmitReview()}
            />
          </View>
        </PopView>
        <FlatList
          data={Past}
          refreshControl={
            <RefreshControl
              refreshing={loading2}
              onRefresh={this.onWillFocus}
            />
          }
          ListEmptyComponent={() => this.listEmptyComponent()}
          onEndReached={this.handleLoadMore}
          renderItem={this.renderItem}
        />
      </View>
    );
  }

  renderItem = ({item}) => {
    const {LngCode} = this.props;
    return (
      <Card type="list" style={styles.orderCard}>
        <View style={styles.orderTitle}>
          <TextBox type="body2">
            {LngCode.LABEL_ORDER_ID} : #{item.id}
          </TextBox>
          <TextBox type="body2">
            {moment(item.order_placed_time).format('DD MMM, YYYY hh:mm A')}
          </TextBox>
          {/* {item && item.total_price > 0 ? (
            <TextBox type="body3">
              {SIGN}
              {item.total_price}
            </TextBox>
          ) : null} */}
        </View>
        <View type="body3" style={styles.confirmTxt}>
          {item.status === 7 ? (
            <TextBox type="body2" style={{color: colors.lightGreen}}>
              {item.status_title}
            </TextBox>
          ) : (
            <TextBox type="body3" style={{color: colors.red}}>
              {item.status_title}
            </TextBox>
          )}
        </View>

        <View style={styles.actionBtns}>
          {item.status === 6 ? (
            item.reviews && item.reviews.length ? (
              <Stars rate={item.reviews[0].rating} size={scales(25)} />
            ) : (
              this.renderActionBtn(LngCode.LABEL_REVIEW, item)
            )
          ) : (
            <View />
          )}
          <View />
          {this.renderActionBtn(LngCode.VIEW_ORDER_LABEL, item)}
        </View>
          {item.status === 6 &&
          item.reviews && item.reviews.length ?
          <TextBox type="body1" style={{ color: colors.grey, padding: 10 }}>
            {item.reviews[0].review}
          </TextBox>
          : null
        }
      </Card>
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
    borderBottomWidth: 1,
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
    Past,
    loading2,
    rattingLoader,
    Ratting,
    fail,
    pastTotalPages,
  } = OrderData;
  return {
    Past,
    loading2,
    pastTotalPages,
    rattingLoader,
    Ratting,
    fail,
    LngCode,
  };
};
export default connect(mapStateToProps, {getAllOrders, giveOrderRatting})(
  PastOrders,
);
