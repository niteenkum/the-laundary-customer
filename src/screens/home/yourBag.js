import React, {Component} from 'react';
import {View, ScrollView, StyleSheet, FlatList} from 'react-native';
import {
  removeService,
  getCard,
  addBuyItem,
} from '../../redux/actions/product.action';
import TextBox from '../../components/TextBox';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors, dimensions, scales, spacing} from '../../res/appStyles';
import {Loader} from '../../components/loader';
import BottomBasketBtn from '../../components/bottomButton/bottomBasketBtn';
import BottomSimpleBtn from '../../components/bottomButton/BottomSimpleBtn';
import {NavigationEvents} from 'react-navigation';
import {connect} from 'react-redux';
import Background from '../../components/background';
import {SIGN} from '../../res/ConstVariable';
import {CartItem} from './components/cartitems';
import {CartService} from './components/cardservice';

const {bottomButtonHeight} = dimensions;

class YourBag extends Component {
  static navigationOptions = ({navigation}) => {
    let headerTitle = ' ';
    const {params = {}} = navigation.state;
    if (params.headerTitle) headerTitle = params.headerTitle;
    return {
      headerTitle,
    };
  };

  constructor(props) {
    super(props);
    this.state = {count: -1};
    props.getCard();
    this.setHeaderTitle();
  }

  setHeaderTitle = () => {
    const {navigation, LngCode} = this.props;
    this.props.navigation.setParams({headerTitle: LngCode.LABEL_YOUT_BAG});
  };

  componentWillReceiveProps(nextProps) {
    const {CartData} = nextProps;
    const {count = -1} = this.state;
    if (CartData && CartData.status) {
      const {items = [], products = []} = nextProps.CartData;
      let CartItems = 0;
      if (items.length) CartItems = CartItems + items.length;
      if (products.length) CartItems = CartItems + products.length;
      if (CartItems != count) {
        this.setState({count: CartItems}, () =>
          this.props.navigation.setParams({CartItems}),
        );
      }
    }
  }

  addToCart = data => {
    const {model_type, product, item, service} = data;
    const delivery_days = item && item.delivery_days ? item.delivery_days : 2;
    let payload = {model_type, quantity: 0, delivery_days};
    if (model_type === 'Product') {
      payload.model_id = product.id;
      payload.delivery_days = product?.delivery_days;
    } else {
      payload.model_id = item.id;
      payload.service_id = service.id;
    }
    console.log('data', data);
    if (data.quantity) payload.amount = data.total_amount;
    const data1 = {type: 'delete', ...payload, payload};
    this.props.addBuyItem(data1);
  };

  render() {
    const {LngCode, CartData = {}, TotalAmount, loading2} = this.props;
    const {items = [], products = []} = CartData;
    console.log('[YOURBAG]', items);

    if (!items.length && !products.length)
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Loader loader={loading2} title=" Your bag is empty" />
        </View>
      );
    console.log('[YOURBAG2]', items);
    return (
      <Background footerStyle={{backgroundColor: colors.tint}}>
        <NavigationEvents onWillFocus={this.onWillFocus} />
        <View style={styles.container}>
          <ScrollView style={{marginBottom: 2 * bottomButtonHeight}}>
            {items.length ? (
              <View style={{marginTop: spacing(20)}}>
                <View
                  style={{
                    flexDirection: 'row',
                    padding: spacing(10),
                    borderBottomColor: colors.grey,
                    borderBottomWidth: 0.5,
                  }}>
                  <TextBox type="body4" color="tint" style={{flex: 1}}>
                    {LngCode.LEBAL_ITEMS}
                  </TextBox>
                  <Ionicons
                    onPress={() => this.props.navigation.navigate('Home')}
                    size={scales(25)}
                    color={colors.grey}
                    name="md-create"
                    style={{marginRight: 15}}
                  />
                </View>
                <FlatList
                  data={items}
                  renderItem={({item}) => (
                    <CartItem
                      addToCart={() => this.addToCart(item)}
                      data={item}
                    />
                  )}
                />
              </View>
            ) : null}
            {products.length ? (
              <View style={{marginTop: spacing(20)}}>
                <View
                  style={{
                    flexDirection: 'row',
                    padding: spacing(10),
                    borderBottomColor: colors.grey,
                    borderBottomWidth: 0.5,
                  }}>
                  <TextBox type="body4" color="tint" style={{flex: 1}}>
                    {LngCode.LABEL_PRODUCT}
                  </TextBox>
                  <Ionicons
                    onPress={() => this.props.navigation.push('Products')}
                    size={scales(25)}
                    color={colors.grey}
                    name="md-create"
                    style={{marginRight: 15}}
                  />
                </View>
                <FlatList
                  data={products}
                  renderItem={({item}) => (
                    <CartService
                      addToCart={() => this.addToCart(item)}
                      data={item}
                    />
                  )}
                />
              </View>
            ) : null}
          </ScrollView>
        </View>
        <BottomBasketBtn
          style={{}}
          disabled={true}
          title={LngCode.BASKET_LABEL}
          subTitle={`${this.state.count} ${LngCode.ITEMS_ADDED_LABEL}`}
          amount={`${SIGN}${TotalAmount.toFixed(2)} `}
          btnStyle={{marginBottom: bottomButtonHeight, borderBottomWidth: 1}}
        />
        <BottomSimpleBtn
          title={LngCode.SCHDULE_PICKUP_LABEL}
          onPress={() => this.props.navigation.navigate('AddressList')}
        />
      </Background>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },

  itemHead: {
    flexDirection: 'row',
    borderBottomColor: colors.background,
    borderBottomWidth: 0.5,
    padding: spacing(10),
    justifyContent: 'space-between',
  },

  actionIcons: {
    flexDirection: 'row',
  },

  clothTypes: {},

  cloths: {
    paddingLeft: spacing(45),
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },

  cloth: {
    width: '30%',
    textAlign: 'center',
  },

  emptyBag: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
  },

  add: {
    color: colors.white,
    backgroundColor: colors.tint,
    width: spacing(70),
    height: spacing(70),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: spacing(20),
    paddingHorizontal: spacing(10),
    paddingVertical: spacing(5),
    marginTop: spacing(10),
  },
});
const mapStateToProps = ({ProductData, LngCode}) => {
  console.log('Product mapStateToProps', ProductData);
  const {ItemList, CartData, TotalAmount, loading2} = ProductData;

  return {
    CartData,
    ItemList,
    LngCode,
    TotalAmount,
    loading2,
  };
};

export default connect(mapStateToProps, {getCard, removeService, addBuyItem})(
  YourBag,
);
