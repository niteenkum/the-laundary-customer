import React, {Component} from 'react';
import {View, FlatList} from 'react-native';
import {connect} from 'react-redux';
import {colors, dimensions, spacing} from '../../../res/appStyles';
import TextBox from '../../../components/TextBox';
import {SearchIcon} from '../../../components/icons/searchIcon';
import {isEmpty} from '../../../utils/funcations';
import BottomBasketBtn from '../../../components/bottomButton/bottomBasketBtn';
import {
  fetchCategoryList,
  fetchCategoryItems,
  addBuyItem,
  addTotalAmount,
} from '../../../redux/actions/product.action';
import Background from '../../../components/background';
import {SearchBar} from '../../../components/searchbar';
import _ from 'lodash';
import {ItemCard} from '../components/ItemCard';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SIGN} from '../../../res/ConstVariable';
import BottomSimpleBtn from '../../../components/bottomButton/BottomSimpleBtn';
const TYPE = ['Minus', 'Palse'];
const {bottomButtonHeight} = dimensions;
class WashFold extends Component {
  static navigationOptions = ({navigation, navigationOptions}) => {
    const {params = {}} = navigation.state;
    const {ServiceId, onSearch = null, Sname} = params;
    const headerTitle = Sname ? Sname : 'Service';
    return {
      headerTitle,
      headerRight: () => <SearchIcon onPress={onSearch} />,
    };
  };
  constructor(props) {
    super(props);
    this.updateSearch = _.debounce(this.updateSearch, 500);
    const ServiceId = this.props.navigation.getParam('ServiceId', 0);
    this.state = {
      loading: false,
      ServiceId,
      visible: false,
      serchtext: '',
      cateindex: 0,
      cateId: 0,
    };
  }

  componentDidMount() {
    this.props.navigation.setParams({onSearch: () => this.onSearchClose()});
    this.onGetItems();
    this.props.navigation.addListener('willFocus', async () => {
      this.onGetItems();
    });
  }

  onGetItems = cateId => {
    const {Sevices = []} = this.props;
    const {ServiceId, cateindex} = this.state;
    if (Sevices.length) {
      const serviceData = Sevices[ServiceId];
      const sid = serviceData.id;
      const cid = cateId
        ? cateId
        : serviceData.categories && serviceData.categories[cateindex].id;
      console.log('sid', sid, cid);
      this.fetchItemList(sid, cid);
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
      item_id: item.id,
      service_id: service,
    };
    if (Type === TYPE[1]) {
      payload.price = item.amount;
      payload.quantity = 1;
    }

    console.log(payload, count);
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
      console.log('Qty', data1);

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
    const {serchtext = ''} = this.state;
    const Obj = {
      category,
      service,
    };

    this.props.fetchCategoryList({search: serchtext, Obj});
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
    this.setState({cateindex: index, cateId: item.id}, () =>
      this.onGetItems(item.id),
    );
  };

  render() {
    const {visible, serchtext, ServiceId, cateindex} = this.state;
    const {Sevices = [], ItemList = [], LngCode, TotalAmount} = this.props;
    console.log(' ItemList.log', ItemList);

    const sid = Sevices[ServiceId].id;
    const list = Sevices[ServiceId].categories;
    return (
      <Background footerStyle={{backgroundColor: colors.primary}}>
        <SearchBar
          value={serchtext}
          visible={visible}
          onChangeText={this.onChangeText}
          onClose={this.onSearchClose}
        />
        <View style={{height: spacing(50)}}>
          <FlatList
            data={list}
            contentContainerStyle={{height: spacing(50), alignItems: 'center'}}
            horizontal
            renderItem={({item, index}) => (
              <TouchableOpacity onPress={() => this.onChnageCate(item, index)}>
                <TextBox
                  style={{
                    paddingHorizontal: spacing(10),
                    paddingVertical: spacing(5),
                    backgroundColor:
                      cateindex == index ? colors.tint : colors.borderGrey2,
                    marginHorizontal: spacing(10),
                    borderRadius: spacing(10),
                    overflow: 'hidden',
                    color: cateindex == index ? colors.white : colors.grey,
                  }}>
                  {item.name}
                </TextBox>
              </TouchableOpacity>
            )}
          />
        </View>
        <FlatList
          contentContainerStyle={{borderTopWidth: 4, borderTopColor: '#F8F8F8'}}
          data={ItemList}
          renderItem={({item, index}) => (
            <ItemCard serviceid={sid} data={item} />
          )}
        />
        <View style={{height: bottomButtonHeight * 2}} />
        <BottomBasketBtn
          title={LngCode.BASKET_LABEL}
          //subTitle={`${""} ${LngCode.ITEMS_ADDED_LABEL}`}
          amount={`${SIGN}${this.props.TotalAmount.toFixed(2)} `}
          btnStyle={{marginBottom: bottomButtonHeight, borderBottomWidth: 1}}
        />
        <BottomSimpleBtn
          title={LngCode.CONTINUE_LABEL}
          onPress={() => this.props.navigation.navigate('YourBag')}
        />
      </Background>
    );
  }
}

const mapStateToProps = ({ProductData, LngCode}) => {
  console.log('Product mapStateToProps', ProductData);
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
})(WashFold);
