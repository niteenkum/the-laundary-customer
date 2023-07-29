import React, {Component} from 'react';
import {
  View,
  BackHandler,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Card from '../../components/card';
import TextBox from '../../components/TextBox';
import {colors, spacing} from '../../res/appStyles';
// import {colors,} from '../../res/appStyles';
import TouchableRipple from '../../components/TouchableRipple';
import Background from '../../components/background';
// import {outstyle} from '../styles';
import {connect} from 'react-redux';
import {MenuIcon} from '../../components/icons/menuIcon';
import Washfold from './washFold';
import WashIron from './washIron';
import PremiumLaundary from './premiumLaundary';
import Dryclean from './dryClean';

const tabHeadings = [
  {
    id: 1,
    title: 'First Tab',
  },
  {
    id: 2,
    title: 'Second Tab',
  },
  {
    id: 3,
    title: 'Third Tab',
  },
  {
    id: 3,
    title: 'forhTab',
  },
];

class Features extends Component {
  static navigationOptions = ({navigation, navigationOptions}) => {
    const {params = {}} = navigation.state;
    const {ServiceId, onSearch = null, Sname} = params;
    const headerTitle = 'Features';
    return {
      headerTitle,

      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <MenuIcon />
        </TouchableOpacity>
      ),
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      menuVisible: false,
      activeTab: 'WASH & FOLD',
      index: 0,
    };
    this.setHeaderTitle();
  }
  setHeaderTitle = () => {
    const {LngCode} = this.props;
    this.props.navigation.setParams({headerTitle: 'Features'});
  };

  //   componentWillMount() {
  //     BackHandler.addEventListener(
  //       'hardwareBackPress',
  //       this.handleBackButtonClick,
  //     );
  //   }

  //   componentWillUnmount() {
  //     BackHandler.removeEventListener(
  //       'hardwareBackPress',
  //       this.handleBackButtonClick,
  //     );
  //   }

  //   handleBackButtonClick = () => {
  //     if (this.props.navigation.getParam('from')) {
  //       this.props.navigation.navigate('Home');
  //       return true;
  //     } else {
  //       this.props.navigation.goBack();
  //     }
  //   };
  conditinaltab = () => {
    const {activeTab} = this.state;
    if (activeTab == 'WASH & FOLD') {
      return <Washfold navigation={this.props.navigation} />;
    } else if (activeTab == 'WASH & IRON') {
      return <WashIron navigation={this.props.navigation} />;
    } else if (activeTab == 'PREMIUM LAUNDRY') {
      return <PremiumLaundary navigation={this.props.navigation} />;
    } else if (activeTab == 'DRY CLEAN') {
      return <Dryclean navigation={this.props.navigation} />;
    } else {
      return <Washfold navigation={this.props.navigation} />;
    }
  };

  toggleMenu = menuVisible => {
    this.setState({menuVisible});
  };

  render() {
    const {activeTab} = this.state;
    const {LngCode} = this.props;
    return (
      <Background>
        <View style={outstyle.body1}>
        
          <Card type="list" style={outstyle.card1}>
              <ScrollView horizontal>
            <TouchableRipple
              onPress={() => this.setState({activeTab: 'WASH & FOLD'})}
              style={[
                outstyle.tab,
                activeTab == 'WASH & FOLD' ? outstyle.activeTab : {},
              ]}>
              <TextBox
                 type="caption1"
                style={[activeTab == 'WASH & FOLD' ? outstyle.activeTxt : {}]}>
                WASH & FOLD
              </TextBox>
            </TouchableRipple>
            <TouchableRipple
              onPress={() => this.setState({activeTab: 'WASH & IRON'})}
              style={[
                outstyle.tab,
                activeTab == 'WASH & IRON' ? outstyle.activeTab0 : {},
              ]}>
              <TextBox
               type="caption1"
                style={[activeTab == 'WASH & IRON' ? outstyle.activeTxt0 : {}]}>
                WASH & IRON
              </TextBox>
            </TouchableRipple>
            <TouchableRipple
              onPress={() => this.setState({activeTab: 'PREMIUM LAUNDRY'})}
              style={[
                outstyle.tab,
                activeTab == 'PREMIUM LAUNDRY' ? outstyle.activeTab1 : {},
              ]}>
              <TextBox
               type="caption1"
                style={[
                  activeTab == 'PREMIUM LAUNDRY' ? outstyle.activeTxt1 : {},
                ]}>
                PREMIUM LAUNDRY
              </TextBox>
            </TouchableRipple>
             <TouchableRipple
              onPress={() => this.setState({activeTab: 'DRY CLEAN'})}
              style={[
                outstyle.tab,
                activeTab == 'DRY CLEAN' ? outstyle.activeTab2 : {},
              ]}>
              <TextBox
                type="caption1"
                style={[
                  activeTab == 'DRY CLEAN' ? outstyle.activeTxt2 : {},
                ]}>
               DRY CLEAN
              </TextBox>
              </TouchableRipple>
              </ScrollView>
          </Card>
          {/* {activeTab == 'WASH & FOLD' ? (
            <Washfold navigation={this.props.navigation} />
          ) : (
            <WashIron navigation={this.props.navigation} />
          )} */}
          {this.conditinaltab()}
        </View>

      </Background>
    );
  }
}

const outstyle = StyleSheet.create({
  body1: {
    backgroundColor: colors.tint,
    flex: 1,
  
  },
  card2: {
    borderRadius: 0,
    marginBottom: spacing(5),
    elevation: 1,
    padding: 0,
  },
  card: {
    borderRadius: 0,
    marginBottom: spacing(5),
    elevation: 1,
    padding: 0,
  },
  phonePicker: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: colors.lightGrey,
    borderBottomWidth: 1,
  },

  methodRow: {
    padding: spacing(1),
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
  body2: {
    backgroundColor: colors.white,
    flex: 1,
  },
  orderCard: {
    borderRadius: 0,
    marginTop: spacing(5),
  },
  orderTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginBottom: spacing(5),
    paddingBottom: 0,
  },
  card1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: -1,
    // elevation: 1,
  },
  tab: {
    padding: spacing(8),
    // width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: colors.white,
    borderBottomWidth: 2,
  },
  activeTab: {
    borderBottomColor: colors.tint,
    borderBottomWidth: 2,
  },
   activeTab0: {
    borderBottomColor: colors.lightGreen1,
    borderBottomWidth: 2,
  },
    activeTab1: {
    borderBottomColor: colors.lightorange,
    borderBottomWidth: 2,
  },
     activeTab2: {
    borderBottomColor: colors.skyblue,
    borderBottomWidth: 2,
  },
  activeTxt: {
    color: colors.tint,
  },
    activeTxt0: {
      color: colors.lightGreen1
  },
      activeTxt1: {
    color: colors.lightorange,
  },
        activeTxt2: {
    color: colors.skyblue,
  },
          activeTxt3: {
    color: colors.tint,
  },
  itemImage: {
    width: spacing(40),
    height: spacing(40),
  },
  head: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: spacing(10),
    paddingHorizontal: spacing(15),
  },
});

const reduxStae = ({LngCode}) => {
  return {
    LngCode,
  };
};
export default connect(reduxStae, {})(Features);
