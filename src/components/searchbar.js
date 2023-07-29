import React, {useEffect, useState} from 'react';
import {View, TextInput, Animated} from 'react-native';
import {spacing} from '../res/appStyles';
import TextBox from './TextBox';

export const SearchBar = props => {
  const [visible, setVisible] = useState(false);
  const [ht, setHeigth] = useState(new Animated.Value(0));
  useEffect(() => {
    if (props.visible) onShow();
    else onHide();
  }, [props, props.visible]);

  const onHide = () => {
    Animated.timing(
      // Animate over time
      ht, // The animated value to drive
      {
        toValue: 0, // Animate to opacity: 1 (opaque)
        duration: 500, // Make it take a while
        useNativeDriver: true,
      },
    ).start();
  };
  const onShow = () => {
    Animated.timing(
      // Animate over time
      ht,
      // The animated value to drive
      {
        toValue: spacing(40), // Animate to opacity: 1 (opaque)
        duration: 500, // Make it take a while
        useNativeDriver: true,
      },
    ).start();
  };
  onChangeText = serchtext => {
    this.setState({serchtext}, () => {
      // if(serchtext)
      //  this.updateSearch(serchtext);
      //  else  this.setState({SearchData:[],SearchCate:[]})
    });
  };

  return (
    <Animated.View
      style={[
        {
          height: ht,
          paddingHorizontal: spacing(20),
          flexDirection: 'row',
          alignItems: 'center',
          overflow: 'hidden',
        },
        props.style,
      ]}>
      <TextInput
        onChangeText={props.onChangeText}
        style={{flex: 1, padding: spacing(10)}}
        placeholder="Search"
      />
      <TextBox onPress={props.onClose}>╳</TextBox>
    </Animated.View>
  );
};
