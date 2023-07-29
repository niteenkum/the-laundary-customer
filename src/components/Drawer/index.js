import React from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  Linking,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import MenuItem from './menuItem';
import {SvgIcon} from '../../utils/Svgicons';
import {colors, deviceDimensions} from '../../res/appStyles';
import {HomeIcon} from '../icons/homeIcon';
import {NotificationIcon} from '../icons/notificationIcon';
import {AboutUs} from '../icons/aboutusIcon';
import {AllOrdersIcon} from '../icons/allordersIcon';
// import {WhatsappIcon} from '../icons/whatsappIcon';
import {ShareIcon} from '../icons/shareIcon';
import {SettingsIcon} from '../icons/settingsIcon';
import {LogoutIcon} from '../../components/icons/logoutIcon';
import {changeCode} from '../../redux/actions/auth.action';
import Logo from '../logo';
import {connect} from 'react-redux';
import {login} from '../../redux/constants/endpoint-constants';
import AsyncStorage from '@react-native-community/async-storage';
import {STORAGES} from '../../res/ConstVariable';
import {Whatsapp} from 'react-native-vector-icons';

class DrawerMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userToken: false,
    };
    this.getUserToken().then(res => this.setState({userToken: res}));
  }
  getUserToken = async () => {
    const userToken = await AsyncStorage.getItem(STORAGES.USER);
    const User = JSON.parse(userToken);

    if (User && User.token) {
      return true;
    } else {
      return false;
      // this.setState({userToken: false});
    }
  };

  componentDidMount() {
    this.getUserToken().then(res => this.setState({userToken: res}));
  }
  render() {
    const {navigation, activeItemKey, LngCode} = this.props;
    this.onMoveTo = screen => {
      navigation.closeDrawer();
      navigation.navigate(screen);
    };

    return (
      <SafeAreaView style={styles.container}>
        <Logo logoStyle={{width: deviceDimensions.width / 2}} />
        <MenuItem
          text={LngCode.HOME_HEADER}
          icon={<HomeIcon color={colors.orange} />}
          onPress={() => this.onMoveTo('Home')}
          active={activeItemKey === 'HomeStack'}
        />
        {this.state.userToken ? (
          <MenuItem
            text={LngCode.ORDER_MENU}
            icon={<AllOrdersIcon color={colors.orange} />}
            onPress={() => this.onMoveTo('Orderstack')}
            active={activeItemKey === 'Orderstack'}
          />
        ) : null}
        {this.state.userToken ? (
          <MenuItem
            text={LngCode.NOTI_MENU}
            icon={<NotificationIcon color={colors.orange} />}
            onPress={() => this.onMoveTo('NotiStack')}
            active={activeItemKey === 'NotiStack'}
          />
        ) : null}
        <MenuItem
          text={LngCode.PRICE_LIST}
          icon={<AllOrdersIcon color={colors.orange} />}
          onPress={() => this.onMoveTo('PriceListStack')}
          active={activeItemKey === 'PriceListStack'}
        />

        <MenuItem
          text={"Order via Whatsapp"}
          icon={  <Image style={{height: 24, width: 24}} source={require(`../../../assets/images/wp.png`)} />}
          // icon={<></>}
          onPress={
            () => { Linking.openURL('https://wa.me/919999999999?text=I%27m%20interested%20in%20your%20car%20for%20sale');}
          }
        />

        <MenuItem
          text={LngCode.SERVICES}
          icon={
            <Image
              style={{height: 20, width: 20, tintColor: colors.orange}}
              source={require('../../../assets/images/service.png')}
            />
          }
          onPress={() => this.onMoveTo('ServiceslistStack')}
          active={activeItemKey === 'ServiceslistStack'}
        />
        {this.state.userToken ? (
          <MenuItem
            text={LngCode.PROFILE_MENU}
            icon={<SvgIcon type="PerSon" color={colors.orange} />}
            onPress={() => this.onMoveTo('ProfileStack')}
            active={activeItemKey === 'ProfileStack'}
          />
        ) : null}

        <MenuItem
          text={LngCode.SETTING_MENU}
          icon={<SettingsIcon color={colors.orange} />}
          onPress={() => this.onMoveTo('SettingStack')}
          active={activeItemKey === 'SettingStack'}
        />

        {/* <MenuItem
                    text='About us'
                    icon={<View style={{width:35,height:32,}}><SvgIcon  type='Logo'/></View>}
                    onPress={() => {
                        navigation.closeDrawer() 
                        navigation.navigate('AboutUs')}
                    }
                    active={activeItemKey === "AboutUs" ? true : false} />   */}
        <MenuItem
          text={
            this.state.userToken ? LngCode.LOGOUT_MENU : LngCode.LOGIN_LABEL
          }
          icon={<LogoutIcon color={colors.orange} />}
          onPress={() => {
            navigation.closeDrawer();
            this.state.userToken
              ? navigation.navigate('Logout')
              : navigation.navigate('Otp');
          }}
        />

        <View style={{flex: 1, justifyContent: 'flex-end', paddingBottom: 10}}>
          {/* <Text onPress={()=>this.props.changeCode(LngCode.LNG)}>{LngCode.LNG}</Text> */}
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  header: {
    width: '100%',
    height: '25%',
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
const mapStateToProps = ({LngCode}) => {
  return {
    LngCode,
  };
};
export default connect(mapStateToProps, {changeCode})(DrawerMenu);
