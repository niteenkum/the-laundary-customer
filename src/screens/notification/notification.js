import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
  FlatList,
  Image,
} from 'react-native';
import {MenuIcon} from '../../components/icons/menuIcon';
import TextBox from '../../components/TextBox';
import {spacing, scales} from '../../res/appStyles';
import {connect} from 'react-redux';
import {getNotificatons} from '../../redux/actions/auth.action';
import {Loader} from '../../components/loader';
import {shortDate} from '../../utils/funcations';
import Background from '../../components/background';
import messaging from '@react-native-firebase/messaging';
import Card from '../../components/card';

const Img = require('../../../assets/images/logo.png');
class Notification extends React.Component {
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
      headerRight: <View />,
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      menuVisible: false,
      activeTab: 'ongoing',
    };
    this.setHeaderTitle();
  }
  setHeaderTitle = () => {
    const {LngCode} = this.props;
    this.props.navigation.setParams({headerTitle: LngCode.NOTI_MENU});
  };

  toggleMenu = menuVisible => {
    this.setState({menuVisible});
  };

  componentDidMount() {
    this.props.navigation.setParams({onPressMenu: () => this.toggleMenu(true)});
    this.props.getNotificatons();
    const removeNotificationListener = messaging().onMessage(notification => {
      console.log('notification', notification);
      if (notification) this.props.getNotificatons();
    });
  }

  getImage(image) {
    console.log('Img', image);
    if (image) return {uri: image};
    return Img;
  }

  renderItem = ({item}) => {
    console.log('item', item);
    return (
      <Card
        onPress={() =>
          this.props.navigation.navigate('Orderdetilss', {
            OrderId: item.order_id,
          })
        }
        style={styles.notificationRow}>
        {item.image ? (
          <Image
            source={this.getImage(item.image)}
            style={styles.nitificationImg}
          />
        ) : null}
        <View style={{flex: 1}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <TextBox numberOfLines={1} type="body3" style={{flex: 1}}>
              {item.title}
            </TextBox>
          </View>
          <View>
            <TextBox type="caption2">{item.notification}</TextBox>
          </View>

          <TextBox type="caption2" style={{textAlign: 'right'}}>
            {shortDate(item.updated_at, false)}
          </TextBox>
        </View>
      </Card>
    );
  };

  render() {
    const {Notifications, NotiLoader, LngCode} = this.props;

    if (NotiLoader) return <Loader loader={true} />;
    if (Notifications && !Notifications.length)
      return (
        <Loader
          textStyle={{fontSize: 20}}
          loader={false}
          title={LngCode.NO_NOTI}
        />
      );

    return (
      <Background>
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={NotiLoader}
              onRefresh={() => this.props.getNotificatons()}
            />
          }
          data={Notifications}
          renderItem={this.renderItem}
        />
      </Background>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  notificationRow: {
    elevation: 1,
    shadowOpacity: 0.1,
    padding: spacing(10),
    marginBottom: 2,
    paddingHorizontal: spacing(15),
    flexDirection: 'row',
    alignItems: 'center',
  },

  nitificationImg: {
    height: scales(40),
    width: scales(40),
    marginRight: spacing(10),
    resizeMode: 'contain',
  },
});
const mapStateToProps = ({UserData, LngCode}) => {
  console.log('mapStateToProps', UserData);
  const {Notifications, NotiLoader} = UserData;
  return {
    Notifications,
    NotiLoader,
    LngCode,
  };
};
export default connect(mapStateToProps, {
  getNotificatons,
})(Notification);
