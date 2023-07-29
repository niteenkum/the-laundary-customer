import React from 'react';
import {View, FlatList, ActivityIndicator, Image} from 'react-native';
import Card from '../../components/card';
import {colors, scales, spacing} from '../../res/appStyles';
import TextBox from '../../components/TextBox';
import Stars from '../../components/StarRatting';
import PaginationView from '../../components/pagination';
import {connect} from 'react-redux';
import {Loader} from '../../components/loader';
import {
  getDriverDetais, 
  showRevies,
} from '../../redux/actions/auth.action';
import {ReviewCard} from './reviewcard';
import {SafeAreaView} from 'react-navigation';
import CircleImage from '../../components/card/Circle';

class DriverDetails extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      headerTitle: 'Profile',
      headerRight: <View />,
    };
  };
  constructor(props) {
    super(props);
    //const VendorId = props.navigation.getParam('VendorId', 0);
    this.state = {
      UserId:90,
      page: 1,
      pageload: false,
      count: 0,
    };
  }

  componentDidMount() {
    const {UserId} = this.state;
    this.props.getDriverDetais({driver_id: UserId});
    this.onLoadFirsttime();
  }
  componentDidUpdate(nextProps) {
    const {count, pageload} = this.state;
    if (count != nextProps.DriverReviews.length && pageload) {
      this.setState({pageload: false, count: nextProps.DriverReviews.length});
    }
  }
  onReload = (first = false) => {
    console.log('sd2')
    const {page, UserId} = this.state;
    const data = {
      first,
      user_id: UserId,
      page,
    };
    if (this.props.reviewLastPage >= page)
     this.setState({page: page + 1}, () => this.props.showRevies(data));
  };
  onLoadFirsttime = () => {
    console.log('sd')
    this.setState({page: 1}, () => this.onReload(true));
  };

  render() {
    const {
      first_name = '',
      last_name,
      image,
      average_rating
    } = this.props.Driver;
     const {pageload} = this.state;
    const {reviewLoading, DriverReviews = []} = this.props;
    return (
      <SafeAreaView style={{flex: 1, padding: 10}}>
        <Card
          type="list"
          style={{width: '100%', alignItems: 'center',   flexDirection: 'row',alignItems:'center',marginBottom: 5,}}>
               <CircleImage title={first_name+" "+last_name} size={scales(80)} image={image} style={{backgroundColor: colors.tint,}}/>
               
          <View style={{ marginLeft: 10, }}>
          <TextBox type="title"  >
              { first_name+" "+last_name}
             </TextBox>
            <Stars desable={true} rate={average_rating} size={spacing(22)} />
          </View>
        </Card>
        {/* <Card type='list' style={{flexDirection: 'row',marginBottom:10}}>
          <TextBox type='title'>Edit Profile</TextBox>
        </Card> */}
        
        <PaginationView
          loading={!pageload}
          onReachedEnd={() => this.onLoadFirsttime()}
          onRefresh={this.onLoadFirsttime}>
           
          <FlatList
              data={DriverReviews}
            renderItem={({item, index}) => <ReviewCard item={item} />}
            ListEmptyComponent={
              !reviewLoading ? (
                <Loader loader={false} title="No Review" />
              ) : null
            }
            ListHeaderComponent={reviewLoading ? <Loader /> : <View />}
          />
          {pageload ? (
            <ActivityIndicator size="small" color={colors.tint} />
          ) : (
            <View />
          )}
        </PaginationView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = ({UserData}) => {
 
  const {
    Driver,
    fail,
    loading,
    venderDetails={},
    reviewLoading, 
    reviewLastPage=1,
    DriverReviews=[]
  } = UserData;
  return {
    venderDetails,
    DriverReviews,
    reviewLastPage,
    Driver,
    fail,
    loading,
  };
};
export default connect(mapStateToProps, {getDriverDetais,showRevies})(DriverDetails);
