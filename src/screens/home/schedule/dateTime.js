import React, {Component} from 'react';
import {StyleSheet, FlatList} from 'react-native';
import PickupSteps from '../../../components/stepIndicator/pickupSteps';
import Card from '../../../components/card';
import TextBox from '../../../components/TextBox';
import {
  colors,
  dimensions,
  spacing,
  fontSize,
  scales,
  deviceDimensions,
} from '../../../res/appStyles';
import BottomSimpleBtn from '../../../components/bottomButton/BottomSimpleBtn';

import TouchableRipple from '../../../components/TouchableRipple';
import {getTimelist} from '../../../utils/funcations';
import {connect} from 'react-redux';
const {bottomButtonHeight} = dimensions;
const KEYS = ['pickup', 'delivery'];
import {getTimeSlot} from '../../../redux/actions/schedule.action';
import {Loader} from '../../../components/loader';
import {DateTimeCard} from '../components/dateTimeCard';
import AuthBackground from '../../../components/background/Authbackground';
import Background from '../../../components/background';
import moment from 'moment';
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
      pickupIndex: 0,
      pickup: {date: '1', day: ''},
      pickupTime: '',
      deliveryIndex: 3,
      delivery: {date: '2', day: ''},
      deliveryTime: '',
      note: '',
      keyHeigth: 0,
      time: '',
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
    // this.getServicesName();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { timeSlot, dateSlot, distanceDays = 4, loading } = nextProps;
    console.log(distanceDays,"distanceDays????????????????????????????")
    let sentinel = '';
    try {
      selectedItems.name.map((t, index) => {
        if (t.name == 'Dry Clean') {
          sentinel = t.name;
        }
      });
    } catch (e) {
      if (e !== sentinel) throw e;
    }
    if (timeSlot != this.props.timeSlots && !loading) {
      if (timeSlot && timeSlot.length > 0) {
        console.log('dateSlot[0]');
        this.setState(
          {
            pickup: dateSlot[0],
            delivery:
              dateSlot[
                sentinel == 'Dry Clean' ? distanceDays + 2 : distanceDays+1
              ],
            deliveryIndex:
              sentinel == 'Dry Clean' ? distanceDays + 2 : distanceDays+1,
          },
          // () => this.onScollNext(2),
        );
      }
      if (dateSlot && dateSlot.length < 2) {
        // if time slot is passed for current date then remove the slot
        let currentTime = moment();
        timeSlot.some((t, i) => {
          let endTime = moment(
            `${currentTime.format('YYYY-MM-DD')} ${t.end_time}`,
          );
          let diff = moment.duration(endTime.diff(currentTime)).asMinutes();
          if (diff <= 0 && i > timeSlot.length - 1) {
            dateSlot.shift();
            this.setState({
              dateSlot,
              pickup: dateSlot[0],
              delivery: dateSlot[0],
            });
            return true;
          } else {
            this.setState({dateSlot});
          }
        });
      }
    }
  }

  onScollNext = distanceDays => {
    setTimeout(() => this.handlePosition(distanceDays), 1000);
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

  renderTime = (item, key, MainKey) => {
    const {deliveryTime, pickupTime, delivery, pickup} = this.state;
    const {timeSlot = []} = this.props;
    let times = [];
    timeSlot.map((t, index) => {
      times.push(t.slots);
    });
    const showTime = times.indexOf(pickupTime) < times.indexOf(item.slots);
    let currentTime = moment();
    let endTime = moment(
      `${currentTime.format('YYYY-MM-DD')} ${item.end_time}`,
    );

    let diff = moment.duration(endTime.diff(currentTime)).asMinutes();

    const skipSlot = diff > 0;
    const date = new Date(pickup.date).toDateString();
    var hours = new Date().getHours();
    let today = new Date().toDateString();
    const current = new Date().getHours();
    const slots_show = moment(item.start_time, ['h:mm A']).format('HH');

    return (
      // time slots rendering according to current date time and pickup time
      key === 'deliveryTime' ? (
        <TouchableRipple
          rippleContainerBorderRadius={5}
          onPress={() => this.setState({[key]: item.slots})}
          style={[
            styles.timeCell,
            this.state[key] == item.slots ? styles.selectedBorder : {},
          ]}>
          <TextBox style={{color: colors.grey}}>{item.slots}</TextBox>
        </TouchableRipple>
      ) : key == 'pickupTime' && current + 1 < slots_show ? (
        <TouchableRipple
          rippleContainerBorderRadius={5}
          onPress={() => this.setState({[key]: item.slots})}
          style={[
            styles.timeCell,
            this.state[key] == item.slots ? styles.selectedBorder : {},
          ]}>
          <TextBox style={{color: colors.grey}}>{item.slots}</TextBox>
        </TouchableRipple>
      ) : today != date ? (
        <TouchableRipple
          rippleContainerBorderRadius={5}
          onPress={() => this.setState({[key]: item.slots})}
          style={[
            styles.timeCell,
            this.state[key] == item.slots ? styles.selectedBorder : {},
          ]}>
          <TextBox style={{color: colors.grey}}>{item.slots}</TextBox>
        </TouchableRipple>
      ) : null
    );
  };

  renderDateItem = (item, MainKey, index) => {
    const selected = this.state[MainKey] || {};
    const {dateSlot = [], distanceDays = 3} = this.props;
    const {pickupIndex, deliveryIndex} = this.state;
    let sentinel = '';
    try {
      selectedItems.name.map((t, index) => {
        if (t.name == 'Dry Clean') {
          sentinel = t.name;
        }
      });
    } catch (e) {
      if (e !== sentinel) throw e;
    }

    const checked =
      MainKey == KEYS[0] ? pickupIndex == index : deliveryIndex == index;
    // console.log(index, '........................index');
    const {date = '', day = ''} = item;

    const onCkeck = () => {
      let sentinel = '';
      try {
        selectedItems.name.map((t, index) => {
          if (t.name == 'Dry Clean') {
            // console.log(t.name, 'ssfzsdghk');
            sentinel = t.name;
          }
        });
      } catch (e) {
        if (e !== sentinel) throw e;
      }

      if (MainKey === KEYS[0]) {
        this.setState({
          pickup: dateSlot[index],
          deliveryIndex:
            sentinel == 'Dry Clean' ? distanceDays + 2: distanceDays+1,
          delivery:
            sentinel == 'Dry Clean'
              ? dateSlot[index + distanceDays + 2]
              : dateSlot[index + distanceDays+1],
          pickupIndex: index,
           
        });
      } else {
        if (MainKey === KEYS[1]) {
          const dd = distanceDays;

          if (
            index < this.state.pickupIndex + dd + 2 &&
            sentinel == 'Dry Clean'
          ) {
            global.Toaster('Delivery day not  available');
          } else if (index < pickupIndex+dd+1) {
             global.Toaster('Delivery day not available');
          } else 
            this.setState({
              [MainKey]: item,
              deliveryIndex: index ,
            });
        } else if (pickupIndex < deliveryIndex) {
          this.handlePosition(deliveryIndex);
          console.log(
            index,
            pickupIndex,
            deliveryIndex,
            dateSlot.length - 1,
            '...........',
          );
        }
      }
     
    };

    return (
      <TouchableRipple
        rippleContainerBorderRadius={5}
        onPress={() => onCkeck()}
        style={[styles.dateCell, checked ? styles.selectedBorder : {}]}>
        <TextBox type="title" color="darkGrey">
          {date.slice(date.length - 2)}
        </TextBox>
        <TextBox type="caption" color="lightGrey">
          {item.day}
        </TextBox>
      </TouchableRipple>
    );
  };

  onSubmit = () => {
    const {
      deliveryIndex,
      pickupIndex,
      deliveryTime,
      delivery = {},
      pickup = {},
      pickupTime,
      note,
    } = this.state;
    const {dateSlot = []} = this.props;
    if (deliveryIndex >= dateSlot.length)
      global.Toaster('Please select delivery date');
    else if (delivery === pickup && pickupTime === deliveryTime)
      global.Toaster('Delivery time could not be same as pickup time');
    else if (delivery === pickup)
      global.Toaster('Delivery date could not be same as pickup date');
    else if (delivery > pickup)
      global.Toaster('Delivery date could not be same  or less as pickup date');
    else if (!pickupTime)
      global.Toaster('Please select the time slot for collection');
    else if (!deliveryTime)
      global.Toaster('Please select the time slot for delivery');
    else {
      const payload = {
        delivery,
        pickup_time: pickupTime,
        pickup,
        delivery_time: deliveryTime,
        note,
      };
      this.props.navigation.navigate('Payment', {
        ScheDule: payload,
      });
    }
  };

  handlePosition(id) {
    /* Item Size from FlatList */
    const itemSize = deviceDimensions.width / 4 - scales(5);
    /* Id of the current month */
    const idCurrentItem = id;

    this._flatList.scrollToOffset({
      animated: true,
      offset: itemSize * idCurrentItem,
      useNativeDriver: true,
    });
  }

  renderDeliveryDates = (MainKey, days) => {
    return (
      <FlatList
        data={days}
        ref={el => (this._flatList = el)}
        keyExtractor={(item, index) => item.date}
        renderItem={({item, index}) =>
          this.renderDateItem(item, MainKey, index)
        }
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        extraData={this.state}
      />
    );
  };
  renderPickupDates = (MainKey, days) => {
    return (
      <FlatList
        data={days}
        keyExtractor={(item, index) => item.date}
        renderItem={({item, index}) =>
          this.renderDateItem(item, MainKey, index)
        }
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        extraData={this.state}
      />
    );
  };

  onKeybordHeigth = (val = 0) => {
    this.setState({keyHeigth: val});
  };
  filterDeliverySlots = (dateSlot = [], pickup) => {
    let a;
    dateSlot.map((t, i) => (t.date === pickup.date ? (a = i) : null));
    var deliverySlot = [];
    dateSlot.map((d, i) => {
      if (a <= i) {
        deliverySlot.push(d);
      }
    });
    return deliverySlot;
  };
  getCurrentTime = () => {
    let today = new Date();
    let hours = (today.getHours() < 10 ? '0' : '') + today.getHours();
    let minutes = (today.getMinutes() < 10 ? '0' : '') + today.getMinutes();
    let seconds = (today.getSeconds() < 10 ? '0' : '') + today.getSeconds();
    return hours + ':' + minutes + ':' + seconds;
  };

  render() {
    const {timeSlot = [], dateSlot = [], loading, LngCode} = this.props;
    const {pickup, delivery, note} = this.state;
    // let time = this.getCurrentTime();

    console.log(delivery, 'mmmmmmmddddddddddd');
    // console.log(pickup, 'piiiiiikkkkkppppp');
    return (
      <Background footerStyle={{backgroundColor: colors.tint}}>
        {/* <ScrollView>  */}
        <Card
          style={{padding: 0, borderRadius: 0, marginBottom: spacing(8)}}
          type="list">
          <PickupSteps curPosition={1} style={{}} />
        </Card>
        <DateTimeCard
          title={LngCode.PICK_UP_DATE_LABEL}
          loading={loading}
          timeSlotTitle={LngCode.PICKUP_TIME_LABEL}
          renderSelected={pickup.date}
          renderDate={this.renderPickupDates(KEYS[0], dateSlot)}
          onTimeSlot={
            loading ? (
              <Loader />
            ) : (
              this.renderTimeSlots(
                'pickupTime',
                getTimelist(timeSlot, pickup.date),
              )
            )
          }
        />
        <DateTimeCard
          title={LngCode.DELIVERY_DATE_LABEL}
          loading={loading}
          timeSlotTitle={LngCode.DELIVERY_TIME_LABEL}
          renderSelected={delivery.date}
          renderDate={this.renderDeliveryDates(
            KEYS[1],
            this.filterDeliverySlots(dateSlot, pickup),
          )}
          onTimeSlot={
            loading ? (
              <Loader />
            ) : (
              this.renderTimeSlots(
                'deliveryTime',
                getTimelist(timeSlot, delivery.date),
              )
            )
          }
        />
        {/* </ScrollView> */}
        <BottomSimpleBtn
          title={LngCode.CONTINUE_CONFIRM}
          loading={loading}
          btnStyle={{}}
          onPress={this.onSubmit}
        />
      </Background>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    width: scales(80),
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
  const {timeSlot, dateSlot, loading, fail, distanceDays} = ScheduleData;
  return {
    timeSlot,
    dateSlot,
    loading,
    fail,
    distanceDays,
    LngCode,
  };
};
export default connect(mapStateToProps, {getTimeSlot})(ScheduleDateTime);
