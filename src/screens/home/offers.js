import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Image,
  ImageBackground,
} from 'react-native';
import {MenuIcon} from '../../components/icons/menuIcon';
 
import Card from '../../components/card';
import {colors, scales, spacing} from '../../res/appStyles';
import {connect} from 'react-redux';
import {OFFER_BACK_IMAGE} from '../../res/svgs/images.json';
import TextBox from '../../components/TextBox';

 
class Offers extends Component {
  static navigationOptions = ({navigation, navigationOptions}) => {
    return {
      headerBackTitle: null,
      headerTitle: 'Promozioni',
      headerRight: <View />,
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      menuVisible: false,
      activeTab: 'ongoing',
    };
  }

  toggleMenu = menuVisible => {
    this.setState({menuVisible});
  };

  componentDidMount() {
    this.props.navigation.setParams({
      onPressMenu: () => this.toggleMenu(true),
    });
  }

  render() {
    const {Promocodes = []} = this.props;
    return (
      <SafeAreaView style={{backgroundColor:colors.background}}>
        <ScrollView>
          <View style={styles.offer}>
            {Promocodes.map((item, index) => (
              <TouchableOpacity
                onPress={() => console.log('')}
                key={index + 1}
                activeOpacity={0.7}>
                <ImageBackground
                  source={{uri: item.image ? item.image : OFFER_BACK_IMAGE}}
                  style={[styles.offerCard, {padding: 0}]}>
                  <View style={styles.card}>
                    <TextBox type="body1" color="white">
                      {item.promocode}
                    </TextBox>
                  </View>
                  <View style={styles.card2}>
                    <TextBox type="body2" color="white">
                      {item.description}
                    </TextBox>
                    <TextBox type="caption" color="white">
                     {`${item.promocode} applicabile per ordini di minimo ${item.min_cart_amount}€`}
                    </TextBox>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  offer: {
    padding: 10,
  },
  offerCard: {
    marginTop: 10,
    width: '100%',
    height: scales(200),
    flexDirection: 'row',
  },
  card: {
    backgroundColor: colors.primary2,
    position: 'absolute',
    right: 0,
    paddingHorizontal:spacing(10),
    top: scales(10),
    borderTopLeftRadius:5,
    borderBottomLeftRadius:5,
    padding:5
  },
  card2:{
    width:'100%',
    height:scales(40),
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:colors.transBlack,
    position: 'absolute',
    bottom:0
  }
});
const mapStateToProps = ({ScheduleData}) => {
  const {Promocodes} = ScheduleData;

  return {
    Promocodes,
  };
};
export default connect(
  mapStateToProps,
  {},
)(Offers);
