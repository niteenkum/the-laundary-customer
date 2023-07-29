import React from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Card from '../../../components/card';

import TextBox from '../../../components/TextBox';
import CheckBox from '../../../components/CheckBox';
import {InputBox} from '../../../components/inputBox';
import {colors, dimensions, scales, spacing} from '../../../res/appStyles';
import {
  getPromoCode,
  checkPromocode,
} from '../../../redux/actions/schedule.action';

import {connect} from 'react-redux';
import {Loader} from '../../../components/loader';

class PromoCodesList extends React.Component {
  static navigationOptions = ({navigation}) => {
    let headerTitle = ' ';
    const {params = {}} = navigation.state;
    if (params.headerTitle) headerTitle = params.headerTitle;
    return {
      headerTitle,
      headerBackTitle: null,
      headerRight: <View />,
    };
  };
  constructor(props) {
    super(props);
    const cart_price = props.navigation.getParam('Tprice', 0);
    this.state = {
      cart_price,
      PromoCode: '',
      error: '',
      customPromocode: '',
      checked: false,
      PromoCodes: [],
    };
    this.setHeaderTitle();
  }
  setHeaderTitle = () => {
    const {LngCode} = this.props;
    this.props.navigation.setParams({headerTitle: LngCode.LABEL_YOUR_PROMO});
  };

  componentDidMount() {
    this.props.getPromoCode();
  }

  componentWillReceiveProps(nextProps) {
    const {cart_price} = this.state;
    const {promoLoading, Success, fail, LngCode} = nextProps;
    if (!promoLoading && Success && Success !== this.props.Success) {
      if (Success.status)
        global.Toaster(Object.values('promocode applied Sucessfully')),
          console.log(Success, 'Success>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>'),
          this.props.navigation.navigate('Payment', {PromoCode: Success});
      else if (Success.errors) {
        this.setState({error: Object.values(Success.errors)[0]});
        global.Toaster(Object.values(Success.errors)[0]);
      }
    }
    if (!promoLoading && fail !== this.props.fail) {
      if (fail) {
        const {data = {msg: LngCode.MSG_PRAMO_NOT_EXIST}} = fail;
        this.setState({error: data.msg});
        global.Toaster(data.msg);
      } else this.setState({error: LngCode.MSG_PRAMO_NOT_EXIST});
    }
  }

  onApplyPromoCode = PromoCode => {
    const {cart_price} = this.state;
    const data = {promocode: PromoCode};
    this.setState({PromoCode, error: ''}, () =>
      this.props.checkPromocode(data),
    );
  };
  render() {
    const {checked = false, customPromocode, cart_price, error} = this.state;
    const {
      Promocodes = [],
      promoLoading = false,
      loading,
      LngCode,
    } = this.props;

    return (
      <SafeAreaView style={{flex: 1}}>
        <Card type="list" style={{width: '100%'}}>
          <View style={styles.horizentalBox}>
            <CheckBox
              selected={checked}
              onPress={() => this.setState({checked: !checked, error: false})}
            />
            <TextBox type="body3"> {LngCode.LABEL_HAVE_PROMO}</TextBox>
          </View>

          <View
            style={[
              styles.horizentalBox,
              {width: '100%', justifyContent: 'space-between'},
            ]}>
            <View style={{flex: 3}}>
              <InputBox
                value={customPromocode}
                onChange={t => this.setState({customPromocode: t})}
                placeholder={LngCode.LABEL_YOUR_PROMO}
              />
            </View>
            <TouchableOpacity
              disabled={!checked}
              onPress={() => this.onApplyPromoCode(customPromocode)}
              style={[
                styles.btn,
                {
                  borderWidth: 0,
                  backgroundColor: checked ? colors.tint : colors.lightGrey,
                },
              ]}>
              <TextBox style={{color: '#fff'}}>{LngCode.LABEL_APPLY}</TextBox>
            </TouchableOpacity>
          </View>
        </Card>
        {promoLoading && !error ? (
          <TextBox style={{color: colors.red, margin: spacing(10)}} />
        ) : (
          <TextBox style={{color: colors.red, margin: spacing(10)}}>
            {error}
          </TextBox>
        )}
        {loading ? <Loader /> : null}
        {Promocodes && Promocodes.length <= 0 ? (
          <Loader loader={false} title={LngCode.MSG_NO_PROMO} />
        ) : null}
        {!loading && !checked && Promocodes && Promocodes.length ? (
          <View>
            <Card
              type="EMPTY"
              style={{
                padding: 0,
                borderColor: colors.lightGrey,
                borderBottomWidth: 0.5,
              }}>
              <TextBox type="title" style={{margin: 10}}>
                {' '}
                {LngCode.LABEL_CHOOSE_PROMO} :
              </TextBox>
            </Card>
            <ScrollView>
              <View>
                {Promocodes &&
                  Promocodes.map(t => (
                    <Card
                      type="EMPTY"
                      style={{
                        flexDirection: 'row',
                        borderColor: colors.lightOrangeBg,
                        borderBottomWidth: 1,
                      }}>
                      <View style={{flex: 4}}>
                        <TextBox type="body3" style={{fontWeight: '500'}}>
                          {t.promocode}
                        </TextBox>
                        <TextBox type="caption2">{t.description}</TextBox>
                      </View>
                      <TouchableOpacity
                        onPress={() => this.onApplyPromoCode(t.promocode)}
                        style={[styles.btn, {backgroundColor: '#fff'}]}>
                        <TextBox type="body2" color="primary">
                          {LngCode.LABEL_APPLY}
                        </TextBox>
                      </TouchableOpacity>
                    </Card>
                  ))}
              </View>
            </ScrollView>
          </View>
        ) : null}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 0,
    marginBottom: 15,
    elevation: 1,
    padding: 0,
  },
  horizentalBox: {flexDirection: 'row', alignItems: 'center'},
  btn: {
    flex: 2,
    marginLeft: scales(20),
    height: scales(35),
    borderRadius: scales(10),
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.tint,
    borderWidth: 1,
  },
});
const mapStateToProps = ({ScheduleData, LngCode}) => {
  const {Promocodes = [], loading, fail, promoLoading, Success} = ScheduleData;
  console.log(ScheduleData, '00000000000000000000000000');
  return {
    promoLoading,
    Success,
    Promocodes,
    loading,
    fail,
    LngCode,
  };
};

export default connect(mapStateToProps, {
  checkPromocode,
  getPromoCode,
})(PromoCodesList);
