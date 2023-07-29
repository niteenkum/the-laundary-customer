import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  FlatList,
  Image,
} from 'react-native';
import {MenuIcon} from '../../components/icons/menuIcon';
import {colors, spacing} from '../../res/appStyles';
import Logo from '../../components/logo';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import {STORAGES} from '../../res/ConstVariable';

class Setting extends Component {
  static navigationOptions = ({navigation}) => {
    let headerTitle = ' ';
    const {params = {}} = navigation.state;
    if (params.headerTitle) headerTitle = params.headerTitle;
    return {
      headerTitle,
      headerLeft: props => (
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <MenuIcon />
        </TouchableOpacity>
      ),
      headerBackTitle: null,
      headerRight: <View />,
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      menuVisible: false,

      userToken: false,
      userData: null,
    };
    this.setHeaderTitle();
  }
  setHeaderTitle = () => {
    const {LngCode} = this.props;
    this.props.navigation.setParams({headerTitle: LngCode.SETTING_MENU});
  };

  onPressMenu = (item = {}) => {
    if (item.page) {
      if (item.page == 'ChangePassword')
        this.props.navigation.navigate(item.page, {headerTitle: item.name});
      else this.props.navigation.navigate(item.page, {headerName: item});
    }
  };

  renderMenuItem = ({item}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        style={{marginVertical: 5}}
        onPress={() => this.onPressMenu(item)}>
        <View
          style={{
            backgroundColor: colors.background2,
            padding: 10,
            borderRadius: 5,
            flexDirection: 'row',
          }}>
          <Text
            style={{
              color: colors.tint,
              flex: 1,
              fontSize: 16,
              textAlign: 'left',
            }}>
            {item.name}
          </Text>
          <Text
            style={{
              color: colors.tint,
              flex: 1,
              fontSize: 16,
              textAlign: 'right',
            }}>
            {`>`}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  getUserToken = async () => {
    const userToken = await AsyncStorage.getItem(STORAGES.USER);
    const User = JSON.parse(userToken);
    // console.log('getUserTokennnnnnnnnnnnnnnnnnnnnn', getUserToken);
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
    const {LngCode} = this.props;
    const menu = [
      {id: 1, name: LngCode.PRIVACY_LABEL, page: 'WebPage'},
      {id: 2, name: LngCode.TERM_SERVICE_LABEL, page: 'WebPage'},
      {id: 3, name: LngCode.LICENCE_LABEL, page: 'WebPage'},
    ];
    // this.state.userToken
    //   ? menu.push({
    //       id: 0,
    //       name: LngCode.CHANGE_PASS_LABEL,
    //       page: 'ChangePassword',
    //     })
    //   : null;
    return (
      <SafeAreaView style={{padding: spacing(10)}}>
        {/* <ScrollView style={{padding: spacing(10)}}> */}
          <Logo />
          <FlatList
            style={{marginVertical: spacing(20)}}
            data={menu}
            renderItem={this.renderMenuItem}
            scrollEnabled={false}
          />
        {/* </ScrollView> */}
        <Text
          style={{
            color: colors.tint,
            alignSelf: 'center',
            marginTop: 50,
            fontSize: 16,
          }}>
          Version 1.0
        </Text>
      </SafeAreaView>
    );
  }
}
const reduxStae = ({LngCode}) => {
  return {
    LngCode,
  };
};
export default connect(reduxStae, {})(Setting);
