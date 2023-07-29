import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Image,
} from 'react-native';
import * as Yup from 'yup';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import * as ImagePicker from 'react-native-image-picker';
// import {launchImageLibrary} from 'react-native-image-picker';
import {
  removeAsyncStorage,
  getAsyncStorage,
  setAsyncStorage,
} from '../../utils/asyncStorage';
import {STORAGES} from '../../res/ConstVariable';
import apiService from '../../redux/services';
import {MenuIcon} from '../../components/icons/menuIcon';

import TextBox from '../../components/TextBox';
import {colors} from '../../res/appStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Background from '../../components/background';
import Card from '../../components/card';
import {InputBox} from '../../components/inputBox';
import CreateIcon from '../../components/icons/creatIcons';
import {connect} from 'react-redux';
import {Loader} from '../../components/loader';
import {
  logoutUser,
  editUserProfile,
  fetchUserProfile,
} from '../../redux/actions/auth.action';
import UserIcon from '../../components/icons/userIcon';
import RoundBtn from '../../components/roundBtn';

// const ImagePicker = require('react-native-image-picker');
const imgHeight = 120;
const iconHeight = 30;

const ImagePickerOptions = {
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

const schema = Yup.object().shape({
  email: Yup.string()
    .email("'email must be a valid email")
    .required('Email required'),
  phone: Yup.string().required('Please enter Phone Number'),
  last_name: Yup.string()
    .required('Surname is required')
    .matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed for this field '),
  first_name: Yup.string()
    .required('Name is required')
    .matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed for this field '),
  gst:Yup.string(),
});

class Profile extends Component {
  static navigationOptions = ({navigation}) => {
    let headerTitle = ' ';
    let savetxt = '';
    const {params = {}} = navigation.state;
    if (params.headerTitle) headerTitle = params.headerTitle;
    if (params.savetxt) savetxt = params.savetxt;
    return {
      headerTitle,
      headerLeft: props => (
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <MenuIcon />
        </TouchableOpacity>
      ),
      headerBackTitle: null,
      headerRight: (
        <TouchableOpacity onPress={() => params.toggleEdit(params.edit)}>
          {params.edit ? (
            <TextBox type="body3" color="white">
              {savetxt}
            </TextBox>
          ) : (
            <CreateIcon color={colors.white} />
          )}
        </TouchableOpacity>
      ),
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      image: null,
      fileName: '',
      menuVisible: false,
      gst:"",
      edit: false,
      errorTo: '',
      errorMge: '',
    };
    this.onFatchProfile();
    this.setHeaderTitle();
  }
  setHeaderTitle = () => {
    const {LngCode} = this.props;
    this.props.navigation.setParams({
      headerTitle: LngCode.PROFILE_MENU,
      savetxt: LngCode.LABEL_SAVE,
    });
  };

  toggleMenu = menuVisible => {
    this.setState({menuVisible});
  };

  toggleEdit = edit => {
    const {profileloading, User} = this.props;
    if (!profileloading) {
      if (this.state.edit) this.handleSubmit();
      this.setState({edit: !this.state.edit}, () => {
        this.props.navigation.setParams({edit: this.state.edit});
      });
    }
  };

  componentDidMount() {
    this.props.navigation.setParams({
      onPressMenu: () => this.toggleMenu(true),
      toggleEdit: () => this.toggleEdit(),
    });
    const {navigation} = this.props;
    navigation.addListener('willFocus', async () => {
      this.onFatchProfile();
    });
  }
  componentWillReceiveProps(nextProps) {
    const {profileSuccess, profileloading, fail, User} = nextProps;
    if (profileSuccess != this.props.profileSuccess && !profileloading) {
      if (profileSuccess.status) this.props.fetchUserProfile();
      else if (
        profileSuccess.errors &&
        Object.values(profileSuccess.errors) &&
        Object.values(profileSuccess.errors).length
      ) {
        global.Toaster(Object.values(profileSuccess.errors)[0]);
      }
    }

    if (User != this.props.User && !profileloading) this.updateLocalUser(User);

    if (fail != this.props.fail && !this.props.profileSuccess) {
      console.log('-----profileUploaded fail----');
      this.updateLocalUser(User);
    }
  }
  updateLocalUser = User => {
    if (User) {
      const {first_name, last_name, email, phone, image,gst} = this.state;
      const token = apiService.getAuthorizationToken().replace('Bearer ', '');
      setAsyncStorage(
        STORAGES.USER,
        JSON.stringify({
          ...User,
          token,
          first_name,
          last_name,
          email,
          phone,
          image,
          gst
        }),
      )
        .then(res => {
          console.log('User save');
          global.Toaster('Profile Updated Successfully');
        })
        .catch(e => {
          console.log('localst er', e);
        });
    }
  };
  getImageName = uri => {
    const {fileName} = this.state;
    if (fileName) return fileName;
    return uri.split('/').pop();
  };
  getImageName = uri => {
    return uri.split('/').pop();
  };
  handleSubmit = () => {
    const {first_name, last_name, email, phone, image,gst} = this.state;

    let formData = new FormData();
    formData.append('first_name', first_name);
    formData.append('last_name', last_name);
    formData.append('email', email);
    formData.append('phone', phone);
      formData.append('gst', gst);
    if (image)
      formData.append('image', {
        uri: image,
        name: this.getImageName(image),
        type: `image/jpg`,
      });

    schema
      .validate({
        first_name,
        last_name,
        email,
        phone,
        gst,
      })
      .then(res => {
        this.setState({
          loader: false,
          errorTo: '',
          errorMge: '',
        });
        this.props.editUserProfile(formData);
      })
      .catch(res => {
        this.setState({
          loader: false,
          errorTo: res.path,
          errorMge: res.message,
          edit: true,
        });

        this.props.navigation.setParams({edit: true});
      });
  };
  onFatchProfile = () => {
    var email = '';
    var phone = '';
    getAsyncStorage(STORAGES.USER)
      .then(res => {
        let data = JSON.parse(res);
        if (data.email) email = data.email;
        if (data.phone) phone = data.phone;
        console.log('data', data);
        this.setState({...data, email, phone});
      })
      .catch(err => {
        console.log('err ', err);
      });
  };

  handleImage = response => {
    console.log('response', response);
    if (response && response.assets && response.assets[0].uri) {
      this.setState({
        image: response.assets[0].uri,
        fileName: response.assets[0].fileName,
      });
    }
  };

  render() {
    const {
      activeTab,
      edit,
      first_name,
      last_name,
      email,
      phone,
      image,
      errorTo,
      errorMge,
      gst
    } = this.state;

    const {profileloading, LngCode} = this.props;
    const img = image ? {uri: image} : null;
    return (
      <Background>
        <SafeAreaView style={{justifyContent: 'space-between', flex: 1}}>
          <ScrollView>
            <View>
              <View style={[styles.imgCont]}>
                {profileloading ? (
                  <Card style={[styles.card, styles.image]}>
                    <ActivityIndicator size="large" />
                  </Card>
                ) : (
                  <Card style={[styles.card, styles.image]}>
                    {img ? (
                      <Image source={img} style={styles.image} />
                    ) : (
                      <UserIcon name="user" color="grey" />
                    )}
                    {edit ? (
                      <TouchableOpacity
                        style={[styles.iconBtn]}
                        onPress={() =>
                          ImagePicker.launchImageLibrary(
                            ImagePickerOptions,
                            response => this.handleImage(response),
                          )
                        }>
                        <CreateIcon color={colors.white} />
                      </TouchableOpacity>
                    ) : null}
                  </Card>
                )}
              </View>
              {/* <Card style={styles.inputCard}> */}
              <View style={styles.inputCont}>
                <InputBox
                  placeholder={LngCode.FIRST_LABEL}
                  errorMge={errorMge}
                  error={errorTo === 'first_name'}
                  value={first_name}
                  onChange={t => this.setState({first_name: t})}
                  inputStyle={styles.inputStyle}
                  editable={edit}
                />

                <InputBox
                  placeholder={LngCode.LAST_LABEL}
                  errorMge={errorMge}
                  error={errorTo === 'last_name'}
                  value={last_name}
                  onChange={t => this.setState({last_name: t})}
                  inputStyle={styles.inputStyle}
                  editable={edit}
                />

                <InputBox
                  placeholder={LngCode.MOBILE_LABEL}
                  errorMge={errorMge}
                  error={errorTo === 'phone'}
                  value={phone}
                  maxLength={10}
                  onChange={t => this.setState({phone: t})}
                  inputStyle={styles.inputStyle}
                  editable={edit}
                />
                <InputBox
                  placeholder={LngCode.EMAIL_LABEL}
                  errorMge={errorMge}
                  error={errorTo === 'email'}
                  value={email}
                  onChange={t => this.setState({email: t})}
                  inputStyle={styles.inputStyle}
                  editable={edit}
                />
                   <InputBox
                  placeholder={LngCode.GST_LABEL}
                  errorMge={errorMge}
                  maxLength={15}
                  error={errorTo === 'gst'}
                  value={gst}
                  onChange={t => this.setState({gst: t})}
                  inputStyle={styles.inputStyle}
                  editable={edit}
                />
              </View>
              {/* </Card> */}
              {/* <RoundBtn
                title={edit ? 'SAVE' : 'EDIT'}
                style={styles.nextBtn}
                onPress={() => this.toggleEdit()}
              /> */}
            </View>
          </ScrollView>
        </SafeAreaView>
      </Background>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },

  imgCont: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  card: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  image: {
    padding: 20,
    borderRadius: imgHeight / 2,
    width: imgHeight,
    height: imgHeight,
    borderWidth: 1,
    borderColor: colors.white,
  },
  iconBtn: {
    backgroundColor: colors.tint,
    borderRadius: iconHeight / 2,
    width: iconHeight,
    height: iconHeight,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 1,
    right: 2,
  },

  inputCard: {
    margin: 20,
    marginTop: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    alignItems: 'center',
  },

  inputCont: {
    padding: 15,
    paddingTop: 0,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingTop: 10,
  },

  inputStyle: {
    width: '100%',
    textAlign: 'center',
    borderBottomColor: colors.borderGrey,
    color: colors.lightGrey2,
    paddingTop: 10,
    fontSize: 15,
  },

  title: {
    fontWeight: 'bold',
    paddingTop: 15,
  },

  logoutIcon: {
    backgroundColor: colors.tint,
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logoutCont: {
    alignItems: 'center',
    marginBottom: 5,
  },
});
const mapStateToProps = ({UserData, LngCode}) => {
  console.log('mapStateToProps', UserData);
  const {profileloading, profileSuccess, User, fail} = UserData;
  return {
    profileloading,
    profileSuccess,
    User,
    fail,
    LngCode,
  };
};

export default connect(mapStateToProps, {
  editUserProfile,
  fetchUserProfile,
  logoutUser,
})(Profile);
