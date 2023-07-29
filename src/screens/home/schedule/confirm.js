import React, {Component} from 'react';
import {View, StyleSheet, BackHandler, Image, ScrollView} from 'react-native';
import PickupSteps from '../../../components/stepIndicator/pickupSteps';
import Card from '../../../components/card';
import TextBox from '../../../components/TextBox';
import {colors, dimensions, scales, spacing} from '../../../res/appStyles';
import BottomSimpleBtn from '../../../components/bottomButton/BottomSimpleBtn';
import {Loader} from '../../../components/loader';
import {SIGN} from '../../../res/ConstVariable';
import {connect} from 'react-redux';
import {giveOrderRatting} from '../../../redux/actions/order.action';
import {onChangeDateFormate} from '../../../utils/funcations';
import Background from '../../../components/background';
const {bottomButtonHeight} = dimensions;

class CompleteOrder extends Component {
  static navigationOptions = ({navigation}) => {
    let headerTitle = ' ';
    const {params = {}} = navigation.state;
    if (params.headerTitle) headerTitle = params.headerTitle;
    return {
      headerTitle,
      gesturesEnabled: false,
      headerBackTitle: null,
      headerRight: <View />,
      headerLeft: <View />,
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      rating: 1,
      loader: false,
      data: {},
      review: '1',
    };
    this.setHeaderTitle();
  }

  setHeaderTitle = () => {
    const {LngCode} = this.props;
    this.props.navigation.setParams({headerTitle: LngCode.LABEL_ORDER_CONFIRM});
  };

  componentDidMount() {
    const {success} = this.props;
    if (success) this.setState({data: success});
  }

  onSubmit = () => {
    this.setState({loading: true});
    this.props.navigation.navigate('AllOrders', {from: 'schedule'});
  };

  componentWillMount() {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  handleBackButtonClick = () => {
    return this.props.navigation.navigate('OrderStack');
  };

  render() {
    const {LngCode = {}} = this.props;
    const {data, loading} = this.state;
    if (!data.id) return <Loader />;
    const date = `${onChangeDateFormate(data.pickup_date)} at ${
      data.pickup_time
    } `;

    return (
      <Background footerStyle={{backgroundColor: colors.tint}}>
        <View style={styles.container}>
          <ScrollView style={{marginBottom: bottomButtonHeight}}>
            <Card style={styles.pickupCard} type="list">
              <PickupSteps curPosition={3} />
            </Card>
            <View>
              <View style={styles.thankMsg}>
                <Image
                  source={require('../../../../assets/images/delivery_truck.png')}
                  style={{
                    height: scales(150),
                    width: scales(120),
                    resizeMode: 'contain',
                  }}
                />
                <TextBox type="title2" style={{color: colors.darkGrey}}>
                  {LngCode.MSG_CONFIRM_HEADER}
                </TextBox>
                <TextBox type="body1" style={{color: colors.darkGrey}}>
                  {LngCode.MSG_PICKUP_CONFIRM}
                </TextBox>
              </View>
              <Card style={[styles.card]} type="list">
                <View style={styles.tableRow}>
                  <TextBox type="body2" style={{color: colors.darkGrey}}>
                    {LngCode.LABEL_ORDER_ID}
                  </TextBox>
                  <TextBox type="body2" style={{color: colors.darkGrey}}>
                    #{data.id}
                  </TextBox>
                </View>
                {/* <View style={styles.tableRow}>
                               <TextBox type="body2">Payment Mode</TextBox>
                               <TextBox type="body2">{data.payment_type}</TextBox>
                           </View> */}
                <View style={styles.tableRow}>
                  <TextBox type="body2" style={{color: colors.darkGrey}}>
                    {LngCode.LABEL_ESTIMATED_CLOTHES}
                  </TextBox>
                  <TextBox type="body2" style={{color: colors.darkGrey}}>
                    {/* {SIGN}
                     {parseFloat(data.total_price).toFixed(2)}  */}
                    {/* {selectedItems.quantity} */}
                    {data.estimated_clothes}
                  </TextBox>
                </View>
                <View style={[styles.tableRow, {flexDirection: 'column'}]}>
                  <TextBox type="body2" style={{color: colors.darkGrey}}>
                    {LngCode.PICK_UP_DATETIME_LABEL}
                  </TextBox>
                  <TextBox
                    style={{
                      color: colors.darkGrey,
                      marginHorizontal: scales(2),
                    }}
                    type="caption">
                    {date}
                  </TextBox>
                </View>
                {/* <View style={styles.tableRow}>
                               <TextBox type="body1">Payment Method</TextBox>
                               <TextBox type="body2">{data.payment_type}</TextBox>
                           </View> */}
              </Card>
              {/* <Card style={{justifyContent:'center',alignItems:'center'}}>
                           <TextBox  type="title">How would you rate this order ?</TextBox>
                           <StarRatting rate={this.state.rating} setRate={(rating)=>this.setState({rating})} size={50}/>
                       </Card> */}
            </View>
          </ScrollView>
        </View>
        <BottomSimpleBtn
          loading={loading}
          title={LngCode.LABEL_GO_ORDERS}
          onPress={() => this.onSubmit()}
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

  pickupCard: {
    padding: 0,
    borderRadius: 0,
    marginBottom: 20,
  },

  thankMsg: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing(20),
  },

  card: {
    marginBottom: 20,
    elevation: 1,
    padding: 0,
    margin: 10,
  },

  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomColor: colors.borderGrey,
    borderBottomWidth: 1,
  },
});

const mapStateToProps = ({OrderData, LngCode}) => {
  console.log('mapStateToProps', OrderData);
  const {success} = OrderData;
  return {
    success,
    LngCode,
  };
};

export default connect(mapStateToProps, {
  giveOrderRatting,
})(CompleteOrder);
