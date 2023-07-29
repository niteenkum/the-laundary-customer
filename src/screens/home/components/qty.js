import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import {colors, spacing} from '../../../res/appStyles';
import {connect} from 'react-redux';
import {addBuyItem} from '../../../redux/actions/product.action';

const QtyButton = props => {
  const {onAddCount, onRemoveCount , id, price, item_quantity} = props;
  const [quantity, setQuantity] = useState(props.quantity || 0);

  const IncrementItem = () => {
    onAddCount({
      price: price,
      quantity: quantity + 1,
      id: id,
    });
    setQuantity(quantity + 1);
  };

  const DecreaseItem = () => {
    if (quantity - 1 >= 0) {
      onRemoveCount({
        price: price,
        quantity: quantity - 1,
        id: id,
      });
      setQuantity(quantity - 1);
    } else null;
  };

  const quantity_items = () => {
    let updatedQuantity = 0;
    added_item_list[1]
      ? added_item_list[1].map((items, index) => {
          if (items.id === id) {
            updatedQuantity = item_quantity[1][index].quantity;
            item_quantity[1][index].quantity > 0
              ? setQuantity(item_quantity[1][index].quantity)
              : null;
          } else return false;
        })
      : 0;
    return updatedQuantity;
  };
  return (
    // console.log(quantity_items(), '{}{}{}{}'),
    <View style={[{alignSelf: 'center'}, props.style]}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          fontWeight: 'bold',
        }}>
        <TouchableOpacity
          onPress={DecreaseItem}
          style={{
            height: 20,
            width: 20,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 15,
            backgroundColor: colors.tint,
          }}>
          <Text style={[{fontSize: spacing(15),color: colors.white,},props.btnTextStyle]}>
            —
          </Text>
        </TouchableOpacity>
        <Text style={[{fontSize: spacing(18), color: colors.orange, marginHorizontal: 15}, props.textStyle]}>
          {quantity || quantity_items()}
        </Text>
        <TouchableOpacity
          onPress={IncrementItem}
          style={{
            height: 20,
            width: 20,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 15,
            backgroundColor: colors.tint,
          }}>
          <Text style={[{fontSize: spacing(15),color: colors.white},props.btnTextStyle]}>
            ＋
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const mapStateToProps = ({UserData, ProductData, LngCode}) => {
  const {User} = UserData;
  const {ProductList, TotalAmount, CardLoading, success} = ProductData;
  return {
    ProductList,
    CardLoading,
    success,
    TotalAmount,
    User,
  };
};
export default connect(mapStateToProps, {addBuyItem})(QtyButton);
