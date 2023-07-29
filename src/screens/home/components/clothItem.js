import React from 'react';

import Card from '../../../components/card';
import {
  Image,
  StyleSheet,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';

import TextBox from '../../../components/TextBox';
import {colors} from '../../../res/appStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import {addBuyItem} from '../../../redux/actions/product.action';
import { SIGN } from '../../../res/ConstVariable';
 

class ClothItem extends React.Component {
  state = {
    loader: true,
    change: false,
  };
  componentDidMount() {
    this.setState({change: true, loader: false});
  }
  componentWillReceiveProps(nextProps) {
    const {CardItem, CardLoading, fail} = nextProps;
    if (CardItem !== this.props.CardItem && CardLoading) {
      this.setState({loader: false});
    }
    if (fail != this.props.fail) {
      this.setState({loader: false});
    }
  }

  onChangeCount(count, type) {
    this.setState({loader: true}, () => this.props.onUpdateCount(count, type));
  }

  render() {
    const {item, index = 0, count = 0, CardLoading} = this.props;
    const img = item.image ? {uri: item.image} : null;
    const amount = item.amount ? item.amount : 0;
 console.log('itemitemitem',item)
    return (
      <Card key={index} type="list" style={styles.card}>
        <View style={{flex: 1, flexDirection: 'row', width: '80%'}}>
          {/* <View style={styles.clothImgCont}> */}
          <Image source={img} style={styles.ImageStyle} />
          {/* </View> */}
          <View
            style={{justifyContent: 'space-between', flex: 1, marginRight: 5}}>
            <TextBox
              numberOfLines={1}
              style={{color: colors.listTitle}}
              type="heading">
              {item.name}
            </TextBox>
            <TextBox style={{color: colors.tint}} type="caption">
              {count
                ? `${count} X ${
                  SIGN
                  }${amount}`
                : `${SIGN}${amount}`}
            </TextBox>
          </View>
        </View>

        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            height: '100%',
          }}>
          <TouchableOpacity
            disabled={CardLoading}
            style={styles.Iconbox}
            onPress={() =>
              CardLoading
                ? {}
                : this.setState({loader: true}, () =>
                    this.props.onUpdateCount(count - 1, 'Minus'),
                  )
            }>
            <Ionicons
              style={{alignSelf: 'center'}}
              size={22}
              color={'#7E7E7E'}
              name={'md-remove-circle-outline'}
            />
          </TouchableOpacity>
          <View style={{alignItems: 'center', width: 30}}>
            {!this.state.loader ? (
              <TextBox type="title"> {count} </TextBox>
            ) : (
              <ActivityIndicator size="small" />
            )}
          </View>
          <TouchableOpacity
            disabled={CardLoading}
            style={styles.Iconbox}
            onPress={() =>
              CardLoading
                ? {}
                : this.setState({loader: true}, () =>
                    this.props.onUpdateCount(count + 1, 'Palse'),
                  )
            } //{() => this.onChangeCount(count + 1, 'Palse')}
          >
            <Ionicons
              style={{alignSelf: 'center'}}
              size={22}
              color={'#7E7E7E'}
              name={'md-add-circle-outline'}
            />
          </TouchableOpacity>
        </View>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    shadowColor: colors.lightGrey,
  },

  clothImgCont: {
    height: 50,
    width: 50,
    borderRadius: 100,
    borderWidth: 1,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.lightGrey,
    marginRight: 10,
  },
  Iconbox: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clothImage: {
    height: 48,
    width: 48,
    borderRadius: 25,
    resizeMode: 'contain',
  },
  ImageStyle: {
    backgroundColor: '#FFF',
    borderColor: '#ccc',
    borderWidth: 0.5,
    borderRadius: 25,
    padding: 2,
    width: 50,
    height: 50,

    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
const mapStateToProps = ({ProductData}) => {
  const {
    services,
    CardLoading = false,
    CardItem,
    ServieData = false,
    fail,
  } = ProductData;

  return {services, CardLoading, CardItem, ServieData, fail};
};

export default connect(mapStateToProps, {addBuyItem})(ClothItem);
