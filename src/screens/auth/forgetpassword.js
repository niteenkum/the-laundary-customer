import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Keyboard,
  SafeAreaView,
  Platform,
  ScrollView,
} from 'react-native';
 

import * as Yup from 'yup';
import Logo from '../../components/logo';

import TextBox from '../../components/TextBox';
import {InputBox} from '../../components/inputBox';
import {
    spacing,
} from '../../res/appStyles';
 
import {forgetpass} from '../../redux/actions/auth.action';
import {connect} from 'react-redux';
import {BackButton} from '../../components/BackButton';
import AuthBackground from '../../components/background/Authbackground';
import RoundBtn from '../../components/roundBtn';

const schema = Yup.object().shape({
  email: Yup.string()
    .email("L'email deve essere un'e-mail valida")
    .required('Email obbligatoria'),
});

class ForgetPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      email: '',
      errorTo: '',
      errorMge: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    const self = this;
    const {success, loading, fail,LngCode} = nextProps;
    if (success != this.props.success && !loading) {
      if (success.status)
        self.setState({loading: false,email:'', errorTo: ''}, () =>
          global.Toaster(success.msg),
        );
      else
        self.setState({
          loading: false,
          errorTo: 'email',
          errorMge: success.msg,
        });
    }
   else if (fail != this.props.fail && !loading) {
      this.setState(
        {
          errorTo: '',
          loading: false,
        },
        () => global.Toaster(LngCode.MSG_WRONG),
      );
    }
  }

  onEmailInput = email => {
    this.setState({
      email,
    });
  };

  onPressForgetPass = () => {
    Keyboard.dismiss();
    this.setState({loading: true, errorTo: ''});
    const {email} = this.state;

    schema
      .validate({email})
      .then(res => {
        var payload = {
          email,
        };
        this.props.forgetpass(payload);
      })
      .catch(res => {
        this.setState({
          loading: false,
          errorTo: res.path,
          errorMge: res.message,
        });
      });
  };

  render() {
    const {email, errorTo, loading, errorMge} = this.state;
    const {LngCode}=this.props
    return (
      <AuthBackground>
        <BackButton onBack={() => this.props.navigation.goBack()} />
        <ScrollView keyboardShouldPersistTaps={'handled'} >
          <Logo />
          <View
            style={{
              padding: spacing(20),
              marginBottom: spacing(30),
              justifyContent: 'center',
            }}>
            <InputBox
              errorMge={errorMge}
              error={errorTo === 'email'}
              keyboardType="email-address"
              placeholder={LngCode.EMAIL_LABEL}
              onChange={text => this.onEmailInput(text)}
              value={email}
              inputStyle={{marginBottom: 30}}
            />
          </View>
          <RoundBtn
            loading={loading}
            onPress={this.onPressForgetPass}
            style={{width: '80%', alignSelf: 'center'}}
            title={LngCode.SEND_LABEL}
          />
          <TextBox style={{textAlign: 'center', margin: 15}} type="caption3">
           {LngCode.MSG_NO_ACOUNT}
            <TextBox
              type="body3"
              onPress={() => this.props.navigation.navigate('Register')}>
              &nbsp; {LngCode.REGISTER_LABEL}
            </TextBox>
          </TextBox>
        </ScrollView>
      </AuthBackground>
    );
  }
}

const mapStateToProps = ({UserData,LngCode}) => {
  const { loading, success, fail } = UserData;
  return {
    loading,
    success,
    fail,
    LngCode
  };
};

export default connect(
  mapStateToProps,
  {
    forgetpass,
  },
)(ForgetPassword);
