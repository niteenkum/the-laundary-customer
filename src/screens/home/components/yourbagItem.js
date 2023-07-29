import React, {Component} from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import TextBox from '../../../components/TextBox';

import CategoryItem from './CategoryItem';
class YourBuyItems extends React.Component {
  state = {
    types: [],
  };
  componentDidMount() {
    const {Buyitems, CategoryList} = this.props;
    let types = [];
    for (var item in Buyitems) {
      const idx = parseInt(item.replace('idx', ''));
      for (key in CategoryList) {
        if (CategoryList.hasOwnProperty(key)) {
          var dataItem = CategoryList[key];
          if (dataItem.id === idx) {
            type = {
              id: dataItem.id,
              title: dataItem.name,
              childs: {...Buyitems[item]},
            };
            types.push(type);
          }
        }
      }
    }
    this.setState({types});
  }
  
  render() {
    const {types} = this.state;
    if (types.length <= 0) return <TextBox />;
    return (
      <View>
        {types.map(type => {
          return <CategoryItem type={type} />;
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  typeTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },

  cloths: {
    paddingLeft: 45,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },

  cloth: {
    width: '30%',
    textAlign: 'center',
  },
});
export default YourBuyItems;
