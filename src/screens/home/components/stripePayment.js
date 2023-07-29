import React, {Component} from 'react';
import {StyleSheet, View, Switch} from 'react-native';
import {CreditCardInput} from 'react-native-credit-card-input';

import {spacing, colors, fontSize, scales} from '../../../res/appStyles';
import Card from '../../../components/card';
import TextBox from '../../../components/TextBox';
import PaymentCard from './pymentCard';
import {getAsyncStorage} from '../../../utils/asyncStorage';
import {STORAGES} from '../../../res/ConstVariable';
import {connect} from 'react-redux';
const labels = {
  number: 'NUMERO CARTA',
  expiry: 'MESE/ANNO',
  cvc: 'CVC/CCV',
  name: 'NOME INTESTATARIO',
};
const placeholders = {
  number: '1234 5678 1234 5678',
  expiry: 'MM/YY',
  cvc: 'CVC',
  name: 'NOME INTESTATARIO',
};
class StripePayment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      old: true,
      formData: {},
      selected: {id: 1},
      error: '',
      paymentMethods: this.getPatmenttype(props),
    };
  }
  getPatmenttype = props => {
    const {LngCode = {}} = props;
    return [
      {id: 1, title: LngCode.LABEL_CASH_DELIVEY},
      {id: 2, title: LngCode.LABEL_ONLINE_PAY},
    ];
  };

  setOldCard = async () => {
    const {old} = this.state;
    const data = await getAsyncStorage(STORAGES.CARD);
    console.log(data);
    if (old && data) {
      this.setState({old: false}, () => {
        this.cardInput.setValues(JSON.parse(data));
      });
    }
  };

  onChangetype = (t = {}) => {
    this.setState({selected: t, old: t.id == 2 ? true : false}, () =>
      this.props.onPayType(t.id),
    );
  };

  render() {
    const {selected, error = 'ssss', old, paymentMethods} = this.state;
    this.cardInput && old ? this.setOldCard() : null;

    return (
      <Card>
        <TextBox
          type="body2"
          style={{marginBottom: spacing(10), color: colors.grey}}>
          PAYMENT
        </TextBox>
        <PaymentCard
          paymentMethods={paymentMethods}
          selected={selected}
          onPress={t => this.onChangetype(t)}
        />
        {/* {selected.id == 2 ? (
          <View style={s.container}>
            <CreditCardInput
              labels={labels}
              placeholders={placeholders}
              autoFocus={false}
              requiresName
              ref={cardInput => (this.cardInput = cardInput)}
              requiresCVC
              labelStyle={s.label}
              inputStyle={s.input}
              validColor={'black'}
              invalidColor={'red'}
              placeholderColor={'darkgray'}
              onFocus={() => {}}
              onChange={this.props.onStripePayment}
            />

            <TextBox
              type="body2"
              style={{alignSelf: 'center', color: colors.red}}>
              {this.props.errors}
            </TextBox>
          </View>
        ) : null} */}
      </Card>
    );
  }
}

const s = StyleSheet.create({
  switch: {
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  container: {
    backgroundColor: '#F5F5F5',
    paddingVertical: spacing(30),
    paddingHorizontal: spacing(5),
  },
  label: {
    color: 'black',
    fontSize: scales(10),
  },
  input: {
    fontSize: scales(16),
    color: 'black',
  },
});
const mapStateToProps = ({LngCode}) => {
  return {LngCode};
};
export default connect(mapStateToProps, {})(StripePayment);
