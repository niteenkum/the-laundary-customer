import React, {Component} from 'react';
import {View, StyleSheet, Image, Dimensions} from 'react-native';
import Background from '../../components/background';
import Logo from '../../components/logo';
import RoundBtn from '../../components/roundBtn';
import {colors} from '../../res/appStyles';
import TextBox from '../../components/TextBox';
import {spacing, scales} from '../../res/appStyles';
import {connect} from 'react-redux';
import {changeCode} from '../../redux/actions/auth.action';
const WinHeigth = Dimensions.get('window').width / 1.5;

class WelCome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      fcmToken: '',
    };
  }

  render() {
    const {LngCode} = this.props;

    return (
      <Background
        statsbarColor={colors.white}
        headerStyle={{backgroundColor: colors.white}}
        statsbar="dark-content">
        <View style={{flex: 1}}>
          <View
            style={{
              flex: 0.5,
              top: '14%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              resizeMode="contain"
              style={{
                height: WinHeigth,
                width: WinHeigth + spacing(15),
                // backgroundColor: 'red',
              }}
              source={require('../../../assets/images/logo1.png')}
            />
          </View>

          <View style={{flex: 0.4, justifyContent: 'flex-end'}}>
            <View style={styles.login}>
              {/* <TextBox
                onPress={() => this.props.changeCode(LngCode.LNG)}
                style={{marginBottom: spacing(19)}}>
                {LngCode.LNG}
              </TextBox> */}
              <RoundBtn
                onPress={() => this.props.navigation.navigate('Otp')}
                title={LngCode.MOBILE_LOGIN_TXT}
                style={styles.btn}
              />

              {/* <RoundBtn
                onPress={() => this.props.navigation.navigate('Login')}
                style={styles.btn}
                title={LngCode.EMAIL_LOGIN_TXT}
              /> */}
              <RoundBtn
                onPress={() => this.props.navigation.navigate('Home')}
                style={styles.btnsp}
                title={LngCode.LABEL_SKIP}
                textStyle={{fontSize: scales(12)}}
              />
              {/* <TextBox style={{paddingBottom: 20}} type="caption3">
                {LngCode.NO_ACCOUNT_TXT}
                <TextBox
                  type="body3"
                  onPress={() => this.props.navigation.navigate('Register')}>
                  &nbsp; {LngCode.REGIDTER_TXT}
                </TextBox>
              </TextBox> */}
              <View style={styles.nextBtn} />
            </View>
          </View>
        </View>
      </Background>
    );
  }
}

const mapStateToProps = ({LngCode}) => {
  return {
    LngCode,
  };
};
export default connect(mapStateToProps, {changeCode})(WelCome);

const styles = StyleSheet.create({
  background: {},

  container: {
    flex: 1,
    // justifyContent: "space-between",
    // alignItems: "center",
    paddingTop: 40,
    // paddingBottom: 20
  },
  btn: {
    width: '100%',
    height: scales(45),
    marginBottom: spacing(25),
  },
  btnsp: {width: '40%', height: scales(30), marginBottom: spacing(25)},
  login: {
    width: '100%',
    paddingHorizontal: 15,
    alignItems: 'center',
  },

  card: {
    paddingVertical: 25,
    alignItems: 'center',
  },

  inputBox: {
    marginBottom: 20,
  },

  nextBtn: {
    position: 'absolute',
    elevation: 5,
  },

  registerTxt: {
    fontWeight: 'bold',
  },
});
