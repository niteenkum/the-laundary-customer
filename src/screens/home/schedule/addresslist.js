import React from 'react';
import {FlatList, View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import Background from '../../../components/background';
import {AddressCard} from '../components/AddressCard';
import RoundBtn from '../../../components/roundBtn';
import {scales, colors, spacing} from '../../../res/appStyles';
import BottomSimpleBtn from '../../../components/bottomButton/BottomSimpleBtn';
import {
  getAddressList,
  selectedAddress,
} from '../../../redux/actions/auth.action';
import {connect} from 'react-redux';
import PickupSteps from '../../../components/stepIndicator/pickupSteps';
import {SwipeListView} from 'react-native-swipe-list-view';

class AddressList extends React.Component {
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
      selectAddressIndex: -1,
    };
    props.getAddressList();
    this.setHeaderTitle();
  }
  // componentWillReceiveProps(nextProps) {
  //   const {loading, deleteSuccess} = nextProps;
  //   if (deleteSuccess.status && !loading) {
  //     global.Toaster(deleteSuccess.msg);
  //     this.props.resetAddress();
  //   }
  // }
  closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  deleteRow = (rowMap, rowKey) => {
    this.closeRow(rowMap, rowKey);
    // const newData = [...listData];
    // const prevIndex = listData.findIndex((item) => item.key === rowKey);
    newData.splice(prevIndex, 1);
    setListData(newData);
  };
  renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate('ScheduleLocation', {id: data.item.id})
        }
        style={[styles.backRightBtn, styles.backRightBtnRight]}>
        <Text style={styles.backTextWhite}>Edit</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity
        onPress={() => this.props.deleteLocation({id: data.item.id})}
        style={[styles.backRightBtn, styles.backRightBtnRight]}>
        <Text style={styles.backTextWhite}>Delete</Text>
      </TouchableOpacity> */}
    </View>
  );

  onRowDidOpen = rowKey => {
    console.log('This row opened', rowKey);
  };

  renderItem = ({item, index}) => (
    <AddressCard
      item={item}
      onChnageIndex={() => this.setState({selectAddressIndex: index})}
      index={index}
      selectAddressIndex={this.state.selectAddressIndex}
    />
  );
  setHeaderTitle = () => {
    const {LngCode} = this.props;
    this.props.navigation.setParams({
      headerTitle: LngCode.LABEL_SCHEDULE_PICKUP,
    });
  };
  onSelectAddress = () => {
    const {selectAddressIndex} = this.state;
    const {AddressList = [], LngCode} = this.props;
    if (selectAddressIndex >= 0) {
      this.props.selectedAddress(AddressList[selectAddressIndex]);
      this.props.navigation.navigate('ScheduleDateTime');
    } else if (AddressList.length <= 0) global.Toaster(LngCode.MSG_NEW_ADDRESS);
    else global.Toaster(LngCode.MSG_SELECT_ADDRESS);
  };

  render() {
    const {AddressList, LngCode} = this.props;
    return (
      <Background footerStyle={{backgroundColor: colors.tint}}>
        <PickupSteps curPosition={0} style={{borderBottomWidth: 0.4}} />
        <SwipeListView
          data={AddressList}
          renderHiddenItem={this.renderHiddenItem}
          renderItem={this.renderItem}
          closeOnScroll
          keyExtractor={(item, index) => item}
          rightOpenValue={-150}
          previewRowKey={AddressList[0]}
          previewOpenValue={-100}
          previewOpenDelay={3000}
          onRowDidOpen={this.onRowDidOpen}
          ListFooterComponent={
            <RoundBtn
              onPress={() => this.props.navigation.navigate('ScheduleLocation')}
              style={{
                width: scales(350),
                height: scales(35),
                alignSelf: 'center',
                marginTop: scales(20),
              }}
              title={LngCode.ADD_ADDRESS_LABEL}
              loading={this.props.loading}
            />
          }
        />
        <View style={{height: spacing(80)}} />
        <BottomSimpleBtn
          title={LngCode.DATE_TIME_LABEL}
          onPress={() => this.onSelectAddress()}
        />
      </Background>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  backTextWhite: {
    color: colors.tint,
  },
  rowFront: {
    alignItems: 'center',
    backgroundColor: '#CCC',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    justifyContent: 'center',
    height: 50,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  backRightBtnLeft: {
    // backgroundColor: colors.white,
    right: 75,
  },
  backRightBtnRight: {
    // backgroundColor: colors.white,
    right: 0,
  },
});

const mapStateToProps = ({UserData, LngCode}) => {
  const {AddressList, loading, fail} = UserData;
  console.log('AddressList', UserData);
  return {
    AddressList,
    loading,
    fail,
    LngCode,
  };
};
export default connect(mapStateToProps, {
  getAddressList,
  selectedAddress,
})(AddressList);
