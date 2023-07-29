import React, {Component} from 'react';
import {View, FlatList, Image} from 'react-native';
import {connect} from 'react-redux';
import {colors, dimensions, spacing} from '../../res/appStyles';
import TextBox from '../../components/TextBox';
import {SearchIcon} from '../../components/icons/searchIcon';
import {isEmpty} from '../../utils/funcations';
import BottomBasketBtn from '../../components/bottomButton/bottomBasketBtn';
import {
  fetchCategoryList,
  fetchCategoryItems,
  addBuyItem,
  addTotalAmount,
} from '../../redux/actions/product.action';
import Background from '../../components/background';
import {SearchBar} from '../../components/searchbar';
import {MenuIcon} from '../../components/icons/menuIcon';
import _ from 'lodash';
import {ItemCard} from '../../screens/home/components/ItemCard';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SIGN, STORAGES} from '../../res/ConstVariable';
import servicelist from './servicelist';
import {add} from 'react-native-reanimated';
import {getAsyncStorage} from '../../utils/asyncStorage';
const TYPE = ['Minus', 'Palse'];
const {bottomButtonHeight} = dimensions;

let active_service_id = 0;

class Servicelist extends Component {
  static navigationOptions = ({navigation, navigationOptions}) => {
    const {params = {}} = navigation.state;
    const {ServiceId, onSearch = null, Sname} = params;
    const headerTitle = 'PRICE ESTIMATOR';
    return {
      headerTitle,

      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <MenuIcon />
        </TouchableOpacity>
      ),
    };
  };
  constructor(props) {
    super(props);
    this.updateSearch = _.debounce(this.updateSearch, 500);
    const ServiceId = 0;
    this.state = {
      loading: false,
      ServiceId: 0,
      visible: false,
      serchtext: '',
      cateindex: 0,
      cateId: 1,
      addedItems: [],
      totalAmount: 0,
      itemTax: 0,
    };
    global.added_item_list = {0: []};
  }

  componentDidMount() {
    this.props.navigation.setParams({onSearch: () => this.onSearchClose()});
    this.onGetItems();
    this.getItemTax();
    // this.props.navigation.addListener('willFocus', async () => {
    //   this.onGetItems();
    // });
  }
  onGetItems = cateId => {
    const {Sevices = []} = this.props;
    const {ServiceId, cateindex} = this.state;
    if (Sevices.length) {
      const serviceData = Sevices[ServiceId];
      const sid = Sevices[ServiceId].id;
      const cid = cateId
        ? cateId
        : serviceData.categories && serviceData.categories[cateindex];
      active_service_id = sid;
      added_item_list[sid]
        ? this.setState({addedItems: added_item_list[sid]})
        : null;
      this.fetchItemList(sid);
    }
  };

  onStoreLocal(data) {
    this.props.addBuyItem(data);
  }
  onUpdateCount = async (index, count, Type, item) => {
    const {clothType, data, service} = this.state;
    const {ServieData = {}} = this.props;
    const row = `idx${clothType}`;
    const col = `idxx${index}`;
    let Qty = {};
    let payload = {
      item_id: item[0].id,
      service_id: service,
    };
    if (Type === TYPE[1]) {
      payload.price = item.amount;
      payload.quantity = 1;
    }

    if (!isEmpty(ServieData))
      if (!isEmpty(ServieData[service])) {
        Qty = {...ServieData[service]};
      }

    if (count <= 0) {
      let rowdata = {...Qty[row]};
      delete rowdata[col];
      Qty = {...Qty, [row]: rowdata};
      const data1 = {
        card: {[service]: Qty},
        payload,
        Type,
      };

      this.onStoreLocal(data1);
      return null;
    }
    if (Qty[row] && Qty[row][col]) Qty[row][col].count = count;
    else {
      const RowItems = {...item, count: count};
      Qty[row] = {...Qty[row], [col]: RowItems};
    }

    const data1 = {
      card: {[service]: Qty},
      payload,
      Type,
    };

    this.onStoreLocal(data1);
  };

  fetchItemList = (service, category) => {
    const {serchtext = '', cateId, ServiceId} = this.state;
    const {Sevices} = this.props;
    const Obj = {
      category,
      service,
    };

    const serviceData = Sevices[ServiceId];
    const sid = serviceData.id;

    this.props.fetchCategoryItems({service: cateId});
  };

  onSearchClose = () => {
    this.setState({
      visible: !this.state.visible,
    });
  };

  onChangeText = serchtext => {
    this.setState({serchtext}, () => {
      if (serchtext) this.updateSearch(serchtext);
      else this.setState({SearchData: [], SearchCate: []});
    });
  };

  updateSearch = serchtext => {
    this.onGetItems();
  };

  onChnageCate = (item, index = 0) => {
    this.setState({cateindex: index, cateId: item.id}, () => {
      active_service_id = item.id;
      this.onGetItems(item.id);
    });
  };

  getItemTax = () => {
    getAsyncStorage(STORAGES.USER)
      .then(res => {
        this.setState({itemTax: JSON.parse(res).tax});
      })
      .catch(e => {});
  };

  render() {
    const {
      visible,
      serchtext,
      ServiceId,
      cateindex,
      addedItems,
      totalAmount,
      itemTax,
    } = this.state;
    const {Sevices = [], ItemList = [], LngCode, ItemLoading} = this.props;
    const sid = Sevices[ServiceId].id;
    // console.log(ItemList[0].length, 'lengthhhhh');
    return (
      <Background footerStyle={{backgroundColor: colors.primary}}>
        <View
          style={{
            height: spacing(70),
            width: '100%',
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'space-between',
            top: 2,
          }}>
          <FlatList
            data={Sevices}
            contentContainerStyle={{
              height: spacing(70),
              alignItems: 'center',
              // width: '100%',
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'space-evenly',
            }}
            horizontal
            scrollEnabled
            renderItem={({item, index}) => (
              <TouchableOpacity
                onPress={() => this.onChnageCate(item, index)}
                style={{
                  paddingVertical: spacing(5),
                  marginHorizontal: spacing(10),
                }}>
                <Image
                  source={{uri: item.image}}
                  resizeMode="contain"
                  style={{height: 24, width: 26, alignSelf: 'center'}}
                />

                <TextBox
                  style={{
                    color: cateindex == index ? colors.orange : colors.tint,
                  }}>
                  {item.name}
                </TextBox>
                <View
                  style={{
                    height: 1,
                    width: '100%',
                    borderBottomColor: 'white',
                    backgroundColor:
                      cateindex == index ? colors.orange : colors.white,
                  }}></View>
              </TouchableOpacity>
            )}
          />
        </View>
        {!ItemList && ItemLoading && !ItemList.length ? null : (
          <FlatList
            contentContainerStyle={{
              borderTopWidth: 4,
              borderTopColor: '#F8F8F8',
            }}
            data={ItemList}
            renderItem={({item, index}) => (
              <ItemCard
                data={item}
                countAdd={data => {
                  let addedProduct = addedItems;
                  addedItems.length == 0 ? addedProduct.push(data) : null;

                  addedItems.map(items => {
                    if (items.id !== data.id) {
                      addedProduct.push(data);
                    } else if (items.id === data.id) {
                      items['quantity'] = data.quantity;
                    }
                  });

                  var lookup = {};
                  var items = addedItems;
                  var result = [];

                  for (var item, i = 0; (item = items[i++]); ) {
                    var id = item.id;
                    if (!(id in lookup)) {
                      lookup[id] = 1;
                      result.push(item);
                    }
                  }

                  let newAmount = 0;
                  result.map(item1 => {
                    newAmount =
                      newAmount + parseInt(item1.price * item1.quantity);
                  });
                  this.setState({totalAmount: newAmount, addedItems: result});
                  added_item_list[active_service_id || 0] = result;
                }}
                countMinus={data => {
                  let addedProduct = addedItems;
                  addedItems.length == 0 ? addedProduct.push(data) : null;

                  addedItems.map(items => {
                    if (items.id !== data.id) {
                      addedProduct.push(data);
                    } else if (items.id === data.id) {
                      items['quantity'] = data.quantity;
                    }
                  });

                  var lookup = {};
                  var items = addedItems;
                  var result = [];

                  for (var item, i = 0; (item = items[i++]); ) {
                    var id = item.id;
                    if (!(id in lookup)) {
                      lookup[id] = 1;
                      result.push(item);
                    }
                  }

                  let newAmount = 0;
                  result.map(item1 => {
                    newAmount =
                      newAmount + parseInt(item1.price * item1.quantity);
                  });
                  this.setState({totalAmount: newAmount, addedItems: result});
                  added_item_list[active_service_id || 0] = result;
                }}
                headerTitle={'PRICE ESTIMATOR'}
                item_quantity={added_item_list}
                serviceid={ItemList[0]?.item[0]?.service_id}
              />
            )}
          />
        )}

        <BottomBasketBtn
          title={LngCode.ESTIMATED_PRRICE}
          // subTitle={`${''} ${LngCode.ITEMS_ADDED_LABEL}`}
          amount={`${SIGN} ${totalAmount.toFixed(2)} ${
            totalAmount && itemTax
              ? ` + ${SIGN} ${(totalAmount.toFixed(2) * itemTax) / 100} (Tax)`
              : ''
          } `}
          btnStyle={{}}
        />
      </Background>
    );
  }
}

const mapStateToProps = ({ProductData, LngCode}) => {
  const {
    ServieData,
    Categoryloading,
    Sevices,
    fail,
    ItemList,
    ItemLoading,
    TotalAmount,
    CardLoading,
    CardItem,
  } = ProductData;

  return {
    ServieData,
    Sevices,
    Categoryloading,
    CardLoading,
    ItemList,
    CardItem,
    ItemLoading,
    fail,
    LngCode,
    TotalAmount,
  };
};

export default connect(mapStateToProps, {
  fetchCategoryList,
  fetchCategoryItems,
  addBuyItem,
  addTotalAmount,
})(Servicelist);
