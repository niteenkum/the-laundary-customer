import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Keyboard,
  ScrollView,
  Platform,
} from 'react-native';
import {setAsyncStorage} from '../../utils/asyncStorage';
import apiService from '../../redux/services';
import Background from '../../components/background/Authbackground';
import * as Yup from 'yup';
import Logo from '../../components/logo';
import Card from '../../components/card';
import TextBox from '../../components/TextBox';
import {InputBox} from '../../components/inputBox';
import {colors, dimensions, deviceDimensions} from '../../res/appStyles';
import {STORAGES} from '../../res/ConstVariable';
import NextBtn from '../../components/roundBtn/nextBtn';
import {onChangePassword} from '../../redux/actions/auth.action';
import {connect} from 'react-redux';
import RoundBtn from '../../components/roundBtn';

const schema = Yup.object().shape({
  newpass: Yup.string().test(
    'len',
    'password must contain exactly 6 characters',
    val => val.length >= 6,
  ),
  old: Yup.string().required('password required'),
});

class ChangePassword extends Component {
  static navigationOptions = ({navigation}) => {
    let headerTitle = ' ';
    const {params = {}} = navigation.state;
    if (params.headerTitle) headerTitle = params.headerTitle;
    return {headerTitle};
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      old: '',
      newpass: '',
      errorTo: '',
      errorMge: '',
    };
  }
  componentWillReceiveProps(nextProps) {
    //let { loading, social_type, social_data } = this.state;
    const {success, fail} = nextProps;
    console.log('nextProps', nextProps);
    if (success != this.props.success && success.data) {
      global.Toaster('Password change successful');
      nextProps.navigation.goBack();
    }

    if (fail != this.props.fail) {
      this.setState({errorTo: 'old', old: '', loading: false}, () =>
        global.Toaster('Wrong old password'),
      );
    }
  }

  setUserData = success => {
    const data = success ? success.data : {};
    console.log('data', data);

    setAsyncStorage(STORAGES.USER, JSON.stringify(data))
      .then(res => {
        this.props.navigation.navigate('App');
      })
      .catch(e => {
        console.log('localst', e);
        this.setState({loading: false});
      });
  };

  onEmailInput = old => {
    this.setState({
      old,
    });
  };

  onPasswordInput = newpass => {
    this.setState({
      newpass,
    });
  };

  onPressLogin = () => {
    Keyboard.dismiss();
    this.setState({loading: true, errorTo: ''});
    const {old, newpass} = this.state;

    schema
      .validate({old, newpass})
      .then(res => {
        var payload = {
          old,
          new: newpass,
        };
        this.props.onChangePassword(payload);
      })
      .catch(res => {
        this.setState({
          loading: false,
          errorTo: res.path,
          errorMge: res.message,
        });
        console.log('Login Error', res);
      });
  };

  render() {
    const {old, newpass, errorTo, errorMge, loading} = this.state;
    const {LngCode} = this.props;
    return (
      <Background style={{paddingHorizontal: 20}}>
        <ScrollView>
          <Logo />
          <InputBox
            error={errorTo === 'old'}
            errorMge={errorMge}
            placeholder={LngCode.LABEL_OLD_PASS}
            onChange={text => this.onEmailInput(text)}
            value={old}
            isPassword={true}
            inputStyle={styles.inputBox}
          />

          <InputBox
            error={errorTo === 'newpass'}
            placeholder={LngCode.LABEL_NEW_PASS}
            errorMge={errorMge}
            onChange={text => this.onPasswordInput(text)}
            isPassword={true}
            value={newpass}
          />
          <RoundBtn
            loading={loading}
            onPress={this.onPressLogin}
            style={{width: '80%', alignSelf: 'center', marginTop: 40}}
            title={LngCode.LABEL_SAVE}
          />
        </ScrollView>
      </Background>
    );
  }
}

const mapStateToProps = ({UserData, LngCode}) => {
  console.log('mapStateToProps', UserData);
  const {socialLoginLoading, loading, success, fail, FcmToken} = UserData;
  return {
    loading,
    success,
    fail,
    socialLoginLoading,
    FcmToken,
    LngCode,
  };
};

export default connect(mapStateToProps, {
  onChangePassword,
})(ChangePassword);

const styles = StyleSheet.create({
  background: {},

  container: {
    flex: 1,

    justifyContent: 'center',
  },

  login: {
    width: '100%',
    paddingHorizontal: 15,
    marginTop: 20,
  },

  card: {
    paddingVertical: 25,
    paddingBottom: 50,
  },

  inputBox: {
    marginBottom: 20,
  },
});
