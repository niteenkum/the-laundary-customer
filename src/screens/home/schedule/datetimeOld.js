import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
  FlatList,
} from 'react-native';
import PickupSteps from '../../../components/stepIndicator/pickupSteps';
import Card from '../../../components/card';
import TextBox from '../../../components/TextBox';
import {
  colors,
  dimensions,
  spacing,
  fontSize,
  scales,
} from '../../../res/appStyles';
import BottomSimpleBtn from '../../../components/bottomButton/BottomSimpleBtn';
import FeatherIcon from 'react-native-vector-icons/Feather';
import TouchableRipple from '../../../components/TouchableRipple';
import {getNextDays, getFullDate, getTimelist} from '../../../utils/funcations';
import {DaysName, DateArr} from '../../../res/ConstVariable';
import Background from '../../../components/background';
import {connect} from 'react-redux';
const {bottomButtonHeight} = dimensions;
const NEXTDAYS = 10;
const KEYS = ['pickup', 'delivery'];
import {getTimeSlot} from '../../../redux/actions/schedule.action';
import {Loader} from '../../../components/loader';

class ScheduleDateTime extends Component {
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
    this.state = {
      PickupDays: [],
      DeliveryDays: [],
      pickupFullTime: ' ',
      pickupDate: '10',
      pickupDay: ' ',

      pickupTime: '',

      deliveryFullTime: '20 july',
      deliveryDate: '12',
      deliveryDay: ' ',
      deliveryTime: ' ',
    };
    this.setHeaderTitle();
  }
  setHeaderTitle = () => {
    const {LngCode} = this.props;
    this.props.navigation.setParams({
      headerTitle: LngCode.LABEL_SCHEDULE_PICKUP,
    });
  };
  componentDidMount() {
    this.props.getTimeSlot();
    var dt = new Date();
    const PickupDays = getNextDays(NEXTDAYS, dt);
    if (PickupDays && PickupDays.length)
      this.onSetPickUpSchedule(KEYS[0], PickupDays[0]);
    this.setState({PickupDays});
  }

  componentWillReceiveProps(nextProps) {
    const {timeSlot, loading} = nextProps;
    if (timeSlot != this.props.timeSlots && !loading) {
      if (timeSlot.length)
        this.setState({
          deliveryTime: timeSlot[0].slots,
          pickupTime: timeSlot[0].slots,
        });
    }
  }
  onSetPickUpSchedule = (key, dateObj) => {
    var tomorrow = new Date(dateObj.time);
    tomorrow.setDate(tomorrow.getDate() + 2);
    const DeliveryDays = getNextDays(NEXTDAYS, tomorrow);

    if (KEYS[0] == key) {
      const data = {
        pickupDate: dateObj.date,
        pickupDay: DaysName[dateObj.day],
        pickupFullTime: dateObj.time,
        // pickupTime: arr[0].timeSlot,
        // pickupTimeArr: arr
      };
      this.setState({...data, DeliveryDays}, () =>
        this.onSetPickUpSchedule(KEYS[1], DeliveryDays[0]),
      );
    } else if (KEYS[1] == key) {
      const data = {
        deliveryDate: dateObj.date,
        deliveryDay: DaysName[dateObj.day],
        deliveryFullTime: dateObj.time,
        // deliveryTime: arr[0].timeSlot,
        // deliveryTimeArr: arr
      };
      this.setState(data);
    }
  };
  renderMonth = key => {
    const {pickupFullTime, deliveryFullTime} = this.state;
    const fulltime = key === 'pickup' ? pickupFullTime : deliveryFullTime;
    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <FeatherIcon color={colors.lightGrey} name="chevron-left" size={20} />
        <TextBox type="body2">{getFullDate(fulltime)}</TextBox>
        <FeatherIcon color={colors.lightGrey} name="chevron-right" size={20} />
      </View>
    );
  };

  renderTimeSlots = (key, Times) => {
    return (
      <FlatList
        data={Times}
        keyExtractor={(item, index) => item.id}
        renderItem={({item, index}) => this.renderTime(item, key)}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        extraData={this.state}
      />
    );
  };

  renderTime = (item, key) => {
    return (
      <TouchableRipple
        rippleContainerBorderRadius={5}
        onPress={() => this.setState({[key]: item.slots})}
        style={[
          styles.timeCell,
          this.state[key] == item.slots ? styles.selectedBorder : {},
        ]}>
        <TextBox style={{color: colors.grey}}>{item.slots} </TextBox>
      </TouchableRipple>
    );
  };
  onMoveNext = () => {};
  renderDates = (key, MainKey, days) => (
    <FlatList
      data={days}
      ref={el => (this._flatList = el)}
      keyExtractor={(item, index) => item.date}
      renderItem={({item, index}) => this.renderDateItem(item, key, MainKey)}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      extraData={this.state}
    />
  );

  renderDateItem = (item, key, MainKey) => (
    <TouchableRipple
      rippleContainerBorderRadius={5}
      onPress={() =>
        this.setState({[key]: item.date}, () =>
          this.onSetPickUpSchedule(MainKey, item),
        )
      }
      style={[
        styles.dateCell,
        this.state[key] == item.date ? styles.selectedBorder : {},
      ]}>
      <TextBox type="title" color="darkGrey">
        {item.date}
      </TextBox>
      <TextBox type="caption3" color="lightGrey">
        {DateArr[item.day]}
      </TextBox>
    </TouchableRipple>
  );

  render() {
    console.log('state', this.state);
    const {PickupDays, DeliveryDays} = this.state;
    const {timeSlot = [], loading, LngCode} = this.props;
    return (
      <Background footerStyle={{backgroundColor: colors.tint}}>
        <View style={styles.container}>
          <ScrollView style={{marginBottom: bottomButtonHeight}}>
            <Card
              style={{padding: 0, borderRadius: 0, marginBottom: spacing(8)}}
              type="list">
              <PickupSteps curPosition={1} style={{}} />
            </Card>
            <View>
              <Card
                style={[styles.card, {marginBottom: spacing(8)}]}
                type="list">
                <View style={styles.head}>
                  <TextBox type="body2" style={{color: colors.tint}}>
                    {LngCode.PICK_UP_DATE_LABEL}
                  </TextBox>
                  {this.renderMonth('pickup')}
                </View>
                <View style={styles.datesCont}>
                  {this.renderDates('pickupDate', KEYS[0], PickupDays)}
                </View>
                <View style={styles.head}>
                  <TextBox type="body1" style={{color: colors.tint}}>
                    {LngCode.PICKUP_TIME_LABEL}
                  </TextBox>
                </View>
                <View style={[styles.datesCont, {paddingBottom: 10}]}>
                  {loading ? (
                    <Loader />
                  ) : (
                    this.renderTimeSlots(
                      'pickupTime',
                      getTimelist(timeSlot, this.state.pickupDate),
                    )
                  )}
                </View>
              </Card>

              <Card style={styles.card} type="list">
                <View style={styles.head}>
                  <TextBox type="body2" style={{color: colors.tint}}>
                    {LngCode.DELIVERY_DATE_LABEL}
                  </TextBox>
                  {this.renderMonth()}
                </View>
                <View style={styles.datesCont}>
                  {this.renderDates('deliveryDate', KEYS[1], DeliveryDays)}
                </View>
                <View style={styles.head}>
                  <TextBox type="body2" style={{color: colors.tint}}>
                    {LngCode.DELIVERY_TIME_LABEL}
                  </TextBox>
                </View>
                <View style={[styles.datesCont, {paddingBottom: 10}]}>
                  {this.renderTimeSlots('deliveryTime', timeSlot)}
                </View>
              </Card>
            </View>
          </ScrollView>
        </View>
        <BottomSimpleBtn
          title={LngCode.CONTINIE_PAYMENT}
          onPress={() =>
            !loading
              ? this.props.navigation.navigate('Payment', {
                  ScheDule: this.state,
                })
              : null
          }
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
    marginBottom: 5,
    padding: 0,
  },

  dateCell: {
    backgroundColor: colors.bgGrey,
    borderRadius: scales(10),
    justifyContent: 'center',
    alignItems: 'center',
    height: scales(70),
    width: scales(70),
    margin: 5,
  },

  head: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: spacing(10),
    paddingHorizontal: spacing(15),
  },

  selectedBorder: {
    borderColor: colors.tint,
    borderWidth: 2,
  },

  datesCont: {
    flexDirection: 'row',
    borderBottomColor: colors.borderGrey,
    borderBottomWidth: 1,
    paddingBottom: spacing(8),
  },

  dateTxt: {
    color: colors.grey,
    fontSize: fontSize(20),
  },

  dayTxt: {
    color: colors.grey,
    fontSize: fontSize(16),
    marginTop: -3,
  },

  timeCell: {
    backgroundColor: colors.bgGrey,
    paddingHorizontal: spacing(10),
    paddingVertical: spacing(10),
    margin: spacing(5),
    borderRadius: spacing(10),
    borderWidth: 2,
    borderColor: colors.white,
  },
});
const mapStateToProps = ({ScheduleData, LngCode}) => {
  console.log('ScheduleDateTime', ScheduleData);
  const {timeSlot, loading, fail} = ScheduleData;
  return {
    timeSlot,
    loading,
    fail,
    LngCode,
  };
};
export default connect(mapStateToProps, {getTimeSlot})(ScheduleDateTime);
