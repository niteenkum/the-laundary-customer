import React, {Component} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  Text,
  FlatList,
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
} from '../../../res/appStyles';
import {getservice, getCard} from '../../../redux/actions/product.action';
import {MenuIcon} from '../../../components/icons/menuIcon';
import {connect} from 'react-redux';
import {NavigationEvents} from 'react-navigation';
import BottomButton from '../../../../src/components/bottomButton';
import Background from '../../../../src/components/background';
import _ from 'lodash';
import {CartCounter} from '../components/Cartcounter';

const {width, height} = deviceDimensions;
const logo = require('../../../assets/images/logo.png');

import Card from '../../../../src/components/card';
import {color} from 'react-native-reanimated';
import BottomSimpleBtn from '../../../../src/components/bottomButton';
const data = [
  {name: `< 20`, id: '1'},
  {name: `20 - 40`, id: '2'},
  {name: `> 40 `, id: '3'},
];

// global.selectedItems = {name: ServiceId, quantity: selectId};

const ListItem = ({item, selected, style, styleView, onPress, onLongPress}) => (
  // <View
  //   onLongPress={onLongPress}
  //   onPress={onPress}
  //   item={item}
  //   style={styleView}>
  <Text style={style}>{item.name}</Text>
  // </View>
);

class ServiceDetails extends Component {
  static navigationOptions = ({navigation, navigationOptions}) => {
    const {params = {}} = navigation.state;
    const {ServiceId} = params;
    const headerTitle = ServiceId ? ServiceId : 'Service';

    return {
      headerTitle: 'Service Details',
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      selectId: [],
      loading: false,
    };

    // const ServiceId = this.props.navigation.getParam('ServiceId');
  }

  // onChnageCate = (item, index = 0) => {
  //   this.setState({cateindex: index, cateId: item.id}, () =>
  //     this.onGetItems(item.id),
  //   );
  // };
  selectedItem = id => {
    const {selectId} = this.state;
    // if (selectId.includes(id)) {
    //   const newid = selectId.filter(listItem => listItem !== id);
    //   return this.setState({selectId: newid});
    // }
    const newid = [id];
    selectId.push(newid);

    this.setState({selectId: newid});
  };

  globalItems = () => {};
  render() {
    const {cateindex} = this.state;
    const {Sevices = [], ItemList = [], LngCode} = this.props;
    console.log(
      ' ItemList.logggggggggggggggggggggggggggggggggggg',
      this.state.selectId,
    );
    const ServiceId = this.props.navigation.getParam('ServiceId');

    console.log(ServiceId, '....................................list');

    return (
      <Background bodyStyle={{backgroundColor: '#f5f5f5f5'}}>
        <Text
          style={{
            padding: 10,
            fontSize: 17,
            fontWeight: '600',
            color: colors.tint,
          }}>
          Selected Services
        </Text>
        <Card
          type="list"
          style={[
            {
              margin: scales(6),
              paddingVertical: 10,
              alignSelf: 'center',
              width: width - 20,
              height: 200,
            },
          ]}>
          <View
            style={{
              padding: spacing(5),
              justifyContent: 'center',
            }}>
            <FlatList
              data={ServiceId}
              renderItem={({item, index}) => (
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: 'normal',
                    color: colors.lightBlack,
                    padding: spacing(5),
                  }}>
                  {item.name}
                </Text>
              )}
            />
            {/* <Text
              style={{
                fontSize: 15,
                fontWeight: 'normal',
                color: colors.lightBlack,
                padding: spacing(5),
              }}>
              Dry Clean
            </Text> */}
          </View>
        </Card>
        <Text
          style={{
            padding: 10,
            fontSize: 16,
            fontWeight: '600',
            color: colors.tint,
          }}>
          Estimated Clothes
        </Text>

        <FlatList
          data={data}
          contentContainerStyle={{
            alignItems: 'center',
            justifyContent: 'space-evenly',
            height: 60,
            width: width,
            // marginHorizontal: spacing(30),
          }}
          horizontal
          renderItem={({item, index}) => (
            <Card
              style={{
                backgroundColor:
                  this.state.selectId[0] == index
                    ? colors.primary
                    : colors.white,
                margin: 3,
              }}>
              <TouchableOpacity
                style={{
                  // margin: scales(4),
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: scales(80),
                  height: '95%',
                  alignSelf: 'center',
                }}
                onPress={() => {
                  this.selectedItem(index),
                    (global.selectedItems = {
                      name: ServiceId,
                      quantity: item.name,
                    });
                }}>
                <ListItem
                  item={item}
                  style={{
                    fontSize: 19,
                    fontWeight: 'normal',
                    color:
                      this.state.selectId[0] == index
                        ? colors.white
                        : colors.lightBlack,
                  }}
                />
              </TouchableOpacity>
            </Card>
          )}
          keyExtractor={item => item.id}
        />
        {/* <View
          style={{
            borderBottomWidth: 0.5,
            alignSelf: 'center',
            // width: width,
          }}></View> */}

        <BottomButton
          disabled={this.state.selectId.length < 1}
          style={{
            backgroundColor:
              this.state.selectId.length < 1 ? colors.borderGrey : colors.tint,
            marginHorizontal: spacing(25),
            alignSelf: 'center',
          }}
          onPress={() => this.props.navigation.navigate('AddressList')}>
          <Text
            style={{
              fontSize: fontSize(20),
              fontFamily: fonts.semibold,
              color: colors.white,
              top: 5,
              alignSelf: 'center',
            }}>
            CONTINUE
          </Text>
        </BottomButton>
      </Background>
    );
  }
}

const styles = StyleSheet.create({
  width: {width: width},
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255,0,0,0.5)',
  },
  Texstyle: select => {
    if (select) {
      return {
        fontSize: 19,
        fontWeight: 'normal',
        color: colors.white,
      };
    } else {
      return {fontSize: 19, fontWeight: 'normal', color: colors.lightBlack};
    }
  },
  onSelect: select => {
    return {
      backgroundColor: select ? colors.primary : null,
    };
  },
  onSelectIm: select => {
    if (select) {
      return {
        flexDirection: 'row',
        margin: scales(4),
        justifyContent: 'center',
        alignItems: 'center',
        width: scales(120),
        height: '90%',
        alignSelf: 'center',
        backgroundColor: colors.primary,
      };
    } else {
      return {
        flexDirection: 'row',
        margin: scales(4),
        justifyContent: 'center',
        alignItems: 'center',
        width: scales(120),
        height: '90%',
        alignSelf: 'center',
        backgroundColor: colors.white,
      };
    }
  },
});

// const mapStateToProps = LngCode => {
//   //   const {Promocodes, loading} = ScheduleData;
//   const {Sevices} = ProductData;

//   //   const {User} = UserData;
//   return {
//     LngCode,
//   };
// };
export default // connect(mapStateToProps)
ServiceDetails;
