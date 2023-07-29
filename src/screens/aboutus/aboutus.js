import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import {MenuIcon} from '../../components/icons/menuIcon';

import TextBox from '../../components/TextBox';
import {colors} from '../../res/appStyles';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import Card from '../../components/card';
import About from './about';
import Reviews from './reviews';
import {DrawerActions} from 'react-navigation-drawer';
export default class AboutUs extends Component {
  static navigationOptions = ({navigation, navigationOptions}) => {
    const {params = {}} = navigation.state;
    const onPress = params.onPressMenu ? params.onPressMenu : () => {};
    return {
      headerLeft: props => (
        <TouchableOpacity
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
          <MenuIcon />
        </TouchableOpacity>
      ),
      headerBackTitle: null,
      headerTitle: 'About us',
      headerRight: <View />,
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      menuVisible: false,
      activeTab: 'ongoing',
      index: 1,
      routes: [
        {key: 'about', title: 'About'},
        {key: 'reviews', title: 'Reviews'},
      ],
    };
  }

  toggleMenu = menuVisible => {
    this.setState({menuVisible});
  };

  componentDidMount() {
    this.props.navigation.setParams({onPressMenu: () => this.toggleMenu(true)});
  }

  render() {
    const {activeTab} = this.state;
    return (
      <SafeAreaView style={{flex: 1}}>
        {/* <Menu
                visible={this.state.menuVisible}
                onRequestClose={() => this.toggleMenu(false)}
                navigation={this.props.navigation}
                screen="about_us"
            /> */}
        <ScrollView>
          <View style={styles.container}>
            <View>
              <Image
                source={require('../../../assets/images/hanger_cloths.jpg')}
                style={{height: 100, width: '100%'}}
              />
              <View style={styles.top}>
                <TextBox type="body1">Wash It Laundry Service</TextBox>
                <TextBox type="caption2" style={{fontSize: 13, marginTop: 5}}>
                  Bolsover Street Entrance, London, W1W 5DW -
                  <TextBox style={{color: colors.tint}}> 3km away</TextBox>
                </TextBox>
              </View>
            </View>
            <TabView
              navigationState={this.state}
              renderScene={SceneMap({
                about: About,
                reviews: Reviews,
              })}
              onIndexChange={index => this.setState({index})}
              initialLayout={{width: Dimensions.get('window').width}}
              renderTabBar={props => (
                <TabBar
                  {...props}
                  indicatorStyle={{backgroundColor: colors.tint}}
                  activeColor={colors.tint}
                  inactiveColor={colors.darkGrey}
                  style={{backgroundColor: colors.white}}
                  renderLabel={({route, focused, color}) => (
                    <TextBox type="caption2" style={{color}}>
                      {route.title}
                    </TextBox>
                  )}
                />
              )}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },

  notificationRow: {
    borderBottomColor: colors.borderGrey,
    borderBottomWidth: 1,
    padding: 15,
    paddingRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },

  nitificationImg: {
    height: 35,
    width: 35,
    resizeMode: 'contain',
  },

  top: {
    paddingHorizontal: 15,
    paddingTop: 10,
    borderBottomColor: colors.borderGrey,
    borderBottomWidth: 1,
    paddingBottom: 20,
  },

  scene: {
    flex: 1,
  },
});
