import React, {Component} from 'react';
import {View, BackHandler, Dimensions, TouchableOpacity} from 'react-native';
import Card from '../../components/card';
import TextBox from '../../components/TextBox';
import {colors} from '../../res/appStyles';
import TouchableRipple from '../../components/TouchableRipple';
import OngoingOrders from './ongoingOrder';
import PastOrders from './postOrders';
import Background from '../../components/background';
import {outstyle} from '../styles';
import {connect} from 'react-redux';
import {MenuIcon} from '../../components/icons/menuIcon';

class AllOrders extends Component {
  static navigationOptions = ({navigation}) => {
    let headerTitle = ' ';
    const {params = {}} = navigation.state;
    if (params.headerTitle) headerTitle = params.headerTitle;
    return {
      headerLeft: props => (
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <MenuIcon />
        </TouchableOpacity>
      ),
      headerTitle,
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      menuVisible: false,
      activeTab: 'ongoing',
      index: 0,
    };
    this.setHeaderTitle();
  }
  setHeaderTitle = () => {
    const {LngCode} = this.props;
    this.props.navigation.setParams({headerTitle: LngCode.ORDER_MENU});
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
    if (this.props.navigation.getParam('from')) {
      this.props.navigation.navigate('Home');
      return true;
    } else {
      this.props.navigation.goBack();
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
            <TouchableRipple
              onPress={() => this.setState({activeTab: 'ongoing'})}
              style={[
                outstyle.tab,
                activeTab == 'ongoing' ? outstyle.activeTab : {},
              ]}>
              <TextBox
                type="body3"
                style={[activeTab == 'ongoing' ? outstyle.activeTxt : {}]}>
                {LngCode.ONGONING_HEADER}
              </TextBox>
            </TouchableRipple>

            <TouchableRipple
              onPress={() => this.setState({activeTab: 'past'})}
              style={[
                outstyle.tab,
                activeTab == 'past' ? outstyle.activeTab : {},
              ]}>
              <TextBox
                type="body3"
                style={[activeTab == 'past' ? outstyle.activeTxt : {}]}>
                {LngCode.PAST_HEADER}
              </TextBox>
            </TouchableRipple>
          </Card>
          {activeTab == 'ongoing' ? (
            <OngoingOrders navigation={this.props.navigation} />
          ) : (
            <PastOrders navigation={this.props.navigation} />
          )}
        </View>
      </Background>
    );
  }
}
const reduxStae = ({LngCode}) => {
  return {
    LngCode,
  };
};
export default connect(reduxStae, {})(AllOrders);
