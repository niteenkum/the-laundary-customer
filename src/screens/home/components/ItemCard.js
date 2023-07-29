import React, {useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import TextBox from '../../../components/TextBox';
import Card from '../../../components/card';
import {outstyle} from '../../styles';
import {colors, scales, spacing} from '../../../res/appStyles';
import {InfoIcon} from '../../../components/icons/InfoIcon';
import QtyButton from './qty';
import {SIGN} from '../../../res/ConstVariable';
import PopView from '../../../components/popView';

export const ItemCard = ({
  data = {},
  countAdd,
  countMinus,
  item_quantity,
}) => {
  const [visible, setVisible] = useState(false);
  const [quantity, setquantity] = useState(0);

  const {item = []} = data;
  const uri = item && item.image ? {uri: item.image} : {uri: item[0].image};

  return (
    <>
      <TextBox
        style={{color: colors.listTitle, marginLeft: spacing(15), marginTop: spacing(15), color: colors.listTitle}}
        type="heading3">
        {data.category_name}
      </TextBox>
      <FlatList
        data={item}
        renderItem={({item, index}) => (
          <Card type="list">
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
              <Image source={{uri: item.image}} style={outstyle.itemImage} />
              <View
                style={{
                  justifyContent: 'space-between',
                  flex: 1,
                  marginLeft: spacing(10),
                }}>
                <TextBox
                  numberOfLines={2}
                  style={{
                    color: colors.listTitle,
                    width: '90%',
                  }}
                  type="heading3">
                  {item ? item.name : 'abc'}
                </TextBox>
                <TextBox
                  numberOfLines={1}
                  style={{
                    color: colors.tint,
                    width: '90%',
                  }}
                  type="caption1">
                  {SIGN}
                  {item.price}
                  {''} {item.price_type}
                </TextBox>
              </View>
              {data.item && data.item.info ? (
                <InfoIcon
                  onPress={() => setVisible(true)}
                  style={{marginHorizontal: spacing(5)}}
                  size={scales(20)}
                />
              ) : null}
              <View
                style={{
                  alignItems: 'flex-end',
                  justifyContent: 'space-between',
                }}>
                <QtyButton
                  onAddCount={(data) => countAdd(data)}
                  onRemoveCount={(data) => countMinus(data)}
                  quantity={quantity}
                  id={item.id}
                  price={item.price}
                  item_quantity={item_quantity}
                />
              </View>
            </View>
            <PopView
              onRequestClose={() => setVisible(false)}
              style={{borderRadius: scales(10)}}
              visible={visible}>
              <View style={styles.modalContainer}>
                <TouchableOpacity
                  onPress={() => setVisible(false)}
                  style={styles.modalCloseContainer}>
                  <TextBox type={'body5'} style={styles.modalCloseText}>
                    X
                  </TextBox>
                </TouchableOpacity>
              </View>
            </PopView>
          </Card>
        )}
        // keyExtractor={item => item.id}
      />
      {/* <Card type="list">
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
          <Image source={uri} style={outstyle.itemImage} />
          <View
            style={{
              justifyContent: 'space-between',
              flex: 1,
              marginLeft: spacing(10),
            }}>
            <TextBox
              numberOfLines={2}
              style={{
                color: colors.listTitle,
                width: '90%',
              }}
              type="heading3">
              {item ? item[0].name : 'abc'}
            </TextBox>
            <TextBox
              numberOfLines={1}
              style={{
                color: colors.tint,
                width: '90%',
              }}
              type="caption1">
              {SIGN}
              {item[0].price}
              {''} {item[0].price_type}
              {/* {data.amount} {data.quantity ? 'x ' + data.quantity + ' = ' : ''}
              {data.quantity
                ? SIGN + (data.amount * data.quantity).toFixed(2)
                : ''} */}
      {/* </TextBox>
          </View>
          {data.item && data.item.info ? (
            <InfoIcon
              onPress={() => setVisible(true)}
              style={{marginHorizontal: spacing(5)}}
              size={scales(20)}
            />
          ) : null}
          <View
            style={{
              alignItems: 'flex-end',
              // height: '100%',
              justifyContent: 'space-between',
            }}>
            <QtyButton
              onAddCount={() => IncrementItem()}
              onRemoveCount={() => DecreaseItem()}
              quantity={quantity || quantity_items()}
              count={counts => {
                quatitys({
                  id: item[0].id,
                  count: counts,
                  amount: item[0].price,
                });
                setCount({id: item[0].id, count: counts});
              }}
            />
          </View>
        </View>
        <PopView
          onRequestClose={() => setVisible(false)}
          style={{borderRadius: scales(10)}}
          visible={visible}>
          <View style={styles.modalContainer}>
            <TouchableOpacity
              onPress={() => setVisible(false)}
              style={styles.modalCloseContainer}>
              <TextBox type={'body5'} style={styles.modalCloseText}>
                X
              </TextBox>
            </TouchableOpacity>
          </View>
        </PopView>
      </Card> */}
    </>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    width: '100%',
    elevation: 2,
    padding: spacing(2),
    backgroundColor: colors.white,
    borderRadius: scales(5),
  },
  modalCloseContainer: {
    alignSelf: 'flex-end',
    backgroundColor: colors.darkGrey,
    padding: spacing(3),
    borderRadius: scales(30),
  },
  modalCloseText: {
    color: colors.white,
    height: 15,
    width: 15,
    textAlign: 'center',
    fontSize: 10,
  },
});
