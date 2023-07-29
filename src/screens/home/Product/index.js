import React, {useEffect} from 'react';
import {SafeAreaView, FlatList, View} from 'react-native';
import Background from '../../../components/background';
import {SearchIcon} from '../../../components/icons/searchIcon';
import {SearchBar} from '../../../components/searchbar';
import {ProductCard} from '../components/ProductCard';
import {connect} from 'react-redux';
import {getProducts} from '../../../redux/actions/product.action';
import TextBox from '../../../components/TextBox';
import {Loader} from '../../../components/loader';
import _ from 'lodash';
import {spacing, dimensions, colors} from '../../../res/appStyles';
import BottomSimpleBtn from '../../../components/bottomButton/BottomSimpleBtn';
import BottomBasketBtn from '../../../components/bottomButton/bottomBasketBtn';
import {SIGN} from '../../../res/ConstVariable';
const {bottomButtonHeight} = dimensions;

class ProductList extends React.Component {
  static navigationOptions = ({navigation, navigationOptions}) => {
    const {params = {}} = navigation.state;
    const {ServiceId, onSearch = null, headerTitle = 'Prodotti'} = params;

    return {
      headerTitle,
      headerRight: () => <SearchIcon onPress={onSearch} />,
    };
  };

  constructor(props) {
    super(props);
    this.updateSearch = _.debounce(this.updateSearch, 1000);
    this.state = {
      page: 1,
      visible: false,
      serchtext: '',
      loading: false,
    };
  }

  componentDidMount() {
    this.props.navigation.setParams({onSearch: () => this.onSearchClose()});
    this.onCallApi();
  }

  onSearchClose = () => {
    const {visible} = this.state;
    this.setState(
      {
        serchtext: '',
        visible: !visible,
      },
      () => (visible ? this.onCallApi() : null),
    );
  };

  onCallApi = () => {
    const {serchtext, page = 0, loading} = this.state;
    const {loading2, productLastPage} = this.props;
    if (productLastPage >= page && !loading2)
      this.setState({page: page + 1}, () =>
        this.props.getProducts({search: serchtext, page}),
      );
  };

  onSearchItem = serchtext => {
    this.setState({serchtext, page: 1}, () => {
      this.updateSearch();
    });
  };

  updateSearch = () => {
    this.onCallApi();
  };

  render() {
    const {serchtext, visible, page} = this.state;
    const {ProductList, loading2, LngCode, TotalAmount, User} = this.props;
    return (
      <Background footerStyle={{backgroundColor: colors.primary}}>
        <SearchBar
          value={serchtext}
          visible={visible}
          onChangeText={this.onSearchItem}
          onClose={this.onSearchClose}
          style={{elevation: 1}}
        />
        <FlatList
          contentContainerStyle={{flexGrow: 1}}
          data={ProductList}
          numColumns={2}
          renderItem={({item}) => (
            <ProductCard
              onAddPress={() => this.props.navigation.navigate('Welcome')}
              item={item}
            />
          )}
          ListFooterComponent={loading2 && page > 2 && <Loader />}
          onEndReached={() => (!loading2 ? this.onCallApi() : {})}
          ListEmptyComponent={() =>
            loading2 ? (
              <Loader />
            ) : (
              <TextBox
                type="body4"
                style={{alignSelf: 'center', marginTop: '50%'}}>
                No Product available
              </TextBox>
            )
          }
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

const mapStateToProps = ({UserData, ProductData, LngCode}) => {
  const {User} = UserData;
  const {ProductList, productLastPage = 1, TotalAmount, loading2} = ProductData;
  return {
    ProductList,
    loading2,
    TotalAmount,
    LngCode,
    User,
    productLastPage,
  };
};
export default connect(mapStateToProps, {getProducts})(ProductList);
